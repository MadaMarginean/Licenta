import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    processColor,
    TextInput,
    TouchableHighlight,
    ActivityIndicator,
    Alert,
    Vibration
} from 'react-native';
import { Router, Scene, Actions } from 'react-native-router-flux';
import { Icon } from 'native-base';

import * as firebase from 'firebase';
import { Permissions, Notifications } from 'expo';

const DURATION = 10000 ;

const PATTERN = [ 1000, 2000, 3000, 4000] ;

class Register extends Component {
  constructor() {
    super();
    console.ignoredYellowBox = [
      'Setting a timer'
    ];

    this.state = {
      email: '',
      password: '',
      authenticating: false,
      error: 'no',
      businessClients: []
    }
  }

  componentWillMount() {
    let userPath = "/BusinessClient";
    let data = firebase.database().ref(userPath);
  }

  // componentDidMount() {
  //   this.registerForPushNotifications();
  // }

  registerForPushNotifications = async() => {
    //check if permission exists
    const {status} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = status;

    //if it doesn't exist
    if(status !== 'garanted') {
      const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    if(status !== 'garanted') {
      return ;
    }

    let token = await Notifications.getExpoPushTokenAsync();
    let uid = firebase.auth().currentUser.uid;
    firebase.database().ref("/Users").child(uid).update({
      expoPushToken: token
    });
  }

  checkBusiness(email, password) {
    this.props.navigation.navigate('Login');
    let headers = {
      'accept': 'application/json',
      'accept-encoding': 'gzip, deflate',
      'content-type': 'application/json'
    }

    let data = {
      "to": "ExponentPushToken[bA_VlPE-r8-DQUnBA7jI7p]",
      "sound": "default",
      "body": `New user regitered. Email: ${email}.`
    };

    return fetch('https://exp.host/--/api/v2/push/send', {
     method: "POST",
     headers: headers,
     body:  JSON.stringify(data)
   })
   .then(function(response){
     return response.json();
   })
   .then(function(data){
    console.log(data);
    });
  }

  changeEmail(email) {
    this.setState({email});
  }

  changePassword(password) {
    this.setState({password});
  }

  buttonRegister() {
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
        this.setState({ error: '', authenticating: false });
        this.checkBusiness(this.state.email, this.state.password); })
        .catch(() => {
            this.setState({ error: 'Authentication failed.', authenticating: false });
            Alert.alert(
              'Authentication failed',
              'Email address: someone@example.com.\nPassword should contain at least 6 characters.',
              [
                // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              { cancelable: false }
            )
        });

    var database = firebase.database();
    var ref = database.ref('/Users');

    let a={email: this.state.email,
          password: this.state.password,
          }

    if (a.email && a.password) {
      ref.push(a);
    }
  }

  skip() {
    this.props.navigation.navigate('Home', {isLogged: false});
    // Vibration.vibrate(DURATION) ;
  }

  renderCurrentState() {
      return (
        <View style={styles.contain}>
          <Text style={styles.title}>Register</Text>
            <TextInput
              style={styles.input}
              placeholder='Email'
              value={this.state.email}
              onChangeText={(email) => this.changeEmail(email)}
            />
            <TextInput
              style={styles.input}
              placeholder='Password'
              value={this.state.password}
              secureTextEntry
              onChangeText={(password) => this.changePassword(password)}
            />
            <TouchableHighlight
              style={styles.buttonSingIn}
              onPress={() => this.buttonRegister()}>
                <Text style={styles.singIn}>Register</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{alignItems: 'center', marginTop: 120}}
              onPress={() => this.skip()}
            >
              <Text style={styles.auth}>Start without authentication</Text>
            </TouchableHighlight>
          </View>
      );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.subcontainer}>
          <Icon
            name='ios-log-in-outline'
            style={{fontSize: 100}}
          />
        </View>
        {this.renderCurrentState()}
      </View>
    );
  }
}

export default Register;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#893667'
    },
    subcontainer: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: '#424242',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 100
    },
    auth: {
      color: '#424242',
      fontWeight: 'bold',
      fontSize: 16,
      alignItems: 'center',
      marginLeft: 20,
    },
    contain:
    {
      width: 300,
      height: 100
    },
    singIn: {
      backgroundColor: '#424242',
      color: 'white',
    },
    buttonSingIn: {
      backgroundColor: '#424242',
      paddingTop: 15,
      paddingBottom: 15,
      marginTop: 20,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      paddingRight: 5,
      paddingLeft: 5,
      paddingBottom: 5,
      fontSize: 18,
      color: '#333',
      fontWeight: '700',
      width: '100%',
    },
    button: {
      backgroundColor: '#3B5998',
      paddingTop: 15,
      paddingBottom: 15,
      marginTop: 20,
      height: 50,
    },
    textButton: {
      marginLeft: 100,
      color: 'white',
    },
    title: {
      textAlign: 'center',
      fontSize: 20,
      marginBottom: 20,
      color: '#333',
      fontWeight: 'bold'
    }
  });
