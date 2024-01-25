import { createStackNavigator } from '@react-navigation/stack';
import Landing from './Landing';
import Filterpage from './filterpage';
import CampgroundMap from './Camping';
const appStack = createStackNavigator();

function AppStack() {
  return (
    <appStack.Navigator screenOptions={{ headerShown: false }}>
      <appStack.Screen name="Landing" component={Landing} />
      <appStack.Screen name="Filterpage" component={Filterpage} />
      <appStack.Screen name="CampgroundMap" component={CampgroundMap} />
    </appStack.Navigator>
  );
}

export default AppStack