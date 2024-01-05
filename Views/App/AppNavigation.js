import { createStackNavigator } from '@react-navigation/stack';
import Landing from './Landing';
const appStack = createStackNavigator();

function AppStack() {
  return (
    <appStack.Navigator screenOptions={{ headerShown: false }}>
      <appStack.Screen name="Landing" component={Landing} />
    </appStack.Navigator>
  );
}

export default AppStack