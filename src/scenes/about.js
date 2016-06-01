'use strict';

import React, {
  Alert,
  Component,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import AppBar from '../components/app-bar';
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

        <AppBar
          image = {require('../images/logo.png')}
        />

        <Text style = {styles.memberTitle}>
          Product Manager&nbsp;
          <Text style = {styles.memberName}>
            Peter Han
          </Text>
        </Text>
        <Text style = {styles.memberTitle}>
          Software Development Lead&nbsp;
          <Text style = {styles.memberName}>
            Andrew Han
          </Text>
        </Text>
        <Text style = {styles.memberTitle}>
          Quality Assurance Lead&nbsp;
          <Text style = {styles.memberName}>
            RJ Dioneda
          </Text>
        </Text>
        <Text style = {styles.memberTitle}>
           Algorithm Specialist&nbsp;
          <Text style = {styles.memberName}>
            Jessica Lin
          </Text>
        </Text>
        <Text style = {styles.memberTitle}>
          User Interface Specialist&nbsp;
          <Text style = {styles.memberName}>
             Emma Li
          </Text>
        </Text>
        <Text style = {styles.memberTitle}>
          Software Architect&nbsp;
          <Text style = {styles.memberName}>
            Vinson Gong
          </Text>
        </Text>
        <Text style = {styles.memberTitle}>
          Business Analyst&nbsp;
          <Text style = {styles.memberName}>
            Ketan Kelkar
          </Text>
        </Text>
        <Text style = {styles.memberTitle}>
          Senior System Analyst&nbsp;
          <Text style = {styles.memberName}>
            David Le
          </Text>
        </Text>
        <Text style = {styles.memberTitle}>
          Database Specialist&nbsp;
          <Text style = {styles.memberName}>
            Daniel Seong
          </Text>
        </Text>
        <Text style = {styles.memberTitle}>
          Database Specialist&nbsp;
          <Text style = {styles.memberName}>
            Jonathan Shuai
          </Text>
        </Text>

        <Button
          buttonStyles = {styles.buttonStyle1}
          buttonTextStyles = {styles.buttonTextStyles}
          onPress = {this.source.bind(this)}
          text = "Open Source Libraries"
          underlayColor = {'gray'}
        />
        <Button
          buttonStyles = {styles.buttonStyle2}
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
  buttonStyle1: {
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 8,
    padding: 12,
  },
  buttonStyle2: {
    alignItems: 'center',
    marginHorizontal: 16,
    padding: 12,
  },
  buttonTextStyles: {
    fontSize: 16,
  },
  header: {
    fontSize: 14,
    textAlign: 'center',
  },
  memberName: {
    color: '#F26D6A',
    fontWeight: 'bold',
  },
  memberTitle: {
    fontSize: 14,
    marginLeft: 54,
    textAlign: 'left',
  },
});

module.exports = About;
