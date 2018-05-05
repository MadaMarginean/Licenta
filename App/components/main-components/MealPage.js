import React, { Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button, ListItem, List, Dimensions } from 'react-native';

import { Icon, Container, Content, Header, Left, Tab, Tabs, ScrollableTab } from 'native-base';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import { Constants, Speech } from 'expo';
import SpeechAndroid from 'react-native-android-voice';

import MainHeader from '../utils/Header';
import IngredientsTab from './IngredientsTab';
import DrawerIcon from '../utils/DrawerIcon';

export default class MealPage extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    language: "en",
    text: "Vegetable Stock",
    inProgress: false,
    pitch: 1,
    rate: 0.75,
  }

  _buttonClick = async() => {
    try{
        console.log(SpeechAndroid);
        var spokenText = await SpeechAndroid.startSpeech("Speak", SpeechAndroid.EN);
        ToastAndroid.show(spokenText , ToastAndroid.LONG);
    }catch(error){
      console.log("ERR", error);
    }
  }

  _speak = () => {
   const start = () => {
     this.setState({ inProgress: true });
   };
   const complete = () => {
     this.state.inProgress && this.setState({ inProgress: false });
   };

   Speech.speak(this.state.text, {
     language: this.state.language,
     pitch: this.state.pitch,
     rate: this.state.rate,
     onStart: start,
     onDone: complete,
     onStopped: complete,
     onError: complete,
   });
 };

 // stt = () => {
 //  SpeechToText.initialize("48db7730-e9ef-49a6-b5e7-35fcf44fbfbe", "Rj0ylSnPf4xm")
 //   SpeechToText.startStreaming((error, this.state.text) =>
 //           {
 //               console.log(this.state.text)
 //           }));
 //
 // const complete = () => {
 //   this.state.inProgress && this.setState({ inProgress: false });
 // };
 //  };

  render() {
    let props = this.props.navigation.state.params;

    return (
      <HeaderImageScrollView
        maxHeight={200}
        minHeight={100}
        headerImage={{ uri: props.meal.strMealThumb }}
        renderForeground={() => (
            <View style={styles.titleContainer}>
              <Text style={styles.imageTitle}>{props.meal.strMeal}</Text>
            </View>
        )}
      >
        <View style={{ height: 1000 }}>
          <TriggeringView onHide={() => console.log("...")} >
            <Text style={styles.subtitle}>Ingredients: </Text>
            <View style={styles.ingredientsMeasure}>
              {props.ingredients.map((data, index) => (
                <Text key={index}>{data} - {props.measure[index]}</Text>
              ))}
            </View>
            <Button
            disabled={this.state.inProgress}
            onPress={this._speak}
            title="Speak"
          />
           </TriggeringView>
         </View>
      </HeaderImageScrollView>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#424242',
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    color: '#893667',
    fontWeight: '600',
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 26,
    color: '#893667',
    fontWeight: '600',
    marginTop: 10,
    marginLeft: 20,
    width: 1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 170
  },
  imageTitle: {
    backgroundColor: 'rgba(0,0,0,0.65)',
    color: 'white',
    fontSize: 24,
  },
  navTitleView: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
    opacity: 0,
  },
  ingredientsMeasure: {
    marginLeft: 10,
    marginTop: 5,
  },
  header :{
        flex: 1,
        height: 56,
        padding: 10,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
  }
});
