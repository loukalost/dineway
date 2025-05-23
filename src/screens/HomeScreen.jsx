import { StyleSheet, View, Dimensions, Text, TouchableOpacity, FlatList } from 'react-native'
import RestaurantCard from '../components/cards/RestaurantCard';
import { useState } from 'react';

const restaurantsData = [
  {
    id: 1,
    name: 'Le Berliner',
    description: 'Délicieux kebabs berlinois faits maison.',
    price: 10,
    image: require('../../assets/img/kebab.png'),
    rating: 4.5,
    distance: '1.2 km',
    tags: ['🥙 Kebabs', '🌱 Veggie'],
  },
  {
    id: 2,
    name: 'Pizza Mamma',
    description: 'Pizzas traditionnelles au feu de bois.',
    price: 12,
    image: require('../../assets/img/pizza.webp'),
    rating: 4.7,
    distance: '850 m',
    tags: ['🍕 Pizza', '🇮🇹 Italien'],
  },
  {
    id: 3,
    name: 'Tokyo Bento',
    description: 'Cuisine japonaise rapide et fraîche.',
    price: 9,
    image: require('../../assets/img/bento.png'),
    rating: 4.3,
    distance: '1.5 km',
    tags: ['🇯🇵 Japonais', '🍱 Bento', '👌 Healthy'],
  },
  {
    id: 4,
    name: 'Green Bowl',
    description: 'Bols végétariens et vegan gourmands.',
    price: 11,
    image: require('../../assets/img/greenbowl.jpg'),
    rating: 4.6,
    distance: '900 m',
    tags: ['🌱 Vegan', '👌 Healthy'],
  },
  {
    id: 5,
    name: 'Le Tacos du Coin',
    description: 'Tacos épicés et croustillants.',
    price: 8,
    image: require('../../assets/img/tacos.webp'),
    rating: 4.2,
    distance: '1.1 km',
    tags: ['🌮 Tacos', '🍟 Street Food'],
  },
  {
    id: 6,
    name: 'Maison Thaï',
    description: 'Spécialités thaïlandaises savoureuses.',
    price: 13,
    image: require('../../assets/img/thai.jpg'),
    rating: 4.8,
    distance: '1.3 km',
    tags: ['🇹🇭 Thaï', '🌶️ Épicé'],
  },
  {
    id: 7,
    name: 'Burger Factory',
    description: 'Burgers artisanaux et frites maison.',
    price: 10,
    image: require('../../assets/img/burger.webp'),
    rating: 4.4,
    distance: '1.0 km',
    tags: ['🍔 Burger', '👨‍🍳 Fait maison'],
  },
  {
    id: 8,
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
          renderItem={({ item }) => {
            const details = getRestaurantDetails(item.id);
            return (
              <RestaurantCard
                restaurant={item}
                address={details.address}
                hours={details.hours}
                seats={details.seats}
              />
            );
          }}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </View>
    </View>
  );
}

function getRestaurantDetails(id) {
  switch (id) {
    case 1:
      return {
        address: "12 rue de Berlin, Nantes",
        hours: "11h30 - 22h",
        seats: 8,
      };
    case 2:
      return {
        address: "5 avenue d'Italie, Nantes",
        hours: "12h - 23h",
        seats: 3,
      };
    case 3:
      return {
        address: "18 rue du Soleil Levant, Nantes",
        hours: "11h - 21h",
        seats: 12,
      };
    case 4:
      return {
        address: "2 place du Marché, Nantes",
        hours: "10h - 20h",
        seats: 5,
      };
    case 5:
      return {
        address: "7 rue des Tacos, Nantes",
        hours: "11h - 23h",
        seats: 2,
      };
    case 6:
      return {
        address: "3 rue de Bangkok, Nantes",
        hours: "12h - 22h",
        seats: 6,
      };
    case 7:
      return {
        address: "9 avenue du Burger, Nantes",
        hours: "11h30 - 22h30",
        seats: 10,
      };
    case 8:
      return {
        address: "15 rue du Maghreb, Nantes",
        hours: "12h - 23h",
        seats: 4,
      };
    default:
      return {
        address: "Adresse inconnue",
        hours: "Horaires inconnus",
        seats: 0,
      };
  }
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
