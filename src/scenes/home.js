'use strict';

import HomeGrid from '../home-grid';
import {
  Component,
  View,
} from 'react-native';
import SearchBar from '../search-bar';

var pictures = [
  "http://www.technobuffalo.com/wp-content/uploads/2014/04/fast-food.jpg",
  "https://img.buzzfeed.com/buzzfeed-static/static/2015-06/5/12/campaign_images/webdr05/what-comfort-food-should-you-choose-based-on-your-2-11396-1433522422-14_dblbig.jpg",
  "http://www.latoro.com/wallpapers/food/18747-desktop-wallpapers-japanese-cuisine.jpg",
  "http://4.bp.blogspot.com/-r1R_sGJJ-6U/TpEyQz0TFiI/AAAAAAAAAF8/n9WbFZ1Ieug/s1600/yakisoba.jpg",
  "http://ww2.kqed.org/quest/wp-content/uploads/sites/39/2012/08/starbucks.jpg",
  "http://cdn.paper4pc.com/images/dessert-pictures-wallpaper-1.jpg",
  "http://www.technobuffalo.com/wp-content/uploads/2014/04/fast-food.jpg",
  "https://img.buzzfeed.com/buzzfeed-static/static/2015-06/5/12/campaign_images/webdr05/what-comfort-food-should-you-choose-based-on-your-2-11396-1433522422-14_dblbig.jpg",
  "http://www.latoro.com/wallpapers/food/18747-desktop-wallpapers-japanese-cuisine.jpg",
  "http://4.bp.blogspot.com/-r1R_sGJJ-6U/TpEyQz0TFiI/AAAAAAAAAF8/n9WbFZ1Ieug/s1600/yakisoba.jpg",
  "http://ww2.kqed.org/quest/wp-content/uploads/sites/39/2012/08/starbucks.jpg",
  "http://cdn.paper4pc.com/images/dessert-pictures-wallpaper-1.jpg",
  "http://www.technobuffalo.com/wp-content/uploads/2014/04/fast-food.jpg",
  "https://img.buzzfeed.com/buzzfeed-static/static/2015-06/5/12/campaign_images/webdr05/what-comfort-food-should-you-choose-based-on-your-2-11396-1433522422-14_dblbig.jpg",
  "http://www.latoro.com/wallpapers/food/18747-desktop-wallpapers-japanese-cuisine.jpg",
  "http://4.bp.blogspot.com/-r1R_sGJJ-6U/TpEyQz0TFiI/AAAAAAAAAF8/n9WbFZ1Ieug/s1600/yakisoba.jpg",
  "http://ww2.kqed.org/quest/wp-content/uploads/sites/39/2012/08/starbucks.jpg",
  "http://cdn.paper4pc.com/images/dessert-pictures-wallpaper-1.jpg",
];

class Home extends Component {

  render() {
    return(
      <View>
        <SearchBar />
        <HomeGrid items = {pictures}/>
      </View>
    );
  }
}

module.exports = Home;
