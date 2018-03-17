import React, { Component} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import { Icon, Header, Left } from 'native-base';

import LogoText from '../../assets/greyLogoText.png';

export default class MainHeader extends Component {
  render() {
    return (
        <Header style={{backgroundColor: '#893667'}}>
          <Left>
            <Icon style={{marginLeft: -85}}
              name='ios-menu'
              onPress={() => this.props.navigation.navigate('DrawerOpen')}
            />
          </Left>
        </Header>
    );
  }
}
