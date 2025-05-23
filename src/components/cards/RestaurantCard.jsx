import { Image, Modal, Pressable, Text, View } from "react-native"
import styles from './RestaurantCardStyle'
import Icon from '@expo/vector-icons/MaterialIcons'
import { useState } from "react";

const RestaurantCard = ({ restaurant }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.card}>
      <Image source={typeof restaurant.image === 'string' ? { uri: restaurant.image } : restaurant.image} style={styles.image} />
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
                <Text style={styles.modalText}>Hello World!</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Hide Modal</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}>
            <Icon name="info" size={20} />
          </Pressable>
        </View>
        <Text style={styles.subtitle}>⭐ {restaurant.rating}  •  {restaurant.distance}</Text>
        <Text style={styles.description}>{restaurant.description}</Text>
        <Text style={styles.price}>{restaurant.price} €</Text>
        <View style={styles.tags}>
          {restaurant.tags?.map((tag, i) => (
            <View key={i} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}
export default RestaurantCard