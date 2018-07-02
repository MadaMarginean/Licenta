import React, { Component} from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Image, TouchableHighlight, AsyncStorage, Alert } from 'react-native';
import { Icon, Container, Content, Header, Left } from 'native-base';
import { List, ListItem } from 'react-native-elements';
import * as firebase from 'firebase';

import MainHeader from '../utils/Header';
import DrawerIcon from '../utils/DrawerIcon';
import Logo from '../../assets/purpleLogoText.png';

export default class AddRecipe extends Component {
  state = {
    strMeal: '',
    strArea: '',
    strCategory: '',
    strInstructions: '',
    strMealThumb: '',
    strSource: '',
    strTags: '',
    strYoutube: '',
    strIngredient1: '',
    strIngredient2: '',
    strIngredient3: '',
    strIngredient4: '',
    strIngredient5: '',
    strIngredient6: '',
    strIngredient7: '',
    strIngredient8: '',
    strIngredient9: '',
    strIngredient10: '',
    strMeasure1: '',
    strMeasure2: '',
    strMeasure3: '',
    strMeasure4: '',
    strMeasure5: '',
    strMeasure6: '',
    strMeasure7: '',
    strMeasure8: '',
    strMeasure9: '',
    strMeasure10: '',
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


  render() {
    return(
      <Container>
        <MainHeader navigation={this.props.navigation}/>
        <Content contentContainerStyle={styles.content}>
          <Image
            source={Logo}
            style={{marginTop: 0}}
          />
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
          </ScrollView>
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
});
