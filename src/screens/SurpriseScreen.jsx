import { useState } from 'react';
import { View, Text, ScrollView, Alert, StyleSheet } from 'react-native';
import SpinWheel from '../components/spin-wheel/SpinWheel';
import HomeFilter from '../components/filters/HomeFilter';

const restaurantsData = [
	{
		id: 1,
		name: 'Le Berliner',
		description: 'Délicieux kebabs berlinois faits maison.',
		price: 10,
		// image: require("../../assets/img/kebab.png"),
		rating: 4.5,
		distance: '1.2 km',
		tags: ['🥙 Kebabs', '🌱 Veggie'],
		details: {
			address: '12 rue de Berlin, Nantes',
			hours: '11h30 - 22h',
			seats: 8,
		},
	},
	{
		id: 2,
		name: 'Pizza Mamma',
		description: 'Pizzas traditionnelles au feu de bois.',
		price: 12,
		// image: require("../../assets/img/pizza.webp"),
		rating: 4.7,
		distance: '850 m',
		tags: ['🍕 Pizza', '🇮🇹 Italien'],
		details: {
			address: "5 avenue d'Italie, Nantes",
			hours: '12h - 23h',
			seats: 3,
		},
	},
	{
		id: 3,
		name: 'Tokyo Bento',
		description: 'Cuisine japonaise rapide et fraîche.',
		price: 9,
		// image: require("../../assets/img/bento.png"),
		rating: 4.3,
		distance: '1.5 km',
		tags: ['🇯🇵 Japonais', '🍱 Bento', '👌 Healthy'],
		details: {
			address: '18 rue du Soleil Levant, Nantes',
			hours: '11h - 21h',
			seats: 12,
		},
	},
	{
		id: 4,
		name: 'Green Bowl',
		description: 'Bols végétariens et vegan gourmands.',
		price: 11,
		// image: require("../../assets/img/greenbowl.jpg"),
		rating: 4.6,
		distance: '900 m',
		tags: ['🌱 Vegan', '👌 Healthy'],
		details: {
			address: '2 place du Marché, Nantes',
			hours: '10h - 20h',
			seats: 5,
		},
	},
	{
		id: 5,
		name: 'Le Tacos du Coin',
		description: 'Tacos épicés et croustillants.',
		price: 8,
		// image: require("../../assets/img/tacos.webp"),
		rating: 4.2,
		distance: '1.1 km',
		tags: ['🌮 Tacos', '🍟 Street Food'],
		details: {
			address: '7 rue des Tacos, Nantes',
			hours: '11h - 23h',
			seats: 2,
		},
	},
	{
		id: 6,
		name: 'Maison Thaï',
		description: 'Spécialités thaïlandaises savoureuses.',
		price: 13,
		// image: require("../../assets/img/thai.jpg"),
		rating: 4.8,
		distance: '1.3 km',
		tags: ['🇹🇭 Thaï', '🌶️ Épicé'],
		details: {
			address: '3 rue de Bangkok, Nantes',
			hours: '12h - 22h',
			seats: 6,
		},
	},
	{
		id: 7,
		name: 'Burger Factory',
		description: 'Burgers artisanaux et frites maison.',
		price: 10,
		// image: require("../../assets/img/burger.webp"),
		rating: 4.4,
		distance: '1.0 km',
		tags: ['🍔 Burger', '👨‍🍳 Fait maison'],
		details: {
			address: '9 avenue du Burger, Nantes',
			hours: '11h30 - 22h30',
			seats: 10,
		},
	},
	{
		id: 8,
		name: 'Couscous Royal',
		description: 'Cuisine maghrébine traditionnelle.',
		price: 11,
		// image: require("../../assets/img/couscous.jpeg"),
		rating: 4.6,
		distance: '1.6 km',
		tags: ['🇲🇦 Couscous', '🧆 Oriental'],
		details: {
			address: '15 rue du Maghreb, Nantes',
			hours: '12h - 23h',
			seats: 4,
		},
	},
];

const filtersData = [
	{
		label: 'Prix',
		options: ['Tous', 'Moins de 10€', '10-12€', 'Plus de 12€'],
	},
	{
		label: 'Nombre de personnes',
		options: ['Tous', '1 personne', '2 personnes', '+3 personnes', '+10 personnes'],
	},
	{
		label: 'Type de restaurant',
		options: ['Tous', 'Italien', 'Japonais', 'Vegan', 'Street Food', 'Oriental'],
	},
	{
		label: 'Distance',
		options: ['Tous', '< 1km', '1-1.5km', '> 1.5km'],
	},
];

function filterRestaurants(restaurants, selectedFilters) {
	return restaurants.filter((restaurant) => {
		const prix = selectedFilters[0];
		if (prix === 'Moins de 10€' && restaurant.price >= 10) return false;
		if (prix === '10-12€' && (restaurant.price < 10 || restaurant.price > 12)) return false;
		if (prix === 'Plus de 12€' && restaurant.price <= 12) return false;

		const seats = selectedFilters[1];
		if (seats === '1 personne' && restaurant.details.seats < 1) return false;
		if (seats === '2 personnes' && restaurant.details.seats < 2) return false;
		if (seats === '+3 personnes' && restaurant.details.seats < 3) return false;
		if (seats === '+10 personnes' && restaurant.details.seats < 10) return false;

		const type = selectedFilters[2];
		if (
			type !== 'Tous' &&
			!restaurant.tags.some((tag) => tag.toLowerCase().includes(type.toLowerCase()))
		) {
			return false;
		}

		const distance = selectedFilters[3];
		const distValue = parseFloat(restaurant.distance);
		if (distance === '< 1km' && distValue >= 1) return false;
		if (distance === '1-1.5km' && (distValue < 1 || distValue > 1.5)) return false;
		if (distance === '> 1.5km' && distValue <= 1.5) return false;

		return true;
	});
}

function SurpriseScreen() {
	const [spinCount, setSpinCount] = useState(10);
	const [stateCode, setStateCode] = useState('pause');
	const [resultValue, setResultValue] = useState(0);
	const [selectedFilters, setSelectedFilters] = useState(Array(filtersData.length).fill('Tous'));
	const filteredRestaurants = filterRestaurants(restaurantsData, selectedFilters);

	const fontInfo = {
		size: 8,
		weight: 500,
		color: '#333',
	};

	const handleResult = (restaurant) => {
		setResultValue(restaurant);
		Alert.alert('Super !', `Vous êtes tombé sur le ${restaurant.name}`);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Roulette</Text>
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
			<View style={styles.wheelContainer}>
				<SpinWheel
					data={filteredRestaurants}
					textInfo={fontInfo}
					state={stateCode}
					spinCount={spinCount}
					onResult={handleResult}
					onUpdate={(code) => setStateCode(code)}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		padding: 16,
		paddingTop: 60,
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#111',
		marginBottom: 16,
		textAlign: 'left',
		width: '100%',
	},
	wheelContainer: { alignSelf: 'center', marginTop: 0, width: '100%' },
	filtersRow: {
		flexDirection: 'row',
		gap: 10,
		marginBottom: 20,
	},
});

export default SurpriseScreen;
