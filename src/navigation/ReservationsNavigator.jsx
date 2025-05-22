import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ReservationsScreen from '../screens/ReservationsScreen'

const Stack = createNativeStackNavigator()

function ReservationsNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Reservations' component={ReservationsScreen} />
    </Stack.Navigator>
  )
}

export default ReservationsNavigator
