import React, { Component } from 'react';
import { Alert, StatusBar, View, Text } from 'react-native';
import axios from 'axios';
import { Button, Icon, Container, Content, Title, Spinner } from "native-base";

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
      headerRight: <Button style={{ marginTop: 7 }} transparent onPress={navigation.getParam('reload_boards')}>
                    <Icon style={{ color: 'white' }} name='refresh' />
                   </Button>
    };
  };

  state = { boards: [], render: 'loading' }

  _yenile = () => {
    this.setState({ render: 'loading' })
    this.loadBoards()
  };
  
  componentDidMount() {
    this.loadBoards();
    this.props.navigation.setParams({ reload_boards: this._yenile });
  }

  loadBoards(){
    axios.get('http://192.168.1.35/rooms.json')
      .then(response => {
        this.setState({boards: response.data, render: 'boards'})
      }).catch(err => {
        this.showAlert('Hata!', 'Bir bağlantı hatası oluştu')
        this.setState({ render: 'network' })
      })
  }

  showAlert(title, text){
    Alert.alert(
      title,
      text,
      [{
        text: 'Tamam'
      }, ], {
        cancelable: false
      }
    );
  }

  changeState(link){
    axios({
      method: 'POST',
      url: 'http://192.168.1.35/rooms/'+link+'/chstate.json',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(response => {
      if(response.data.state){
        this.showAlert('Harika', 'Tahtanın kilidi açıldı')
        this.loadBoards()
      }
      else{
        this.showAlert('Harika', 'Tahta kilitlendi')
        this.loadBoards()
      }
    })
  }

  renderLoading() {
		return (
      <Container style={{ backgroundColor: '#1749A6' }}>
				<StatusBar barStyle="light-content" backgroundColor="#1749A6" />
				<View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
					<Text style={{ color: 'white', fontSize: 21 }}>Yükleniyor</Text>
					<Spinner color='white' />
				</View>
			</Container>
		);
  }

  renderNetworkError() {
    return (
      <Container>
        <StatusBar barStyle="light-content" backgroundColor="#1749A6" />
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <Text style={{ color: 'white', fontSize: 21 }}>Bağlantı hatası</Text>
          <Spinner color='white' />
        </View>
      </Container>
    );
  }
  
  renderBoards(){
    return(
       <Container>
        <StatusBar barStyle="light-content" backgroundColor="#1749A6" />
        <Content style={{ margin: 10 }}>
          {this.state.boards.map((prop, key) => {
            return (
              <Button onPress={() => this.changeState(prop.spec_name)} block style={{ marginTop: 10, backgroundColor: prop.state ? '#E4F2E7' : '#F0E4E4'}} key={key}>
                <Title style={{ color: prop.state ? '#6AC583' : '#97322F' }}>{prop.name}</Title>
              </Button>
            );
          })}
        </Content>
      </Container>
    );
  }

  renderArea(){
    if (this.state.render == 'loading')
      return this.renderLoading();
    if (this.state.render == 'network')
      return this.renderNetworkError();
    return this.renderBoards();
  }

  render() {
    return (
      this.renderArea()
    );
  }
}

export default Boards;
