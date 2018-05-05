import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableHighlight } from 'react-native';
import GridView from 'react-native-super-grid';
import { Actions } from 'react-native-router-flux';

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
    measure: []
  }

  onPressButton(meal) {
    var ingred = Object.keys(meal).map(function(key) {
      if ( meal[key] !== "" && key.includes("strIngredient")){
        return meal[key];
      }
    }).filter(function( element ) {
      return element !== undefined;
    });

    var meas = Object.keys(meal).map(function(key) {
      if ( meal[key] !== "" && key.includes("strMeasure")){
        return meal[key];
      }
    }).filter(function( element ) {
      return element !== undefined;
    });

    this.setState({ingredients: ingred, m: meal, measure: meas}, function () {
             this.props.navigation.navigate('Details',
             { meal: this.state.m, ingredients: this.state.ingredients, measure: this.state.measure });
        });
}

  render() {
    // let call = (async () => {
    //     await this.onPressButton();
    // })();
    let data = this.props.data;

    return (
      <GridView
        itemDimension={130}
        items={data}
        style={styles.gridView}
        renderItem={item => (
          <TouchableHighlight
            onPress={this.onPressButton.bind(this, item)}>
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
