import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SurpriseScreen from '../screens/SurpriseScreen'

const Stack = createNativeStackNavigator()

function SurpriseNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SurpriseScreen" component={SurpriseScreen} />
    </Stack.Navigator>
  )
}

export default SurpriseNavigator
