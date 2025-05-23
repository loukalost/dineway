import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import MainNavigator from './navigation/MainNavigator'
import { RoleProvider } from './context/RoleContext'

export default function App() {
  return (
    <NavigationContainer>
      <RoleProvider>
        <MainNavigator />
      </RoleProvider>
    </NavigationContainer>
  )
}
