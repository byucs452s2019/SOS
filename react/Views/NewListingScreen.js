/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
//import listingContainer from '../ListingContainer';
import Listing from '../Models/Listing';
import ListingPresenter from '../Presenters/ListingPresenter';
import SettingsScreen from './Settings';
import {styles} from '../Styles'
import {Platform, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation';


type Props = {};
export default class NewListingScreen extends Component<Props> {
  constructor(props){
    super(props);

    this.state={picture: "", title: "", description: "", userID: "0", }
    this.listingPresenter = new ListingPresenter();
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(){
    let pic = this.state.picture
    let title = this.state.title
    let desc = this.state.description
    let id = this.state.userID
    //let temp = new Listing(pic,title,desc,id);

    await this.listingPresenter.createListing(pic,title,desc,id);

    this.props.navigation.getParam('callback')();
    this.props.navigation.navigate('Home');


    //listingContainer.push(temp)

    //console.log(listingContainer[0].toString())


  }


  render() {
    return (
      <View style={styles.container_listing}>

        <View style={styles.testC}>
          <Text>Upload Pic </Text>
        </View>
        <TextInput
          placeholder="Title"
          onChangeText={(title) => this.setState({title})}
        />
        <TextInput
          placeholder="Description"
          onChangeText={(description) => this.setState({description})}
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
