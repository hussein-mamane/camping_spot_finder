import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './Views/Users/Authviews/AuthNavigation';

export default function App(){
  const Stack = createStackNavigator();
  
  //   <NavigationContainer>
  //   <Stack.Navigator screenOptions={{ headerShown: false }}>
  //     <Stack.Screen name="AuthStack" component={AuthStack}/>
  //   </Stack.Navigator>
  //   </NavigationContainer>
  return (
    //code ici

  );
}