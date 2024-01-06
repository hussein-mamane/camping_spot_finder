import { createStackNavigator } from '@react-navigation/stack';
import Inscription from './Inscription';
import Connexion from './Connexion';
const authStack = createStackNavigator();

function AuthStack() {
  return (
    <authStack.Navigator screenOptions={{ headerShown: false }}>
      <authStack.Screen name="Inscription" component={Inscription} />
      <authStack.Screen name="Connexion" component={Connexion} /> 
    </authStack.Navigator>
  );
}

export default AuthStack