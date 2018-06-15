import React, { Component} from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, Button, Clipboard, TextInput } from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast';
import email from 'react-native-email';

import { Icon, Container, Content, Header, Left } from 'native-base';

import MainHeader from '../utils/Header';
import DrawerIcon from '../utils/DrawerIcon';
import Logo from '../../assets/purplLogo.png';

export default class Contact extends Component {
  copyToClipboard = async (text) => {
    await Clipboard.setString(text);
    this.refs.toast.show('Copied to clipboard');
  };

  handleEmail = () => {
    const to = ['madalina_marginean96@yahoo.com']
    email(to, {
      cc: [],
      bcc: '',
      subject: 'Purplechef App',
      body: ''
    }).catch(console.error)
  }

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
            <Text style={{fontSize: 20, color: 'white', marginLeft: 30}}>Phone number: </Text>
          </View>
          <TouchableHighlight
            onPress={() => this.copyToClipboard('+40756669870')}
            style={styles.phoneNumber}>
            <Text style={{fontSize: 20, color: 'white', textDecorationLine: 'underline'}}>+40756669870</Text>
          </TouchableHighlight>
          <View style={styles.mailIcon}>
            <DrawerIcon iconName="ios-mail" size={24} />
            <TouchableHighlight
              onPress={() => this.handleEmail()}
            >
              <Text style={{fontSize: 20, color: 'white', marginLeft: 30, textDecorationLine: 'underline'}}>Send an email</Text>
            </TouchableHighlight>
          </View>
          <Toast
            ref="toast"
            style={{backgroundColor:'black'}}
            position='bottom'
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
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  content: {
    backgroundColor: '#424242',
    flex: 1,
    alignItems: 'center',
  },
  phoneIcon: {
    // backgroundColor: 'red',
    width: 200,
    height: 40,
    marginLeft: -110,
    marginTop: 100,
  },
  phoneNumber: {
    // backgroundColor: 'blue',
    width: 150,
    marginLeft: 180,
    marginTop: -25
  },
  mailIcon: {
    // backgroundColor: 'red',
    width: 200,
    height: 35,
    marginLeft: -110,
    marginTop: 30,
  },
});
