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
import normalize from "react-native-normalize";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import PropTypes from 'prop-types';
import { Colors, Images } from '@constants';

export default class BrowseCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {    
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={{              
          width: normalize(150),
          height: normalize(150, 'height'),
          justifyContent: 'center',
          alignItems: 'center',          
          //marginTop: normalize(10, 'height'),        
          marginRight: normalize(10),
          borderColor: Colors.borderColor,  
          borderRadius: normalize(8),            
          borderWidth: 1          
        }}>
          <View style={{
            width: '100%',
            height: '75%',  
            //borderWidth: 2
          }}>
            <Image style={{ width: '100%', height: '100%', borderTopRightRadius: normalize(8), borderTopLeftRadius: normalize(8) }} source={{uri: this.props.item.properties_category_photo_url}} resizeMode='stretch'></Image>
          </View>
          <View style={{                                    
            width: '100%',
            height: '25%',
            //justifyContent: 'center',
            paddingTop: normalize(10),
            paddingLeft: normalize(10),
            //borderWidth: 1
          }}>
            <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(2), color: Colors.passiveTxtColor }}>{this.props.item.properties_category_short_desc}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

BrowseCard.propTypes = {
  item: PropTypes.object.isRequired,  
  onPress: PropTypes.func
};