import { Text } from 'react-native';
import React,{useState} from 'react';
import {styles} from '../../../Styles'

import { ComponentInputForForms} from'../../../Components/ComponentInputForForms'
import { ComponentButton} from'../../../Components/ComponentButton'
import { ComponentImage} from'../../../Components/ComponentImage'
import { ComponentBoxLoginPage} from'../../../Components/ComponentBoxLoginPage'
import { ComponentTextInSignupLogin} from'../../../Components/ComponentTextInSignupLogin'


export default function Inscription(){

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (text) => setUsername(text);
  const handlePasswordChange = (text) => setPassword(text);

  const handleConnectButtonClick = () => {
    
    console.log('Username:', username);
    console.log('Password:', password);
  };
  return(
  <ComponentBoxLoginPage>
      <Text style={styles.textForWelcome}>
        Hello Adventurer !
      </Text>
      <ComponentTextInSignupLogin>Username</ComponentTextInSignupLogin>
      <ComponentInputForForms label="Username" onChangeTextCallback={handleUsernameChange} /> 
      
      <ComponentTextInSignupLogin>Password</ComponentTextInSignupLogin>
      <ComponentInputForForms label="Password" onChangeTextCallback={handlePasswordChange} /> 
        
    <ComponentImage source={require('../../../assets/img_camp.png')}></ComponentImage>
    
    <ComponentButton title="Join" onPress={handleConnectButtonClick}></ComponentButton>

  </ComponentBoxLoginPage>
  )
}