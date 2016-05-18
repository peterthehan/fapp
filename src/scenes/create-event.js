'use strict'

import React, {
  Component,
  DatePickerAndroid,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View
} from 'react-native';

import Button from '../components/button';
import Header from '../components/header';

import Main from './main';

import ButtonStyles from '../styles/button-styles';
import HeaderStyles from '../styles/header-styles';

export default class CreateEvent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loaded: true,

      title: '',
      publicEvent: true,
      date: new Date(),
      description: ''
    }
  }

  render(){

    var limit = 20;
    var remainder = limit - this.state.description.length;
    var remainderColor = remainder > 5 ? 'blue' : 'red';

    return(
      <View style={{backgroundColor: 'orange', flex: 1}}>

        {/*title, public event toggle*/}
        <View style={{flexDirection:'row'}}>
          <Header text = "Create a New Event" loaded={this.state.loaded} />
          <Switch
            onTintColor="#0000ff"
            onValueChange={(value) => this.setState({publicEvent: value})}
            style={{marginBottom: 10}}
            value={this.state.publicEvent} />
            <Text>{this.state.publicEvent ? 'Public' : 'Private'}</Text>
        </View>

        {/*event title*/}
        <TextInput
          style = {HeaderStyles.textinput}
          onChangeText = {(text) => this.setState({title: text})}
          value = {this.state.title}
          placeholder = {"Give Your Event a Title."}
          placeholderTextColor = 'white'
          underlineColorAndroid = 'white'/>

        {/*date and time*/}
        <View>
          <Text style={{color:'white'}}>Start:</Text>
            <View style={{ flexDirection:'row'}}>
              <Text>date and </Text>
              <Text>time</Text>
            </View>
          <Text style={{color:'white'}}>End:</Text>
            <View style={{ flexDirection:'row'}}>
              <Text>date and </Text>
              <Text>time</Text>
            </View>
        </View>

        {/*event description*/}
        <View>
          <TextInput
          maxLength = {limit}
          multiline={true}
          style = {Header.body, {color:'white'}}
          onChangeText = {(text) => this.setState({description: text})}
          value = {this.state.description}
          placeholder = {"Leave a short description of your event for your guests."}
          placeholderTextColor = 'white'
          underlineColorAndroid = 'white'/>
          <Text style={{color: remainderColor}}>
            {remainder}
          </Text>
        </View>

        {/*Invite Friends Button*/}

      <View style={{alignItems: 'center'}}>
        <Button
          text = "Invite Friends!"
          button_styles = {ButtonStyles.primary_button}
          button_text_styles = {ButtonStyles.primary_button_text}/>

          {/*Submit Button*/}

          <Button
            text = "Create Event"
            button_styles = {ButtonStyles.primary_button}
            button_text_styles = {ButtonStyles.primary_button_text}/>
        </View>

      </View>
    );
  }
}
  module.exports = CreateEvent;
