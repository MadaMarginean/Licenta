import React, { Component} from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Image, TouchableHighlight, AsyncStorage, Alert } from 'react-native';
import { Icon, Container, Content, Header, Left } from 'native-base';
import { List, ListItem } from 'react-native-elements';
import * as firebase from 'firebase';

import MainHeader from '../utils/Header';
import DrawerIcon from '../utils/DrawerIcon';
import Logo from '../../assets/purpleLogoText.png';

export default class MyFridge extends Component {
  state = {
    ingredient: '',
    quantity: '',
    list: [],
    fridgeList: []
  }

  componentWillMount() {
    if(firebase.auth().currentUser === null) {
      Alert.alert(
        'You are not logged.',
        '',
        [
          {text: 'Login', onPress: () => this.goToLogin()},
        ],
        { cancelable: false }
      )
    }
    else {
      fetch('http://192.168.1.123:4000/getIngredientsInFridge')
        .then(response => {
          if (response.ok) {
            response.json().then(json => {
              this.setState({
                fridgeList: json,
              })
            });
          }
          else {
            console.log("NU");
          }
        });
      }
  }

  goToLogin() {
    this.props.navigation.navigate('Login');
  }

  fetchForUpdate = () => {
    fetch('http://192.168.1.123:4000/getIngredientsInFridge')
      .then(response => {
        if (response.ok) {
          response.json().then(json => {
            this.setState({
              fridgeList: json,
            })
          });
        }
        else {
          console.log("NU");
        }
      });
  }

  addToFridge() {
    let id = this.state.fridgeList && this.state.fridgeList.length > 0 ? (parseInt(this.state.fridgeList[this.state.fridgeList.length-1].idIngr) + 1).toString() : "0";

    var headers= {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    }
    // console.log("fridgeList", this.state.fridgeList && this.state.fridgeList.length > 0)

    var data = {
      "idIngr": id,//this.state.fridgeList !== undefined ? (parseInt(this.state.fridgeList[this.state.fridgeList.length-1].idIngr) + 1).toString() : "0",
      "ingr": this.state.ingredient,
      "qty": this.state.quantity,
   }

   return fetch('http://192.168.1.123:4000/postIngredientsInFridge', {
     method: "POST",
     headers: headers,
     body:  JSON.stringify(data)
   })
   .then(function(response){
     this.fetchForUpdate();
     console.log("Its connected");
     return response.json();
     // this.socket.onopen = () => this.socket.send(JSON.stringify({type: 'greet', payload: 'data'}));
   }.bind(this))
   .then(function(data){
    console.log(data);
  });
    // const arrayData = [];
    // const data = {
    //   ingredient: this.state.ingredient,
    //   quantity: this.state.quantity,
    // }
    // arrayData.push(data);
    // var destinationArray;
    // this.fetch();
    // try {
    //   AsyncStorage.getItem(`fridgeList`).then((value) => {
    //     if (value !== null) {
    //       const d = JSON.parse(value);
    //       d.push(data);
    //       let p = [];
    //       AsyncStorage.setItem(`fridgeList`, JSON.stringify(d)).then(
    //         () => {
    //           destinationArray = Array.from(d);
    //           this.setState({
    //                           list: arrayData,
    //                           fridgeList: arrayData,
    //                           ingredient: '',
    //                           quantity: '',
    //                         });
    //         })
    //         this.fetch();
    //     }
    //     else {
    //       let p = [];
    //       AsyncStorage.setItem(`fridgeList`, JSON.stringify(arrayData))
    //         .then(() => {
    //           destinationArray = Array.from(arrayData);
    //           this.setState({
    //                           list: arrayData,
    //                           fridgeList: arrayData,
    //                           ingredient: '',
    //                           quantity: '',
    //                         });
    //       })
    //       this.fetch();
    //     }
    //   })
    // }
    // catch(err) {
    //   console.log("The comment must have a comment text!");
    // }
  }

  changeIngredient(ingredient) {
    this.setState({ingredient});
  }

  changeQuantity(quantity) {
    this.setState({quantity});
  }

  deleteItem(id) {
    return fetch(`http://192.168.1.123:4000/fridgeDelete/${id}`, {
      method: 'DELETE'
    }).then(function(response){
        this.fetchForUpdate()
        response.json()
      }.bind(this))
      .then(json => {
        return json;
      });
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
            <ScrollView>
            {this.state.fridgeList.map((data, i) => (
              <View key={i} style={styles.dataList}>
                <Text style={{fontWeight: 'bold', fontSize: 18, width: 350, marginTop: 7}}>{data.ingr} - {data.qty}</Text>
                <TouchableHighlight
                  style={{width: 25, height:40, alignItems: 'center', justifyContent: 'center', marginLeft: 310, marginTop: -40}}
                  onPress={() => this.deleteItem(data.idIngr)}
                >
                  <DrawerIcon iconName="ios-trash" size={12} />
                </TouchableHighlight>
              </View>
            ))}
              </ScrollView>

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
  // backgroundColor: 'red',
   // marginBottom: 5,
   // marginTop: 5,
   borderBottomWidth: 0.5,
   borderColor: 'grey',
   marginLeft: 10,
   marginRight: 10,
   height: 30
  },
});
