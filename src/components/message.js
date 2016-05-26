'use strict'

import React, {
  Component,
  DatePickerAndroid,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TimePickerAndroid,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import Firebase from 'firebase';

import Button from '../components/button';
import ButtonStyles from '../styles/button-styles';
import TitleBar from '../components/title-bar';

const dateStartStr = 'Pick a Start Date';
const dateEndStr = 'Pick an End Date';
const timeStartStr = 'Pick a Start Time';
const timeEndStr = 'Pick an End Time';

let messages = new Firebase("poopapp1.firebaseio.com/messages");

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      title: '',
    }
  }

  render() {
    return(
      <View style = {styles.container}>
        {this.renderTitleBar()}
        {this.renderTitleInput()}
        {this.renderDescriptionInput()}
        {this.renderButtons()}
      </View>
    );
  }

  renderTitleBar() {
    return(
      <TitleBar
        hasBack = {true}
        navigator = {this.props.navigator}
        text = "Send a Message"
      />
    );
  }

  renderTitleInput() {
    return (
      <View>
        <Text style = {styles.smallText}>
          Title
        </Text>
        <TextInput
          onChangeText = {(text) => this.setState({title: text})}
          placeholder = {"Message Title"}
          placeholderTextColor = 'gray'
          style = {styles.titleInput}
          underlineColorAndroid = 'gray'
          value = {this.state.title}
        />
      </View>
    );
  }

  renderDescriptionInput() {
    var limit = 1000;
    var remainder = limit - this.state.description.length;
    var remainderColor = remainder > 5 ? 'blue' : 'red';

    return (
      <View style = {styles.descriptionView}>
        <TextInput
          maxLength = {limit}
          multiline = {true}
          numberOfLines = {5}
          onChangeText = {(text) => this.setState({description: text})}
          placeholder = {"Leave a message"}
          placeholderTextColor = 'gray'
          style = {{color: 'black'}}
          underlineColorAndroid = 'gray'
          value = {this.state.description}
        />
        <Text style = {{color: remainderColor}}>
          remaining: {remainder}
        </Text>
      </View>
    );
  }

  renderButtons() {
    return (
      <View style = {{alignItems: 'center'}}>
        <Button
          buttonStyles = {styles.button}
          buttonTextStyles = {ButtonStyles.primaryButtonText}
          onPress = {this.createMessage.bind(this)}
          text = "Write Your Message!"
          underlayColor = {"#A2A2A2"}
        />
        <Button
          buttonStyles = {styles.button}
          buttonTextStyles = {ButtonStyles.primaryButtonText}
          onPress = {this.clearMessage.bind(this)}
          text = "Clear"
          underlayColor = {"#A2A2A2"}
        />
      </View>
    );
  }

  createMessage() {
    messages.push({
      description: this.state.description,
      title: this.state.title,
    });
    this.props.navigator.pop();
  }

  clearMessage() {
    alert('Cleared :(');
    this.setState({
      description: '',
      title: '',
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  smallText: {
    color: '#F26D6A',
    fontSize: 11,
    marginLeft: 5,
  },
  titleInput: {
    height: 32,
    paddingTop: 0,
  },
  dateView: {
    flexDirection: 'column',
  },
  dateInputView: {
    flexDirection: 'row',
  },
  dateInputField: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 5,
    padding: 5,
  },
  dateInputText: {
  },
  visibilityView: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  visibilityToggle: {
  },
  visibilityText: {
    color: 'black',
  },
  descriptionView: {
    borderColor: 'gray',
    borderWidth: 1,
    margin: 5,
  },
  descriptionInput: {
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#009688',
    marginBottom: 4,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 4,
    padding: 12,
  },
});

module.exports = Message;
