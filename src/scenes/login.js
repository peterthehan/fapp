'use strict';

import React, {
  AsyncStorage,
  Component,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import Button from '../components/button';
import Header from '../components/header';

import Signup from './signup';
import Home from './home';

import Firebase from 'firebase';
let app = new Firebase("poopapp1.firebaseio.com");

import styles from '../styles/common-styles.js';

const backgroundImage = '../images/coco_color_0.jpg';

export default class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      loaded: true
    }
  }

  render() {
    return (
      <Image
        source = {require('../images/coco_color_20.jpg')}
        style={styles.backgroundImage}>
        <Header text = "POOP" loaded = {this.state.loaded}/>
        <View style = {styles.body}>
          <TextInput
            style = {styles.textinput}
            onChangeText = {(text) => this.setState({email: text})}
            value = {this.state.email}
            placeholder = {"Email Address"}
            placeholderTextColor = 'white'
            underlineColorAndroid = 'white'/>
          <TextInput
            style = {styles.textinput}
            onChangeText = {(text) => this.setState({password: text})}
            value = {this.state.password}
            secureTextEntry = {true}
            placeholder = {"Password"}
            placeholderTextColor = 'white'
            underlineColorAndroid = 'white'/>
          <Button
            text = "Log in"
            onpress = {this.login.bind(this)}
            button_styles = {styles.primary_button}
            button_text_styles = {styles.primary_button_text}/>
          <Button
            text = "Create an account"
            onpress = {this.goToSignup.bind(this)}
            button_styles = {styles.transparent_button}
            button_text_styles = {styles.transparent_button_text}/>
        </View>
      </Image>
    );
  }

  login() {
    this.setState({loaded: false});

    app.authWithPassword({
      "email": this.state.email,
      "password": this.state.password
      },
      (error, user_data) => {
      this.setState({loaded: true});

      if(error) {
        alert('Login Failed. Please try again');
      } else {
        AsyncStorage.setItem('user_data', JSON.stringify(user_data));
        this.props.navigator.push({component: Home});
      }
    });
  }

  goToSignup() {
    this.props.navigator.push({
      component: Signup,
      type: 'index1'
    });
  }
}

module.exports = Login;
