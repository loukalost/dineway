/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import MainNavigator from './navigation/MainNavigator'
import { NotifierWrapper } from 'react-native-notifier'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Colors } from './styles/Colors.js'

const myTheme = {
  ...DefaultTheme,
  colors: {
    ...Colors
  }
}

const linking = {
  prefixes: [
    'www.woolens.app',
    'woolens.app',
    'https://woolens.app',
    'http://woolens.app',
    'https://www.woolens.app',
    'http://www.woolens.app',
    'woolens://',
    'https://woolens://',
    'http://woolens://'
  ],
  config: {
    screens: {
      Auth: 'auth',
      WCAuth: 'wc-auth',
      WCAuthReturn: 'wc-auth-return',
      WCAuthCallback: {
        path: 'wc-auth-callback'
      }
    }
  }
}

function App() {
  return (
    <GestureHandlerRootView>
      <NotifierWrapper>
        <NavigationContainer linking={linking} theme={myTheme}>
          <MainNavigator />
        </NavigationContainer>
      </NotifierWrapper>
    </GestureHandlerRootView>
  )
}

export default App
