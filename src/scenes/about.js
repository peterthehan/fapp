'use strict';

import React, {
  Alert,
  Component,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import AppBar from '../components/app-bar';
import Button from '../components/button';
import ButtonStyles from '../styles/button-styles';
import Policy from './about-policy';
import Source from './about-source';
import TextStyles from '../styles/text-styles';
import TitleBar from '../components/title-bar';

let database = new Firebase("poopapp1.firebaseio.com");

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style = {{flex: 1}}>
        <TitleBar
          hasBack = {"true"}
          navigator = {this.props.navigator}
          text = "About"
        />
        <Text style={styles.appName}>Fapp</Text>
        <AppBar
          image = {require('../images/logo.png')}
        />
        <Text style={styles.version}>Version 1.0.0</Text>
        <Text style={styles.header}>Made by:</Text>

        <Text style={styles.memberTitle}>
          Product Manager:&nbsp;
          <Text style={styles.memberName}>
            Peter Han
          </Text>
        </Text>
        <Text style={styles.memberTitle}>
          Software Development Lead:&nbsp;
          <Text style={styles.memberName}>
            Andrew Han
          </Text>
        </Text>
        <Text style={styles.memberTitle}>
          Quality Assurance Lead:&nbsp;
          <Text style={styles.memberName}>
            RJ Dioneda
          </Text>
        </Text>
        <Text style={styles.memberTitle}>
           Algorithm Specialist:&nbsp;
          <Text style={styles.memberName}>
            Jessica Lin
          </Text>
        </Text>
        <Text style={styles.memberTitle}>
          User Interface Specialist:&nbsp;
          <Text style={styles.memberName}>
             Emma Li
          </Text>
        </Text>
        <Text style={styles.memberTitle}>
          Software Architect:&nbsp;
          <Text style={styles.memberName}>
            Vinson Gong
          </Text>
        </Text>
        <Text style={styles.memberTitle}>
          Business Analyst:&nbsp;
          <Text style={styles.memberName}>
            Ketan Kelkar
          </Text>
        </Text>
        <Text style={styles.memberTitle}>
          Senior System Analyst:&nbsp;
          <Text style={styles.memberName}>
            David Le
          </Text>
        </Text>
        <Text style={styles.memberTitle}>
          Database Specialist:&nbsp;
          <Text style={styles.memberName}>
            Daniel Seong
          </Text>
        </Text>
        <Text style={styles.memberTitle}>
          Database Specialist:&nbsp;
          <Text style={styles.memberName}>
            Jonathan Shuai
          </Text>
        </Text>

        <Button
          buttonStyles = {{}}
          buttonTextStyles = {styles.buttonStyle}
          onPress = {this.source.bind(this)}
          text = "Open Source Libraries Used"
          underlayColor = {'gray'}
        />
        <Button
          buttonStyles = {{}}
          buttonTextStyles = {styles.buttonStyle}
          onPress = {this.policy.bind(this)}
          text = "Privacy Policy"
          underlayColor = {'gray'}
        />
      </View>
    );
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
    textAlign: 'center',
    fontSize: 28,
  },
  version: {
    textAlign: 'center',
    fontSize: 14,
  },
  header: {
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  memberTitle: {
    textAlign: 'left',
    fontSize: 15,
    marginLeft: 40,
    color: '#000000',
  },
  memberName: {
    color: '#F26D6A',
  },
  buttonStyle: {
    alignItems: 'stretch',
    fontSize: 18,
    margin: 14,
    textAlign: 'center',
  },
});

module.exports = About;
