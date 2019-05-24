/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {styles} from '../Styles'

import {Platform, Button, StyleSheet, Text, Alert, TextInput, View} from 'react-native';
import {createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation';


type Props = {};
export default class ReviewListingScreen extends Component<Props> {
  constructor(props){
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.navHome = this.navHome.bind(this);

  }

  handleSubmit(){
    Alert.alert('Thank You!',"Your bid has been submitted",
     [
       {text: 'OK', onPress: this.navHome},
     ],
     {cancelable: false}
   )}

   navHome(){
     this.props.navigation.navigate('Home');
   }

  render() {
    return (
      <View style={styles.container_listing}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.picture}>
            <Text>PICTURE</Text>
          </View>
          <Text style={{margin:10}}> {this.props.navigation.getParam('listing').description} </Text>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <TextInput style={{margin:10, alignItems: 'center'}}
            placeholder="bid"
          />

          <View style={styles.button}>
            <Button
              onPress={this.handleSubmit}
              color="white"
              title="submit"
            />
          </View>
        </View>

      </View>
    );
  }
}
