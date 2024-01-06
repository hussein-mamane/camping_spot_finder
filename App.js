import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Filterpage from './screens/filterpage';


const Stack = createStackNavigator();

/*<NavigationContainer>
<Stack.Navigator screenOptions={{ headerShown: false }}>
<Stack.Screen name="AuthStack" component={AuthStack}/>
  
</Stack.Navigator>
</NavigationContainer>*/

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Filterpage" component={Filterpage} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
