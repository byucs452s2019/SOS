/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import Home from './Views/home';
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

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(){
    this.props.navigation.navigate('Home');
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
            onPress={this.handleClick}
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
    screen: Home
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container_row: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flexDirection: 'row',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#7c95ca",
  }
});
