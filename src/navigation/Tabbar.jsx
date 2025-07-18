import { StyleSheet, View } from 'react-native'
import { useLinkBuilder } from '@react-navigation/native'
import { PlatformPressable } from '@react-navigation/elements'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

const icon = {
  Home: 'home-filled',
  Surprise: 'casino',
  RestaurantReservation: 'table-restaurant',
  ReservationsUser: 'article'
}

function MyTabBar({ state, descriptors, navigation }) {
  const { buildHref } = useLinkBuilder()

  return (
    <View style={{ flexDirection: 'row', borderTopColor: '#E7C7C1', borderTopWidth: 2 }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params)
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key
          })
        }

        return (
          <PlatformPressable
            key={route.key}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.button}
          >
            <MaterialIcons
              name={icon[route.name] || 'help-outline'}
              size={isFocused ? 40 : 30}
              color="#DEA49A"
            />
          </PlatformPressable>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15
  }
})

export default MyTabBar
