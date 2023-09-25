import { View, Text, TextInput, Button, Pressable } from 'react-native'
import React, { useState } from 'react'
import Spinner from "react-native-loading-spinner-overlay"
import { Link } from "expo-router"
import { useSignIn } from "@clerk/clerk-expo"
import { withExpoSnack, styled } from "nativewind"

const StyledView = styled(View)
const StyledInput = styled(TextInput)
const StyledPressable = styled(Pressable)

const login = () => {
  const { signIn, setActive, isLoaded } = useSignIn()

  const [emailAddress, setEmailAddress] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const onSignInPress = async () => {
    if (!isLoaded) {
      return
    }
    setLoading(true)

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password
      })

      await setActive({ session: completeSignIn.createdSessionId })
    } catch (error: any) {
      alert(error.errors[0].message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <StyledView className="flex-1 justify-center p-5" >
      <Spinner visible={loading} />

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
        title="Login"
        color={"#6C47FF"}
        onPress={onSignInPress}
      />

      <Link href="/reset" asChild>
        <StyledPressable className="m-8 items-center">
          <Text>Forgot password?</Text>
        </StyledPressable>
      </Link>
      <Link href="/register" asChild>
        <StyledPressable className="m-8 items-center">
          <Text>Create Account</Text>
        </StyledPressable>
      </Link>
    </StyledView>
  )
}

export default withExpoSnack(login)