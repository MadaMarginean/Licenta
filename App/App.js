import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { DrawerNavigator } from 'react-navigation';

import { Container, Content, Icon } from 'native-base';
import { Router, Scene } from 'react-native-router-flux';
import { NavigationActions } from 'react-navigation';

import * as firebase from 'firebase';

import Home from './components/main-components/Home';
import Recipes from './components/main-components/Recipes';
import Deserts from './components/main-components/Deserts';
import MyList from './components/main-components/MyList';
import MyFridge from './components/main-components/MyFridge';
import DrawerIcon from './components/utils/DrawerIcon';
import ImageHeader from './components/utils/ImageHeader';
import MealPage from './components/main-components/MealPage';
import Login from './components/main-components/Login';
import Register from './components/main-components/Register';
import Soups from './components/main-components/Soups';
import Contact from './components/main-components/Contact';

const MyApp = DrawerNavigator(
  {
    Home: {
      path: '/',
      screen: Home,
      navigationOptions: {
        drawerIcon: () => (<DrawerIcon iconName="home" size={24} />),
      }
    },
    Recipes: {
      path: '/recipes',
      screen: Recipes,
      key: 'R',
      navigationOptions: {
        drawerIcon: () => (<DrawerIcon iconName="ios-albums" size={24} />),
      },
    },
    Desert: {
      path: '/deserts',
      screen: Deserts,
      navigationOptions: {
        drawerIcon: () => (<DrawerIcon iconName="ios-ice-cream" size={24} />),
      },
    },
    Soups: {
      path: '/soups',
      screen: Soups,
      navigationOptions: {
        drawerIcon: () => (<DrawerIcon iconName="ios-cafe" size={24} />),
      },
    },
    MyList: {
      path: '/mylist',
      screen: MyList,
      navigationOptions: {
        drawerIcon: () => (<DrawerIcon iconName="ios-star" size={24} />),
      },

    },
    MyFridge: {
      path: '/myfridge',
      screen: MyFridge,
      navigationOptions: {
        drawerIcon: () => (<DrawerIcon iconName="list" size={24} />),
      },
    },
    Contact: {
      path: '/contact',
      screen: Contact,
      navigationOptions: {
        drawerIcon: () => (<DrawerIcon iconName="ios-mail" size={24} />),
      },
    },
    Login: {
      path: '/login',
      screen: Login,
      navigationOptions: {
        drawerIcon: () => null,
        drawerLabel: () => null
      },
    },
    Register: {
      path: '/register',
      screen: Register,
      navigationOptions: {
        drawerIcon: () => null,
        drawerLabel: () => null
      },
    },
    Details: {
      path: '/details',
      screen: MealPage,
      navigationOptions: {
        drawerIcon: () => null,
        drawerLabel: () => null
      },
    },
  },
  {
    initialRouteName: 'Home',
    drawerPosition: 'left',
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    drawerBackgroundColor: '#893667',
    contentOptions: {
      activeTintColor: '#F5F4EB',
      marginTop: 60
    },
    //contentComponent: () => <ImageHeader />,
  },
);

export default class App extends React.Component {
  componentWillMount() {
    const firebaseConfig = {
      apiKey: "AIzaSyDxrxKL6CRq8UDDbC0wQ6ZusdooYGp4v8w",
      authDomain: "mobile-applications-e8da2.firebaseapp.com",
      databaseURL: "https://mobile-applications-e8da2.firebaseio.com",
      projectId: "mobile-applications-e8da2",
      storageBucket: "mobile-applications-e8da2.appspot.com",
      messagingSenderId: "447954818796"
    }

    firebase.initializeApp(firebaseConfig);
  }

  render() {
    return (
      <MyApp />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
