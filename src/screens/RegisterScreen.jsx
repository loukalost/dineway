import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  const [address, setAddress] = useState('');
  const [openingHours, setOpeningHours] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    console.log({
      email,
      restaurantName,
      address,
      openingHours,
      password,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créer un compte en tant que restaurateur</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez votre email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nom du restaurant</Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez le nom du restaurant"
          value={restaurantName}
          onChangeText={setRestaurantName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Adresse</Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez l'adresse"
          value={address}
          onChangeText={setAddress}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Horaires</Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez les horaires"
          value={openingHours}
          onChangeText={setOpeningHours}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez votre mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Valider</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RegisterPage;
