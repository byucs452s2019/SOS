/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import './shim.js';
import React, {Component} from 'react';
import {styles} from './Styles'
import LoginPresenter from './Presenters/LoginPresenter';
import ProfileScreen from './Views/ProfileScreen';
import ReviewListingScreen from './Views/ReviewListingScreen';
import HomeScreen from './Views/HomeScreen';
import NewListingScreen from './Views/NewListingScreen';
import RegisterScreen from './Views/RegisterScreen';
import {Platform, Button, Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';


type Props = {};
class Login extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {text: '', pass: ''};
    this.loginPresenter = new LoginPresenter(this);
    this.handleLogin = this.handleLogin.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
  }

  handleLogin(){
    //TODO: Verify login info
    let username = this.state.text;
    let password = this.state.pass;
    this.loginPresenter.handleLogin(username,password);
    //this.props.navigation.navigate('Home');
  }

  handleRegister(){
    this.props.navigation.navigate('Register');
  }


  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{width:200, height:200}}
          source={{uri:'http://tebbsja.com/sos.png'}}
        />

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
            secureTextEntry={true}
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
    screen: RegisterScreen
  },
  NewListing: {
    screen: NewListingScreen
  },
  ReviewListing: {
    screen: ReviewListingScreen
  },
  Profile: {
    screen: ProfileScreen
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
