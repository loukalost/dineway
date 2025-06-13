import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const formatDate = (date) => {
  const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
  const optionsTime = { hour: '2-digit', minute: '2-digit' };
  return {
    date: date.toLocaleDateString('fr-FR', optionsDate),
    time: date.toLocaleTimeString('fr-FR', optionsTime),
  };
};

const RestaurantReservationPage = () => {
  const [activeTab, setActiveTab] = useState('validation');
  const [pendingReservations, setPendingReservations] = useState([]);
  const [historyReservations, setHistoryReservations] = useState([]);

  useEffect(() => {
    const fetchReservationInfo = async () => {
      try {
        const pendingInfo = await AsyncStorage.getItem('reservationInfo');
        const historyInfo = await AsyncStorage.getItem('reservationHistory');

        if (pendingInfo !== null) {
          setPendingReservations([JSON.parse(pendingInfo)]);
        }

        if (historyInfo !== null) {
          const parsedHistory = JSON.parse(historyInfo);
          parsedHistory.sort((a, b) => new Date(b.date) - new Date(a.date));
          setHistoryReservations(parsedHistory);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des informations de réservation', error);
      }
    };

    fetchReservationInfo();
  }, []);

  const handleValidate = async (reservation) => {
    Alert.alert(
      'Confirmation',
      'Êtes-vous sûr que les clients sont bien arrivés ?',
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Oui',
          onPress: async () => {
            try {
              const now = new Date();
              const { date } = formatDate(now);

              const updatedReservation = {
                ...reservation,
                date: date,
              };

              const updatedHistory = [...historyReservations, updatedReservation];
              updatedHistory.sort((a, b) => new Date(b.date) - new Date(a.date));

              await AsyncStorage.setItem('reservationHistory', JSON.stringify(updatedHistory));
              await AsyncStorage.removeItem('reservationInfo');

              setHistoryReservations(updatedHistory);
              setPendingReservations([]);

            } catch (error) {
              console.error('Erreur lors de la validation de la réservation', error);
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.numberOfPeople} personnes</Text>
      <Text style={styles.itemText}>{item.time}</Text>
      {activeTab === 'code' && (
        <>
          <Text style={styles.itemText}>{item.date}</Text>
          <Text style={styles.itemText}>{item.reservationCode}</Text>
        </>
      )}
      {activeTab === 'validation' && (
        <>
          <Text style={styles.itemText}>{item.reservationCode}</Text>
          <TouchableOpacity style={styles.checkButton} onPress={() => handleValidate(item)}>
            <Text style={styles.checkButtonText}>✓</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoPlaceholder} />
        <View style={styles.restaurantInfo}>
          <Text style={styles.restaurantName}>Pokai By Sushi Shop</Text>
          <Text style={styles.restaurantDetails}>3 Rue Racine, 44000 Nantes</Text>
          <Text style={styles.restaurantDetails}>⭐ 4.2</Text>
          <View style={styles.tags}>
            <Text style={styles.tag}>Kebabs</Text>
            <Text style={styles.tag}>Veggie</Text>
          </View>
        </View>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => setActiveTab('validation')}>
          <Text style={activeTab === 'validation' ? styles.activeTab : styles.tab}>En attente de code</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('code')}>
          <Text style={activeTab === 'code' ? styles.activeTab : styles.tab}>Historique</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'validation' ? (
        pendingReservations.length > 0 ? (
          <FlatList
            data={pendingReservations}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <Text style={styles.noReservationText}>Aucune réservation en attente de code</Text>
        )
      ) : (
        historyReservations.length > 0 ? (
          <FlatList
            data={historyReservations}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <Text style={styles.noReservationText}>Aucune réservation dans l'historique</Text>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  logoPlaceholder: {
    width: 64,
    height: 64,
    backgroundColor: '#ccc',
    borderRadius: 8,
    marginRight: 16,
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  restaurantDetails: {
    fontSize: 14,
    marginBottom: 4,
  },
  tags: {
    flexDirection: 'row',
    marginTop: 8,
  },
  tag: {
    fontSize: 12,
    backgroundColor: '#e0e0e0',
    padding: 4,
    borderRadius: 4,
    marginRight: 8,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  tab: {
    fontSize: 16,
    color: '#666',
  },
  activeTab: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  itemText: {
    fontSize: 14,
    marginRight: 8,
  },
  checkButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#F44336',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  noReservationText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default RestaurantReservationPage;
