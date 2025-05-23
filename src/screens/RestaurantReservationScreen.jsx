import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const data = [
  { id: '1', people: '3 personnes', time: '22:50', status: 'En attente de validation' },
  { id: '2', people: '3 personnes', time: '22:50', status: 'En attente de validation' },
  { id: '3', people: '3 personnes', time: '22:50', status: 'En attente du code', code: '1234' },
  { id: '4', people: '3 personnes', time: '22:50', status: 'En attente du code', code: '5678' },
];

const RestaurantReservationPage = () => {
  const [activeTab, setActiveTab] = useState('validation');

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>N°5 :</Text>
      <Text style={styles.itemText}>{item.people}</Text>
      <Text style={styles.itemText}>{item.time}</Text>
      {activeTab === 'code' ? (
        <Text style={styles.itemText}>{item.code}</Text>
      ) : (
        <Text style={styles.itemText}>-</Text>
      )}
      <TouchableOpacity style={styles.checkButton}>
        <Text style={styles.checkButtonText}>✓</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton}>
        <Text style={styles.cancelButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoPlaceholder} />
        <View style={styles.restaurantInfo}>
          <Text style={styles.restaurantName}>Pokai By Sushi Shop</Text>
          <Text style={styles.restaurantDetails}>3 Rue Racine, 44000 Nantes</Text>
          <Text style={styles.restaurantDetails}>⭐ 4.2 · 350m</Text>
          <Text style={styles.restaurantDetails}>8 places restantes</Text>
          <View style={styles.tags}>
            <Text style={styles.tag}>Kebabs</Text>
            <Text style={styles.tag}>Veggie</Text>
          </View>
        </View>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => setActiveTab('validation')}>
          <Text style={activeTab === 'validation' ? styles.activeTab : styles.tab}>En attente de validation</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('code')}>
          <Text style={activeTab === 'code' ? styles.activeTab : styles.tab}>En attente du code</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={data.filter(item => item.status === (activeTab === 'validation' ? 'En attente de validation' : 'En attente du code'))}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
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
});

export default RestaurantReservationPage;
