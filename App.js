import { createDrawerNavigator, createAppContainer, createStackNavigator } from "react-navigation";
import Home  from './src/components/HomeScreen';
import Boards from './src/components/BoardsScreen';


const HomeStack = createStackNavigator(
  {
    Home: Home
  }
);

const BoardStack = createStackNavigator(
  {
    Boards: Boards
  }
);

const AppNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: { title: 'Anasayfa'}
    },
    Boards: {
      screen: BoardStack,
      navigationOptions: { title: 'Tüm Tahtalar'}
    }
  }
);



export default createAppContainer(AppNavigator);
