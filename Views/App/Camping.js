import { styles} from '../../Styles';
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const CampgroundMap = ({ route, navigation }) => {
  const { campgrounds } = route.params;
  const [selectedCampground, setSelectedCampground] = useState(null);

  const handleMarkerPress = (campground) => {
    // Handle marker press, set current campground to clicked one
    setSelectedCampground(campground);
  };

  const navigateToSeeCamping = () => {
    if (selectedCampground) {
      navigation.navigate('SeeCamping', { campground: selectedCampground });
    }
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
            key={campground.place_id}
            coordinate={{ latitude: campground.location.lat, longitude: campground.location.lng }}
            title={campground.name}
            description={Math.round(campground.distanceFromYou).toString()+" meters"}
            onPress={() => handleMarkerPress(campground)}
          />
        ))}
      </MapView>

      <TouchableOpacity style={styles.mapButton} onPress={navigateToSeeCamping}>
        <Text>Details</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.mapButton2}
        onPress={() => {
          // Navigate to filter page
          navigation.navigate('Filterpage')
        }}
      >
        <Text>Filtres</Text>
      </TouchableOpacity>
    </>
  );
};


export default CampgroundMap;
