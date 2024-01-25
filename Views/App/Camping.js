// Camping.js
import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
// import { gmapkey } from './constants';
import { Text,View,TouchableOpacity } from 'react-native';
import { styles} from '../../Styles';




function haversineDistance(lat1, lon1, lat2, lon2) {
    // Convert latitude and longitude from degrees to radians
    const toRadians = (angle) => (angle * Math.PI) / 180;
    lat1 = toRadians(lat1);
    lon1 = toRadians(lon1);
    lat2 = toRadians(lat2);
    lon2 = toRadians(lon2);

    const dlat = lat2 - lat1;
    const dlon = lon2 - lon1;
    const a =
      Math.sin(dlat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) ** 2;
    const c = 2 * Math.asin(Math.sqrt(a));
  
    // Earth's radius in meters (mean value)
    const radiusOfEarth = 6371000;
    //distance
    const distance = radiusOfEarth * c;
    return distance;
  }
//   const distance = haversineDistance(lat1, lon1, lat2, lon2);
  

  
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
