import React, { Component} from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, Animated } from 'react-native';

import { Container, Content, Icon } from 'native-base';

import MainHeader from './components/utils/Header';
import DrawerIcon from './components/utils/DrawerIcon';
import Logo from './assets/purplLogo.png';

export default class Main extends Component {
  state = {
    fadeAnim: new Animated.Value(0)
  }

  componentDidMount() {
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 5,
        duration: 10000,
      }
    ).start();
  }

  buttonPressed() {
    this.props.navigation.navigate('Recipes');
  }

  render() {
    let { fadeAnim } = this.state;

    return (
      <Container>
        <MainHeader navigation={this.props.navigation}/>
        <Content contentContainerStyle={styles.content}>
          <Image
            source={Logo}
            style={{marginTop: 0}}
          />
          <Animated.Text style={{color: "#F5F4EB", opacity: fadeAnim, marginLeft: 50, marginTop: 30,
                                 marginRight: 40, fontSize: 25, fontFamily: 'serif'}}>
            Cooking is all
          </Animated.Text>
          <Animated.Text style={{color: "#F5F4EB", opacity: fadeAnim, marginLeft: 40, marginRight: 10,
                                fontSize: 25, fontFamily: 'serif'}}>
            about people. Food is maybe the only universal thing that really has the power to bring everyone together. No matter what culture, everywhere around the world, people get together to eat.
          </Animated.Text>
          <TouchableHighlight
            style={styles.button}
            onPress={() => this.buttonPressed()}>
              <Text style={styles.textButton}>Gather your family to the meal with our recipes!</Text>
          </TouchableHighlight>
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
  button: {
    backgroundColor: '#893667',
    marginTop: 25,
    height: 60,
    width: 350,
    justifyContent: 'center',
  },
  textButton: {
    textAlign: 'center',
    color: '#F5F4EB',
    fontSize: 20
  },
});
