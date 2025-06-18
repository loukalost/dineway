import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import SpinWheel from '../components/spin-wheel/SpinWheel';
import HomeFilter from '../components/filters/HomeFilter';
import restaurantsData from '../data/restaurant.json';

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

function SurpriseScreen({ navigation }) {
	const [spinCount, setSpinCount] = useState(10);
	const [stateCode, setStateCode] = useState('pause');
	const [resultValue, setResultValue] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedFilters, setSelectedFilters] = useState(Array(filtersData.length).fill('Tous'));
	const filteredRestaurants = filterRestaurants(restaurantsData, selectedFilters);

	const fontInfo = {
		size: 8,
		weight: 500,
		color: '#333',
	};

	const handleResult = (restaurant) => {
		setResultValue(restaurant);
		setModalVisible(true);
	};

	const handleGoToRestaurant = () => {
		setModalVisible(false);
		if (resultValue) {
			// Remplace "RestaurantScreen" par le nom de ta page de détail restaurant
			navigation.navigate('InfoRestaurantScreen', { restaurant: resultValue });
		}
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

			<Modal
				visible={modalVisible}
				transparent
				animationType="slide"
				onRequestClose={() => setModalVisible(false)}
			>
				<View style={modalStyles.overlay}>
					<View style={modalStyles.modal}>
						{resultValue && (
							<>
								<Text style={modalStyles.title}>Super !</Text>
								<Text style={modalStyles.name}>{resultValue.name}</Text>
								<Text style={modalStyles.desc}>{resultValue.description}</Text>
								<Text style={modalStyles.info}>Prix : {resultValue.price} €</Text>
								<Text style={modalStyles.info}>Adresse : {resultValue.details.address}</Text>
								<Text style={modalStyles.info}>Horaires : {resultValue.details.hours}</Text>
								<TouchableOpacity
									style={modalStyles.button}
									onPress={handleGoToRestaurant}
								>
									<Text style={modalStyles.buttonText}>Voir la fiche</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={[modalStyles.button, { backgroundColor: '#ccc', marginTop: 8 }]}
									onPress={() => setModalVisible(false)}
								>
									<Text style={[modalStyles.buttonText, { color: '#333' }]}>Fermer</Text>
								</TouchableOpacity>
							</>
						)}
					</View>
				</View>
			</Modal>
		</View>
	);
}

const modalStyles = StyleSheet.create({
	overlay: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.4)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modal: {
		backgroundColor: '#fff',
		borderRadius: 16,
		padding: 24,
		width: '80%',
		alignItems: 'center',
	},
	title: {
		fontSize: 22,
		fontWeight: 'bold',
		marginBottom: 8,
	},
	name: {
		fontSize: 18,
		fontWeight: '600',
		marginBottom: 4,
	},
	desc: {
		fontSize: 14,
		marginBottom: 8,
		textAlign: 'center',
	},
	info: {
		fontSize: 13,
		marginBottom: 2,
	},
	button: {
		marginTop: 16,
		backgroundColor: '#111',
		paddingVertical: 10,
		paddingHorizontal: 24,
		borderRadius: 8,
	},
	buttonText: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 15,
	},
});

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
	wheelContainer: {
		alignSelf: 'center',
		marginTop: 0,
		width: '100%',
		flex: 1,
		justifyContent: 'center',
	},
	filtersRow: {
		flexDirection: 'row',
		gap: 10,
		marginBottom: 20,
	},
});

export default SurpriseScreen;
