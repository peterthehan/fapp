'use strict'

import React, {
  Alert,
  AsyncStorage,
  Component,
  DatePickerAndroid,
  StyleSheet,
  Text,
  TextInput,
  TimePickerAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import Firebase from 'firebase';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import Button from '../components/button';
import TitleBar from '../components/title-bar';

const dateStartStr = 'Pick a Start Date';
const dateEndStr = 'Pick an End Date';
const timeStartStr = 'Pick a Start Time';
const timeEndStr = 'Pick an End Time';

let events = new Firebase("poopapp1.firebaseio.com/events");

class CreateEvent extends Component {
  constructor(props) {
    super(props);
    var self = this;
    var loggedUserId;
    AsyncStorage.getItem('user_data', (error, result) => {
      loggedUserId = JSON.parse(result).uid;

      self.setState({
        loggedUser: loggedUserId,
      });
    });
    this.state = {
      dateEnd: dateEndStr,
      dateStart: dateStartStr,
      description: '',
      publicEvent: true,
      timeEnd: timeEndStr,
      timeStart: timeStartStr,
      title: '',
    }
  }

  render() {
    return(
      <View style = {styles.container}>
        {this.renderTitleBar()}
        <View style = {{flexDirection: 'row'}}>
          {this.renderTitleInput()}
          {this.renderToggle()}
        </View>
        {this.renderDateTimeInput()}
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

      if(action === DatePickerAndroid.dismissedAction) {
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
    } catch({code, message}) {
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
      if(action === TimePickerAndroid.dismissedAction) {
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
    } catch({code, message}) {
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
    } else if(hour > 12) {
      hStr = hour - 12;
    } else {
      hStr = hour;
    }

    if(hour < 12 && hour >= 0) {
      isAM = true;
    }
    return hStr + ':' + (minute < 10 ? '0' + minute : minute) + (isAM ? ' am' : ' pm');
  }

  renderTitleBar() {
    return(
      <TitleBar
        hasBack = {true}
        navigator = {this.props.navigator}
        text = "Create an Event"
      />
    );
  }

  renderTitleInput() {
    return (
      <View style = {styles.titleView}>
        <Text style = {styles.smallText}>
          Title
        </Text>
        <TextInput
          onChangeText = {(text) => this.setState({title: text})}
          placeholder = {"Event Title"}
          placeholderTextColor = 'gray'
          style = {styles.titleInput}
          underlineColorAndroid = 'gray'
          value = {this.state.title}
        />
      </View>
    );
  }

  renderToggle() {
    return(
      <View style = {styles.visibilityView}>
        <View style = {styles.toggleView}>
          <TouchableOpacity
            onPress = {() => this.setState({publicEvent: true})}
            disabled = {this.state.publicEvent ? true : false}
          >
            <MaterialIcon
              color = {this.state.publicEvent ? '#F26D6A' : 'gray'}
              name = {'public'}
              size = {36}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress = {() => this.setState({publicEvent: false})}
            disabled = {this.state.publicEvent ? false : true}
          >
            <MaterialIcon
              color = {this.state.publicEvent ? 'gray' : '#F26D6A'}
              name = {'group'}
              size = {36}
            />
          </TouchableOpacity>
        </View>
        <Text style = {styles.visibilityText}>
          {this.state.publicEvent ? 'Public Event' : 'Private Event'}
        </Text>
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

  renderDescriptionInput() {
    var limit = 140;
    var remainder = limit - this.state.description.length;
    var remainderColor = remainder > 5 ? 'gray' : '#B71C1C';

    return (
      <View style = {styles.descriptionView}>
        <Text style = {styles.smallText}>
          Description
        </Text>
        <View style = {styles.descriptionInput}>
          <TextInput
            maxLength = {limit}
            multiline = {true}
            numberOfLines = {3}
            onChangeText = {(text) => this.setState({description: text})}
            placeholder = {"Leave a short description of your event for your guests"}
            placeholderTextColor = 'gray'
            underlineColorAndroid = 'gray'
            value = {this.state.description}
          />
          <Text style = {[styles.remainderText, {color: remainderColor}]}>
            {remainder} / {limit}
          </Text>
        </View>
      </View>
    );
  }

  renderButtons() {
    return (
      <View style = {styles.buttonView}>
        <Button
          buttonStyles = {styles.button}
          buttonTextStyles = {styles.buttonText}
          onPress = {this.createGuestList.bind(this)}
          text = "Invite Friends!"
          underlayColor = {"#A2A2A2"}
        />
        <Button
          buttonStyles = {styles.button}
          buttonTextStyles = {styles.buttonText}
          onPress = {this.createEvent.bind(this)}
          text = "Create Event!"
          underlayColor = {"#A2A2A2"}
        />
        <Button
          buttonStyles = {styles.button}
          buttonTextStyles = {styles.buttonText}
          onPress = {this.clearEvent.bind(this)}
          text = "Clear"
          underlayColor = {"#A2A2A2"}
        />
      </View>
    );
  }

  createGuestList() {
    alert('Friends list unimplemented.');
  }

  createEvent() {
    if( this.state.title === '') {
      Alert.alert('', 'Missing event title');
    } else if( this.state.dateStart == dateStartStr) {
      Alert.alert('', 'Missing start date.');
    } else if( this.state.timeStart === timeStartStr) {
      Alert.alert('', 'Missing start time.');
    } else if( this.state.dateEnd === dateEndStr) {
      Alert.alert('', 'Missing end date.');
    } else if( this.state.timeEnd === timeEndStr) {
      Alert.alert('', 'Missing end time.');
    } else if( this.state.description === '') {
      Alert.alert('', 'Missing event description.');
    } else{
      events.push({
        userID: this.state.loggedUser,
        description: this.state.description,
        endDate: this.state.dateEnd,
        endTime: this.state.timeEnd,
        isPublic: this.state.publicEvent,
        photo: 'https://s-media-cache-ak0.pinimg.com/236x/d8/0d/1e/d80d1efe3a4b6b4d8bd186bdd788902c.jpg',
        startDate: this.state.dateStart,
        startTime: this.state.timeStart,
        title: this.state.title,
      });
      this.props.navigator.pop();
    }
  }

  clearEvent() {
    this.setState({
      description: '',
      dateEnd: dateEndStr,
      dateStart: dateStartStr,
      publicEvent: true,
      timeEnd: timeEndStr,
      timeStart: timeStartStr,
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
  titleView: {
    flex: 3,
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
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  toggleView: {
    flexDirection: 'row',
  },
  visibilityToggle: {
  },
  visibilityText: {
    color: 'black',
  },
  descriptionView: {
  },
  descriptionInput: {
    borderColor: 'gray',
    borderWidth: 1,
    margin: 5,
  },
  remainderText: {
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  buttonView: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#F26D6A',
    padding: 12,
    margin: 10,
  },
  buttonText: {
    color: 'white',
  },
});

module.exports = CreateEvent;
