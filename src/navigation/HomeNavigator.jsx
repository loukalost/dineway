import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen'
import { RoleContext } from '../context/RoleContext'
import InfoRestaurantScreen from '../screens/InfoRestaurantScreen'
import HomeRestaurantScreen from '../screens/HomeRestaurantScreen'

const Stack = createNativeStackNavigator()
function HomeNavigator() {
  const { role } = useContext(RoleContext)

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {role === 'utilisateur' ? (
        <>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="InfoRestaurant" component={InfoRestaurantScreen}  />
        </>
      ) : (
        <>
          <Stack.Screen name='HomeRestaurant' component={HomeRestaurantScreen} />
        </>
      )}
    </Stack.Navigator>
  )
}

export default HomeNavigator
