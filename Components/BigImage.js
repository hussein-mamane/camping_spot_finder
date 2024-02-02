import React from 'react';
import { View, Image } from 'react-native';
import {styles} from '../Styles'

const BigImage = ({ source }) => {
  return (
    <View style={styles.imageContainerBig}>
      <Image source={source} style={styles.image} resizeMode="contain" />
    </View>
  );
};
export {BigImage}