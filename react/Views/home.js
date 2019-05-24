/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {styles} from '../Styles';
import Listing from '../Models/Listing';
import SettingsScreen from './Settings';
import {Platform, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation';


type Props = {};
export class HomeScreen extends Component<Props> {
  constructor(props){
    super(props);

    this.state = {listings: []};

    this.handleNewListing = this.handleNewListing.bind(this)
  }

  handleNewListing(){
    this.props.navigation.navigate('NewListing');
  }

  componentDidMount(){
    this.populateListings();
  }

  async populateListings(){
    let response = await fetch('http://localhost:8080/listings');
    let responseJson = await response.json();
    //pic title description user_id
    const tempListings = responseJson.map(function(obj) {
      return new Listing(obj.pic, obj.title, obj.description, obj.user_id);
    });
    this.setState({listings: tempListings});
  }

  render() {
    return (
      <View style={styles.container_home}>
        <View style={styles.testA}>
          <Button title="new listing"
            onPress={this.handleNewListing}
          />
        </View>
        {this.state.listings.map((lis, key) => (
          <Text key={key}>{lis.toString()}</Text>
        ))}
      </View>
    );
  }
}

const TabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Settings: SettingsScreen,
});

export default createAppContainer(TabNavigator);
