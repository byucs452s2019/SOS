/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {styles} from '../Styles'
import RegisterPresenter from '../Presenters/RegisterPresenter';
import {Platform, Picker, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import ImagePicker from 'react-native-image-picker';



type Props = {};
export default class Register extends Component<Props> {
  constructor(props){
    super(props);

    this.state = {showBName: false, ProfileType: "user", firstName: "", lastName: "", businessName: "",
    username: "", email: "", password: "", avatar: ""}
    this.registerPresenter = new RegisterPresenter(this);
    this.handleRegister = this.handleRegister.bind(this)
    this.handleAvatar = this.handleAvatar.bind(this);

  }

  handleAvatar(){
    ImagePicker.showImagePicker({
      title: "Select Image"
    }, res => {
      if (res.didCancel){
        console.log("cancel");
      } else if (res.error){
        console.log("error", res.error);
      } else {
        this.setState({
          avatar: res
        });
      }
    });

  }

  handleRegister(){
    let profile = this.state.ProfileType;
    let firstName = this.state.firstName;
    let lastName = this.state.lastName;
    let businessName = this.state.businessName;
    let username = this.state.username;
    let email = this.state.email;
    let password = this.state.password;
    let avatar = this.state.avatar;

    this.registerPresenter.handleRegister(profile,firstName,lastName,
       username, email, password, avatar,businessName);
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.button}>
          <Button
            color="white"
            title="Upload Avatar"
            onPress={this.handleAvatar}
            />
        </View>

      {/* Profile Type */}
        <View style={styles.container_row}>
          <Text style={{fontSize: 18, flex: .5, textAlign: 'center'}}>Profile Type: </Text>
          <Picker
              selectedValue={this.state.ProfileType}
              style={{ justifyContent: 'flex-start', flex:.5}}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ showBName: !this.state.showBName,ProfileType: itemValue})
              }>
            <Picker.Item label="User" value="user"/>
            <Picker.Item label="Creator" value="creator"/>
          </Picker>
        </View>

        {/* First Name */}
        <View style={styles.container_row}>
          <Text style={{fontSize: 18}}>First Name: </Text>
          <TextInput
            placeholder=" First Name"
            onChangeText={(firstName) => this.setState({firstName})}
          />
        </View>

        {/* Last Name */}
        <View style={styles.container_row}>
          <Text style={{fontSize: 18}}>Last Name: </Text>
          <TextInput
            placeholder=" Last Name"
            onChangeText={(lastName) => this.setState({lastName})}
          />
        </View>

        {/* Business Name */}
        {this.state.showBName ? <View style={styles.container_row}>
          <Text style={{fontSize: 18}}>Business Name: </Text>
          <TextInput
            placeholder=" Business Name"
            onChangeText={(businessName) => this.setState({businessName})}
          />
        </View> : null}

        {/* Username */}
        <View style={styles.container_row}>
          <Text style={{fontSize: 18}}>Username: </Text>
          <TextInput
            placeholder=" Username"
            onChangeText={(username) => this.setState({username})}
          />
        </View>

        {/* email */}
        <View style={styles.container_row}>
          <Text style={{fontSize: 18}}>e-mail address: </Text>
          <TextInput
            placeholder=" e-mail"
            onChangeText={(email) => this.setState({email})}
          />
        </View>

        {/* password */}
        <View style={styles.container_row}>
          <Text style={{fontSize: 18}}>Password: </Text>
          <TextInput
            placeholder=" Password"
            secureTextEntry={true}
            onChangeText={(password) => this.setState({password})}
          />
        </View>
        <View style={styles.button}>
          <Button color="white"
            title="Register"
            onPress={this.handleRegister}
          />
        </View>


      </View>
    );
  }
}
