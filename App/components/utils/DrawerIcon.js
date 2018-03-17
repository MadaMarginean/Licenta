import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Container, Content, Icon } from 'native-base';

const DrawerIcon = ({ iconName, iconSize, iconColor, polygonWidth, polygonHeight }) => (
  <Container style={styles.iconWrapper}>
    <Icon name={iconName} size={iconSize} color={iconColor} />
  </Container>
);

const styles = StyleSheet.create({
  iconWrapper: {
    width: 24,
    height: 24,
    marginTop: 10
  },
  icon: {
    position: 'absolute',
    top: 8,
    left: 28
  }
});

export default DrawerIcon;
