import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Animated,
  ScrollView,
  Text,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
  Dimensions
} from "react-native";
import normalize from 'react-native-normalize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import PropTypes from 'prop-types';
import { Colors, Images } from '@constants';

export default class CallCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {    
    return (
      <View style={{
        width: wp(90),
        height: normalize(100),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.borderColor,
        borderRadius: 8,
        borderWidth: 1,
      }}>
        <View style={{ width: normalize(60), height: normalize(60), justifyContent: 'center', alignItems: 'center', marginLeft: normalize(2) }}>
          <Image style={{ width: normalize(60), height: normalize(60), borderRadius: normalize(30), borderColor: Colors.borderColor, borderWidth: normalize(0.5) }} resizeMode='stretch' source={this.props.userImg} />
        </View>
        <View style={{ width: '52%', height: '100%', justifyContent: 'center', padding: normalize(9)}}>          
          <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(1.8), color: Colors.passiveTxtColor }}>Presented By:</Text>
          <Text style={{ fontFamily: 'SFProText-Semibold', fontSize: RFPercentage(1.8), color: Colors.blackColor }} numberOfLines={2} ellipsizeMode='tail'>{this.props.userName}</Text>
          <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(1.8), color: Colors.passiveTxtColor }} numberOfLines={1} ellipsizeMode='tail'>{this.props.userRole}</Text>
          <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(1.5), color: Colors.passiveTxtColor }} numberOfLines={1} ellipsizeMode='tail'>{this.props.userCompany}</Text>
        </View>
        <View style={{ width: '25%', height: '50%', justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={()=>this.props.onCall()}
            style={{
              width: '100%',
              height: '90%',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'flex-start',
              borderColor: Colors.buttonBorderColor,
              borderRadius: 8,
              borderWidth: 1,
              backgroundColor: '#3B5998',
              // shadowColor: "#000",
              // shadowOffset: {
              //   width: 5,
              //   height: 5
              // },
              // shadowOpacity: 0.68,
              // shadowRadius: 8,
              // elevation: 1,
            }}>
            <Text style={{ fontSize: RFPercentage(2), color: '#ffffff' }}> Call </Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

CallCard.propTypes = {  
  userName: PropTypes.string.isRequired,
  userRole: PropTypes.string.isRequired,
  userCompany: PropTypes.string.isRequired,
  userImg: PropTypes.object.isRequired, 
  onCall: PropTypes.func.isRequired
};