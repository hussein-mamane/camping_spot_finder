import React from 'react';
import { View, Image } from 'react-native';
import {styles} from '../Styles'

const ComponentImage = ({ source }) => {
  return (
    <View style={styles.imageContainer}>
      <Image source={source} style={styles.image} resizeMode="contain" />
    </View>
  );
};
export {ComponentImage}