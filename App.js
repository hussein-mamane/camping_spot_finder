import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './Views/Users/Authviews/AuthNavigation';
import AppStack from './Views/App/AppNavigation';
import Filterpage from './Views/App/filterpage';
import Landing from './Views/App/Landing';
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { rootAddress } from './constants';

export default function App(){


  useEffect(() => {
    // Fetch data from the /updaterating endpoint when the component mounts
    const updateRatings = async () => {
      try {
        const response = await fetch(`http://${rootAddress}:3000/updaterating`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          //console.log('Updaterating successful:', data.message);
        } else {
          const errorData = await response.json();
         // console.error('Updaterating failed:', response.status, errorData.error);
        }
      } catch (error) {
        //console.error('Error during updaterating:', error);
      }
    };

    updateRatings(); // Call the function to update ratings when the component mounts
  }, []); // Empty dependency array ensures the effect runs only once on mount

  
  const Stack = createStackNavigator();
  
 
  return (
    //code ici
    <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AuthStack" component={AuthStack}/>
          
        </Stack.Navigator>
    </NavigationContainer>
  );
}