'use strict'

import React, {
  Component,
  DatePickerAndroid,
  Image,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TimePickerAndroid,
  View
} from 'react-native';

import Button from '../components/button';
import Header from '../components/header';

import ButtonStyles from '../styles/button-styles';

var dateStartStr = 'pick a start date';
var dateEndStr = 'pick an end date';
var timeStartStr = 'pick a start time';
var timeEndStr = 'pick an end time';
class CreateEvent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      publicEvent: true,
      dateStart: dateStartStr,
      dateEnd: dateEndStr,
      timeStart: timeStartStr,
      timeEnd: timeEndStr,
      description: ''
    }
  }

  async showDatePicker(stateKey, options, start) {
    try {
      var newState = {};
      var tempDate = new Date();
      var tempDateStr = tempDate.toLocaleDateString();
      const {action, year, month, day} = await DatePickerAndroid.open(options);

      if (action === DatePickerAndroid.dismissedAction) {
        if(start) {
          tempDateStr = this.state.dateStart;
        } else {
          tempDateStr = this.state.dateEnd;
        }
      } else {
        tempDate = new Date(year, month, day);
        tempDateStr = tempDate.toLocaleDateString();
      }
      if(start) {
        this.setState({dateStart: tempDateStr});
      } else {
        this.setState({dateEnd: tempDateStr});
      }
    } catch ({code, message}) {
      console.warn(`Error in example '${stateKey}': `, message);
    }
  }

  async showTimePicker(stateKey, start) {

    var tempMin, tempHour;
    try {
      const {action, minute, hour} = await TimePickerAndroid.open();
      tempMin = minute;
      tempHour = hour;
      var tempTimeStr = '';
      if (action === TimePickerAndroid.dismissedAction) {
        if(start) {
          tempTimeStr = this.state.timeStart;
        } else {
          tempTimeStr = this.state.timeEnd;
        }
      } else if(action === TimePickerAndroid.timeSetAction){
        tempTimeStr = this.formatTime(hour, minute);

      }
      if(start) {
        this.setState({timeStart: tempTimeStr});
      } else {
        this.setState({timeEnd: tempTimeStr});
      }
    } catch ({code, message}) {
      console.warn(`Error in example '${stateKey}': `, message);
    }
  }

  formatTime(hour, minute) {
    var str = '';
    var hStr = '';
    var mStr = '';
    var isAM = false;

    if(hour == 0){
      hStr = 12;
    }
    else if(hour > 12){
      hStr = hour-12;
    }
    else{
      hStr = hour;
    }
    if( hour < 12 && hour >= 0 ){
      isAM = true;
    }
    return hStr + ':' + (minute < 10 ? '0' + minute : minute) + (isAM ? ' am' : ' pm');
  }


  render(){
    return(
      <View style = {{flex: 1}}>
        {this.renderPageTitle()}
        {this.renderToggle()}
        {this.renderTitleInput()}
        {this.renderDateTimeInput()}
        {this.renderDescriptionInput()}
        {this.renderButtons()}
      </View>
    );
  }

  renderPageTitle(){
    return(
      <Header
        navigator = {this.props.navigator}
        text = "Create a New Event"
        hasBack = {true}
      />
    );
  }

  renderToggle(){
    return(
      <View style = {{alignSelf:'flex-end', flexDirection:'column'}}>

        <Switch
          onTintColor = "#0000ff"
          onValueChange = {(value) => this.setState({publicEvent: value})}
          style = {{marginBottom: 10}}
          value = {this.state.publicEvent}
        />
        <Text style={{color:'black'}}>
          {this.state.publicEvent ? ' Public Event' : 'Private Event'}
        </Text>
      </View>
    );
  }

  renderTitleInput(){
    return(
      <TextInput
        blurOnSubmit = {true}
        onChangeText = {(text) => this.setState({title: text})}
        value = {this.state.title}
        placeholder = {"Give Your Event a Title."}
        placeholderTextColor = 'gray'
        underlineColorAndroid = 'black'
      />
    );
  }

  renderDateTimeInput(){
    return (
      <View>
        <View style={{flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
          <Text style={{color:'black', textDecorationLine:'underline'}}>
            date
          </Text>
          <Text style={{color:'black', textDecorationLine:'underline'}}>
            time
          </Text>
        </View>
        <Text style = {{color:'black'}}>
          Event Starts:
        </Text>
        <View style = {{borderWidth: 1,          borderColor:'blue',justifyContent:'space-around', flexDirection:'row'}}>
          <TouchableWithoutFeedback onPress = {
            this.showDatePicker.bind(this, 'min', {
              date: this.state.minDate,
              minDate: new Date(),
            }, true)
          }>
            <Text style = { [ {color:'gray'}, this.state.dateStart != dateStartStr && {color:'black'} ] }>
              {this.state.dateStart}
            </Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress = {this.showTimePicker.bind(this, true)}>
            <Text style = { [ {color:'gray'}, this.state.timeStart != timeStartStr && {color:'black'} ] }>
              {this.state.timeStart}
            </Text>
          </TouchableWithoutFeedback>

        </View>
        <Text style = {{color:'black'}}>
          Event Ends:
        </Text>

        <View style = {{borderWidth: 1, borderColor:'blue', justifyContent:'space-around', flexDirection:'row'}}>

          <TouchableWithoutFeedback onPress = {
            this.showDatePicker.bind(this, 'min', {
              date: this.state.minDate,
              minDate: new Date(this.state.dateStart),
            }, false )
          }>
            <Text style = { [ {color:'gray'}, this.state.dateEnd != dateEndStr && {color:'black'} ] }>
              {this.state.dateEnd}
            </Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress = {this.showTimePicker.bind(this)}>
            <Text style = { [ {color:'gray'}, this.state.timeEnd != timeEndStr && {color:'black'} ] }>
              {this.state.timeEnd}
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }

  renderDescriptionInput(){
    var limit = 1000;
    var remainder = limit - this.state.description.length;
    var remainderColor = remainder > 5 ? 'blue' : 'red';

    return (
      <View>
        <TextInput
          maxLength = {limit}
          multiline = {true}
          style = {{color:'black'}}
          onChangeText = {(text) => this.setState({description: text})}
          value = {this.state.description}
          placeholder = {"Leave a short description of your event for your guests: (maximum "+limit+" characters.)"}
          placeholderTextColor = 'grey'
          underlineColorAndroid = 'black'
        />
        <Text style = {{color: remainderColor}}>
          remaining: {remainder}
        </Text>
      </View>
    );
  }

  renderButtons(){
    return (
      <View style = {{alignItems: 'center'}}>
        <Button
          text = "Invite Friends!"
          onPress = {this.createGuestList.bind(this)}
          button_styles = {ButtonStyles.primary_button}
          button_text_styles = {ButtonStyles.primary_button_text}
        />

        <Button
          text = "Create Event!"
          onPress = {this.createEvent.bind(this)}
          button_styles = {ButtonStyles.primary_button}
          button_text_styles = {ButtonStyles.primary_button_text}
        />

      <Button
        text = "Clear"
        onPress = {this.clearEvent.bind(this)}
        button_styles = {ButtonStyles.primary_button}
        button_text_styles = {ButtonStyles.primary_button_text}
      />

    </View>
    );
  }

  createGuestList(){
    alert('friends list unimplemented')
  }

  createEvent(){
    alert(
      'title: '+ this.state.title + "\n" +
      (this.state.publicEvent? 'public ':'private') + " event \n" +
      'start date: ' + this.state.dateStart + "\n" +
      'end date: ' + this.state.dateEnd + "\n" +
      'start time: ' + this.state.timeStart + "\n" +
      'end time: ' + this.state.timeEnd + "\n" +
      'description: ' + this.state.description
    );
  }

  clearEvent(){
    alert('Cleared :(');
    this.setState({
      title: '',
      publicEvent: true,
      dateStart: dateStartStr,
      dateEnd: dateEndStr,
      timeStart: timeStartStr,
      timeEnd: timeEndStr,
      description: ''
    })

  }
}

module.exports = CreateEvent;
