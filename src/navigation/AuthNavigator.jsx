import React, { useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MyTabBar from './Tabbar'
import HomeNavigator from './HomeNavigator'
import SurpriseNavigator from './SurpriseNavigator'
import ReservationsNavigator from './ReservationsNavigator'
import InfoRestaurantNavigator from './InfoRestaurantNavigator'
import ChoiceRoleNavigator from './ChoiceRoleNavigator'
import { RoleContext } from '../context/RoleContext'
import RestaurantReservationScreen from '../screens/RestaurantReservationScreen'
import HomeRestaurantScreen from '../screens/HomeRestaurantScrenn'

const Tabs = createBottomTabNavigator()

function MainNavigator() {
  const { role } = useContext(RoleContext)

  if (!role) {
    return <ChoiceRoleNavigator />
  }

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
          <Tabs.Screen name='HomeRestaurant' component={HomeRestaurantScreen} />
          <Tabs.Screen name='RestaurantReservation' component={RestaurantReservationScreen} />
        </>
      )}
    </Tabs.Navigator>
  )
}

export default MainNavigator
