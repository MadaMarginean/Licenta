import React, { Component} from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Button, TouchableHighlight } from 'react-native';

import { Icon, Container, Content, Header, Left } from 'native-base';
import { SearchBar } from 'react-native-elements';
import * as firebase from 'firebase';

import MainHeader from '../utils/Header';
import Logo from '../../assets/purpleLogoText.png';
import Example from '../utils/GridList';
import DrawerIcon from '../utils/DrawerIcon';

export default class Recipes extends Component {
  state = {
    data: [],
    searchText: '',
    dataSource: []
  }

  componentWillMount() {
    fetch('http://192.168.1.123:4000/meals')
      .then(response => {
        if (response.ok) {
          response.json().then(json => {
            this.setState({
              data: json,
              loaded: true,
              dataSource: json
            })
          });
        }
        else {
          console.log("NU");
        }
      });
  }

  empty() {
    console.log('empty');
    // this.setState({searchText: ''})
  }

  searchFilterFunction(text){
     const newData = this.state.data.filter(function(item){
       const itemData = item.strMeal.toLowerCase()
       const textData = text.toLowerCase()
         return itemData.search(textData) !== -1;
     })

     this.setState({
         dataSource: newData,
         searchText: text
     })
 }

 goToAddRecipe() {
   this.props.navigation.navigate('AddRecipe', {route: 'meal', lastId: this.state.data.length});
 }

  render() {
    return (
      <Container>
        <MainHeader navigation={this.props.navigation}/>
        <Content contentContainerStyle={styles.content}>
          <Image
            source={Logo}
            style={{marginTop: 0}}
          />
          <View style={{width: 300}}>
            <SearchBar
              onChangeText={(text)=>this.searchFilterFunction(text)}
              onClear={this.empty()}
              placeholder='Type Here...' />
          </View>
          {firebase.auth().currentUser && firebase.auth().currentUser.email == 'madalina_marginean1996@yahoo.com' ?
            <View>
              <TouchableHighlight
                style={styles.add}
                onPress={() => {this.goToAddRecipe()}}>
                <View style={{marginLeft:8}}>
                  <DrawerIcon iconName="ios-add-circle" size={24} iconColor='white'/>
                  <Text style={{marginLeft:35, marginTop: 4, fontSize: 16}}>Add</Text>
                </View>
              </TouchableHighlight>
            </View> : null}
          <Example
            navigation={this.props.navigation}
            data={this.state.dataSource}//{this.state.data}
            back={this.props.navigation.state.routeName}
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: '#424242',
    flex: 1,
    alignItems: 'center',
  },
  add: {
    width: 95,
    height: 50,
    backgroundColor: '#893667',
  },
});
