import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableHighlight } from 'react-native';
import GridView from 'react-native-super-grid';
import { Actions } from 'react-native-router-flux';
import * as firebase from 'firebase';

// import SpeechAndroid from 'react-native-android-voice';
// import {TextToSpeech} from 'react-native-watson';
// import Tts from 'react-native-tts';
// import AndroidTextToSpeech from 'react-native-tts';
// import Speech from 'react-native-speech';
// import Voice from 'react-native-voice';
// import { STTandroid, STTios } from 'react-native-speech-to-text';

export default class Example extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    ingredients: [],
    m: {},
    measure: [],
    fridgeList: [],
    agendaList: []
  }

  componentWillMount() {
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
      })
      .catch((er) => {
        console.log('Error', er);
      })
  }

  componentDidMount() {
    if(firebase.auth().currentUser){
      fetch(`http://192.168.1.123:4000/getAgenda/${firebase.auth().currentUser.uid}`)
        .then(response => {
          if (response.ok) {
            response.json().then(json => {
              this.setState({
                agendaList: json,
              })
            });
          }
          else {
            console.log("NU");
          }
        });
    }
  }

  onPressButton(meal, bck) {
    var ingred = Object.keys(meal).map(function(key) {
      if ( meal[key] !== "" && key.includes("strIngredient")){
        return meal[key];
      }
    }).filter(function( element ) {
      return element !== undefined && element !== null;
    });

    var meas = Object.keys(meal).map(function(key) {
      if ( meal[key] !== "" && key.includes("strMeasure")){
        return meal[key];
      }
    }).filter(function( element ) {
      return element !== undefined && element !== null;
    });

    this.setState({ingredients: ingred, m: meal, measure: meas}, function () {
             this.props.navigation.navigate('Details',
             { meal: this.state.m, ingredients: this.state.ingredients, measure: this.state.measure, back: bck, fridgeList: this.state.fridgeList, agenda: this.state.agendaList});
        });
}

  render() {
    // let call = (async () => {
    //     await this.onPressButton();
    // })();
    let data = this.props.data;
    // console.log("favvv", this.props.favList);
    return (
      <GridView
        itemDimension={130}
        items={data}
        style={styles.gridView}
        renderItem={item => (
          <TouchableHighlight
            onPress={this.onPressButton.bind(this, item, this.props.back)}>
            <View style={styles.itemContainer}>
              <Image
                source={{ uri: item.strMealThumb }}
                style={styles.itemContainer}
                />
              <Text style={styles.itemName}>{item.strMeal}</Text>
              <Text style={styles.itemCode}>{item.strArea}</Text>
            </View>
          </TouchableHighlight>
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  gridView: {
    paddingTop: 25,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
});
