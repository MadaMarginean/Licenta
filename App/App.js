import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { DrawerNavigator } from 'react-navigation';

import { Container, Content, Icon } from 'native-base';
import { Router, Scene } from 'react-native-router-flux';
import { NavigationActions } from 'react-navigation';

import Home from './components/main-components/Home';
import Recipes from './components/main-components/Recipes';
import Deserts from './components/main-components/Deserts';
import MyList from './components/main-components/MyList';
import DrawerIcon from './components/utils/DrawerIcon';
import ImageHeader from './components/utils/ImageHeader';
import MealPage from './components/main-components/MealPage';

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
        drawerIcon: () => (<DrawerIcon iconName="list" size={24} />),
      },
    },
    Deserts: {
      path: '/deserts',
      screen: Deserts,
      navigationOptions: {
        drawerIcon: () => (<DrawerIcon iconName="ios-arrow-dropright" size={24} />),
      },
    },
    MyList: {
      path: '/mylist',
      screen: MyList,
      navigationOptions: {
        drawerIcon: () => (<DrawerIcon iconName="ios-star" size={24} />),
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
