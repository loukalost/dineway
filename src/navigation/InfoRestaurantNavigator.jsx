import { createNativeStackNavigator } from '@react-navigation/native-stack'
import InfoRestaurantScreen from '../screens/InfoRestaurantScreen'

const Stack = createNativeStackNavigator()

function HomeNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Information restaurant' component={InfoRestaurantScreen} />
    </Stack.Navigator>
  )
}

export default HomeNavigator
