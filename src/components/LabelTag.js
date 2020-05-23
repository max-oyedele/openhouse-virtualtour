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

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import PropTypes from 'prop-types';
import { Colors, Images } from '@constants';

export default class LabelTag extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{
        width: this.props.tagStyle.width,
        height: this.props.tagStyle.height,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.blueColor,
        borderRadius: this.props.tagStyle.height / 2,
        borderWidth: 1,
        backgroundColor: '#B9FFF3',
      }}>
        <Text style={{
          fontFamily: 'SFProText-Regular',
          fontSize: RFPercentage(1.8),
          color: Colors.blackColor
        }}>
          {this.props.tagTxt}
        </Text>
      </View>
    );
  }
}

LabelTag.propTypes = {
  tagTxt: PropTypes.string.isRequired,
  tagStyle: PropTypes.object.isRequired,
};