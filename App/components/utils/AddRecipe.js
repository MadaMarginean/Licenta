import React, { Component} from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Image, TouchableHighlight, AsyncStorage, Alert } from 'react-native';
import { Icon, Container, Content, Header, Left } from 'native-base';
import { List, ListItem } from 'react-native-elements';
import Toast, {DURATION} from 'react-native-easy-toast';
import * as firebase from 'firebase';

import MainHeader from '../utils/Header';
import DrawerIcon from '../utils/DrawerIcon';
import Logo from '../../assets/purpleLogoText.png';

export default class AddRecipe extends Component {
  state = {
    minutes: "1 min",
    strMeal: 'Thai Green Curry',
    strArea: 'Thai',
    strCategory: 'Chicken',
    strInstructions: "Put the potatoes in a pan of boiling water and cook for 5 minutes. Throw in the beans and cook for a further 3 minutes, by which time both should be just tender but not too soft. Drain and put to one side.\r\nIn a wok or large frying pan, heat the oil until very hot, then drop in the garlic and cook until golden, this should take only a few seconds. Don’t let it go very dark or it will spoil the taste. Spoon in the curry paste and stir it around for a few seconds to begin to cook the spices and release all the flavours. Next, pour in the coconut milk and let it come to a bubble.\r\nStir in the fish sauce and sugar, then the pieces of chicken. Turn the heat down to a simmer and cook, covered, for about 8 minutes until the chicken is cooked.\r\nTip in the potatoes and beans and let them warm through in the hot coconut milk, then add a lovely citrussy flavour by stirring in the shredded lime leaves (or lime zest). The basil leaves go in next, but only leave them briefly on the heat or they will quickly lose their brightness. Scatter with the lime garnish and serve immediately with boiled rice.",
    strMealThumb: 'https://www.themealdb.com/images/media/meals/sstssx1487349585.jpg',
    strSource: 'https://sueandgambo.com/pages/shrimp-chow-fun',
    strTags: 'Curry,Mild',
    strYoutube: 'https://www.youtube.com/watch?v=LIbKVpBQKJI',
    strIngredient1: 'potatoes',
    strIngredient2: 'green beans',
    strIngredient3: 'sunflower oil',
    strIngredient4: 'garlic',
    strIngredient5: 'Thai green curry paste',
    strIngredient6: 'coconut milk',
    strIngredient7: 'Thai fish sauce',
    strIngredient8: 'Sugar',
    strIngredient9: 'Chicken',
    strIngredient10: 'lime',
    strMeasure1: '225g new',
    strMeasure2: '100g',
    strMeasure3: '1 tbsp',
    strMeasure4: '1 clove',
    strMeasure5: '4 tsp',
    strMeasure6: '400ml',
    strMeasure7: '2 tsp',
    strMeasure8: '1 tsp',
    strMeasure9: '450g boneless',
    strMeasure10: '2 fresh kaffir leaves',
    list: [],
    fridgeList: []
  }

  changeMeal(strMeal) {
    this.setState({strMeal});
  }

  changeArea(strArea) {
    this.setState({strArea});
  }

  changeCategory(strCategory) {
    this.setState({strCategory});
  }

  changeInstructions(strInstructions) {
    this.setState({strInstructions});
  }

  changeMealThub(strMealThumb) {
    this.setState({strMealThumb});
  }

  changeMinutes(minutes) {
    this.setState({minutes});
  }

  changeSource(strSource) {
    this.setState({strSource});
  }

  changeTags(strTags) {
    this.setState({strTags});
  }

  changeYoutube(strYoutube) {
    this.setState({strYoutube});
  }

  changeIngr1(strIngredient1) {
    this.setState({strIngredient1});
  }
  changeIngr2(strIngredient2) {
    this.setState({strIngredient2});
  }
  changeIngr3(strIngredient3) {
    this.setState({strIngredient3});
  }
  changeIngr4(strIngredient4) {
    this.setState({strIngredient4});
  }
  changeIngr5(strIngredient5) {
    this.setState({strIngredient5});
  }
  changeIngr6(strIngredient6) {
    this.setState({strIngredient6});
  }
  changeIngr7(strIngredient7) {
    this.setState({strIngredient7});
  }
  changeIngr8(strIngredient8) {
    this.setState({strIngredient8});
  }
  changeIngr9(strIngredient9) {
    this.setState({strIngredient9});
  }
  changeIngr10(strIngredient10) {
    this.setState({strIngredient10});
  }

