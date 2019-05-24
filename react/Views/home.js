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
import Creator from '../Models/Creator';
import SettingsScreen from './Settings';
import {Image, TouchableOpacity, Platform, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation';


type Props = {};
export class HomeScreen extends Component<Props> {
  constructor(props){
    super(props);

    this.state = {listings: [], creators: []};
    this.handleListingClick = this.handleListingClick.bind(this)
    this.handleNewListing = this.handleNewListing.bind(this)
    this.handleProfileClick = this.handleProfileClick.bind(this)
  }

  handleListingClick(lis){
    this.props.navigation.navigate('ReviewListing', {listing: lis});
  }

  handleProfileClick(cr){
    this.props.navigation.navigate('Profile', {creator: cr});
  }

  handleNewListing(){
    this.props.navigation.navigate('NewListing', {callback: this.populateListings.bind(this)});
  }

  componentDidMount(){
    this.populateListings();
    this.populateCreators();
  }

  async populateCreators(){
    let response = await fetch('http://localhost:8080/creators');
    let responseJson = await response.json();

    const tempCreators = responseJson.map(function(obj) {
      return new Creator(obj.pic, obj.name, obj.user_id);
    });
    this.setState({creators: tempCreators});
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
      <View style={{flex: 1}}>
      <View style={styles.container_home}>
        <View style={styles.testA}>
          <Button title="new listing"
            onPress={this.handleNewListing}
          />
        </View>

      </View>
      <View style={styles.container_listing}>
        {this.state.listings.map((lis, key) => (
          <TouchableOpacity style={{margin:10, fontWeight: "bold"}} key={key} onPress={() => this.handleListingClick(lis)}>
            <Text>{lis.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>

        <View style={{alignItems: 'center', margin: 10}}>
          <Text>Suggested Creators</Text>
        </View>

          <View style={{backgroundColor: '#F5FCFF', flexDirection: 'row', justifyContent: 'space-between'}}>


          {this.state.creators.map((cr, key) => (
            <TouchableOpacity style={{margin:10}} key={key} onPress={() => this.handleProfileClick(cr)}>

                <View>
                  <Image
                    style={{width: 80, height: 80}}
                    source={{uri: cr.picture}}
                  />
                </View>

                <View style={{alignItems: 'center'}}>
                  <Text>{cr.name}</Text>
                </View>

            </TouchableOpacity>

          ))}
          </View>




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
