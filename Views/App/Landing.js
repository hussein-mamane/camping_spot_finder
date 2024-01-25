import { Text,TouchableOpacity,View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React,{useState} from 'react';
import {styles} from '../../Styles'
import {rootAddress} from '../../constants'
import { ScrollView } from 'react-native-gesture-handler';

export default function Landing(){


  const navigation = useNavigation();

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