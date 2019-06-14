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
import SettingsScreen from './SettingsScreen';
import NotificationsScreen from './NotificationsScreen';
import {FlatList, Image, TouchableOpacity, Platform, Button, StyleSheet, Text, TextInput, View} from 'react-native';
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
    console.log(lis);
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
    let response = await fetch('http://74.208.18.28:8080/creators');
    let responseJson = await response.json();

    const tempCreators = responseJson.map(function(obj) {
      return new Creator(obj.avatar, obj.businessName, obj.id,obj.avgStarCreator);
    });
    this.setState({creators: tempCreators});
  }

  async populateListings(){
    let response = await fetch('http://74.208.18.28:8080/listings');
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
      <View style={{justifyContent: 'flex-start', alignItems: 'flex-start', backgroundColor: '#F5FCFF', flex: 2}}>

        <FlatList
          data={this.state.listings}
          renderItem={({item}) =>
          <TouchableOpacity style={{margin:10, fontWeight: "bold"}} onPress={() => this.handleListingClick(item)}>
            <Text>{item.title}</Text>
          </TouchableOpacity>
          }
          keyExtractor={(item, index) => index.toString()}
          />

      </View>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>

        <View style={{alignItems: 'center', margin: 10}}>
          <Text>Suggested Creators</Text>
        </View>

          <View style={{flex: 1,backgroundColor: '#F5FCFF', flexDirection: 'row', justifyContent: 'center'}}>

            <FlatList
              keyExtractor={(item, index) => index.toString()}
              horizontal={true}
              data={this.state.creators}
              renderItem={({item}) =>
              <TouchableOpacity style={{margin:10}} onPress={() => this.handleProfileClick(item)}>
                  <View>
                    <Image
                      style={{width: 80, height: 80}}
                      source={{uri: item.picture}}
                    />
                  </View>

                  <View style={{alignItems: 'center'}}>
                    <Text>{item.name}</Text>
                  </View>

              </TouchableOpacity>
            }
            />


          </View>




      </View>
    </View>
    );
  }
}

const TabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Settings: SettingsScreen,
  Notifications: NotificationsScreen,
});

export default createAppContainer(TabNavigator);
