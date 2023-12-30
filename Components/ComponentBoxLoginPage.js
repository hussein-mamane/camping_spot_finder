import React from 'react';
import { View, StyleSheet,KeyboardAvoidingView } from 'react-native';
import {styles} from '../Styles'

const ComponentBoxLoginPage = ({ children }) => {
  return <KeyboardAvoidingView
  style={styles.boxLoginPage}
  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  enabled
  keyboardVerticalOffset={Platform.OS === 'ios' ? 0 :-120 }
>
  {children}
</KeyboardAvoidingView>
};
export{ComponentBoxLoginPage}