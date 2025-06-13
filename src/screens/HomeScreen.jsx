import { StyleSheet, View, Dimensions, Text, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import RestaurantCard from '../components/cards/RestaurantCard';
import { useContext, useState } from 'react'
import HomeFilter from '../components/filters/HomeFilter';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { RoleContext } from '../context/RoleContext'
import restaurantsData from '../data/restaurant.json'

const filtersData = [
  {
    label: "Prix",
    options: ["Tous", "Moins de 10€", "10-12€", "Plus de 12€"],
  },
  {
    label: "Nombre de personnes",
    options: ["Tous", "1 personne", "2 personnes", "+3 personnes", "+10 personnes"],
  },
  {
    label: "Type de restaurant",
    options: ["Tous", "Italien", "Japonais", "Vegan", "Street Food", "Oriental"],
  },
  {
    label: "Distance",
    options: ["Tous", "< 1km", "1-1.5km", "> 1.5km"],
  },
];

function filterRestaurants(restaurants, selectedFilters) {
  return restaurants.filter((restaurant) => {
    // Prix
    const prix = selectedFilters[0];
    if (prix === "Moins de 10€" && restaurant.price >= 10) return false;
    if (prix === "10-12€" && (restaurant.price < 10 || restaurant.price > 12)) return false;
    if (prix === "Plus de 12€" && restaurant.price <= 12) return false;

    const seats = selectedFilters[1];
    if (seats === "1 personne" && restaurant.details.seats < 1) return false;
    if (seats === "2 personnes" && restaurant.details.seats < 2) return false;
    if (seats === "+3 personnes" && restaurant.details.seats < 3) return false;
    if (seats === "+10 personnes" && restaurant.details.seats < 10) return false;

    // Type de restaurant
    const type = selectedFilters[2];
    if (
      type !== "Tous" &&
      !restaurant.tags.some((tag) => tag.toLowerCase().includes(type.toLowerCase()))
    ) {
      return false;
    }

    // Distance
    const distance = selectedFilters[3];
    const distValue = parseFloat(restaurant.distance);
    if (distance === "< 1km" && distValue >= 1) return false;
    if (distance === "1-1.5km" && (distValue < 1 || distValue > 1.5)) return false;
    if (distance === "> 1.5km" && distValue <= 1.5) return false;

    return true;
  });
}

function HomeScreen() {
  const [selectedFilters, setSelectedFilters] = useState(Array(filtersData.length).fill('Tous'));
  const filteredRestaurants = filterRestaurants(restaurantsData, selectedFilters);

  const { clearRole } = useContext(RoleContext)
  const handleLogout = async () => {
    await clearRole()
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Bienvenue !</Text>
          <TouchableOpacity onPress={handleLogout} >
            <MaterialIcons name="logout" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={[styles.filtersRow, { overflow: 'visible', zIndex: 100 }]}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ overflow: 'visible' }}
            style={{ overflow: 'visible' }}
          >
            {filtersData.map((filter, i) => (
              <HomeFilter
                key={i}
                filter={filter}
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
                i={i}
                label={filter.label}
              />
            ))}
          </ScrollView>
        </View>
        <FlatList
          data={filteredRestaurants}
          renderItem={({ item }) => (
            <RestaurantCard
              restaurant={item}
              address={item.details.address}
              hours={item.details.hours}
              seats={item.details.seats}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={
            <Text style={styles.noRestaurant}>Aucun restaurant trouvé</Text>
          }
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
    paddingTop: 60,
  },
  container: {
    width: '90%',
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  noRestaurant: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
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
  }
});

export default HomeScreen;
