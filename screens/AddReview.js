import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';
import { Rating , RatingInput} from 'react-native-stock-star-rating';


const AddReviewPage = () => {
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [date, setDate] = useState('');
  const [rating, setRating] = React.useState(0);

  const handleSaveReview = () => {
    // Add your logic to save the review here
    console.log('Review saved:', { title, comment, date });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="add" size={30} color="#FF7657" style={styles.addIcon} />
        <Text style={styles.title}>ADD Review</Text>
      </View>

      <View style={styles.formContainer}>

         <View style={{alignItems: 'center', marginTop: 30, marginBottom:30}}>
            <View style={{marginTop: 30}}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>
               Give Rating: {rating}/5
            </Text>
              <View style={styles.underline}></View>
            </View>
            <RatingInput
              maxStars={5}
              rating={rating}
              setRating={setRating}
              size={39}
            />
          </View>


        <View style={styles.formGroup}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Title"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Comment</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Tell us about your experience!you review helps campers just like you find great camping"
            multiline={true}
            numberOfLines={4}
            value={comment}
            onChangeText={(text) => setComment(text)}
          />
        </View>
         
      <View style={styles.formGroup}>
       <Text style={styles.label}>Month of Visit</Text>
       <View style={styles.datePickerContainer}>
       <DateTimePicker
         style={styles.datePicker} // Apply styles directly to DateTimePicker
         value={date ? new Date(date) : new Date()}
         mode="date"
         display="default"
         onChange={(event, selectedDate) => setDate(selectedDate)}
       />
      </View>
      </View>

        <TouchableOpacity style={styles.button} onPress={handleSaveReview}>
          <Text style={styles.buttonText}>Save Review</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  addIcon: {
    marginRight: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  formContainer: {
    flex: 1,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: "#b9c3c3",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 8,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: "#FF7657",
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    width: 200,
    marginLeft:70
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderColor: "#b9c3c3",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingLeft: 8,
    width: '100%', // This ensures the container takes the full width
  },
  datePicker: {
    height: 40,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor : "white",
    marginLeft:-8
  },
  underline: {
    width: 50,
    height: 3,
    backgroundColor: "#f9e820",
    marginTop: 2
  },
});

export default AddReviewPage;
