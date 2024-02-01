import { rootAddress } from "../../constants";
import {useNavigation} from '@react-navigation/native'
import ListReviewsPage from "./ListReviews";

// AIzaSyDbLex0PYjrAtRSWodg7atWKDZSeUDJdVg
// export default function SeeCamping(){
//     const campground = {
//         "name": "Euro Camping Emirates Tourist Center Azrou Ifrane",
// 		"price_level": null,
// 		"photo_reference": "AWU5eFjZr70GParNPCM52_vxZ2HAR8k9vN_AGsAUHVJvzct7L0pwXCoBMEz99P0GnpBw5_MF9S4RactUcdBbxU7tluG9xWNDyLYueD3cWrYdGUJEU1YbGarnkdyhSYS8RMBJSgISQYLC1Vb-SaI1WB_yILnJHLrwCTqegprrRhHTGFU2QJam",
// 		"distanceFromYou": 174023.74302861688
//      }

//     const apiKey = '';
//     const imageUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${campground.photo_reference}&key=${apiKey}`;


//     return (
//         <View style={styles.container}>
//           <View style={styles.card}>

             
//             {/* <Image style={styles.cover}  resizeMode="contain" source={{ uri: `data:image/png;base64,${campground.photo_reference}`}} />  */}
//             <Image style={styles.cover}  resizeMode="contain" source={{ uri: imageUrl }} />  
            
            
//             <View style={styles.content}>
//               <Text style={styles.title}>{campground.name}</Text>
//               <Text>Price Level: {campground.price_level || 'Not specified'}</Text>
//               <Text>Distance From You: {Math.round(campground.distanceFromYou)} meters</Text>
//               <Text>Rating : {campground.rating} stars</Text>
//             </View>
//           </View>
//         </View>
//       );
//     };
    
    // const styles = StyleSheet.create({
    //   container: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     padding: 16,
    //   },
    //   card: {
    //     width: '100%',
    //     borderWidth: 1,
    //     borderColor: '#ccc',
    //     borderRadius: 8,
    //     overflow: 'hidden',
    //   },
    //   cover: {
    //     width: '100%',
    //     height: 200,
    //   },
    //   content: {
    //     padding: 16,
    //   },
    //   title: {
    //     fontSize: 20,
    //     fontWeight: 'bold',
    //     marginBottom: 8,
    //   },
    // });

    import React, { useEffect } from 'react';
import { View, Text, Image,  Alert,TouchableOpacity,StyleSheet } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";







const SeeCamping = ({ route }) => {
  const { campground } = route.params;
  const apiKey = 'AIzaSyDbLex0PYjrAtRSWodg7atWKDZSeUDJdVg';
  const navigation = useNavigation()
  const imageUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${campground.photo_reference}&key=${apiKey}`;

  const saveCampground = async function (campgroundId) {
    try {
      
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
        // const data = await response.json();
        Alert.alert("Info","Success")
  
      } else {
        // Save failed
        const errorData = await response.json();
        // console.error('Save failed:', response.status, errorData.error);
        Alert.alert('Save failed:', errorData.error);
      }
    } catch (error) {
      Alert.alert("Info",error)
    }
  };

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
        // console.error('Fetch failed:', response.status, errorData.error);
        Alert.alert('Fetch failed:', errorData.error);
      }
    } catch (error) {
      Alert.alert('Error during fetch:', error);
      // console.error('Error during fetch:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image style={styles.cover} resizeMode="contain" source={{ uri: imageUrl }} />
        <View style={styles.content}>
          <Text style={styles.title}>{campground.name}</Text>
          {/* <Text>Price Level: {campground.price_level || 'Not enough Data'}</Text> */}
          <Text>Distance From You: {Math.round(campground.distanceFromYou)} meters</Text>
          <Text>Rating: {campground.rating || 'Not available'} stars</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={seeReviews(campground.place_id)} >
              <Text style={styles.buttonText}>See Reviews</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddReviewPage',{"campgroundId":campground.place_id})} >
              <Text style={styles.buttonText}>Write Review</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={()=>saveCampground(campground.place_id)}>
                    <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.button} onPress={saveCampground(campgroundId)}>
                    <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity> */}

          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    width: '100%',
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
    width: '33%', // Adjust as needed based on your design
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SeeCamping;
