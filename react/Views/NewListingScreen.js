/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
//import listingContainer from '../ListingContainer';
import ImagePicker from 'react-native-image-picker';
import Listing from '../Models/Listing';
import ListingPresenter from '../Presenters/ListingPresenter';
import SettingsScreen from './SettingsScreen';
import {styles} from '../Styles'
import {Platform, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation';


type Props = {};
export default class NewListingScreen extends Component<Props> {
  constructor(props){
    super(props);

    this.state={picture: "", title: "", description: "", userID: "0", }
    this.listingPresenter = new ListingPresenter(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImage = this.handleImage.bind(this);
  }

  handleImage(){
    ImagePicker.showImagePicker({
      title: "Select Image"
    }, res => {
      if (res.didCancel){
        console.log("cancel");
      } else if (res.error){
        console.log("error", res.error);
      } else {
        this.setState({
          picture: res
        });
      }
    });
  }

  async handleSubmit(){
    let pic = this.state.picture
    let title = this.state.title
    let desc = this.state.description
    let id = this.state.userID

    await this.listingPresenter.createListing(pic,title,desc,id);

    //this.props.navigation.getParam('callback')();
    //this.props.navigation.navigate('Home');

  }


  render() {
    return (
      <View style={styles.container_listing}>

        <View style={styles.button}>
          <Button
            color="white"
            title="Upload Image"
            onPress={this.handleImage}
            />
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
