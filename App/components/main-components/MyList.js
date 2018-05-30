import React, { Component} from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Button, AsyncStorage } from 'react-native';

import { Icon, Container, Content, Header, Left } from 'native-base';

import MainHeader from '../utils/Header';
import Logo from '../../assets/purpleLogoText.png';
import Example from '../utils/GridList';

export default class MyList extends Component {
  state = {
    data: []
  }

  componentWillMount() {
    try{
      AsyncStorage.getItem(`myListt`).then((value) => {
        this.setState({
          data: JSON.parse(value)
        })
      })
    }
    catch(err) {
      console.log("Error!");
    }
  }

  // componentWillUpdate(nextProps, nextState) {
  //   if (nextState.data != this.state.data) {
  //     try{
  //       AsyncStorage.getItem(`myListt`).then((value) => {
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
