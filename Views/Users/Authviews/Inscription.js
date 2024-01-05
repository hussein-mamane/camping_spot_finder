import { Text,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React,{useState} from 'react';
import {styles} from '../../../Styles'
import axios from 'axios'; 
import {rootAddress} from '../../../constants'

import { ComponentInputForForms} from'../../../Components/ComponentInputForForms'
import { ComponentButton} from'../../../Components/ComponentButton'
import { ComponentImage} from'../../../Components/ComponentImage'
import { ComponentBoxLoginPage} from'../../../Components/ComponentBoxLoginPage'
import { ComponentTextInSignupLogin} from'../../../Components/ComponentTextInSignupLogin'


export default function Inscription(){

  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleFullNameChange = (text) => setFullName(text);
  const handleEmailChange = (text) => setEmail(text);
  const handleUsernameChange = (text) => setUsername(text);
  const handlePasswordChange = (text) => setPassword(text);

  const handleConnectButtonClick = async () => {
    console.log('First Name:', fullName);
    console.log('Last Name:', email);
    console.log('Username:', username);
    console.log('Password:', password);
  
    if (username !== "" && email !== "" && fullName !== "" && password !== "") {
      try {
        const response = await fetch(`http://${rootAddress}:3000/signup`, {
          method: "POST",
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            "email": email,
            "password": password,
            "fullName": fullName,
            "username": username,
          }),
        });
  
        if (response.ok) {
          // Registration successful
          const data = await response.json();
          console.log('Registration successful:', data.message);
        } else {
          // Registration failed
          const errorData = await response.json();
          console.error('Registration failed:', response.status, errorData.error);
        }
      } catch (error) {
        console.error('Error during registration:', error);
      }
    }
  };
  
    

  
  return(
  <ComponentBoxLoginPage>
      <Text style={styles.textForWelcome}>
        Welcome Adventurer !
      </Text>

      <ComponentTextInSignupLogin>Full Name</ComponentTextInSignupLogin>
      <ComponentInputForForms label="Full Name" onChangeTextCallback={handleFullNameChange} />  
    
      <ComponentTextInSignupLogin >Email</ComponentTextInSignupLogin>
      <ComponentInputForForms label="Email" onChangeTextCallback={handleEmailChange} />  
   
      <ComponentTextInSignupLogin>Username</ComponentTextInSignupLogin>
      <ComponentInputForForms label="Username" onChangeTextCallback={handleUsernameChange} /> 
      
      <ComponentTextInSignupLogin>Password</ComponentTextInSignupLogin>
      <ComponentInputForForms label="Password" onChangeTextCallback={handlePasswordChange} /> 
        
    <ComponentImage source={require('../../../assets/img_main.jpg')}></ComponentImage>
    
    <ComponentButton title="Join" onPress={handleConnectButtonClick}></ComponentButton>

    {/* "Already have an account" link */}
    <TouchableOpacity onPress={() => navigation.navigate('Connexion')}>
        <Text style={styles.linkButton}>
          Already have an account
        </Text>
    </TouchableOpacity>
    {/* end link */}

  </ComponentBoxLoginPage>
  )
}