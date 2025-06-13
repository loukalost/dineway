import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const ReservationPage = () => {
  const [reservationInfo, setReservationInfo] = useState(null);

  const fetchReservationInfo = async () => {
    try {
      const info = await AsyncStorage.getItem('reservationInfo');
      if (info !== null) {
        setReservationInfo(JSON.parse(info));
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des informations de réservation', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchReservationInfo();
    }, [])
  );

  const handleCancel = async () => {
    Alert.alert(
      'Annuler la réservation',
      'Êtes-vous sûr de vouloir annuler cette réservation ?',
      [
        {
          text: 'Non',
          style: 'cancel',
        },
        {
          text: 'Oui',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('reservationInfo');
              setReservationInfo(null);
            } catch (error) {
              console.error('Erreur lors de l\'annulation de la réservation', error);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Mes réservations</Text>
      {reservationInfo ? (
        <>
          <View style={styles.restaurantInfo}>
            <Image source={{ uri: reservationInfo.image }} style={styles.logoPlaceholder} />
            <View style={styles.restaurantDetails}>
              <Text style={styles.restaurantName}>{reservationInfo.restaurantName}</Text>
              <Text style={styles.restaurantAddress}>18 rue du soleil Levant, Nantes</Text>
              <View style={styles.restaurantTags}>
                <Text style={styles.restaurantTag}>⭐ {reservationInfo.rating}</Text>
              </View>
            </View>
          </View>

          <View style={styles.reservationDetails}>
            <View style={styles.tags}>
              <Text style={styles.tag}>🥙 Kebabs</Text>
              <Text style={styles.tag}>🌱 Veggie</Text>
            </View>
          </View>
          <View style={styles.reservationDetails}>
            <View style={styles.tags}>
              <Text style={styles.tag}>{reservationInfo.numberOfPeople} personnes</Text>
              <Text style={styles.tag}>{reservationInfo.time}</Text>
            </View>
          </View>
          <View style={styles.codeContainer}>
            <Text style={styles.codeLabel}>Code</Text>
            <View style={styles.codeBox}>
              <Text style={styles.codeText}>{reservationInfo.reservationCode}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelButtonText}>Annuler réservation</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.noReservationText}>Pas de réservation</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  header: {
    marginBottom: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 8,

  },
  restaurantInfo: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  logoPlaceholder: {
    width: 64,
    height: 64,
    backgroundColor: '#ccc',
    borderRadius: 8,
    marginRight: 16,
  },
  restaurantDetails: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  restaurantAddress: {
    fontSize: 14,
    marginBottom: 4,
  },
  restaurantTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  restaurantTag: {
    fontSize: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  reservationDetails: {
    marginBottom: 8,
  },
  reservationDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  reservationDetailLabel: {
    fontSize: 14,
  },
  codeContainer: {
    marginBottom: 16,
  },
  codeLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  codeBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  codeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tags: {
    flexDirection: 'row',
    gap: 8,
  },
  tag: {
    backgroundColor: '#eee',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  tagText: {
    fontSize: 12,
  },
  noReservationText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ReservationPage;
