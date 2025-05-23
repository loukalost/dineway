import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SurpriseScreen from '../screens/SurpriseScreen'

const Stack = createNativeStackNavigator()

function SurpriseNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Surprise' component={SurpriseScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

export default SurpriseNavigator
