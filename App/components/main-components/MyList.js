import React, { Component} from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Button, AsyncStorage, Alert } from 'react-native';

import { Icon, Container, Content, Header, Left } from 'native-base';
import * as firebase from 'firebase';

import MainHeader from '../utils/Header';
import Logo from '../../assets/purpleLogoText.png';
import Example from '../utils/GridList';

export default class MyList extends Component {
  state = {
    data: []
  }

  componentWillMount() {
    let uid = firebase.auth().currentUser.uid;
    try{
      AsyncStorage.getItem(`myList_${uid}`).then((value) => {
        if (value !== null) {
          this.setState({
            data: JSON.parse(value)
          })
        }
        else {
          Alert.alert(
            'Empty list',
            'You can add a recipe.',
            [
              {text: 'Add recipe', onPress: () => this.navigate()},
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
          )
        }
      })
    }
    catch(err) {
      console.log("Error!");
    }
  }

  navigate() {
    this.props.navigation.navigate('Recipes');
  }

  // componentWillUpdate(nextProps, nextState) {
  //   if (nextState.data != this.state.data) {
  //     try{
  //       AsyncStorage.getItem(`myList_${uid}`).then((value) => {
  //         this.setState({
  //           data: JSON.parse(value)
  //         })
  //       })
  //     }
  //     catch(err) {
  //       console.log("Error!");
  //     }
  //   }
  // }

  render() {
    // console.log(">", this.state.data);
    return (
      <Container>
        <MainHeader navigation={this.props.navigation}/>
        <Content contentContainerStyle={styles.content}>
          <Image
            source={Logo}
            style={{marginTop: 0}}
          />
          <Example navigation={this.props.navigation} data={this.state.data} back={this.props.navigation.state.routeName}/>
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
  }
});
