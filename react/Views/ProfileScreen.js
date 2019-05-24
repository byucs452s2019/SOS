/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {styles} from '../Styles'
import {Image, Platform, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation';


type Props = {};
export default class ProfileScreen extends Component<Props> {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <View style={styles.container_listing}>
        <View style={{margin:10, flexDirection: 'row'}}>
          <Image
            style={{height: 100, width: 100}}
            source={{uri: this.props.navigation.getParam('creator').picture}}
          />
          <View>
            <Text style={{fontSize: 38}}>{this.props.navigation.getParam('creator').name}</Text>

          </View>




        </View>



      </View>
    );
  }
}
