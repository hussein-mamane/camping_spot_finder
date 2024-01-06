import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from '../Styles';
const ComponentButton = ({ onPress, title }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export { ComponentButton };
