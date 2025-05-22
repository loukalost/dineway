import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MyTabBar from './Tabbar'
import HomeNavigator from './HomeNavigator'
import SurpriseNavigator from './SurpriseNavigator'
import ReservationsNavigator from './ReservationsNavigator'

const Tabs = createBottomTabNavigator()

function MainNavigator() {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false
      }}
      tabBar={(props) => <MyTabBar {...props} />}
    >
      <Tabs.Screen name='Home' component={HomeNavigator} />
      <Tabs.Screen name='Surprise' component={SurpriseNavigator} />
      <Tabs.Screen name='Reservations' component={ReservationsNavigator} />
    </Tabs.Navigator>
  )
}

export default MainNavigator
