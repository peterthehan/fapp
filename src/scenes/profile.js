'use strict';

import ProfileGrid from '../profile-grid';
import React, {
  Component,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  View
} from 'react-native';

import HeaderStyles from '../styles/header-styles';

var pictures = [
  "https://img.buzzfeed.com/buzzfeed-static/static/2015-06/5/12/campaign_images/webdr05/what-comfort-food-should-you-choose-based-on-your-2-11396-1433522422-14_dblbig.jpg",
  "http://4.bp.blogspot.com/-r1R_sGJJ-6U/TpEyQz0TFiI/AAAAAAAAAF8/n9WbFZ1Ieug/s1600/yakisoba.jpg",
  "http://ww2.kqed.org/quest/wp-content/uploads/sites/39/2012/08/starbucks.jpg",
  "http://cdn.paper4pc.com/images/dessert-pictures-wallpaper-1.jpg"
];


class Profile extends Component {


  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  _onRefresh() {
  	this.setState({refreshing: true});
    setTimeout(() => {
      // Do some stuff
      this.setState({refreshing: false});
    }, 5000);
  }

  render() {
    return(
      <View style = {HeaderStyles.container}>
        <ScrollView refreshControl={
    			<RefreshControl
    				refreshing={this.state.refreshing}
    				onRefresh={this._onRefresh.bind(this)}
    				tintColor="blue"
    				title="Loading..."
    				titleColor="black"
    				colors={['#ffffff', '#b3b3b3', '#808080']}
    				progressBackgroundColor="black"
    			/>
		    }>
          <View style={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: 30,
            }}>
            <Image
              style={{
                width: 150,
                height: 150,
              }}
              //resizeMode = {Image.resizeMode.center}
              source={require('../images/profilepic.jpg')}
            />
            <Text style={{
              fontSize: 42,
              color: '#000000',
            }}> Mickey Mouse </Text>
          </View>

          <ProfileGrid items = {pictures}/>
        </ScrollView>
      </View>
    );
  }


}

module.exports = Profile;
