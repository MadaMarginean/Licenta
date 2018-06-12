import React, { Component} from 'react';
import { StyleSheet, Vibration, Text, Alert, TextInput, View, TouchableHighlight, TouchableOpacity, Image, ListItem, List, Button, Dimensions, WebView, AsyncStorage } from 'react-native';

import { Icon, Container, Content, Header, Left, Tab, Tabs, ScrollableTab } from 'native-base';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import { Constants, Speech, Video, ImagePicker} from 'expo';
import { MaterialIcons, Octicons } from '@expo/vector-icons';
import PopoverTooltip from 'react-native-popover-tooltip';
import CheckboxGroup from 'react-native-checkbox-group';
import Accordion from 'react-native-collapsible/Accordion';
import { Rating, AirbnbRating } from 'react-native-ratings';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import * as firebase from 'firebase';
import Toast, {DURATION} from 'react-native-easy-toast';
import { Permissions, Notifications } from 'expo';

import MainHeader from '../utils/Header';
import AddComment from '../utils/AddComment';
import IngredientsTab from './IngredientsTab';
import DrawerIcon from '../utils/DrawerIcon';

const SECTIONS = [
  {
    title: 'First',
    content: 'Shop List'
  },
];

// const DURATION = 10000 ;

const PATTERN = [ 1000, 2000, 3000, 4000] ;

