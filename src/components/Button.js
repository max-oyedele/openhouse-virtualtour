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
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import PropTypes from 'prop-types';

import { Colors } from '@constants';

export default class Button extends Component {
  constructor(props) {
    super(props);   
  }
  
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={{
          width: this.props.btnStyle.width,
          height: this.props.btnStyle.height,
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: Colors.buttonBorderColor,
          borderRadius: 8,
          borderWidth: 1,
          backgroundColor: this.props.btnStyle.color === 'blue' ? Colors.blueButtonBackColor : '#ffffff',
        }}>
          <Text style={{
            fontFamily: 'SFProText-Semibold',
            fontSize: RFPercentage(1.8),
            color: this.props.btnStyle.color === 'blue' ? '#ffffff' : Colors.blueButtonBackColor
          }}>
            {this.props.btnTxt}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

Button.propTypes = {
  btnTxt: PropTypes.string.isRequired,
  btnStyle: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired
};