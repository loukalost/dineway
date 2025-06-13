import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SurpriseScreen from '../screens/SurpriseScreen'
import InfoRestaurantScreen from '../screens/InfoRestaurantScreen';

const Stack = createNativeStackNavigator()

function SurpriseNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SurpriseScreen" component={SurpriseScreen} />
      <Stack.Screen name="InfoRestaurantScreen" component={InfoRestaurantScreen} />
    </Stack.Navigator>
  )
}

export default SurpriseNavigator
