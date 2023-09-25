import { useSignIn } from "@clerk/clerk-expo"
import { Stack } from "expo-router"
import { styled, withExpoSnack } from "nativewind"
import { useState } from "react"
import { View, TextInput, Button } from 'react-native'

const StyledView = styled(View)
const StyledInput = styled(TextInput)

const PwReset = () => {
  const { signIn, setActive } = useSignIn()

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [successfulCreation, setSuccessfulCreation] = useState(false);

  const onRequestReset = async () => {
    try {
      await signIn!.create({
        strategy: 'reset_password_email_code',
        identifier: emailAddress,
      })
      setSuccessfulCreation(true);
    } catch (error: any) {
      alert(error.errors[0].message);
    }
  }

  const onReset = async () => {
    try {
      const result = await signIn!.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password,
      });
      console.log(result);
      alert('Password reset successfully');

      await setActive!({ session: result.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    }
  };

  return (
    <StyledView className="flex-1 justify-center p-5">
      <Stack.Screen options={{ headerBackVisible: !successfulCreation }} />

      {!successfulCreation && (
        <>
          <StyledInput
            className="my-1 h-14 rounded p-3 bg-white shadow"
            autoCapitalize="none"
            placeholder="example@example.com"
            value={emailAddress}
            onChangeText={setEmailAddress}
          />
          <Button onPress={onRequestReset} title="Send Reset Email" color={'#6c47ff'} />
        </>
      )}

      {successfulCreation && (
        <>
          <View>
            <StyledInput
              className="my-1 h-14 rounded p-3 bg-white shadow"
              placeholder="Code..."
              value={code}
              onChangeText={setCode}
            />
            <StyledInput className="my-1 h-14 rounded p-3 bg-white shadow" placeholder="New password" value={password} onChangeText={setPassword} secureTextEntry />
            <Button onPress={onReset} title="Verify Email" color={"#6C47FF"} />
          </View>
        </>
      )}
    </StyledView>
  )
}

export default withExpoSnack(PwReset)