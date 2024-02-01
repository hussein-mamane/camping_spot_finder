import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const ListReviewsPage = ({route}) => {
  const navigation = useNavigation();
  
  const { reviews } = route.params;
  const len = reviews.length

  return (
    <ScrollView style={styles.container}>
      {reviews.map((review, index) => (
        <View key={index} style={styles.reviewContainer}>
          <Text style={styles.title}>{review.title}</Text>
          <Text>Rating: {review.rating}/5</Text>
          <Text>Date: {review.currentDate}</Text>
          <Text>Comment: {review.comment}</Text>
          <Text>Written by: {review.userId}</Text>
          {/* Save Review Button */}
          {/* <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate('AddReviewPage', { campgroundId: review.campgroundId })
              }>
              <Text style={styles.buttonText}>Save Review</Text>
            </TouchableOpacity>
          </View> */}
        </View>
      ))}
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  reviewContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF7657',
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10
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

export default ListReviewsPage;
