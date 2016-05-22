'use strict'

import React, {
  Component,
  DatePickerAndroid,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TimePickerAndroid,
  View
} from 'react-native';

import Firebase from 'firebase';

import Button from '../components/button';
import ButtonStyles from '../styles/button-styles';
import TitleBar from '../components/title-bar';

const dateStartStr = 'Pick a Start Date';
const dateEndStr = 'Pick an End Date';
const timeStartStr = 'Pick a Start Time';
const timeEndStr = 'Pick an End Time';

let events = new Firebase("poopapp1.firebaseio.com/events");

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

  render() {
    return(
      <View style = {styles.container}>
        {this.renderTitleBar()}
        {this.renderTitleInput()}
        {this.renderDateTimeInput()}
        {this.renderToggle()}
        {this.renderDescriptionInput()}
        {this.renderButtons()}
      </View>
    );
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

    if(hour == 0) {
      hStr = 12;
    }
    else if(hour > 12) {
      hStr = hour - 12;
    } else {
      hStr = hour;
    }

    if( hour < 12 && hour >= 0 ) {
      isAM = true;
    }
    return hStr + ':' + (minute < 10 ? '0' + minute : minute) + (isAM ? ' am' : ' pm');
  }

  renderTitleBar() {
    return(
      <TitleBar
        navigator = {this.props.navigator}
        text = "Create an Event"
        hasBack = {true}
      />
    );
  }

  renderTitleInput() {
    return(
      <View>
        <Text style = {styles.smallText}>
          Title
        </Text>
        <TextInput
          style = {styles.titleInput}
          onChangeText = {(text) => this.setState({title: text})}
          value = {this.state.title}
          placeholder = {"Event Title"}
          placeholderTextColor = 'gray'
          underlineColorAndroid = 'gray'
        />
      </View>
    );
  }

  renderDateTimeInput() {
    return (
      <View>
        <View style = {styles.dateView}>
          <Text style = {styles.smallText}>
            From
          </Text>
          <View style = {styles.dateInputView}>
            <View style = {styles.dateInputField}>
              <TouchableWithoutFeedback
                onPress = {
                  this.showDatePicker.bind(this, 'min', {
                    date: this.state.minDate,
                    minDate: new Date(),
                  }, true)
                }>
                <Text style = { [ {color:'gray'}, this.state.dateStart != dateStartStr && {color:'black'} ] }>
                  {this.state.dateStart}
                </Text>
              </TouchableWithoutFeedback>
            </View>
            <View style = {styles.dateInputField}>
              <TouchableWithoutFeedback
                onPress = {this.showTimePicker.bind(this, true)}>
                <Text style = { [ {color:'gray'}, this.state.timeStart != timeStartStr && {color:'black'} ] }>
                  {this.state.timeStart}
                </Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
        <View style = {styles.dateView}>
          <Text style = {styles.smallText}>
            To
          </Text>
          <View style = {styles.dateInputView}>
            <View style = {styles.dateInputField}>
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
            </View>
            <View style = {styles.dateInputField}>
              <TouchableWithoutFeedback
                onPress = {this.showTimePicker.bind(this)}>
                <Text style = { [ {color:'gray'}, this.state.timeEnd != timeEndStr && {color:'black'} ] }>
                  {this.state.timeEnd}
                </Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
      </View>
    );
  }

  renderToggle() {
    return(
      <View style = {styles.visibilityView}>
        <Switch
          onValueChange = {(value) => this.setState({publicEvent: value})}
          style = {styles.visibilityToggle}
          value = {this.state.publicEvent}
        />
        <Text style = {styles.visibilityText}>
          {this.state.publicEvent ? ' Public Event' : 'Private Event'}
        </Text>
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
          style = {{color:'black'}}
          onChangeText = {(text) => this.setState({description: text})}
          value = {this.state.description}
          numberOfLines = {5}
          placeholder = {"Leave a short description of your event for your guests"}
          placeholderTextColor = 'gray'
          underlineColorAndroid = 'gray'
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
          text = "Invite Friends!"
          onPress = {this.createGuestList.bind(this)}
          buttonStyles = {styles.button}
          buttonTextStyles = {ButtonStyles.primaryButtonText}
          underlayColor = {"#A2A2A2"}
        />
        <Button
          text = "Create Event!"
          onPress = {this.createEvent.bind(this)}
          buttonStyles = {styles.button}
          buttonTextStyles = {ButtonStyles.primaryButtonText}
          underlayColor = {"#A2A2A2"}
        />
        <Button
          text = "Clear"
          onPress = {this.clearEvent.bind(this)}
          buttonStyles = {styles.button}
          buttonTextStyles = {ButtonStyles.primaryButtonText}
          underlayColor = {"#A2A2A2"}
        />
      </View>
    );
  }

  createGuestList() {
    alert('Friends list unimplemented.');
  }

  createEvent() {
    events.push({
      title: this.state.title,
      description: this.state.description,
      startDate: this.state.dateStart,
      startTime: this.state.timeStart,
      endDate: this.state.dateEnd,
      endTime: this.state.timeEnd,
      photo: 'https://s-media-cache-ak0.pinimg.com/236x/d8/0d/1e/d80d1efe3a4b6b4d8bd186bdd788902c.jpg',
      isPublic: this.state.publicEvent
    });
  }

  clearEvent() {
    alert('Cleared :(');
    this.setState({
      title: '',
      publicEvent: true,
      dateStart: dateStartStr,
      dateEnd: dateEndStr,
      timeStart: timeStartStr,
      timeEnd: timeEndStr,
      description: ''
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  smallText: {
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
    borderWidth: 1,
    borderColor: 'gray',
    padding: 5,
    margin: 5,
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
    borderWidth: 1,
    borderColor: 'gray',
    margin: 5,
  },
  descriptionInput: {

  },
  button: {
    padding: 12,
    marginLeft: 16,
    marginRight: 16,
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 4,
    backgroundColor: '#009688'
  },
});

module.exports = CreateEvent;
