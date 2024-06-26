import { createStackNavigator } from '@react-navigation/stack';
import Landing from './Landing';
import Filterpage from './filterpage';
import CampgroundMap from './Camping';
import SeeCamping from './seeCamping';
import SeeCampingList from './SeeCampingList';
import AddReviewPage from './addReview'
import ListReviewsPage from './ListReviews'
const appStack = createStackNavigator();

function AppStack() {
  return (
    <appStack.Navigator screenOptions={{ headerShown: false }}>
      <appStack.Screen name="Landing" component={Landing} />
      <appStack.Screen name="Filterpage" component={Filterpage} />
      <appStack.Screen name="CampgroundMap" component={CampgroundMap} />
      <appStack.Screen name="SeeCamping" component={SeeCamping} />
      <appStack.Screen name="SeeCampingList" component={SeeCampingList} />
      <appStack.Screen name="AddReviewPage" component={AddReviewPage} />
      <appStack.Screen name="ListReviewsPage" component={ListReviewsPage} />
    </appStack.Navigator>
  );
}

export default AppStack