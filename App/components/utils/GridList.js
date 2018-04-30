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
  state = {
    data: []
  }

  componentWillMount() {
    fetch('http://192.168.0.105:4000/meals')
      .then(response => {
        if (response.ok) {
          response.json().then(json => {
            this.setState({
              data: json,
              loaded: true
            })
          });
        }
        else {
          console.log("NU");
        }
      });
  }

  onPressButton(item) {
   this.props.navigation.navigate('Details', { meal: item });
 }

  render() {
    // let call = (async () => {
    //     await this.onPressButton();
    // })();

    return (
      <GridView
        itemDimension={130}
        items={this.state.data}
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
