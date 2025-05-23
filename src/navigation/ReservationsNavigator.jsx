import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ReservationsScreen from '../screens/ReservationsScreen'

const Stack = createNativeStackNavigator()

function ReservationNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='ReservationScreen' component={ReservationsScreen} />
    </Stack.Navigator>
  )
}

export default ReservationNavigator
