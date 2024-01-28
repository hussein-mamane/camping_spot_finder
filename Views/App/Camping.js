// Camping.js
import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
// import { gmapkey } from './constants';
import { Text,View,TouchableOpacity } from 'react-native';
import { styles} from '../../Styles';
import { useNavigation, useRoute } from '@react-navigation/native'
import { rootAddress } from '../../constants'

export default function CampgroundMap({route}) {

  const { campgrounds } = route.params;

  

  

  const handleMarkerPress = (campground) => {
    // Handle marker press, show campground details
    console.log('Clicked marker:', campground);
    // Implement logic to show details (e.g., modal, navigation to details screen)
  };

  return (
    <>
        <MapView
        style={{ flex: 1 }}
        initialRegion={{
            latitude: 33.704312,
            longitude: -7.344324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }}
        >
        {
          campgrounds.map((campground) => (
            <Marker
            key={campground.place_id}
            coordinate={{ latitude: campground.location.lat, longitude: campground.location.lng }}
            title={campground.name}
            description={campground.distanceFromYou}
            onPress={() => handleMarkerPress(campground)}
            />
        ))}
        </MapView>

        
        <TouchableOpacity
        style= {styles.mapButton}
        onPress={() => {
        console.log('TouchableOpacity pressed!');
        }}
    >
        <Text>Details</Text>
    </TouchableOpacity>


    <TouchableOpacity
        style= {styles.mapButton2}
        onPress={() => {
        console.log('TouchableOpacity pressed!');
        }}
    >
        <Text>Filtres</Text>
    </TouchableOpacity>


  </>
  );
};
