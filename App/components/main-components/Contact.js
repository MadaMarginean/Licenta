import React, { Component} from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Button } from 'react-native';

import { Icon, Container, Content, Header, Left } from 'native-base';

import MainHeader from '../utils/Header';
import DrawerIcon from '../utils/DrawerIcon';
import Logo from '../../assets/purpleLogoText.png';

export default class Contact extends Component {
  render() {
    return (
      <Container>
        <MainHeader navigation={this.props.navigation} />
        <Content contentContainerStyle={styles.content}>
          <Image
            source={Logo}
            style={{marginTop: 0}}
          />
          <View style={styles.phoneIcon}>
            <DrawerIcon iconName="ios-call" size={24} />
          </View>
          <View style={styles.phoneNumber}>
            <Text style={{fontSize: 20}}>Phone number: +40756669870</Text>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  content: {
    backgroundColor: '#424242',
    flex: 1,
    // alignItems: 'center',
  },
  phoneIcon: {
    // backgroundColor: 'red',
    width: 40,
    height: 40,
    marginLeft: 10,
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneNumber: {
    // backgroundColor: 'blue',
    width: 300,
    marginLeft: 50,
    marginTop: -30
  }
});
