import React from "react";
import { Button } from "react-native";
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
    Home: HomeStack,
    Boards: BoardStack
  }
);



export default createAppContainer(AppNavigator);
