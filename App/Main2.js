import React, { Component} from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Button } from 'react-native';

import { Icon, Container, Content, Header, Left } from 'native-base';

import MainHeader from './components/utils/Header';
import Logo from './assets/purpleLogoText.png';
import Example from './components/utils/GridList';

export default class Main2 extends Component {
  render() {
    return (
      <Container>
        <MainHeader navigation={this.props.navigation}/>
        <Content contentContainerStyle={styles.content}>
        <Image
          source={Logo}
          style={{marginTop: 0}}
        />
        <Example />
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
