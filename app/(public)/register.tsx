import { View, Text, Pressable, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import { useSignUp } from "@clerk/clerk-expo"
import { styled, withExpoSnack } from "nativewind"
import Spinner from "react-native-loading-spinner-overlay"
import { Stack, useRouter } from "expo-router"

const StyledView = styled(View)
const StyledInput = styled(TextInput)

const register = () => {
  const { signUp, setActive, isLoaded } = useSignUp()


  const [emailAddress, setEmailAddress] = useState("")
  const [password, setPassword] = useState("")
  const [pendingVerifcation, setPendingVerification] = useState(false)
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return
    }
    setLoading(true)

    try {
      await signUp.create({
        emailAddress,
        password
      })

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      })

      setPendingVerification(true)
    } catch (error: any) {
      alert(error.errors[0].message)
    } finally {
      setLoading(false)
    }
  }

  const onPressVerify = async () => {
    if (!isLoaded) {
      return
    }
    setLoading(true)

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      })

      await setActive({ session: completeSignUp.createdSessionId })
    } catch (error: any) {
      alert(error.errors[0].message)
    } finally {
      setLoading(false)

    }
  }

  return (
    <StyledView className="flex-1 justify-center p-5" >
      <Stack.Screen options={{ headerBackVisible: !pendingVerifcation }} />
      <Spinner visible={loading} />

      {!pendingVerifcation && (
        <>
          <StyledInput
            className="my-1 h-14 rounded p-3 bg-white shadow"
            autoCapitalize="none"
            placeholder="example@example.com"
            value={emailAddress}
            onChangeText={setEmailAddress}
          />
          <StyledInput
            className="my-1 h-14 rounded p-3 bg-white shadow mb-4"
            placeholder="password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Button
            title="Sign up"
            color={"#6C47FF"}
            onPress={onSignUpPress}
          />
        </>
      )}

      {pendingVerifcation && (
        <>
          <View>
            <StyledInput
              className="my-1 h-14 rounded p-3 bg-white shadow"
              placeholder="Code..."
              value={code}
              onChangeText={setCode}
            />
            <Button onPress={onPressVerify} title="Verify Email" color={"#6C47FF"} />
          </View>
        </>
      )}
    </StyledView>
  )
}

export default withExpoSnack(register)