import { View, Text } from 'react-native'
import React from 'react'
import { styled, withExpoSnack } from "nativewind"
import { useUser } from "@clerk/clerk-expo"

const StyledView = styled(View)

const Home = () => {
  const { user } = useUser()

  return (
    <StyledView className="flex-1 justify-center items-center">
      <Text>Welcome, {user?.emailAddresses[0].emailAddress} 🎊 </Text>
    </StyledView>
  )
}

export default withExpoSnack(Home)