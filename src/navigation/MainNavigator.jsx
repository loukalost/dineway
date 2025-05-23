import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MyTabBar from './Tabbar'
import HomeNavigator from './HomeNavigator'
import SurpriseNavigator from './SurpriseNavigator'
import ReservationsNavigator from './ReservationsNavigator'
import InfoRestaurantNavigator from './InfoRestaurantNavigator'

const Tabs = createBottomTabNavigator()

function MainNavigator(role) {
  return (
    <Tabs.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <MyTabBar {...props} />}
    >
      {role === 'utilisateur' ? (
        <>
          <Tabs.Screen name='Home' component={HomeNavigator} />
          <Tabs.Screen name='Surprise' component={SurpriseNavigator} />
          <Tabs.Screen name='Reservations' component={ReservationsNavigator} />
          <Tabs.Screen name='Info restaurant' component={InfoRestaurantNavigator} />
        </>
      ) : (
        <>
          <Tabs.Screen name='Home' component={HomeNavigator} />
          <Tabs.Screen name='Reservations' component={ReservationsNavigator} />
        </>
      )}
    </Tabs.Navigator>
  )
}

export default MainNavigator
