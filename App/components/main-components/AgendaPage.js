import React, { Component} from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Button, AsyncStorage, Alert, TouchableHighlight } from 'react-native';

import { Icon, Container, Content, Header, Left } from 'native-base';
import * as firebase from 'firebase';
import Toast, {DURATION} from 'react-native-easy-toast';

import MainHeader from '../utils/Header';
import Logo from '../../assets/purpleLogoText.png';
import DrawerIcon from '../utils/DrawerIcon';

export default class Agenda extends Component {
  constructor(props) {
    super(props);
    console.ignoredYellowBox = [
        'Possible Unhandled Promise Rejection (id: 0)'
      ];
    this.state = {
      data: []//this.props.agendaList ? this.props.agendaList : []
    }
  }

  componentWillMount() {
    if(firebase.auth().currentUser === null) {
      Alert.alert(
        'You are not logged.',
        '',
        [
          {text: 'Login', onPress: () => this.goToLogin()},
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    }
    else{
      fetch(`http://192.168.1.123:4000/getAgenda/${firebase.auth().currentUser.uid}`)
        .then(response => {
          if (response.ok) {
            response.json().then(json => {
              this.setState({
                data: json,
              })
            });
          }
          else {
            console.log("NU");
          }
        });
    }
  }

  goToLogin() {
    this.props.navigation.navigate('Login');
  }

  navigate() {
    this.props.navigation.navigate('Recipes');
  }

  fetchForUpdate() {
    fetch(`http://192.168.1.123:4000/getAgenda/${firebase.auth().currentUser.uid}`)
      .then(response => {
        if (response.ok) {
          response.json().then(json => {
            this.setState({
              data: json,
            })
          });
        }
        else {
          console.log("NU");
        }
      });
  }

  editItem(id) {
    return fetch(`http://192.168.1.123:4000/deleteAgenda/${id}/${firebase.auth().currentUser.uid}`, {
      method: 'DELETE'
    }).then(function(response){
        this.fetchForUpdate()
        response.json()
      }.bind(this))
      .then(json => {
        return json;
      });
  }

  parseData() {
    if(this.state.data) {
      return this.state.data.map((data, i) => {
        return (
        <View key={i} style={styles.dataList}>
          <Text style={{fontWeight: 'bold', fontSize: 18, width: 350, marginTop: 7}}>{data.recipe}: {data.date}</Text>
          <TouchableHighlight
            style={{width: 25, height:40, alignItems: 'center', justifyContent: 'center', marginLeft: 310, marginTop: -40}}
            onPress={() => this.editItem(data.idAgenda)}
          >
            <DrawerIcon iconName="ios-create" size={12} />
          </TouchableHighlight>
        </View>
      )})
    }
  }

  render() {
    // console.log('propsss', this.props);
    return (
      <Container>
        <MainHeader navigation={this.props.navigation}/>
        <Content contentContainerStyle={styles.content}>
          <Image
            source={Logo}
            style={{marginTop: 0}}
          />
          <ScrollView>
            {this.parseData()}
          </ScrollView>
          <Toast
            ref="toast"
            style={{backgroundColor:'black'}}
            position='top'
            positionValue={200}
            fadeInDuration={750}
            fadeOutDuration={1000}
            opacity={0.8}
            textStyle={{color:'white'}}
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: '#424242',
    flex: 1,
    alignItems: 'center',
  },
  dataList: {
  // backgroundColor: 'red',
   // marginBottom: 5,
   // marginTop: 5,
   borderBottomWidth: 0.5,
   borderColor: 'grey',
   marginLeft: 10,
   marginRight: 10,
   height: 30
  },
});
