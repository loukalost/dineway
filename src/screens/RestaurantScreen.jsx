import { Text, View } from 'react-native'
import TextButton from '../components/buttons/TextButton'
import MapView, { Callout, Marker } from 'react-native-maps'

function RestaurantScreen() {
  return (
    <View>
      <Text>Restaurant Screen</Text>
      <TextButton
        value="Réserver une table"
        onPress={() => console.log('Réserver une table')}
        icon="calendar"
        error={false}
        style={{ backgroundColor: '#f0f0f0', padding: 10, borderRadius: 5 }}
      />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 47.216671,
          longitude: -1.55,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: 47.216671, longitude: -1.55 }}
          title="Mon Marqueur"
          description="Ceci est un exemple de callout personnalisé"
        >
          <Callout tooltip={true}>
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutText}>Restaurant italien</Text>
              {/*<Button>Voir la carte du restaurant</Button>*/}
            </View>
          </Callout>
        </Marker>
      </MapView>
    </View>
  )
}

export default RestaurantScreen
