import { createNativeStackNavigator } from '@react-navigation/native-stack'
import InfoRestaurantScreen from '../screens/InfoRestaurantScreen'

const Stack = createNativeStackNavigator()

function InfoRestaurantNaviguator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Information restaurant' component={InfoRestaurantScreen} />
    </Stack.Navigator>
  )
}

export default InfoRestaurantNaviguator
