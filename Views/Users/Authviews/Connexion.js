import { Text,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React,{useState} from 'react';
import {styles} from '../../../Styles'
import Landing from '../../App/Landing';

import { ComponentInputForForms} from'../../../Components/ComponentInputForForms'
import { ComponentButton} from'../../../Components/ComponentButton'
import { ComponentImage} from'../../../Components/ComponentImage'
import { ComponentBoxLoginPage} from'../../../Components/ComponentBoxLoginPage'
import { ComponentTextInSignupLogin} from'../../../Components/ComponentTextInSignupLogin'
import { rootAddress } from '../../../constants'; 

export default function Inscription(){

  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (text) => setUsername(text);
  const handlePasswordChange = (text) => setPassword(text);

  const handleConnectButtonClick = async () => {
  
    console.log('Username:', username);
    console.log('Password:', password);
    if(username!=""&&password!=""){
      try{
        const response = await fetch(`http://${rootAddress}:3000/login`,{
        method: "POST",
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          "password": password,
          "username": username,
        }),
      })
      if (response.ok) {
        // Registration successful
        const data = await response.json();
        console.log('Login successful:', data.message);
        navigation.navigate('AppStack')
      } else {
        // Registration failed
        const errorData = await response.json();
        console.error('Login failed:', response.status, errorData.error);
      }
    }
    catch (error) {
    console.error('Error during Login:', error);
  }
    }
  }
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
    {/* "I have no account" link */}
    <TouchableOpacity onPress={() => navigation.navigate('Inscription')}>
        <Text style={styles.linkButton}>
          I have no account
        </Text>
    </TouchableOpacity>
    {/* end link */}


  </ComponentBoxLoginPage>
  )
}