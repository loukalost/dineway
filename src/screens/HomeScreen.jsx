import { StyleSheet, View, Dimensions, Text, TouchableOpacity, FlatList } from 'react-native'
import RestaurantCard from '../components/cards/RestaurantCard';
import { useState } from 'react';

const restaurantsData = [
  {
    name: 'Le Berliner',
    description: 'Délicieux kebabs berlinois faits maison.',
    price: 10,
    image: require('../../assets/img/kebab.png'),
    rating: 4.5,
    distance: '1.2 km',
    tags: ['🥙 Kebabs', '🌱 Veggie'],
  },
  {
    name: 'Pizza Mamma',
    description: 'Pizzas traditionnelles au feu de bois.',
    price: 12,
    image: require('../../assets/img/pizza.webp'),
    rating: 4.7,
    distance: '850 m',
    tags: ['🍕 Pizza', '🇮🇹 Italien'],
  },
  {
    name: 'Tokyo Bento',
    description: 'Cuisine japonaise rapide et fraîche.',
    price: 9,
    image: require('../../assets/img/bento.png'),
    rating: 4.3,
    distance: '1.5 km',
    tags: ['🇯🇵 Japonais', '🍱 Bento', '👌 Healthy'],
  },
  {
    name: 'Green Bowl',
    description: 'Bols végétariens et vegan gourmands.',
    price: 11,
    image: require('../../assets/img/greenbowl.jpg'),
    rating: 4.6,
    distance: '900 m',
    tags: ['🌱 Vegan', '👌 Healthy'],
  },
  {
    name: 'Le Tacos du Coin',
    description: 'Tacos épicés et croustillants.',
    price: 8,
    image: require('../../assets/img/tacos.webp'),
    rating: 4.2,
    distance: '1.1 km',
    tags: ['🌮 Tacos', '🍟 Street Food'],
  },
  {
    name: 'Maison Thaï',
    description: 'Spécialités thaïlandaises savoureuses.',
    price: 13,
    image: require('../../assets/img/thai.jpg'),
    rating: 4.8,
    distance: '1.3 km',
    tags: ['🇹🇭 Thaï', '🌶️ Épicé'],
  },
  {
    name: 'Burger Factory',
    description: 'Burgers artisanaux et frites maison.',
    price: 10,
    image: require('../../assets/img/burger.webp'),
    rating: 4.4,
    distance: '1.0 km',
    tags: ['🍔 Burger', '👨‍🍳 Fait maison'],
  },
  {
    name: 'Couscous Royal',
    description: 'Cuisine maghrébine traditionnelle.',
    price: 11,
    image: require('../../assets/img/couscous.jpeg'),
    rating: 4.6,
    distance: '1.6 km',
    tags: ['🇲🇦 Couscous', '🧆 Oriental'],
  },
];

const filtersData = ['Prix', 'Nombre de personnes', 'Type de restaurant', 'Distance'];

function HomeScreen() {
  const [activeFilter, setActiveFilter] = useState(null);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>Bienvenue utilisateur !</Text>
        <View style={styles.filtersRow}>
          {filtersData.map((filter, i) => (
            <TouchableOpacity
              key={i}
              style={activeFilter === i ? styles.activeFilter : styles.filter}
              onPress={() => setActiveFilter(i)}
            >
              <Text style={activeFilter === i ? { color: '#fff' } : {}}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <FlatList
          data={restaurantsData}
          renderItem={({ item }) => <RestaurantCard restaurant={item} />}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    flex: 1,
    backgroundColor: '#fff',
    margin: 'auto',
    paddingTop: 50,
  },
  container: {
    width: '90%',
    margin: 'auto',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 16,
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
  filtersRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  filter: {
    backgroundColor: '#eee',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  activeFilter: {
    backgroundColor: '#444',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    color: '#fff',
  },
});

export default HomeScreen;
