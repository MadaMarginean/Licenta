import React, { Component} from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Image, Button } from 'react-native';
import { Icon, Container, Content, Header, Left } from 'native-base';

import MainHeader from '../utils/Header';
import Logo from '../../assets/purpleLogoText.png';

export default class MyFridge extends Component {
  state = {
    ingredient: '',
    quantity: '',
    list: []
  }

  changeIngredient(ingredient) {
    this.setState({ingredient});
  }

  changeQuantity(quantity) {
    this.setState({quantity});
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
          <View style={styles.inputView}>
            <Text style={styles.title}>Add an ingredient</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder='Ingredient'
              value={this.state.ingredient}
              onChangeText={(ingredient) => this.changeIngredient(ingredient)}
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder='Quantity'
              value={this.state.quantity}
              onChangeText={(quantity) => this.changeQuantity(quantity)}
            />
          </View>
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
  inputView: {
    width: '100%'
  },
  input: {
    // paddingRight: 5,
    // paddingLeft: 5,
    // paddingBottom: 5,
    fontSize: 18,
    color: '#333',
    fontWeight: '700',
    width: '100%',
    borderColor:'#893667',
    borderWidth: 2,
  },
  textArea: {
    height: 60
  },
});
