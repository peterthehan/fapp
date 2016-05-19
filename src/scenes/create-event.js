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

export default class CreateEvent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loaded: true,

      title: '',
      publicEvent: true,
      dateStart: 'pick a start date',
      dateEnd: 'pick an end date',
      description: ''
    }
  }

  async showPicker(stateKey, options, start) {
  try {
    var newState = {};
    var tempDate = new Date();
    var tempDateStr = tempDate.toLocaleDateString();
    const {action, year, month, day} = await DatePickerAndroid.open(options);
    if (action === DatePickerAndroid.dismissedAction) {
      tempDateStr = 'dismissed';
      newState[stateKey + 'Text'] = 'dismissed';
    } else {
        tempDate = new Date(year, month, day);
        tempDateStr = tempDate.toLocaleDateString();

      }
      if( start ){
        this.setState({dateStart: tempDateStr});
      }
      else{
        this.setState({dateEnd: tempDateStr});
      }
      alert(this.state.dateStart);
      alert(this.state.dateEnd);
    } catch ({code, message}) {
      console.warn(`Error in example '${stateKey}': `, message);
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
              <TouchableWithoutFeedback
                onPress={this.showPicker.bind(this, 'min', {
                date: this.state.minDate,
                minDate: new Date(),
                }, true)}>
                <Text style={{color:'black'}}>{this.state.dateStart}</Text>
              </TouchableWithoutFeedback>
            </View>
          <Text style={{color:'white'}}>End:</Text>
            <View style={{ flexDirection:'row'}}>
            <View style={{ flexDirection:'row'}}>
              <TouchableWithoutFeedback
                onPress={this.showPicker.bind(this, 'min', {
                date: this.state.minDate,
                minDate: new Date(this.state.dateStart),
                }, false )}>
                <Text style={{color:'black'}}>{this.state.dateEnd}</Text>
              </TouchableWithoutFeedback>
            </View>
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
