import React, { Component} from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Image, TouchableHighlight, AsyncStorage } from 'react-native';
import { Icon, Container, Content, Header, Left } from 'native-base';

import MainHeader from '../utils/Header';
import Logo from '../../assets/purpleLogoText.png';

export default class MyFridge extends Component {
  state = {
    ingredient: '',
    quantity: '',
    list: [],
    fridgeList: []
  }

  componentWillMount() {
    try{
      AsyncStorage.getItem(`fridgeList`).then((value) => {
        this.setState({
          list: JSON.parse(value),
          fridgeList: JSON.parse(value)
        })
      })
    }
    catch(err) {
      console.log("Error!", err);
    }
  }

  addToFridge() {
    const arrayData = [];
    const data = {
      ingredient: this.state.ingredient,
      quantity: this.state.quantity,
    }
    arrayData.push(data);
    var destinationArray;
    this.fetch();
    try {
      AsyncStorage.getItem(`fridgeList`).then((value) => {
        if (value !== null) {
          const d = JSON.parse(value);
          d.push(data);
          let p = [];
          AsyncStorage.setItem(`fridgeList`, JSON.stringify(d)).then(
            () => {
              destinationArray = Array.from(d);
              this.setState({
                              list: arrayData,
                              fridgeList: arrayData,
                              ingredient: '',
                              quantity: '',
                            });
            })
            this.fetch();
        }
        else {
          let p = [];
          AsyncStorage.setItem(`fridgeList`, JSON.stringify(arrayData))
            .then(() => {
              destinationArray = Array.from(arrayData);
              this.setState({
                              list: arrayData,
                              fridgeList: arrayData,
                              ingredient: '',
                              quantity: '',
                            });
          })
          this.fetch();
        }
      })
    }
    catch(err) {
      console.log("The comment must have a comment text!");
    }
  }

  fetch() {
    try{
      AsyncStorage.getItem(`fridgeList`).then((value) => {
        this.setState({
          list: JSON.parse(value),
          fridgeList: JSON.parse(value)
        })
      })
    }
    catch(err) {
      console.log("Error!", err);
    }
  }

  changeIngredient(ingredient) {
    this.setState({ingredient});
  }

  changeQuantity(quantity) {
    this.setState({quantity});
  }

  parseData() {
    if(this.state.fridgeList) {
      return this.state.fridgeList.map((data, i) => {
        return (
          <ScrollView key={i} style={styles.dataList}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>{data.ingredient} - {data.quantity}</Text>
          </ScrollView>
        )
      })
    }
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
            <View style={{width: '50%'}}>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder='Ingredient'
                value={this.state.ingredient}
                onChangeText={(ingredient) => this.changeIngredient(ingredient)}
              />
            </View>
            <View style={{width: '50%', marginLeft: 180, marginTop: -40}}>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder='Quantity'
                value={this.state.quantity}
                onChangeText={(quantity) => this.changeQuantity(quantity)}
              />
            </View>
            <TouchableHighlight
              style={styles.button}
              onPress={() => this.addToFridge()}>
                <Text style={styles.textButton}>Add</Text>
            </TouchableHighlight>
            <View style={{backgroundColor: 'red', width: '100%'}}>
              {this.parseData()}
            </View>
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
    width: '100%',
    marginTop: 10
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 5,
    color: '#893667',
    fontWeight: '600',
  },
  input: {
    // paddingRight: 5,
    paddingLeft: 5,
    paddingBottom: 0,
    fontSize: 18,
    color: 'white',
    fontWeight: '700',
    width: '100%',
    borderColor:'#893667',
    borderWidth: 2,
  },
  textArea: {
    height: 40,
    // marginLeft: 5
  },
  button: {
    backgroundColor: '#893667',
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: 5
  },
  textButton: {
    textAlign: 'center',
    color: 'white'
  },
  dataList: {
   marginBottom: 5,
   marginTop: 5,
   marginLeft: 5,
  },
});
