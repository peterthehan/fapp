'use strict';

const React = require('react-native');
const { StyleSheet, View, Text, TextInput } = React;
const Button = require('../base/button');
const Dimensions = require('Dimensions');
const windowSize = Dimensions.get('window');

class LoginScene extends React.Component {

  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
    }
  }

  render() {
    return(
      <View
        style = {styles.container} >
        <Text
          style = {styles.label} >
          Username
        </Text>
        <TextInput
          style = {styles.input}
          onChangeText = {(username) => this.setState({username})} />
        <Text
          style = {styles.label} >
          Password
        </Text>
        <TextInput
          style = {styles.input}
          onChangeText = {(password) => this.setState({password})} />
        <Button
          onPress={this.buttonClicked.bind(this)}
          color={'#2196F3'}
          text={'Log In'} />
      </View>
    );
  }

  buttonClicked(){
    // authenticate with firebase
    // change to home scene
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    color: '#2196F3',
  },
  input: {
    width: windowSize.width,
    height: 50,
  },
});

export default LoginScene;
