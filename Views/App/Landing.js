import { Text,TouchableOpacity,View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React,{useEffect, useState} from 'react';
import {styles} from '../../Styles'
import {rootAddress} from '../../constants'
import { ScrollView } from 'react-native-gesture-handler';

export default function Landing(){


  const navigation = useNavigation();
//   useEffect(
//    async function()
//             {
//     try{
//       const response = await fetch(`http://${rootAddress}:3000/getcamps`,{
//       method: "POST",
//       headers: {
//         'content-type': 'application/json',
//       },
//       body: JSON.stringify({
//         "all": option_all,
//         "highlyRated": option_rated,
//         "sortOrder":sortOrder,
//         "camptype":camptype
//       }),
//     })   
//     if (response.ok) {
//       //  successful
//       const data = await response.json();
//       console.log('fetch successful:', data);
//     } else {
//       //  failed
//       const errorData = await response.json();
//       console.error('fetch failed:', response.status, errorData.error);
//     }
//   }
//   catch (error) {
//   console.error('Error during fetch:', error);
//   }
// }
//   )

  return( 
    <View style={styles.boxLoginPage}>

          <TouchableOpacity
            style={styles.navigateButton}
            onPress={() => navigation.navigate('Filterpage')}
          >
            <Text style={styles.navigateButtonText}>Filters</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navigateButton}
            onPress={() => navigation.navigate('CampgroundMap')}
          >
            <Text style={styles.navigateButtonText}>Map</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.navigateButton}
          >
            <Text style={styles.navigateButtonText}>My reviews</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navigateButton}
          >
            <Text style={styles.navigateButtonText}>My Spots</Text>
          </TouchableOpacity>
    </View>
    )
}