import { Stack } from "expo-router"

export default function PublicLayout() {
  return (
    <Stack screenOptions={{
      headerStyle: {
        backgroundColor: '#6C47FF'
      },
      headerTintColor: '#fff',
      headerBackTitle: 'Back'
    }} >

      <Stack.Screen name="login" options={{ headerTitle: 'Clerk Auth App' }} />
      <Stack.Screen name="register" options={{ headerTitle: 'Create Account' }} />
      <Stack.Screen name="reset" options={{ headerTitle: 'Reset Password' }} />
    </Stack>
  )
}