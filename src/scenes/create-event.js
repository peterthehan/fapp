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
  View
} from 'react-native';

import Button from '../components/button';
import Header from '../components/header';

import ButtonStyles from '../styles/button-styles';

class CreateEvent extends Component {

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

  render(){
    return(
      <View style = {{backgroundColor: 'orange', flex: 1}}>
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
        text = "Create a New Event"
        loaded = {this.state.loaded}
      />
    );
  }

  renderToggle(){
    return(
      <View style = {{flexDirection:'row'}}>
        <Switch
          onTintColor = "#0000ff"
          onValueChange = {(value) => this.setState({publicEvent: value})}
          style = {{marginBottom: 10}}
          value = {this.state.publicEvent}
        />
        <Text>
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
        placeholderTextColor = 'black'
        underlineColorAndroid = 'black'
      />
    );
  }

  renderDateTimeInput(){
    return (
      <View>
        <Text style = {{color:'white'}}>
          Start:
        </Text>
        <View style = {{ flexDirection:'row'}}>
          <TouchableWithoutFeedback onPress = {
            this.showDatePicker.bind(this, 'min', {
              date: this.state.minDate,
              minDate: new Date(),
            }, true)
          }>
            <Text style = {{color:'black'}}>
              {this.state.dateStart}
            </Text>
          </TouchableWithoutFeedback>
        </View>
        <Text style = {{color:'white'}}>
          End:
        </Text>
        <View style = {{ flexDirection:'row'}}>
          <View style = {{ flexDirection:'row'}}>
            <TouchableWithoutFeedback onPress = {
              this.showDatePicker.bind(this, 'min', {
                date: this.state.minDate,
                minDate: new Date(this.state.dateStart),
              }, false )
            }>
              <Text style = {{color:'black'}}>
                {this.state.dateEnd}
              </Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    );
  }

  renderDescriptionInput(){
    var limit = 100;
    var remainder = limit - this.state.description.length;
    var remainderColor = remainder > 5 ? 'blue' : 'red';

    return (
      <View>
        <TextInput
          maxLength = {limit}
          multiline = {true}
          style = {Header.body, {color:'black'}}
          onChangeText = {(text) => this.setState({description: text})}
          value = {this.state.description}
          placeholder = {"Leave a short description of your event for your guests:"}
          placeholderTextColor = 'black'
          underlineColorAndroid = 'black'
        />
        <Text style = {{color: remainderColor}}>
          {remainder}
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

    alert(this.state.title)
    alert('this event is a public event: ' + this.state.publicEvent);
    alert('start: ' + this.state.dateStart + ' end: ' + this.state.dateEnd);
    alert(this.state.description);
  }

  clearEvent(){
    alert('Cleared :(');
    this.setState({
      title: '',
      publicEvent: true,
      dateStart: 'pick a start date',
      dateEnd: 'pick an end date',
      description: ''
    })

  }
}

module.exports = CreateEvent;