  changeMeas1(strMeasure1) {
    this.setState({strMeasure1});
  }
  changeMeas2(strMeasure2) {
    this.setState({strMeasure2});
  }
  changeMeas3(strMeasure3) {
    this.setState({strMeasure3});
  }
  changeMeas4(strMeasure4) {
    this.setState({strMeasure4});
  }
  changeMeas5(strMeasure5) {
    this.setState({strMeasure5});
  }
  changeMeas6(strMeasure6) {
    this.setState({strMeasure6});
  }
  changeMeas7(strMeasure7) {
    this.setState({strMeasure7});
  }
  changeMeas8(strMeasure8) {
    this.setState({strMeasure8});
  }
  changeMeas9(strMeasure9) {
    this.setState({strMeasure9});
  }
  changeMeas10(strMeasure10) {
    this.setState({strMeasure10});
  }

  notify() {
    let headers = {
      'accept': 'application/json',
      'accept-encoding': 'gzip, deflate',
      'content-type': 'application/json'
    }

    let data = {
      "to": "ExponentPushToken[bA_VlPE-r8-DQUnBA7jI7p]",
      "sound": "default",
      "body": `A new recipe was added: ${this.state.strMeal}`
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

  buttonPressed() {
    let id = this.props.navigation.state.params.lastId.toString();
    console.log("id", id);

    this.refs.toast.show('Successfully added.');
    // this.notify();
    var headers= {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    }
    var data = {
      "idMeal": id,//this.state.fridgeList !== undefined ? (parseInt(this.state.fridgeList[this.state.fridgeList.length-1].idIngr) + 1).toString() : "0",
      "dateModified": null,
      "strCategory": this.state.strCategory,
      "strArea": this.state.strArea,
      "strIngredient1": this.state.strIngredient1,
      "strIngredient2": this.state.strIngredient2,
      "strIngredient3": this.state.strIngredient3,
      "strIngredient4": this.state.strIngredient4,
      "strIngredient5": this.state.strIngredient5,
      "strIngredient6": this.state.strIngredient6,
      "strIngredient7": this.state.strIngredient7,
      "strIngredient8": this.state.strIngredient8,
      "strIngredient9": this.state.strIngredient9,
      "strIngredient10": this.state.strIngredient10,
      "strIngredient11": "",
      "strIngredient12": "",
      "strIngredient13": "",
      "strIngredient14": "",
      "strIngredient15": "",
      "strIngredient16": "",
      "strIngredient17": "",
      "strIngredient18": "",
      "strIngredient19": "",
      "strIngredient20": "",
      "strInstructions": this.state.strInstructions,
      "strMeal": this.state.strMeal,
      "strMealThumb": this.state.strMealThumb,
      "strMeasure1": this.state.strMeasure1,
      "strMeasure2": this.state.strMeasure2,
      "strMeasure3": this.state.strMeasure3,
      "strMeasure4": this.state.strMeasure4,
      "strMeasure5": this.state.strMeasure5,
      "strMeasure6": this.state.strMeasure6,
      "strMeasure7": this.state.strMeasure7,
      "strMeasure8": this.state.strMeasure8,
      "strMeasure9": this.state.strMeasure9,
      "strMeasure10": this.state.strMeasure10,
      "strMeasure11": "",
      "strMeasure12": "",
      "strMeasure13": "",
      "strMeasure14": "",
      "strMeasure15": "",
      "strMeasure16": "",
      "strMeasure17": "",
      "strMeasure18": "",
      "strMeasure19": "",
      "strMeasure20": "",
      "strSource": this.state.strSource,
      "strTags": this.state.strTags,
      "strYoutube": this.state.strYoutube
    }

     return fetch(`http://192.168.1.123:4000/${this.props.navigation.state.params.route}`, {
       method: "POST",
       headers: headers,
       body:  JSON.stringify(data)
     })
     .then(function(response){
       this.notify();
       console.log("Its connected");
       return response.json();
     }.bind(this))
     .then(function(data){
      console.log(data);
    });
  }

  render() {
    // console.log(this.props);
    return(
      <Container>
        <MainHeader navigation={this.props.navigation}/>
        <Content contentContainerStyle={styles.content}>
          <Image
            source={Logo}
            style={{marginTop: 0}}
          />
          <View>
          <Text style={styles.title}>Add a new recipe</Text>
          </View>
          <ScrollView style={{width: '100%'}}>
            <TextInput
              multiLine={true}
              style={[styles.input, styles.textArea]}
              placeholder='Meal name'
              value={this.state.strMeal}
              onChangeText={(strMeal) => this.changeMeal(strMeal)}
            />
            <TextInput
              multiLine={true}
              style={[styles.input, styles.textArea]}
              placeholder='Category'
              value={this.state.strCategory}
              onChangeText={(strCategory) => this.changeCategory(strCategory)}
            />
            <TextInput
              multiLine={true}
              style={[styles.input, styles.textArea]}
              placeholder='Area'
              value={this.state.strArea}
              onChangeText={(strArea) => this.changeArea(strArea)}
            />
            <TextInput
              multiLine={true}
              style={[styles.input, styles.textArea]}
              placeholder='Instructions'
              value={this.state.strInstructions}
              onChangeText={(strInstructions) => this.changeInstructions(strInstructions)}
            />
            <TextInput
              multiLine={true}
              style={[styles.input, styles.textArea]}
              placeholder='Time'
              value={this.state.minutes}
              onChangeText={(minutes) => this.changeMinutes(minutes)}
            />
            <TextInput
              multiLine={true}
              style={[styles.input, styles.textArea]}
              placeholder='Meal image url'
              value={this.state.strMealThumb}
              onChangeText={(strMealThumb) => this.changeMealThub(strMealThumb)}
            />
            <TextInput
              multiLine={true}
              style={[styles.input, styles.textArea]}
              placeholder='Source'
              value={this.state.strSource}
              onChangeText={(strSource) => this.changeSource(strSource)}
            />
            <TextInput
              multiLine={true}
              style={[styles.input, styles.textArea]}
              placeholder='Tags'
              value={this.state.strTags}
              onChangeText={(strTags) => this.changeTags(strTags)}
            />
            <TextInput
              multiLine={true}
              style={[styles.input, styles.textArea]}
              placeholder='YouTube link'
              value={this.state.strYoutube}
              onChangeText={(strYoutube) => this.changeYoutube(strYoutube)}
            />
            <View>
            <TextInput
              multiLine={true}
              style={[styles.inputI, styles.textArea]}
              placeholder='Ingredient'
              value={this.state.strIngredient1}
              onChangeText={(strIngredient1) => this.changeIngr1(strIngredient1)}
            />
            <TextInput
              multiLine={true}
              style={[styles.inputM, styles.textArea]}
              placeholder='Measure'
              value={this.state.strMeasure1}
              onChangeText={(strMeasure1) => this.changeMeas1(strMeasure1)}
            />
            </View>
            <TextInput
              multiLine={true}
              style={[styles.inputI, styles.textArea]}
              placeholder='Ingredient'
              value={this.state.strIngredient2}
              onChangeText={(strIngredient2) => this.changeIngr2(strIngredient2)}
            />
            <TextInput
              multiLine={true}
              style={[styles.inputM, styles.textArea]}
              placeholder='Measure'
              value={this.state.strMeasure2}
              onChangeText={(strMeasure2) => this.changeMeas2(strMeasure2)}
            />
            <TextInput
              multiLine={true}
              style={[styles.inputI, styles.textArea]}
              placeholder='Ingredient'
              value={this.state.strIngredient3}
              onChangeText={(strIngredient3) => this.changeIngr3(strIngredient3)}
            />
            <TextInput
              multiLine={true}
              style={[styles.inputM, styles.textArea]}
              placeholder='Measure'
              value={this.state.strMeasure3}
              onChangeText={(strMeasure3) => this.changeMeas3(strMeasure3)}
            />
            <TextInput
              multiLine={true}
              style={[styles.inputI, styles.textArea]}
              placeholder='Ingredient'
              value={this.state.strIngredient4}
              onChangeText={(strIngredient4) => this.changeIngr4(strIngredient4)}
            />
            <TextInput
              multiLine={true}
              style={[styles.inputM, styles.textArea]}
              placeholder='Measure'
              value={this.state.strMeasure4}
              onChangeText={(strMeasure4) => this.changeMeas4(strMeasure4)}
            />
            <TextInput
              multiLine={true}
              style={[styles.inputI, styles.textArea]}
              placeholder='Ingredient'
              value={this.state.strIngredient5}
              onChangeText={(strIngredient5) => this.changeIngr5(strIngredient5)}
            />
            <TextInput
              multiLine={true}
              style={[styles.inputM, styles.textArea]}
              placeholder='Measure'
              value={this.state.strMeasure5}
              onChangeText={(strMeasure5) => this.changeMeas5(strMeasure5)}
            />
            <TextInput
              multiLine={true}
              style={[styles.inputI, styles.textArea]}
              placeholder='Ingredient'
              value={this.state.strIngredient6}
              onChangeText={(strIngredient6) => this.changeIngr6(strIngredient6)}
            />
            <TextInput
              multiLine={true}
              style={[styles.inputM, styles.textArea]}
              placeholder='Measure'
              value={this.state.strMeasure6}
              onChangeText={(strMeasure6) => this.changeMeas6(strMeasure6)}
            />
            <TextInput
              multiLine={true}
              style={[styles.inputI, styles.textArea]}
              placeholder='Ingredient'
              value={this.state.strIngredient7}
              onChangeText={(strIngredient7) => this.changeIngr7(strIngredient7)}
            />
            <TextInput
              multiLine={true}
              style={[styles.inputM, styles.textArea]}
              placeholder='Measure'
              value={this.state.strMeasure7}
              onChangeText={(strMeasure7) => this.changeMeas7(strMeasure7)}
            />
            <TextInput
              multiLine={true}
              style={[styles.inputI, styles.textArea]}
              placeholder='Ingredient'
              value={this.state.strIngredient8}
              onChangeText={(strIngredient8) => this.changeIngr8(strIngredient8)}
            />
            <TextInput
              multiLine={true}
              style={[styles.inputM, styles.textArea]}
              placeholder='Measure'
              value={this.state.strMeasure8}
              onChangeText={(strMeasure8) => this.changeMeas8(strMeasure8)}
            />
            <TextInput
              multiLine={true}
              style={[styles.inputI, styles.textArea]}
              placeholder='Ingredient'
              value={this.state.strIngredient9}
              onChangeText={(strIngredient9) => this.changeIngr9(strIngredient9)}
            />
            <TextInput
              multiLine={true}
              style={[styles.inputM, styles.textArea]}
              placeholder='Measure'
              value={this.state.strMeasure9}
              onChangeText={(strMeasure9) => this.changeMeas9(strMeasure9)}
            />
            <TextInput
              multiLine={true}
              style={[styles.inputI, styles.textArea]}
              placeholder='Ingredient'
              value={this.state.strIngredient10}
              onChangeText={(strIngredient10) => this.changeIngr10(strIngredient10)}
            />
            <TextInput
              multiLine={true}
              style={[styles.inputM, styles.textArea]}
              placeholder='Measure'
              value={this.state.strMeasure10}
              onChangeText={(strMeasure10) => this.changeMeas10(strMeasure10)}
            />
            <TouchableHighlight
              style={styles.button}
              onPress={() => this.buttonPressed()}>
                <Text style={styles.textButton}>Add</Text>
            </TouchableHighlight>
          </ScrollView>
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
  input: {
    color: 'white',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    // marginBottom: 20,
    width: '100%',
    padding: 4,
    borderRadius: 10,
    marginBottom: 3,
  },
  textArea: {
    height: 40,
  },
  inputI: {
    color: 'white',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    // marginBottom: 20,
    width: '50%',
    padding: 4,
    borderRadius: 10,
    marginBottom: 3,
  },
  inputM: {
    color: 'white',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    // marginBottom: 20,
    width: '50%',
    marginLeft: 180,
    marginTop: -43,
    padding: 4,
    borderRadius: 10,
    marginBottom: 3,
  },
  title: {
    fontSize: 36,
    color: '#893667',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#893667',
    paddingTop: 15,
    paddingBottom: 15,
    width: '100%',
  },
  textButton: {
    textAlign: 'center',
    color: 'white'
  },
});
