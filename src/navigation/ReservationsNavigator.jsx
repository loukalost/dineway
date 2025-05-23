import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ReservationsScreen from '../screens/ReservationsScreen'

const Stack = createNativeStackNavigator()

function ReservationsNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ReservationsScreen" component={ReservationsScreen} />
    </Stack.Navigator>
  )
}

export default ReservationsNavigator
