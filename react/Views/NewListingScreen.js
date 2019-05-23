/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import SettingsScreen from './Settings';
import {styles} from '../Styles'
import {Platform, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation';


type Props = {};
export default class NewListingScreen extends Component<Props> {
  constructor(props){
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(){
    alert("function")
  }


  render() {
    return (
      <View style={styles.container_listing}>

        <View style={styles.testC}>
          <Text>Upload Pic </Text>
        </View>
        <TextInput
          placeholder="Title"
        />
        <TextInput
          placeholder="Description"
        />
        <View style={styles.button}>
          <Button
            color="white"
            title="Submit"
            onPress={this.handleSubmit}
          />
        </View>
      </View>
    );
  }
}
