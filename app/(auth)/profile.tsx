import { Button, View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import { styled, withExpoSnack } from "nativewind"
import { useUser } from "@clerk/clerk-expo"

const StyledView = styled(View)
const StyledInput = styled(TextInput)

const Profile = () => {
  const { user } = useUser()
  const [firstName, setFirstName] = useState(user?.firstName)
  const [lastName, setLastName] = useState(user?.lastName)

  const onSaveUser = async () => {
    try {
      const result = await user?.update({
        firstName: firstName!,
        lastName: lastName!,
      })
      console.log('🚀 ~ file: profile.tsx:16 ~ onSaveUser ~ result:', result);
    } catch (e) {
      console.log('🚀 ~ file: profile.tsx:18 ~ onSaveUser ~ e', JSON.stringify(e));
    }
  }

  return (
    <StyledView className="flex-1 justify-center p-10">
      <Text className="text-center">Good morning {user?.firstName} {user?.lastName}</Text>

      <StyledInput
        className="my-1 h-14 rounded p-3 bg-white shadow"
        placeholder="First name"
        value={firstName || ''}
        onChangeText={setFirstName}
      />
      <StyledInput
        className="my-1 h-14 rounded p-3 bg-white shadow"
        placeholder="Last name"
        value={lastName || ''}
        onChangeText={setLastName}
      />
      <Button onPress={onSaveUser} title="Update account" color={'#6c47ff'} />
    </StyledView>
  )
}

export default withExpoSnack(Profile)