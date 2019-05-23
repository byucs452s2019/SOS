/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {styles} from './Styles'
import HomeScreen from './Views/home';
import NewListingScreen from './Views/NewListingScreen';
import Register from './Views/register';
import {Platform, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
class Login extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {text: '', pass: ''};

    this.handleLogin = this.handleLogin.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
  }

  handleLogin(){
    //TODO: Verify login info
    this.props.navigation.navigate('Home');
  }

  handleRegister(){
    this.props.navigation.navigate('Register');
  }


  render() {
    return (
      <View style={styles.container}>
        <Text>SOS LOGO PLACEHOLDER</Text>

        <View style={styles.container_row}>
          <Text>Username: </Text>
          <TextInput
            placeholder="username"
            onChangeText={(text) => this.setState({text})}
          />
        </View>

        <View style={styles.container_row}>
          <Text>Password: </Text>
          <TextInput
            placeholder="Password"
            onChangeText={(pass) => this.setState({pass})}
          />
        </View>
        <View style={styles.button}>
          <Button
            color="white"
            title="Submit"
            onPress={this.handleLogin}
          />
        </View>
        <View style={styles.container_row}>
          <Button
            title="New User? - Register"
            onPress={this.handleRegister}
          />
        </View>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  Login: {
    screen: Login
  },
  Home: {
    screen: HomeScreen
  },
  Register: {
    screen: Register
  },
  NewListing: {
    screen: NewListingScreen
  },
  },
  {
    initialRouteName: 'Login',
  });

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component<Props> {
  render(){
    return <AppContainer/>;
  }
}
