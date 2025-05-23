import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ChoiceRoleScreen from '../screens/ChoiceRoleScreen'

const Stack = createNativeStackNavigator()

function ChoiceRoleNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ChoiceRole" component={ChoiceRoleScreen} />
    </Stack.Navigator>
  )
}

export default ChoiceRoleNavigator
