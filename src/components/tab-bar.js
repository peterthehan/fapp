'use strict';

import React, {
  Animated,
  Component,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

class TabBar extends Component{
  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
  }

  constructor(props){
    super(props);
    this.state = {
      tabIcons: [],
    }
  }

  render() {
    const tabWidth = this.props.containerWidth / this.props.tabs.length;
    const left = this.props.scrollValue.interpolate({
      inputRange: [0, 1, ], outputRange: [0, tabWidth, ],
    });

    return (
      <View>
        <View style = {[styles.tabs, this.props.style]}>
          {this.props.tabs.map((tab, i) => {
            return (
              <TouchableOpacity
                key = {tab}
                onPress = {() => this.props.goToPage(i)}
                style = {styles.tab}>
                <Icon
                  name = {tab}
                  size = {30}
                  color = {this.props.activeTab == i ? '#F26D6A' : 'rgb(204,204,204)'}
                  ref = {(icon) => {this.state.tabIcons[i] = icon;}}
                />
              </TouchableOpacity>
            );
          })}
        </View>
        <Animated.View style = {[styles.tabUnderlineStyle, { width: tabWidth }, { left, }, ]} />
      </View>
    );
  }

  componentDidMount() {
    this.setAnimationValue(this.props.activeTab);
  }

  setAnimationValue(value) {
    this.state.tabIcons.forEach((icon, i) => {
      const progress = (value - i >= 0 && value - i <= 1) ? value - i : 1;
      icon.setNativeProps({
        style: {
          color: this.iconColor(progress)
        },
      });
    });
  }

  // color between rgb(59,89,152) and rgb(204,204,204)
  iconColor(progress) {
    const red = 242 + (204 - 242) * progress;
    const green = 109 + (204 - 109) * progress;
    const blue = 106 + (204 - 106) * progress;
    return `rgb(${red}, ${green}, ${blue})`;
  }
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  tabs: {
    height: 45,
    flexDirection: 'row',
    paddingTop: 5,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'black'
  },
  tabUnderlineStyle: {
    position: 'absolute',
    height: 3,
    backgroundColor: '#F26D6A',
    bottom: 0,
  },
});

module.exports = TabBar;
