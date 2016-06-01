'use strict';

import React, {
  Alert,
  Component,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Button from '../components/button';
import Policy from './about-policy';
import Source from './about-source';
import TitleBar from '../components/title-bar';

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <ScrollView>
      <View style = {{flex: 1}}>
        <TitleBar
          hasBack = {"true"}
          navigator = {this.props.navigator}
          text = "About"
        />
        <Text style = {styles.appName}>
          Fapp
        </Text>
        <TouchableOpacity onPress = {this.display.bind(this)}>
          <Text style = {styles.header}>
            By Team POOP
          </Text>
        </TouchableOpacity>
        <Text style = {styles.header}>
          Version 1.0.0
        </Text>

        <View style = {styles.imageView}>
          <Image
            style = {styles.image}
            source = {require('../images/logo.png')}
          />
        </View>

        <View style = {styles.memberView}>
          <View style = {styles.memberTitleView}>
            <Text style = {styles.memberTitle}>
              Product Manager
            </Text>
            <Text style = {styles.memberTitle}>
              Software Development Lead
            </Text>
            <Text style = {styles.memberTitle}>
              Quality Assurance Lead
            </Text>
            <Text style = {styles.memberTitle}>
              Algorithm Specialist
            </Text>
            <Text style = {styles.memberTitle}>
              User Interface Specialist
            </Text>
            <Text style = {styles.memberTitle}>
              Software Architect
            </Text>
            <Text style = {styles.memberTitle}>
              Business Analyst
            </Text>
            <Text style = {styles.memberTitle}>
              Senior System Analyst
            </Text>
            <Text style = {styles.memberTitle}>
              Database Specialist
            </Text>
            <Text style = {styles.memberTitle}>
              Database Specialist
            </Text>
          </View>

          <View style = {styles.memberNameView}>
            <Text style = {styles.memberName}>
              Peter Han
            </Text>
            <Text style = {styles.memberName}>
              Andrew Han
            </Text>
            <Text style = {styles.memberName}>
              RJ Dioneda
            </Text>
            <Text style = {styles.memberName}>
              Jessica Lin
            </Text>
            <Text style = {styles.memberName}>
              Emma Li
            </Text>
            <Text style = {styles.memberName}>
              Vinson Gong
            </Text>
            <Text style = {styles.memberName}>
              Ketan Kelkar
            </Text>
            <Text style = {styles.memberName}>
              David Le
            </Text>
            <Text style = {styles.memberName}>
              Daniel Seong
            </Text>
            <Text style = {styles.memberName}>
              Jonathan Shuai
            </Text>
          </View>
        </View>

        <Button
          buttonStyles = {styles.buttonStyle}
          buttonTextStyles = {styles.buttonTextStyles}
          onPress = {this.source.bind(this)}
          text = "Open Source Libraries"
          underlayColor = {'gray'}
        />
        <Button
          buttonStyles = {styles.buttonStyle}
          buttonTextStyles = {styles.buttonTextStyles}
          onPress = {this.policy.bind(this)}
          text = "Privacy Policy"
          underlayColor = {'gray'}
        />
      </View>
      </ScrollView>
    );
  }

  display() {
    Alert.alert('', 'People Order Our Programs');
  }

  source() {
    this.props.navigator.push({component: Source});
  }

  policy() {
    this.props.navigator.push({component: Policy});
  }
}

const styles = StyleSheet.create({
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imageView: {
    alignItems: 'center',
    margin: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  buttonStyle: {
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 4,
    padding: 8,
  },
  buttonTextStyles: {
    fontSize: 16,
  },
  header: {
    fontSize: 14,
    textAlign: 'center',
  },
  memberView: {
    flexDirection: 'row',
  },
  memberTitleView: {
    flex: 1,
    alignItems: 'flex-end',
  },
  memberTitle: {
    fontSize: 13,
    textAlign: 'right',
    margin: 3,
  },
  memberNameView: {
    flex: 1,
    alignItems: 'flex-start',
  },
  memberName: {
    color: '#F26D6A',
    fontWeight: 'bold',
    fontSize: 13,
    textAlign: 'left',
    margin: 3,
  },
});

module.exports = About;
