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
    Vibration,
} from 'react-native';
import { Router, Scene, Actions } from 'react-native-router-flux';
import { Icon } from 'native-base';

import * as firebase from 'firebase';
import { Permissions, Notifications } from 'expo';

class Login extends Component {
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

    data.on('value', (item) => {
                let users = item.val(); //bd
                let keys = Object.keys(users);
                let items = [];

                for(var i = 0; i< keys.length; i++) {
                  var k = keys[i];
                  console.log("users", users)
                  items.push(users[k]);
                }
                this.setState({businessClients: items});
                console.log(this.state.businessClients);
              });
  }


  registerForPushNotifications = async() => {
    //check if permission exists
    const {status} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = status;

    //if it doesn't exist
    if(status !== 'granted') {
      const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    console.log('final status', finalStatus);
    if(status !== 'granted') {
      return ;
    }
    let token = await Notifications.getExpoPushTokenAsync();
    let uid = firebase.auth().currentUser.uid;
    firebase.database().ref("/BusinessClient").child(uid).update({
      email: this.state.email,
      password: this.state.password,
      expoPushToken: token
    });
  }

  checkBusiness(email, password) {
    // this.state.businessClients.map((item) => {item.email == email && item.password == password ?
    //   Actions.home({user: 'business'}) : Actions.home({user: 'personal'})});
    this.props.navigation.navigate('Home', {isLogged: true});
  }

  changeEmail(email) {
    this.setState({email});
  }

  changePassword(password) {
    this.setState({password});
  }

  buttonLogin() {
    this.setState({ error: '', authenticating: true });

    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                this.setState({ error: '', authenticating: false });
                this.checkBusiness(this.state.email, this.state.password);
                // this.registerForPushNotifications();
            })
            .catch(() => {
              Alert.alert(
                'Authentication failed',
                'Invalid email or password.',
                [
                  // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                  {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
              )
              //Login was not successful, let's create a new account
                firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                    .then(() => { this.setState({ error: '', authenticating: false }); })
                    .catch(() => {
                        this.setState({ error: 'Authentication failed.', authenticating: false });
                    });
            });
  }

  async buttonFacebook() {
    let {type, token} = await Expo.Facebook.logInWithReadPermissionsAsync(
    '1058001241030936', { permissions: ['public_profile'] })

      if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`);
      Alert.alert(
        'Logged in!',
        `Hi ${(await response.json()).name}!`,
      );
    }
  }

  authenticate() {
    this.props.navigation.navigate('Register');
  }

  skip() {
  //   let headers = {
  //     'accept': 'application/json',
  //     'accept-encoding': 'gzip, deflate',
  //     'content-type': 'application/json'
  //   }
  //
  //   let data = {
  //     "to": "ExponentPushToken[bA_VlPE-r8-DQUnBA7jI7p]",
  //     "sound": "default",
  //     "body": "Hello world!"
  //   };
  //
  //   return fetch('https://exp.host/--/api/v2/push/send', {
  //    method: "POST",
  //    headers: headers,
  //    body:  JSON.stringify(data)
  //  })
  //  .then(function(response){
  //    console.log("Its connected");
  //    return response.json();
  //    // this.socket.onopen = () => this.socket.send(JSON.stringify({type: 'greet', payload: 'data'}));
  //  })
  //  .then(function(data){
  //   console.log(data);
  // });
    this.props.navigation.navigate('Home', {isLogged: false});
  }

  renderCurrentState() {
      return (
        <View style={styles.contain}>
          <Text style={styles.title}>Login</Text>
            <TextInput
              style={[styles.inputText, styles.inputBody]}
              placeholder='Email'
              value={this.state.email}
              onChangeText={(email) => this.changeEmail(email)}
            />
            <TextInput
              style={[styles.inputText, styles.inputBody]}
              placeholder='Password'
              value={this.state.password}
              secureTextEntry
              onChangeText={(password) => this.changePassword(password)}
            />
            <TouchableHighlight
              style={styles.buttonSingIn}
              onPress={() => this.buttonLogin()}>
                <Text style={styles.singIn}>Sing In</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.button}
              onPress={() => this.buttonFacebook()}>
                <View>
                  <Text style={styles.textButton}>Sing In with Facebook</Text>
                  <Icon
                    name='logo-facebook'
                    style={{ fontSize: 66, color: 'white', marginTop: -40}}
                  />
                </View>
            </TouchableHighlight>
            <TouchableHighlight
              style={{alignItems: 'center', marginTop: 120}}
              onPress={() => this.skip()}
            >
              <Text style={styles.auth}>Skip</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{alignItems: 'center', marginTop: 10}}
              onPress={() => this.authenticate()}
            >
              <Text style={styles.auth}>No account? Create one!</Text>
            </TouchableHighlight>
          </View>
      );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.subcontainer}>
          <Icon
            name='ios-person'
            style={{fontSize: 100}}
          />
        </View>
        {this.renderCurrentState()}
      </View>
    );
  }
}

export default Login;

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
      fontSize: 16
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
    inputText: {
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
