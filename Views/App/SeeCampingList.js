import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const SeeCampingList = ({ campgrounds }) => {
  const apiKey = 'AIzaSyDbLex0PYjrAtRSWodg7atWKDZSeUDJdVg';

  const renderCampgrounds = () => {
    return campgrounds.map((campground, index) => {
      const imageUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${campground.photo_reference}&key=${apiKey}`;

      return (
        <View key={index} style={styles.card}>
          <Image style={styles.cover} resizeMode="contain" source={{ uri: imageUrl }} />
          <View style={styles.content}>
            <Text style={styles.title}>{campground.name}</Text>
            <Text>Price Level: {campground.price_level || 'Not specified'}</Text>
            <Text>Distance From You: {Math.round(campground.distanceFromYou)} meters</Text>
            <Text>Rating : {campground.rating} stars</Text>
          </View>
        </View>
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
});

export default SeeCampingList;
