import React, { Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import { Icon, Header, Left, Right, Center } from 'native-base';
import { SearchBar } from 'react-native-elements';
import * as firebase from 'firebase';

import LogoText from '../../assets/greyLogoText.png';

export default class MainHeader extends Component {
  constructor(props) {
    super(props);
    console.ignoredYellowBox = [
      'Setting a timer'
    ];
    this.state = {
      isLogged: props.navigation.state.params!==undefined && props.navigation.state.params.isLogged ?
        props.navigation.state.params.isLogged : false
    }
  }

  signOutUser = async () => {
    try {
        await firebase.auth().signOut();
        this.props.navigation.navigate('Login');
    } catch (e) {
        console.log(e);
    }
  }

  signInUser() {
    this.props.navigation.navigate('Login');
  }

  method() {
    console.log('!!!');
  }

  render() {
    let margin;

    if(this.props.navigation.state.routeName != 'Home') {
      margin = -85;
    }
    else {
      margin = 0;
    }

    return (
        <Header style={{backgroundColor: '#893667'}}>
          <Left>
            <Icon
              style={{marginTop: 20, marginLeft: margin}}
              name='ios-menu'
              onPress={() => this.props.navigation.navigate('DrawerOpen')}
            />
          </Left>


          {this.props.navigation.state.routeName == 'Home' ?
          <Right>
            <Icon
              name={this.state.isLogged===false ? 'ios-contact' : 'ios-log-out'}
              style={{marginTop: 20}}
              onPress={() => this.state.isLogged===false ? this.signOutUser() : this.signInUser()}
            />
            <TouchableOpacity
              onPress={() => this.state.isLogged===false ? this.signOutUser() : this.signInUser()}
            >
              {this.state.isLogged===false ?
                <Text> Sign In</Text> :
                <Text> Sign Out</Text>}
            </TouchableOpacity>
          </Right> : null}
        </Header>
    );
  }
}
