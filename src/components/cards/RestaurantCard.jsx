import React, { useState } from 'react';
import { Image, Modal, Pressable, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './RestaurantCardStyle';
import Icon from '@expo/vector-icons/MaterialIcons';

const RestaurantCard = ({ restaurant, address, hours, seats }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('InfoRestaurant', { restaurant });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image
        source={typeof restaurant.image === 'string' ? { uri: restaurant.image } : restaurant.image}
        style={styles.image}
      />
      <View style={styles.content}>
        <View style={styles.rowSpace}>
          <Text style={styles.title}>{restaurant.name}</Text>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>Infos {restaurant.name}</Text>
                <Text style={styles.modalText}>📍 Adresse : {address}</Text>
                <Text style={styles.modalText}>🕖 Horaires : {hours}</Text>
                <Text style={styles.modalText}>🪑 Places restantes : {seats}</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Icon name="close" size={20} />
                </Pressable>
              </View>
            </View>
          </Modal>
          <Pressable
            style={[styles.button, styles.buttonInfo]}
            onPress={() => setModalVisible(true)}>
            <Icon name="info" size={20} />
          </Pressable>
        </View>
        <Text style={styles.subtitle}>⭐ {restaurant.rating} • {restaurant.distance}</Text>
        <Text style={styles.description}>{restaurant.description}</Text>
        <Text style={styles.price}>{restaurant.price} €</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.tagsContainer}>
          <View style={styles.tags}>
            {restaurant.tags?.map((tag, i) => (
              <View key={i} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
