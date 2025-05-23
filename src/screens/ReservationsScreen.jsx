import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ReservationPage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.restaurantInfo}>
        <View style={styles.logoPlaceholder} />
        <View style={styles.restaurantDetails}>
          <Text style={styles.restaurantName}>Le Berliner</Text>
          <Text style={styles.restaurantAddress}>3 Rue Racine, 44000 Nantes</Text>
          <View style={styles.restaurantTags}>
            <Text style={styles.restaurantTag}>⭐ 4.2</Text>
          </View>
          <View style={styles.tags}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Poke</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Végétarien</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Froid</Text>
            </View>
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
          <Text style={styles.tag}>3 personnes</Text>
          <Text style={styles.tag}>21:40</Text>
        </View>
      </View>
      <View style={styles.codeContainer}>
        <Text style={styles.codeLabel}>Code</Text>
        <View style={styles.codeBox}>
          <Text style={styles.codeText}>1944</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.cancelButton}>
        <Text style={styles.cancelButtonText}>Annuler réservation</Text>
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
  header: {
    marginBottom: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
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
});

export default ReservationPage;
