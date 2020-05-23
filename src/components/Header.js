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
  Dimensions,
  Platform
} from "react-native";
import normalize from 'react-native-normalize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
Platform.OS === 'ios' ? Icon.loadFont() : '';

import { Colors, Images } from '@constants';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <View style={[
        styles.header,
        this.props.isSticky ?
          {
            backgroundColor: '#fff',
            height: normalize(60, 'height'),            
            alignItems: 'center',
            borderColor: Colors.borderColor,
            borderBottomWidth: normalize(0.5, 'height')
          }
          : null]}
      >
        <TouchableOpacity style={styles.leftIcon} onPress={this.props.onPressBack}>
          <Icon
            name='angle-left'
            size={30}
            color={this.props.titleColor}
          />
        </TouchableOpacity>
        <View style={styles.title}>
          <Text style={[
            styles.titleTxt,
            {
              fontFamily: 'SFProText-Semibold',
              fontSize: 14,
              color: this.props.titleColor
            }
          ]}>
            {this.props.title}
          </Text>
        </View>
        <View style={styles.rightIcon}>
          {this.props.rightIcon ?
            <TouchableOpacity style={{ flex: 1 }} onPress={this.props.onPressRightIcon}>
              <Image style={{ width: '50%', height: '60%' }} source={this.props.rightIcon} resizeMode='contain' />
            </TouchableOpacity>
            : null
          }
        </View>
      </View>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  titleColor: PropTypes.string.isRequired,
  rightIcon: PropTypes.number,
  isSticky: PropTypes.bool,
  onPressBack: PropTypes.func.isRequired,
  onPressRightIcon: PropTypes.func
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: normalize(50, 'height'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    //borderWidth: 2
  },
  leftIcon: {
    width: '10%',
    height: '60%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    //borderWidth: 2
  },
  title: {
    width: '78%',
    height: '60%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    //borderWidth: 2
  },
  titleTxt: {
    fontSize: RFPercentage(2),
  },
  rightIcon: {
    width: '12%',
    height: '60%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    //borderWidth: 2
  }
});