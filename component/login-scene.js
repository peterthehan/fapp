import React, {
  Component,
  StyleSheet,
  View,
  Text,
  TextInput,
} from 'react-native';
import Button from 'react-native-button';
import Dimensions from 'Dimensions';
var windowSize = Dimensions.get('window');

class LoginScene extends Component {
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
        <Button onPress={this.buttonClicked.bind(this)}>Log In</Button>
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
    color: 'blue',
  },
  input: {
    width: windowSize.width,
    height: 50,
  },
});

export default LoginScene;
