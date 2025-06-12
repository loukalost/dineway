import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const MenuSection = ({ title, items }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {items.map((item, index) => (
      <View key={index} style={styles.item}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <Text style={styles.itemText}>{item.title} - {item.price}</Text>
      </View>
    ))}
  </View>
);

const generateRandomCode = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

export default function InfoRestaurantScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { restaurant } = route.params;
  const { carte } = restaurant;

  const [selectedPeople, setSelectedPeople] = useState(3);
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [hasReservation, setHasReservation] = useState(false);

  useEffect(() => {
    const checkExistingReservation = async () => {
      try {
        const existingReservation = await AsyncStorage.getItem('reservationInfo');
        if (existingReservation !== null) {
          setHasReservation(true);
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de la réservation existante', error);
      }
    };

    checkExistingReservation();
  }, []);

  useEffect(() => {
    const now = new Date();
    const defaultTime = new Date(now.getTime() + 30 * 60000); // Ajoute 30 minutes
    setTime(defaultTime);
  }, []);

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(false);
    setTime(currentTime);
  };

  const handleValidate = async () => {
    if (await AsyncStorage.getItem('reservationInfo')) {
      Alert.alert('Réservation existante', 'Vous avez déjà une réservation.');
      return;
    }

    const reservationCode = generateRandomCode();
    const now = new Date();

    const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
    const optionsDay = { weekday: 'long' };
    const formattedDate = now.toLocaleDateString('fr-FR', optionsDate);
    const formattedDay = now.toLocaleDateString('fr-FR', optionsDay);

    const reservationInfo = {
      restaurantName: restaurant.name,
      numberOfPeople: selectedPeople,
      reservationCode: reservationCode,
      adresse: restaurant.details.address,
      image: restaurant.image,
      rating: restaurant.rating,
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: formattedDate,
      day: formattedDay
    };

    try {
      await AsyncStorage.setItem('reservationInfo', JSON.stringify(reservationInfo));
      navigation.navigate('ReservationsUser');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des informations de réservation', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <View style={styles.restaurantInfo}>
            <Image source={{ uri: restaurant.image }} style={styles.logoPlaceholder} />
            <View>
              <Text style={styles.name}>{restaurant.name}</Text>
              <Text style={styles.text}>{restaurant.details.address}</Text>
              <Text style={styles.text}>⭐ {restaurant.rating} · {restaurant.distance}</Text>
              <Text style={styles.text}>{restaurant.details.seats} places restantes</Text>
              <Text style={styles.text}>{restaurant.tags.join(', ')}</Text>
            </View>
          </View>
          <View>
            <MapView
              style={styles.mapSize}
              initialRegion={{
                latitude: 47.216671,
                longitude: -1.55,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={{ latitude: restaurant.coordinates.latitude, longitude: restaurant.coordinates.longitude }}
                title={restaurant.name}
                description={restaurant.description}
              >
                <Callout tooltip={true}>
                  <View style={styles.calloutContainer}>
                    <Text style={styles.calloutText}>{restaurant.name}</Text>
                  </View>
                </Callout>
              </Marker>
            </MapView>
          </View>
        </View>

        <MenuSection title="Entrées" items={carte.entrees} />
        <MenuSection title="Plats" items={carte.plats} />
        <MenuSection title="Desserts" items={carte.desserts} />
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedPeople}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedPeople(itemValue)}
            mode="dropdown"
          >
            {[...Array(Math.min(restaurant.details.seats, 10))].map((_, i) => (
              <Picker.Item
                key={i + 1}
                label={`${i + 1} personne${i + 1 > 1 ? 's' : ''}`}
                value={i + 1}
              />
            ))}
          </Picker>
        </View>

        <TouchableOpacity style={styles.footerBtn} onPress={() => setShowTimePicker(true)}>
          <Text style={styles.footerText}>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.validateBtn} onPress={handleValidate}>
          <Text style={styles.validateText}>Valider</Text>
        </TouchableOpacity>
      </View>

      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onTimeChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 10,
  },
  scroll: {
    padding: 16,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 16,
  },
  restaurantInfo: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  logoPlaceholder: {
    width: 64,
    height: 64,
    backgroundColor: '#ccc',
    borderRadius: 8,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  text: {
    color: '#333',
    fontSize: 12,
  },
  mapSize: {
    height: 180,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    backgroundColor: '#fafafa',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  itemText: {
    fontSize: 14,
    flex: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#f1f1f1',
    padding: 8,
    borderRadius: 8,
  },
  footerText: {
    fontSize: 14,
  },
  validateBtn: {
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  validateText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  pickerContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    width: 120,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    width: '100%',
    color: '#333',
    fontSize: 14,
  },
});
