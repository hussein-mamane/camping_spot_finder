import AsyncStorage from "@react-native-async-storage/async-storage";
import { rootAddress } from "../../constants";
import {useNavigation} from '@react-navigation/native'
import React from 'react';
import { View, Text, Image, TouchableOpacity,StyleSheet,ScrollView } from 'react-native';
// AIzaSyDbLex0PYjrAtRSWodg7atWKDZSeUDJdVg
const SeeCampingList = ({ route }) => {
  const apiKey = '';

  const saveCampground = async function (campgroundId) {
    try {
      // Retrieve the username from AsyncStorage
      const username = await AsyncStorage.getItem("username");
  
      const response = await fetch(`http://${rootAddress}:3000/savecamp`, {
        method: "POST",
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          "campgroundId": campgroundId,
          "username": username,
        }),
      });
  
      if (response.ok) {
        // Save successful
        const data = await response.json();
        console.log('Save successful:', data.message);
  
        // Store the username in AsyncStorage
        await AsyncStorage.setItem('username', username);
      } else {
        // Save failed
        const errorData = await response.json();
        console.error('Save failed:', response.status, errorData.error);
      }
    } catch (error) {
      console.error('Error during save:', error);
    }
  };
  
  const navigation = useNavigation();
  const { campgrounds } = route.params;
  const renderCampgrounds = () => {
  return campgrounds.map((campground, index) => {
      const imageUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${campground.photo_reference}&key=${apiKey}`;

      return (
        <ScrollView>
          {campgrounds.map((campground) => (
            <View key={campground.place_id} style={styles.card}>
              <Image style={styles.cover} resizeMode="contain" source={{ uri: imageUrl }} />
              <View style={styles.content}>
                <Text style={styles.title}>{campground.name}</Text>
                <Text>Price Level: {campground.price_level || 'Not specified'}</Text>
                <Text>Distance From You: {Math.round(campground.distanceFromYou)} meters</Text>
                <Text>Rating: {campground.rating || 'Not available'} stars</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.button} onPress={saveCampground(campground)}>
                    <Text style={styles.buttonText}>See Reviews</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      );
      
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {renderCampgrounds()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
  },
  cover: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#FF7657',
    padding: 10,
    borderRadius: 5,
    width: '48%', 
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SeeCampingList;
