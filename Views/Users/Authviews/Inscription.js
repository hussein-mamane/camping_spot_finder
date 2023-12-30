import { Text } from 'react-native';
import React,{useState} from 'react';
import {styles} from '../../../Styles'

import { ComponentInputForForms} from'../../../Components/ComponentInputForForms'
import { ComponentButton} from'../../../Components/ComponentButton'
import { ComponentImage} from'../../../Components/ComponentImage'
import { ComponentBoxLoginPage} from'../../../Components/ComponentBoxLoginPage'
import { ComponentTextInSignupLogin} from'../../../Components/ComponentTextInSignupLogin'


export default function Inscription(){

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleFirstNameChange = (text) => setFirstName(text);
  const handleLastNameChange = (text) => setLastName(text);
  const handleUsernameChange = (text) => setUsername(text);
  const handlePasswordChange = (text) => setPassword(text);

  const handleConnectButtonClick = () => {
    
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Username:', username);
    console.log('Password:', password);
  };
  return(
  <ComponentBoxLoginPage>
      <Text style={styles.textForWelcome}>
        Welcome Adventurer !
      </Text>

      <ComponentTextInSignupLogin>First Name</ComponentTextInSignupLogin>
      <ComponentInputForForms label="First Name" onChangeTextCallback={handleFirstNameChange} />  
    
      <ComponentTextInSignupLogin >Last Name</ComponentTextInSignupLogin>
      <ComponentInputForForms label="Last Name" onChangeTextCallback={handleLastNameChange} />  
   
      <ComponentTextInSignupLogin>Username</ComponentTextInSignupLogin>
      <ComponentInputForForms label="Username" onChangeTextCallback={handleUsernameChange} /> 
      
      <ComponentTextInSignupLogin>Password</ComponentTextInSignupLogin>
      <ComponentInputForForms label="Password" onChangeTextCallback={handlePasswordChange} /> 
        
    <ComponentImage source={require('../../../assets/img_main.jpg')}></ComponentImage>
    
    <ComponentButton title="Join" onPress={handleConnectButtonClick}></ComponentButton>

  </ComponentBoxLoginPage>
  )
}