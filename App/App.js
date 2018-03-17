import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { DrawerNavigator } from 'react-navigation';

import { Container, Content, Icon } from 'native-base';

import Main from './Main';
import Main2 from './Main2';
import DrawerIcon from './components/utils/DrawerIcon';
import ImageHeader from './components/utils/ImageHeader';

const MyApp = DrawerNavigator(
  {
    Home: {
      path: '/',
      screen: Main,
      navigationOptions: {
        drawerIcon: () => (<DrawerIcon iconName="home" size={24} />),
      }
    },
    Recipes: {
      path: '/sec',
      screen: Main2,
      navigationOptions: {
        drawerIcon: () => (<DrawerIcon iconName="list" size={24} />),
      }
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