export default class MealPage extends Component {
  state = {
    language: "en",
    text: "Vegetable Stock",
    inProgress: false,
    pitch: 1,
    rate: 0.75,
    list: [],
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

 onNavigationStateChange = navState => {
    if (navState.url.indexOf('https://www.google.com') === 0) {
      const regex = /#access_token=(.+)/;
      let accessToken = navState.url.match(regex)[1];
      console.log(accessToken);
    }
  };

  saveToFavList(data) {
    const arrayData = [];
    console.log("click");
    arrayData.push(data);
    var destinationArray;
    let uid = firebase.auth().currentUser.uid;
    let sem = 1;
    try {
      AsyncStorage.getItem(`myList_${uid}`).then((value) => {
        if (value !== null) {
          const d = JSON.parse(value);
          d.map(i => i.strMeal === data.strMeal ? sem = 0 : console.log('sem in map',sem));

          console.log('sem',sem);
          if(sem === 0) {
            Alert.alert(
              'This recipe already exists in My list.',
              'A recipe can be added only once.',
              [
                // {text: 'Add recipe', onPress: () => this.navigate()},
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              { cancelable: false }
            )
          }
          else{
            this.refs.toast.show('Saved');
            d.push(data);
            let p = [];
            AsyncStorage.setItem(`myList_${uid}`, JSON.stringify(d)).then(
              () => {
                destinationArray = Array.from(d);
                this.setState({list: arrayData});
            })
          }
        }
        else {
          let p = [];
          AsyncStorage.setItem(`myList_${uid}`, JSON.stringify(arrayData))
            .then(() => {
              destinationArray = Array.from(arrayData);
              this.setState({list: arrayData});
          })
        }
      })
    }
    catch(err) {
      console.log("The comment must have title, subtitle and comment text!");
    }
  }

  // delete(data, back) {
  //   // console.log("apasat", data);
  //   var array = this.state.list;
  //   var index = array.indexOf(data);
  //
  //   array.splice(index, 1);
  //   this.setState({list: array});
  //
  //   try {
  //     AsyncStorage.setItem(`myList_${uid}`, JSON.stringify(array))
  //       .then(() => {
  //         // this.setState({list: array});
  //         this.props.navigation.navigate(back);
  //         this.props.favList.push(array)
  //       })
  //   }
  //   catch(err) {
  //     console.log("error", err);
  //   }
  // }

  _renderHeader(section) {
    return (
      <View style={styles.headerr}>
        <Text style={styles.headerText}>Shop List</Text>
      </View>
    );
  }

  _renderContent(ingredients, measure, section) {
    return (
      <View>
      {ingredients.map((data, index) => (
        <CheckboxGroup
          key={index}
          callback={(selected) => { console.log(selected) }}
          iconColor={"#893667"}
          iconSize={20}
          checkedIcon="ios-checkbox-outline"
          uncheckedIcon="ios-square-outline"
          checkboxes={[
            {
              label: ` ${data} - ${measure[index]}`,
              value: index,
              // selected: true
            },
          ]}
          labelStyle={{
            color: '#333'
          }}
          rowStyle={{
            flexDirection: 'row'
          }}
          rowDirection={"column"}
        />
      ))}
      </View>
    )
  }

  setAlarm() {
    this.refs.toast.show('Reminder saved');
    setTimeout(() => this.alarm(), 10000)
  }

  alarm() {
     Vibration.vibrate(10000) ;

     let headers = {
       'accept': 'application/json',
       'accept-encoding': 'gzip, deflate',
       'content-type': 'application/json'
     }

     let data = {
       "to": "ExponentPushToken[bA_VlPE-r8-DQUnBA7jI7p]",
       "sound": "default",
       "body": "Take out from oven!"
     };

     return fetch('https://exp.host/--/api/v2/push/send', {
      method: "POST",
      headers: headers,
      body:  JSON.stringify(data)
    })
    .then(function(response){
      console.log("Its connected");
      return response.json();
      // this.socket.onopen = () => this.socket.send(JSON.stringify({type: 'greet', payload: 'data'}));
    })
    .then(function(data){
     console.log(data);
   });
  }

  render() {
    let props = this.props.navigation.state.params;
    const { width } = Dimensions.get('window');

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
        renderTouchableFixedForeground={() => (
          <View style={{width: 50, height: 50, marginTop:20}}>
            <Button
              title='<'
              onPress={() => this.props.navigation.navigate(props.back)}
              color='rgba(0,0,0,0)'
              />
            </View>
        )}
        keyboardShouldPersistTaps='always'
        scrollEnabled={true}
        keyboardDismissMode='on-drag'
      >
        <View style={{ height: 1200 }}>
          <TriggeringView onHide={() => console.log("...")} >
            <View style={styles.ingredientsContainer}>
              <Text style={styles.subtitle}>Ingredients: </Text>
              <View style={styles.ingredientsMeasure}>
                {props.ingredients.map((data, index) => (
                  <Text key={index}>{data} - {props.measure[index]}</Text>
                ))}
              </View>
            </View>
            <Button
            disabled={this.state.inProgress}
            onPress={this._speak}
            title="Speak"
            />
            <Text style={styles.subtitle}>Instructions: </Text>
            <Text style={styles.ingredientsMeasure}>{props.meal.strInstructions}</Text>
            <Text style={styles.subtitle}>Video: </Text>
            <View style={{height: 220, justifyContent: 'center', alignItems: 'center'}}>
            <WebView
              source={{
                uri: props.meal.strYoutube,
              }}
              onNavigationStateChange={this.onNavigationStateChange}
              startInLoadingState
              scalesPageToFit
              javaScriptEnabled
              style={{backgroundColor: 'black', width, height: 220}}
            />
            </View>
           </TriggeringView>
         </View>
         {props.back !== 'MyList' ?
          <View>
            <TouchableOpacity
              onPress={() => this.saveToFavList(props.meal)}
              style={styles.favBtn}>
               <View style={{marginLeft:6}}>
                 <DrawerIcon iconName="ios-star" size={24} iconColor='white'/>
                 <Text style={{marginLeft:30, marginTop: 4, fontSize: 16}}>My list</Text>
               </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setAlarm()}
              style={styles.alarmBtn}>
               <View style={{marginLeft:6}}>
                 <DrawerIcon iconName="ios-alarm" size={24} iconColor='white'/>
                 <Text style={{marginLeft:30, marginTop: 4, fontSize: 16}}>Set timer</Text>
               </View>
            </TouchableOpacity>
            <Toast
              ref="toast"
              style={{backgroundColor:'black'}}
              position='top'
              positionValue={200}
              fadeInDuration={750}
              fadeOutDuration={1000}
              opacity={0.8}
              textStyle={{color:'white'}}
            />
            <AirbnbRating />
            <View>
              <Accordion
                 sections={SECTIONS}
                 renderHeader={this._renderHeader.bind(this)}
                 renderContent={this._renderContent.bind(this, props.ingredients, props.measure)}
               />
            </View>
            <AddComment idMeal={props.meal.idMeal} />
          </View>
          : null}
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
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 2,
    marginBottom: 20
  },
  textArea: {
    height: 60
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
    marginBottom: 5,
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
  },
  controlBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  backBtn: {
    width: 50,
    marginTop:90,
    fontSize: 60
  },
  favBtn: {
    width: 100,
    height: 50,
    backgroundColor: '#893667',
    marginLeft: 250,
    marginTop: 20
  },
  alarmBtn: {
    width: 105,
    height: 50,
    backgroundColor: '#893667',
    marginLeft: 120,
    marginTop: -50
  },
  ingredientsContainer: {
    width: 250,
    marginTop: 0
  },
  headerr: {
   backgroundColor: '#424242',
   padding: 10
 },
 headerText: {
   textAlign: 'center',
   fontSize: 16,
   fontWeight: '500'
 },
});
