import React, { Component} from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, Animated, ListItem, List, Dimensions } from 'react-native';

import { Icon, Container, Content, Header, Left, Tab, Tabs, ScrollableTab } from 'native-base';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';

import MainHeader from '../utils/Header';
import IngredientsTab from './IngredientsTab';
import Logo from '../../assets/purpleLogoText.png';

export default class MealPage extends Component {
  constructor(props) {
    super(props);
  }

  state = {ingredients: []};

  getIngredients(meal) {
    var ingred = Object.keys(meal).map(function(key) {
      if ( meal[key] !== "" && key.includes("strIngredient")){
        return meal[key];
      }
    }).filter(function( element ) {
      return element !== undefined;
    });

    // this.setState({ingredients: ingred});
    // console.log("st", this.state.ingredients)


    // console.log("tifOptions", tifOptions);
     // for (let j = 0; j < parseMeal.length; j++) {
     //   console.log("!", JSON.stringify(parseMeal[j].value));
     // }
    //        if (JSON.stringify(selectedFrequency[j].value) === 'Daily')
    // let ingredients = [];
    // let a;
    // for (let j = 0; j < meal.length; j++) {
    //       if (meal[j].value === "Carrots") {
    //         console.log(meal[j]);
    //         ingredients.push(meal[j].value);
    //       }
    // }
    // return ingredients;
  }

  render() {
    let props = this.props.navigation.state.params;
    console.log("INGR ", this.state.ingredients);
    return (
      <HeaderImageScrollView
        maxHeight={200}
        minHeight={150}
        headerImage={{ uri: props.meal.strMealThumb }}
        renderForeground={() => (
            <View style={styles.titleContainer}>
              <Text style={styles.imageTitle}>{props.meal.strMeal}</Text>
            </View>
        )}
      >
        <View style={{ height: 1000 }}>
          <TriggeringView onHide={() => console.log("...")} >
            <Text style={styles.title}>{props.meal.strMeal}</Text>
            <Text style={styles.subtitle}>Ingredients: </Text>
            <TouchableHighlight
              style={styles.button}
              onPress={() => this.getIngredients.bind(this, props.meal)}>
                <Text style={styles.textButton}>Gather your family to the meal with our recipes!</Text>
            </TouchableHighlight>
          </TriggeringView>
        </View>
     </HeaderImageScrollView>
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
    marginLeft: 20
  },
  titleContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageTitle: {
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 24,
  },
  navTitleView: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
    opacity: 0,
  },
});
