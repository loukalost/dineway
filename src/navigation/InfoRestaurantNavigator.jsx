import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import InfoRestaurantScreen from '../screens/InfoRestaurantScreen'

const Stack = createNativeStackNavigator()

function InfoRestaurantNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="InfoRestaurantScreen" component={InfoRestaurantScreen} />
    </Stack.Navigator>
  )
}

export default InfoRestaurantNavigator
