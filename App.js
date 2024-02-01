import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './Views/Users/Authviews/AuthNavigation';
import AppStack from './Views/App/AppNavigation';
import Filterpage from './Views/App/filterpage';
import Landing from './Views/App/Landing';

export default function App(){
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