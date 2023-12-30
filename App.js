import {  SafeAreaView, View,Text } from 'react-native';
import React from 'react';
import {styles} from './Styles';


import { ComponentBoxCamping} from'./Components/ComponentBoxCamping'
import { ComponentBoxMap} from'./Components/ComponentBoxMap'
import { ComponentInputForForms} from'./Components/ComponentInputForForms'
import { ComponentButton} from'./Components/ComponentButton'
import { ComponentImage} from'./Components/ComponentImage'
import { ComponentBoxLoginPage} from'./Components/ComponentBoxLoginPage'
import { ComponentTextInSignupLogin} from'./Components/ComponentTextInSignupLogin'


export default function App(){
  return(
  // <SafeAreaView style={styles.container}>
  //     <ComponentBoxMap backgroundColor="white">
  //     <ComponentImage source={require('./assets/img_main.jpg')}></ComponentImage>
  //     <ComponentInputForForms/> 
  //     </ComponentBoxMap>
  //     <ComponentButton title="Hello"></ComponentButton>
  //     <ComponentBoxCamping backgroundColor="red" number="1"/>
  // </SafeAreaView>

  <ComponentBoxLoginPage>
    <ComponentTextInSignupLogin>First Name</ComponentTextInSignupLogin>
    <ComponentInputForForms/>
    <ComponentTextInSignupLogin>Last Name</ComponentTextInSignupLogin>
    <ComponentInputForForms/>
    <ComponentTextInSignupLogin>Username</ComponentTextInSignupLogin>
    <ComponentInputForForms/>
    <ComponentTextInSignupLogin>Password</ComponentTextInSignupLogin>
    <ComponentInputForForms/>
    <ComponentImage source={require('./assets/img_main.jpg')}></ComponentImage>
    <ComponentButton title="Connect"></ComponentButton>
  </ComponentBoxLoginPage>

  )
}