import {  SafeAreaView, View } from 'react-native';
import React from 'react';
import {styles} from './Styles';


import { ComponentBoxCamping} from'./Components/ComponentBoxCamping'
import { ComponentBoxMap} from'./Components/ComponentBoxMap'
import { ComponentInputForForms} from'./Components/ComponentInputForForms'
export default function App(){
  return(
  <SafeAreaView style={styles.container}>
      <ComponentBoxMap backgroundColor="white">
        <ComponentInputForForms/>
      </ComponentBoxMap>
      <ComponentBoxCamping backgroundColor="red" number="1"/>
  </SafeAreaView>
 
  )
}