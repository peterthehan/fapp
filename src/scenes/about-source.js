'use strict';

import React, {
  Alert,
  Component,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import ButtonStyles from '../styles/button-styles';
import TextStyles from '../styles/text-styles';
import TitleBar from '../components/title-bar';

let database = new Firebase("poopapp1.firebaseio.com");

class Source extends Component {
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
          text = "Privacy Policy"
        />
        <View>
          <Text style={styles.library}>firebase: 2.4.2</Text>
          <Text style={styles.library}>fgl-react: 2.2.0</Text>
          <Text style={styles.library}>gl-react-native: 2.24.0</Text>
          <Text style={styles.library}>react: 0.14.8</Text>
          <Text style={styles.library}>react-native: 0.25.1</Text>
          <Text style={styles.library}>react-native-action-button: 1.1.5</Text>
          <Text style={styles.library}>react-native-animatable: 0.6.0</Text>
          <Text style={styles.library}>react-native-image-picker: 0.18.15</Text>
          <Text style={styles.library}>react-native-radio-buttons: 0.11.0</Text>
          <Text style={styles.library}>react-native-scrollable-tab-view: 0.4.2</Text>
          <Text style={styles.library}>react-native-share: 1.0.10</Text>
          <Text style={styles.library}>react-native-slider: 0.7.1</Text>
          <Text style={styles.library}>react-native-vector-icons: 2.0.2</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    alignItems: 'stretch',
    fontSize: 18,
    margin: 14,
    textAlign: 'left',
  },
  library: {
    marginLeft: 4,
  },
});

module.exports = Source;
