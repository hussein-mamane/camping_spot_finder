// Camping.js
import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
// import { gmapkey } from './constants';
import { Text,View,TouchableOpacity } from 'react-native';
import { styles} from '../../Styles';
import { rootAddress } from '../../constants'

export default function CampgroundMap() {
  const [campgrounds, setCampgrounds] = useState([
    {
        id:1,
        lat:33.7095925,
        lng:-7.3680013,
        name:"cnss camping" ,
        description:"celui de la cnss",
    },
    {
        id:2,
        lat:33.7095907,
        lng:-7.3860259,
        name:"mimosa camping" ,
        description:"camping mimosa",
    }
  ]);

  useEffect(() => {
    // Fetch campground data using Google Maps API
    // Update the campgrounds state with the data
  }, []);

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
        {campgrounds.map((campground) => (
            <Marker
            key={campground.id}
            coordinate={{ latitude: campground.lat, longitude: campground.lng }}
            title={campground.name}
            description={campground.description}
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
