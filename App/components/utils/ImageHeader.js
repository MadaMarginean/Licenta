import React, { Component} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import Logo from '../../assets/greyLogo.png';

export default class ImageHeader extends Component {
  render() {
    return (
        <View>
          <Image source={Logo} />
        </View>
    );
  }
}
