/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {styles} from '../Styles'

import {Platform, Picker, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';


type Props = {};
export default class Register extends Component<Props> {
  constructor(props){
    super(props);

    this.state = {ProfileType: " "}
    this.handleRegister = this.handleRegister.bind(this)

  }

  handleRegister(){
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <View style={styles.container}>

      {/* Profile Type */}
        <View style={styles.container_row}>
          <Text style={{fontSize: 18, flex: .5, textAlign: 'center'}}>Profile Type: </Text>
          <Picker
              style={{ justifyContent: 'flex-start', flex:.5}}>
            <Picker.Item label="User" value="user"/>
            <Picker.Item label="Creator" value="creator"/>
          </Picker>
        </View>

        {/* First Name */}
        <View style={styles.container_row}>
          <Text style={{fontSize: 18}}>First Name: </Text>
          <TextInput
            placeholder=" First Name"
          />
        </View>

        {/* Last Name */}
        <View style={styles.container_row}>
          <Text style={{fontSize: 18}}>Last Name: </Text>
          <TextInput
            placeholder=" Last Name"
          />
        </View>

        {/* Business Name */}
        <View style={styles.container_row}>
          <Text style={{fontSize: 18}}>Business Name: </Text>
          <TextInput
            placeholder=" Business Name"
          />
        </View>

        {/* Username */}
        <View style={styles.container_row}>
          <Text style={{fontSize: 18}}>Username: </Text>
          <TextInput
            placeholder=" Username"
          />
        </View>

        {/* email */}
        <View style={styles.container_row}>
          <Text style={{fontSize: 18}}>e-mail address: </Text>
          <TextInput
            placeholder=" e-mail"
          />
        </View>

        {/* password */}
        <View style={styles.container_row}>
          <Text style={{fontSize: 18}}>Password: </Text>
          <TextInput
            placeholder=" Password"
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
