import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ReservationsScreen from '../screens/ReservationsScreen'

const Stack = createNativeStackNavigator()

function ReservationsNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Reservations' component={ReservationsScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

export default ReservationsNavigator
