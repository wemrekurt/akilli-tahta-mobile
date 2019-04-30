import React, { Component } from 'react';

import {
  Text,
  View,
  StatusBar
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
        <StatusBar barStyle="light-content" backgroundColor="#1749A6" />
        <View style={{ margin: 20 }}>
          <Text style={{ fontSize: 21 }}>Burası uygulamanın ana sayfası. Burada öğretmene ait tahtalar listelenecek</Text>
        </View>
      </Container>
    );
  }
}
    
export default Home;
