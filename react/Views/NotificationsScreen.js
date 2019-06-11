import React, {Component} from 'react';
import {styles} from '../Styles'

import {Platform, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation';


type Props = {};
export default class NotificationsScreen extends Component<Props> {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text> Notifications </Text>
      </View>
    );
  }
}
