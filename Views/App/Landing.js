import { Text,TouchableOpacity,View ,StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React,{useEffect, useState} from 'react';
import {styles} from '../../Styles'
import {rootAddress} from '../../constants'
import { ScrollView } from 'react-native-gesture-handler';
import SeeCamping from './seeCamping';
import AddReviewPage from './addReview';
import * as Location from 'expo-location';

export default function Landing(){


  const navigation = useNavigation();
  let campgrounds
  useEffect(()=>{

    const fetchDatas = async ()=>{

  //     let userLat
  //     let userLng

  //   // Request location permission
  //   const { status } = await Location.requestForegroundPermissionsAsync();
  //   if (status === 'granted') {
  //   const location = await Location.getCurrentPositionAsync({});
  //   userLat = location.coords.latitude;
  //   userLng  = location.coords.longitude;
  // }

      try{
        const response = await fetch(`http://${rootAddress}:3000/getcamps`,{
        method: "POST",
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          "all": true,
          "highlyRated": false,
          "sortOrder":'1',
          "camptype":'2'
          // "userLat": userLat,
          // "userLng": userLng,
        }),
      })   
      if (response.ok) {
        //  successful
        const data = await response.json();
        console.log('fetch successful:', data);
        campgrounds = data
      } else {
        //  failed
        const errorData = await response.json();
        console.error('fetch failed:', response.status, errorData.error);
      }
    }
    catch (error) {
    console.error('Error during fetch:', error);
    }
  }
    fetchDatas()

  },[])
    
  
   


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
            onPress={() => navigation.navigate('AddReviewPage')}
          >
            <Text style={styles.navigateButtonText}>Add Review</Text>
          </TouchableOpacity>
          

          {/* <TouchableOpacity
            style={styles.navigateButton}
            onPress={() => navigation.navigate('CampgroundMap',{"campgrounds":campgrounds})}
          >
            <Text style={styles.navigateButtonText}>Map</Text>
          </TouchableOpacity> */}
          
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