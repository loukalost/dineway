import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import MainNavigator from './navigation/MainNavigator'
import { NotifierWrapper } from 'react-native-notifier'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ChoixRole from './screens/ChoiceRole'

function App() {
  const [initialRoute, setInitialRoute] = useState(null)

  useEffect(() => {
    const checkRole = async () => {
      const role = await AsyncStorage.getItem('userRole')
      setInitialRoute(role)
    }
    checkRole()
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NotifierWrapper>
        <NavigationContainer>
          {initialRoute ? (
            <MainNavigator role={initialRoute} />
          ) : (
            <ChoixRole setInitialRoute={setInitialRoute} />
          )}
        </NavigationContainer>
      </NotifierWrapper>
    </GestureHandlerRootView>
  )
}

export default App
