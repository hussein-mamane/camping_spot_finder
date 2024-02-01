import AsyncStorage from "@react-native-async-storage/async-storage";
import { rootAddress } from "../../constants";
import {useNavigation} from '@react-navigation/native'
import React from 'react';
import { View, Text, Alert,Image, TouchableOpacity,StyleSheet,ScrollView } from 'react-native';
// AIzaSyDbLex0PYjrAtRSWodg7atWKDZSeUDJdVg
const SeeCampingList = ({ route }) => {
  const apiKey = 'AIzaSyDbLex0PYjrAtRSWodg7atWKDZSeUDJdVg';

    

  const navigation = useNavigation();
  const { campgrounds } = route.params;
  const seeReviews = (placeId) => async () => {
    try {
      const response = await fetch(`http://${rootAddress}:3000/getreviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          campgroundId: placeId,
        }),
      });
  
      if (response.ok) {
        const reviews = await response.json();
        console.log('Reviews:', reviews);
        
        navigation.navigate('ListReviewsPage', {reviews });
  
      } else {
        const errorData = await response.json();
        console.error('Fetch failed:', response.status, errorData.error);
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };

  const deleteSaved = (placeId) => async () => {
    try {
      const response = await fetch(`http://${rootAddress}:3000/deletesavedcamp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          campgroundId: placeId,
        }),
      });
  
      if (response.ok) {
        const reviews = await response.json();
        console.log('Reviews:', reviews);
        
        navigation.navigate('ListReviewsPage', {reviews });
  
      } else {
        const errorData = await response.json();
        console.error('Fetch failed:', response.status, errorData.error);
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };
 
  

  const renderCampgrounds = () => {
    return (
      <ScrollView>
        {campgrounds.map((campground) => {
          const imageUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${campground.photo_reference}&key=${apiKey}`;
  
          return (
            <View key={campground.place_id} style={styles.card}>
              <Image style={styles.cover} resizeMode="contain" source={{ uri: imageUrl }} />
              <View style={styles.content}>
                <Text style={styles.title}>{campground.name}</Text>
                <Text>Price Level: {campground.price_level || 'Not enough Data'}</Text>
                <Text>Rating: {campground.rating || 'Not enough Data to give'} stars</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.button} onPress={seeReviews(campground.place_id)}>
                    <Text style={styles.buttonText}>See Reviews</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={deleteSaved(campground.place_id)}>
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    );
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
