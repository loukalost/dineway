import React from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native'

export default function App() {
  return (
    <View style={styles.container}>
      <Text>HOMMMMMEEEEE</Text>
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
