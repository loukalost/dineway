import React from 'react';
import { StyleSheet, View, Dimensions, Text, Button } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps';

export default function App() {
  return (
    <View style={styles.container}>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  calloutContainer: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  calloutText: {
    fontSize: 16,
  },
});
