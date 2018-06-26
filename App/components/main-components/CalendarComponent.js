import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  AsyncStorage
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import * as firebase from 'firebase';

export default class CalendarComponent extends Component{
  constructor(props) {
    super(props);
    this.state = {
      list: this.props.navigation.state.params.agenda.agenda
    };
    this.onDayPress = this.onDayPress.bind(this);
  }

  componentWillMount() {

  }

  onDayPress(day) {
    this.setState({
      selected: day.dateString
    });

    let id = this.state.list && this.state.list.length > 0 ? (this.state.list.length + 1).toString() : "0";
    console.log('id', this.state.list.length + 1, id);
    var headers= {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    }
    // console.log("fridgeList", this.state.fridgeList && this.state.fridgeList.length > 0)

    var data = {
      "idAgenda": id,//this.state.fridgeList !== undefined ? (parseInt(this.state.fridgeList[this.state.fridgeList.length-1].idIngr) + 1).toString() : "0",
      "date": day.dateString,
      "recipe": this.props.navigation.state.params.meal,
      "user": firebase.auth().currentUser.uid
   }

   return fetch(`http://192.168.1.123:4000/postAgenda/${firebase.auth().currentUser.uid}`, {
     method: "POST",
     headers: headers,
     body:  JSON.stringify(data)
   })
   .then(function(response){
     // this.fetchForUpdate();
     this.props.navigation.navigate('Agenda');
     console.log("Its connected");
     return response.json();
     // this.socket.onopen = () => this.socket.send(JSON.stringify({type: 'greet', payload: 'data'}));
   }.bind(this))
   .then(function(data){
    console.log(data);
  });

    // const arrayData = [];
    // const data = {
    //   date: day.dateString,
    //   recipe: this.props.navigation.state.params.meal,
    // }
    // arrayData.push(data);
    // var destinationArray;
    // // this.fetch();
    // try {
    //   AsyncStorage.getItem(`agenda`).then((value) => {
    //     if (value !== null) {
    //       const d = JSON.parse(value);
    //       d.push(data);
    //       let p = [];
    //       AsyncStorage.setItem(`agenda`, JSON.stringify(d)).then(
    //         () => {
    //           destinationArray = Array.from(d);
    //           this.setState({ list: arrayData, });
    //           console.log('list in if', this.state.list)
    //         })
    //         .catch(error => {
    //           console.log(error);
    //         })
    //         // this.fetch();
    //     }
    //     else {
    //       let p = [];
    //       AsyncStorage.setItem(`agenda`, JSON.stringify(arrayData))
    //         .then(() => {
    //           destinationArray = Array.from(arrayData);
    //           this.setState({ list: arrayData, });
    //           console.log('list in else', arrayData)
    //       })
    //       .catch(error => {
    //         console.log(error);
    //       })
    //       // this.fetch();
    //     }
    //   })
    // }
    // catch(err) {
    //   console.log("The comment must have a comment text!");
    // }
    // // console.log("day", day.dateString)
  }

  render() {
    console.log('props', this.props.navigation.state.params.meal);
    return (
      <View style={styles.container}>
      <StatusBar barStyle="light-content"/>
        <Calendar
          onDayPress={this.onDayPress}
          style={styles.calendar}
          hideExtraDays
          markedDates={{[this.state.selected]: {selected: true}}}
          theme={{
            selectedDayBackgroundColor: '#893667',
            todayTextColor: '#893667',
            arrowColor: '#893667',
          }}
        />
        <Text style={{fontWeight: 'bold',color:'#893667',marginTop:80,textAlign:"center"}}>
        Please select a date!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: '#eee',
    height: 350
  }
});
