import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const data = {
  restaurant: {
    name: 'Le Berliner',
    address: '3 Rue Racine, 44000 Nantes',
    rating: 4.2,
    distance: '350m',
    remainingPlaces: 'x places restantes',
    tags: 'Poke - Végétarien - Froid'
  },
  carte: {
    entrees: new Array(4).fill({
      title: 'Le Lorem Ipsum est simplement du faux',
      price: '18 €',
      image: 'https://media.istockphoto.com/id/1150368715/fr/photo/cuisse-de-canard-confite.jpg?s=612x612&w=0&k=20&c=4i4_SjiNIIp9bhoSeRm47wjRXFPntasqZw5_x4x0oIw='
    }),
    plats: new Array(4).fill({
      title: 'Le Lorem Ipsum est simplement du faux',
      price: '18 €',
      image: 'https://media.istockphoto.com/id/1150368715/fr/photo/cuisse-de-canard-confite.jpg?s=612x612&w=0&k=20&c=4i4_SjiNIIp9bhoSeRm47wjRXFPntasqZw5_x4x0oIw='
    }),
    desserts: new Array(4).fill({
      title: 'Le Lorem Ipsum est simplement du faux',
      price: '18 €',
      image: 'https://media.istockphoto.com/id/1150368715/fr/photo/cuisse-de-canard-confite.jpg?s=612x612&w=0&k=20&c=4i4_SjiNIIp9bhoSeRm47wjRXFPntasqZw5_x4x0oIw='
    })
  }
};

const MenuSection = ({ title, items }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {items.map((item, index) => (
      <View key={index} style={styles.item}>
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
              </View>
            </Callout>
          </Marker>
        </MapView>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <Text style={styles.itemText}>{item.title} - {item.price}</Text>
      </View>
    ))}
  </View>
);

export default function InfoRestaurantScreen() {
  const { restaurant, carte } = data;
  const [selectedPeople, setSelectedPeople] = useState(3);
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(false);
    setTime(currentTime);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Info Restaurant */}
        <View style={styles.header}>
          <View style={styles.restaurantInfo}>
            <View style={styles.logoPlaceholder} />
            <View>
              <Text style={styles.name}>{restaurant.name}</Text>
              <Text style={styles.text}>{restaurant.address}</Text>
              <Text style={styles.text}>⭐ {restaurant.rating} · {restaurant.distance}</Text>
              <Text style={styles.text}>{restaurant.remainingPlaces}</Text>
              <Text style={styles.text}>{restaurant.tags}</Text>
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
                coordinate={{ latitude: 47.216671, longitude: -1.55 }}
                title="Mon Marqueur"
                description="Ceci est un exemple de callout personnalisé"
              >
                <Callout tooltip={true}>
                  <View style={styles.calloutContainer}>
                    <Text style={styles.calloutText}>Restaurant italien</Text>
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
            {[...Array(10)].map((_, i) => (
              <Picker.Item key={i + 1} label={`${i + 1} personne${i + 1 > 1 ? 's' : ''}`} value={i + 1} />
            ))}
          </Picker>
        </View>


        <TouchableOpacity style={styles.footerBtn} onPress={() => setShowTimePicker(true)}>
          <Text style={styles.footerText}>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.validateBtn}>
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
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { padding: 16, paddingBottom: 100 },
  header: { marginBottom: 16 },
  restaurantInfo: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16
  },
  logoPlaceholder: {
    width: 64,
    height: 64,
    backgroundColor: '#ccc',
    borderRadius: 8
  },
  name: { fontWeight: 'bold', fontSize: 16 },
  text: { color: '#333', fontSize: 12 },
  mapSize: {
    height: 180,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mapText: { fontWeight: 'bold', fontSize: 16 },
  section: { backgroundColor: '#fafafa', padding: 12, borderRadius: 8, marginTop: 10 },
  sectionTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 8 },
  item: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  itemImage: { width: 40, height: 40, borderRadius: 20, marginRight: 8 },
  itemText: { fontSize: 14, flex: 1 },
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
    alignItems: 'center'
  },
  footerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#f1f1f1',
    padding: 8,
    borderRadius: 8
  },
  footerText: { fontSize: 14 },
  validateBtn: {
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8
  },
  validateText: { color: '#fff', fontWeight: 'bold' },
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
