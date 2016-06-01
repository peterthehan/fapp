'use strict';

import React, {
  Component,
  ScrollView,
  Text,
  View,
} from 'react-native';

import ButtonStyles from '../styles/button-styles';
import TextStyles from '../styles/text-styles';
import TitleBar from '../components/title-bar';

let database = new Firebase("poopapp1.firebaseio.com");

class Policy extends Component {
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
        <ScrollView>
          <Text style = {{margin: 12,}}>
            This privacy policy discloses the privacy practices for Fapp. This privacy policy applies solely to information collected by this web site. It will notify you of the following:
            1.) What personally identifiable information is collected from you through the web site, how it is used and with whom it may be shared.
            2.) What choices are available to you regarding the use of your data.
            3.) The security procedures in place to protect the misuse of your information.
            4.) How you can correct any inaccuracies in the information.
            Information Collection, Use, and Sharing
            We are the sole owners of the information collected on this site. We only have access to/collect information that you voluntarily give us via email or other direct contact from you. We will not sell or rent this information to anyone.
            We will use your information to respond to you, regarding the reason you contacted us. We will not share your information with any third party outside of our organization, other than as necessary to fulfill your request, e.g. to ship an order.
            Unless you ask us not to, we may contact you via email in the future to tell you about specials, new products or services, or changes to this privacy policy.
            Your Access to and Control Over Information
            You may opt out of any future contacts from us at any time. You can do the following at any time by contacting us via the email address or phone number given on our website:
            1.) See what data we have about you, if any.
            2.) Change/correct any data we have about you.
            3.) Have us delete any data we have about you.
            4.) Express any concern you have about our use of your data.
            Security
            We take precautions to protect your information. When you submit sensitive information via the website, your information is protected both online and offline.
            Wherever we collect sensitive information (such as credit card data), that information is encrypted and transmitted to us in a secure way. You can verify this by looking for a closed lock icon at the bottom of your web browser, or looking for "https" at the beginning of the address of the web page.
            While we use encryption to protect sensitive information transmitted online, we also protect your information offline. Only employees who need the information to perform a specific job (for example, billing or customer service) are granted access to personally identifiable information. The computers/servers in which we store personally identifiable information are kept in a secure environment.
            Registration
            In order to use this website, a user must first complete the registration form. During registration a user is required to give certain information (such as name and email address). This information is used to contact you about the products/services on our site in which you have expressed interest. At your option, you may also provide demographic information (such as gender or age) about yourself, but it is not required.
            Sharing
            We share aggregated demographic information with our partners and advertisers. This is not linked to any personal information that can identify any individual person.
            And/or:
            We use an outside shipping company to ship orders, and a credit card processing company to bill users for goods and services. These companies do not retain, share, store or use personally identifiable information for any secondary purposes beyond filling your order.
            And/or:
            We partner with another party to provide specific services. When the user signs up for these services, we will share names, or other contact information that is necessary for the third party to provide these services. These parties are not allowed to use personally identifiable information except for the purpose of providing these services.
          </Text>
        </ScrollView>
      </View>
    );
  }
}

module.exports = Policy;
