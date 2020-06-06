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

export default class AgentCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {        
    const borderColor = this.props.isSelected ? Colors.blueColor : Colors.borderColor;
    return (
      <View style={{
        width: wp(90),
        height: normalize(90, 'height'),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: borderColor,
        borderRadius: normalize(12),
        borderWidth: 1,
      }}>
        <View style={{ width: normalize(60), height: normalize(60), justifyContent: 'center', alignItems: 'center', marginLeft: normalize(2) }}>
          <Image style={{ width: normalize(60), height: normalize(60), borderRadius: normalize(30), borderColor: Colors.borderColor, borderWidth: normalize(0.5) }} resizeMode='stretch' source={this.props.agentImg} />
        </View>
        <View style={{ width: '75%', justifyContent: 'center', paddingLeft: normalize(15) }}>          
          <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(2), color: Colors.blackColor }}>{this.props.agentName}</Text>
          <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(1.8), color: Colors.passiveTxtColor }}>{this.props.agentTitle}</Text>
          <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(1.8), color: Colors.passiveTxtColor }}>{this.props.agentCompany}</Text>
        </View>        
      </View>
    );
  }
}

AgentCard.propTypes = {
  agentName: PropTypes.string.isRequired,
  agentTitle: PropTypes.string.isRequired,
  agentCompany: PropTypes.string.isRequired,
  agentImg: PropTypes.object.isRequired, 
  isSelected: PropTypes.bool
};