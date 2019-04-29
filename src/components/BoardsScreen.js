import React, { Component } from 'react';
import { Text, View } from 'react-native';
import axios from 'axios';
import { Button, Icon, Container, Content, Title } from "native-base";

class Boards extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Tahtalar',
      headerStyle: {
        backgroundColor: '#1749A6',
      },
      headerLeft: <Button style={{ marginTop: 7 }} transparent onPress={() => navigation.openDrawer()}>
                    <Icon style={{ color: 'white' }} name='menu' />
                  </Button>,
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerRight: <Button style={{ marginTop: 7 }} transparent onPress={() => this.state.params.reloadBoards}>
                    <Icon style={{ color: 'white' }} name='refresh' />
                   </Button>
    };
  };

  state = { boards: [] }

  _reloadBoards(){
    this.loadBoards()
  }
  
  componentDidMount() {
    this.loadBoards();
    this.props.navigation.setParams({
      reloadBoards: this._reloadBoards.bind(this)
    });
  }

  loadBoards(){
    axios.get('http://192.168.1.35/rooms.json')
      .then(response => {
        this.setState({boards: response.data})
    })
  }

  render() {
    return (
      <Container>
        <Content style={{ margin: 10 }}>
          {this.state.boards.map((prop, key) => {
            return (
              <Button block style={{ backgroundColor: prop.state ? '#E4F2E7' : '#F0E4E4'}} key={key}>
                <Title style={{ color: prop.state ? '#6AC583' : '#97322F' }}>{prop.name}</Title>
              </Button>
            );
          })}
        </Content>
      </Container>
    );
  }
}

export default Boards;
