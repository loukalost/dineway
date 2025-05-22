import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ChoixRole = ({ setInitialRoute }) => {
  const handleChoice = async (role) => {
    await AsyncStorage.setItem('userRole', role)
    setInitialRoute(role)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card} onPress={() => handleChoice('utilisateur')}>
        <Text style={styles.text}>Utilisateur</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={() => handleChoice('restaurateur')}>
        <Text style={styles.text}>Restaurateur</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  card: {
    width: '80%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  text: {
    fontSize: 20,
  },
})

export default ChoixRole
