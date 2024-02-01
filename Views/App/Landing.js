import { Text,TouchableOpacity,View ,StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React,{useEffect, useState} from 'react';
import {styles} from '../../Styles'
import {rootAddress} from '../../constants'
import { ScrollView } from 'react-native-gesture-handler';
import SeeCamping from './seeCamping';
import AddReviewPage from './addReview';
import * as Location from 'expo-location';
import SeeCampingList from './SeeCampingList'
import ListReviewsPage from './ListReviews';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Landing(){


  const navigation = useNavigation();
  var savedCampgrounds
  var savedReviews
  useEffect(()=>{

    const fetchDatas = async ()=>{
      const username = await AsyncStorage.getItem("username")
      console.log("username from async storage", username)
      try{
        const response = await fetch(`http://${rootAddress}:3000/getsavedcamps`,{
        method: "POST",
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          "username":username 
        })
      })   
      if (response.ok) {
        //  successful
        const data = await response.json();
        console.log('fetch successful:', data);
        savedCampgrounds = data
      } else {
        //  failed
        const errorData = await response.json();
        console.error('fetch failed:', response.status, errorData.error);
      }
    }
    catch (error) {
    console.error('Error during fetch:', error);
    }

     try{
      const response = await fetch(`http://${rootAddress}:3000/getsavedreviews`,{
      method: "POST",
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        "username":username 
      })
    })   
    if (response.ok) {
      //  successful
      const data = await response.json();
      console.log('fetch successful:', data);
      savedReviews = data
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

         
          

          {/* <TouchableOpacity
            style={styles.navigateButton}
            onPress={() => navigation.navigate('CampgroundMap',{"campgrounds":campgrounds})}
          >
            <Text style={styles.navigateButtonText}>Map</Text>
          </TouchableOpacity> */}
          
          <TouchableOpacity
            style={styles.navigateButton}
          >
            <Text style={styles.navigateButtonText}
            onPress={() => navigation.navigate('SeeCampingList',{"campgrounds":savedCampgrounds})}
            >My Saved spots</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navigateButton}
          >
            
            <Text style={styles.navigateButtonText}
            onPress={() => navigation.navigate('ListReviewsPage',{"reviews":savedReviews})}
           >My Saved Reviews</Text>
          </TouchableOpacity>
    </View>
    )
}