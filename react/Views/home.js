/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {styles} from '../Styles'

import SettingsScreen from './Settings';
import {Platform, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation';


type Props = {};
export class HomeScreen extends Component<Props> {
  constructor(props){
    super(props);

    this.handleNewListing = this.handleNewListing.bind(this)
  }

  handleNewListing(){
    this.props.navigation.navigate('NewListing');
  }

  render() {
    return (
      <View style={styles.container_home}>
        <View style={styles.testA}>
          <Button title="new listing"
            onPress={this.handleNewListing}
          />
        </View>
      </View>
    );
  }
}

const TabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Settings: SettingsScreen,
});

export default createAppContainer(TabNavigator);
