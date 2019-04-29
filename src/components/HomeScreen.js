import React, { Component } from 'react';

import {
  Text,
  View
} from 'react-native';

import {
  Button,
  Container,
  Content,
  Icon
} from "native-base";


class Home extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Dashboard',
      headerStyle: {
        backgroundColor: '#1749A6',
      },
      headerLeft: <Button style={{ marginTop: 7 }} transparent onPress={() => navigation.openDrawer()}>
                    <Icon style={{ color: 'white' }} name='menu' />
                  </Button>,
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    };
  };

  render() {
    return (
      <Container>
        <Content padder>
         <View>
           <Text>Dashboard</Text>
         </View>
        </Content>
      </Container>
    );
  }
}
    
export default Home;
