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
import LabelTag from './LabelTag';

export default class PropertyCard extends Component {
  constructor(props) {
    super(props);
  }

  formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });  

  render() {
    if (this.props.item.property_main_photo_url == undefined || this.props.item.property_main_photo_url == '') return null;

    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={{
          width: this.props.cardStyle.width,
          height: this.props.cardStyle.height,
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: Colors.borderColor,
          borderRadius: normalize(8),
          borderWidth: normalize(0.5),
          marginTop: this.props.cardStyle.marginTop,
          marginRight: this.props.cardStyle.marginRight,
          marginBottom: this.props.cardStyle.marginBottom,
          // shadowColor: "#000",
          // shadowOffset: {
          //   width: 0,
          //   height: 0,
          // },
          // shadowOpacity: 0.2,
          // shadowRadius: 8.00,
          // elevation: 1          
        }}>
          <View style={{
            width: '100%',
            height: '100%',
            justifyContent: 'space-around',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
            <View style={{
              width: '100%',
              height: '75%',
              //borderWidth: 2
            }}>
              <Image style={{ width: '100%', height: '100%', borderTopRightRadius: normalize(8), borderTopLeftRadius: normalize(8) }} source={{ uri: this.props.item.property_main_photo_url }} resizeMode='stretch'></Image>
              <View style={{ marginTop: normalize(-25, 'height'), paddingLeft: normalize(10) }}>
                <LabelTag tagTxt={this.props.item.property_listing_type === 'R' ? 'For Rent' : 'For Sale'} tagStyle={{ width: normalize(70), height: normalize(17, 'height') }} />
              </View>
            </View>

            <View style={{
              flexDirection: 'row',
              width: '100%',
              height: '25%',
              // justifyContent: 'center'
            }}>
              <View style={{//left part
                width: '70%',
                height: '100%',
                //borderWidth: 1
              }}>

                <View style={{//left top part
                  width: '100%',
                  height: '50%',
                  flexDirection: 'row',
                  //alignItems: 'center',
                  paddingTop: normalize(10, 'height'),
                  paddingLeft: normalize(10),
                  //borderWidth: 2
                }}>
                  <View style={{ flex: 0.6, flexDirection: 'row' }}>
                    <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(2), color: Colors.blackColor }}>{this.props.item.property_address1}</Text>
                    <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(2), color: Colors.blackColor }}>, {this.props.item.property_city}</Text>
                  </View>
                </View>

                <View style={{//left bottom part
                  width: '100%',
                  height: '50%',
                  paddingLeft: normalize(13),
                  //borderWidth: 2
                }}>
                  <View style={{ width: '100%', height: '100%', flexDirection: 'row', alignItems: 'center', marginTop: normalize(-8, 'height') }}>
                    <View style={{ height: '100%', flexDirection: 'row', alignItems: 'center' }}>
                      {/* <Image style={{ width: '30%', height: '100%' }} resizeMode='contain' source={this.props.item.tags[0].iconImg} /> */}
                      <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(2), color: Colors.blackColor }}>{this.props.item.property_bedrooms}</Text>
                      <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(2), color: Colors.blackColor, marginLeft: normalize(5) }}>Beds</Text>
                    </View>
                    <View style={{ width: normalize(25), height: '100%', alignItems: 'center' }}>
                      <Image style={{ width: '20%', height: '100%' }} source={Images.markDot} resizeMode='contain' />
                    </View>
                    <View style={{ height: '100%', flexDirection: 'row', alignItems: 'center' }}>
                      {/* <Image style={{ width: '30%', height: '100%' }} resizeMode='contain' source={this.props.item.tags[1].iconImg} /> */}
                      <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(2), color: Colors.blackColor }}>{this.props.item.property_bathrooms}</Text>
                      <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(2), color: Colors.blackColor, marginLeft: normalize(5) }}>Baths</Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={{//right part
                width: '30%',
                height: '100%',
                //borderWidth: 2
              }}>
                <View style={{//right top part
                  width: '100%',
                  height: '50%',
                  alignItems: 'flex-end',
                  //marginTop: normalize(15, 'height'),
                  paddingTop: normalize(13, 'height'),
                  paddingRight: normalize(10),
                  //borderWidth: 2
                }}>
                  <View>                    
                    <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(2), color: Colors.weakBlackColor }}>{this.formatter.format(this.props.item.property_amount).split(".")[0]}</Text>
                  </View>
                </View>

                <View style={{//right bottom part
                  width: '100%',
                  height: '50%',
                  flexDirection: 'row',
                  //borderWidth: 2
                }}>                  
                </View>                
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

PropertyCard.propTypes = {
  cardStyle: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,  
  onPress: PropTypes.func
};