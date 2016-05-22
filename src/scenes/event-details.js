'use strict'

import React, {
  Component,
  Image,
  Switch,
  Text,
  View
} from 'react-native';

import Button from '../components/button';
import ButtonStyles from '../styles/button-styles';
import Comments from '../components/comments';
import TitleBar from '../components/title-bar';

let database = new Firebase("poopapp1.firebaseio.com");

class EventDetails extends Component {

  constructor(props){
    super(props);
    this.state = {
      isGoing: false,
    }
  }

  componentDidMount(){
    var eventSnapshot = this.props.state;
    this.setState({
      title: eventSnapshot.val().title,
      description: eventSnapshot.val().description,
      startDate: eventSnapshot.val().startDate,
      startTime: eventSnapshot.val().startTime,
      endDate: eventSnapshot.val().endDate,
      endTime: eventSnapshot.val().endTime,
      isPublic: eventSnapshot.val().isPublic,
      photo: eventSnapshot.val().photo,
    });
  }

  render() {
    return (
      <View style = {{flex: 10}}>
        <TitleBar
          navigator = {this.props.navigator}
          text = "Event Details"
          hasBack = {true}
        />
        <View style = {{flex: 2}}>
          <View style = {{flex: 3, flexDirection:'row', justifyContent: 'space-around'}}>
            <View style = {{width: 100, height: 100}}>
              <Image
                resizeMode = "cover"
                style = {{flex: 1}}
                source = {{uri: this.state.photo}}
              />
            </View>
            <View>
              <View><Text>{this.state.title}</Text></View>
              <View><Text>when</Text></View>
              <View><Text>where</Text></View>
            </View>
          </View>
          <View style = {{flex: 1, alignSelf: 'center'}}>
          <Text>{this.state.description}</Text>
          </View>
          <View style = {{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
            <View style = {{flex:1, alignItems:'center'}}>
              <Text>
                {this.state.isGoing ? 'Attending' : 'Not Attending'}
              </Text>
              <Switch
                onTintColor = "#00ff00"
                onValueChange = {(value) => this.setState({isGoing: value})}
                style = {{marginBottom: 10}}
                value = {this.state.isGoing}
              />
            </View>

            <View style = {{flex: 1}}>
              <Button
                text = "View Guestlist"
                onpress = {this.goToGuestList.bind(this)}
                buttonStyles = {ButtonStyles.primaryButton}
                buttonTextStyles = {ButtonStyles.primaryButtonText}
                underlayColor = {"#B18C40"}
              />
            </View>
          </View>
        </View>

        <Comments
          flex = {1}
          commentsArray = {[
            <Text>comments</Text>,<Text>comments2</Text>,<Text>comments3</Text>,
            <Text>comments</Text>,<Text>comments2</Text>,<Text>comments3</Text>,
            <Text>comments</Text>,<Text>comments2</Text>,<Text>comments3</Text>,
            <Text>comments</Text>,<Text>comments2</Text>,<Text>comments3</Text>,
            <Text>comments</Text>,<Text>comments2</Text>,<Text>comments3</Text>,
            <Text>comments</Text>,<Text>comments2</Text>,<Text>comments3</Text>,
            <Text>comments</Text>,<Text>comments2</Text>,<Text>comments3</Text>,
            <Text>comments</Text>,<Text>comments2</Text>,<Text>comments3</Text>,
            <Text>comments</Text>,<Text>comments2</Text>,<Text>comments3</Text>,
            <Text>comments</Text>,<Text>comments2</Text>,<Text>comments3</Text>,
            <Text>comments</Text>,<Text>comments2</Text>,<Text>comments3</Text>,
            <Text>comments</Text>,<Text>comments2</Text>,<Text>comments3</Text>,
            <Text>comments</Text>,<Text>comments2</Text>,<Text>comments3</Text>
          ]}
        />
      </View>
    );
  }

  goToGuestList(){
    alert('Guest list not implemented.');
  }
}
module.exports = EventDetails;
