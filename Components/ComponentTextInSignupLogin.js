import React from 'react';
import { Text} from 'react-native';
import {styles} from '../Styles'




const ComponentTextInSignupLogin = ({children}) => {
        
    return (
      <Text style={[styles.textForSignupLogin]}>
        {children}
      </Text>
    );
  };

export { ComponentTextInSignupLogin };
