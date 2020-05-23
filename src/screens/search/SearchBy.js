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
  ImageBackground,
  FlatList
} from "react-native";
import normalize from 'react-native-normalize';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import Slider from 'react-native-slider';

import { Colors, Images, PropertyCardTheme } from '@constants';
import {
  BrowseCard,
  Button,
  CallCard,
  Header,
  LabelTag,
  PropertyCard,
  SearchBox,
  SideMenu,
  SignModal
} from '@components';

export default class SearchByScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      condition: {
        fromPrice: 100,
        toPrice: 1000,
        bedRooms: 1,
        bathRooms: 3,
        distance: 0.3,
        propertyType: [
          {
            name: 'Single Family Home',
            checked: true
          },
          {
            name: 'Multi-Family Home',
            checked: false
          },
          {
            name: 'Condominum',
            checked: false
          },
          {
            name: 'Co-Op',
            checked: false
          },
          {
            name: 'Timeshare',
            checked: false
          },
          {
            name: 'Rental Property',
            checked: false
          },
          {
            name: 'Commercial Property',
            checked: false
          },
        ],
        numberOfRooms: [
          {
            name: 'BEDROOMS',
            count: 1
          },
          {
            name: 'BATHROOMS',
            count: 1
          },
        ]
      },
    }
  }

  componentDidMount() {

  }

  onSearch = () => {
    //this.props.navigation.navigate('Location');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ width: '100%' }}>
          <Header title='SEARCH BY' titleColor={Colors.blackColor} onPressBack={() => this.props.navigation.goBack(null)} />
        </View>

        <View style={styles.body}>
          <View style={styles.eachBigLineContainer}>
            <SearchBox boxStyle={{ width: width*0.9, height: normalize(40, 'height'), backgroundColor: Colors.searchBackColor, borderColor: Colors.blueColor, btnColor: Colors.blueColor }} onSearch={this.onSearch} />
          </View>

          <View style={[styles.eachBigLineContainer, { flexDirection: 'column' }]}>
            <View style={{ width: '100%', height: '40%', flexDirection: 'row', paddingTop: normalize(10, 'height') }}>
              <Text style={{ fontFamily: 'SFProText-Semibold', fontSize: RFPercentage(2), color: Colors.blackColor }}>SEARCH WITHIN</Text>
              <Text style={{ fontFamily: 'SFProText-Semibold', fontSize: RFPercentage(2), color: Colors.blueColor }}> {this.state.condition.distance * 100} MILES</Text>
            </View>            
            <Slider
              // style={{width: '80%', height: '30%'}}
              minimumTrackTintColor='#2A5FA4'
              maximumTrackTintColor='#11DBB3'
              thumbTintColor={Colors.blueColor}
              trackStyle={{width: normalize(330), height: normalize(1.5, 'height')}}
              value={this.state.condition.distance}
              onValueChange={(value) => {let condition = this.state.condition; condition.distance = value; this.setState({ condition: condition })}} />
          </View>

          <View style={[styles.eachBigLineContainer, { flexDirection: 'column', justifyContent: 'center' }]}>
            <View style={{ width: '100%', height: '30%', paddingTop: normalize(5, 'height') }}>
              <Text style={{ fontFamily: 'SFProText-Semibold', fontSize: RFPercentage(2), color: Colors.blackColor }}>PRICE</Text>
            </View>
            <View style={{ width: '100%', height: '50%', flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ backgroundColor: Colors.searchBackColor, width: '45%', height: '80%', borderRadius: 8, borderWidth: 1 }}>
                <TextInput style={{ width: '100%', height: '100%', paddingLeft: normalize(10) }} placeholder='From' placeholderTextColor={Colors.passiveTxtColor} />
              </View>
              <View style={{ width: '10%', height: '80%', justifyContent: 'center', alignItems: 'center' }}><Text>-</Text></View>
              <View style={{ backgroundColor: Colors.searchBackColor, width: '45%', height: '80%', borderRadius: 8, borderWidth: 1 }}>
                <TextInput style={{ width: '100%', height: '100%', paddingLeft: normalize(10) }} placeholder='To' placeholderTextColor={Colors.passiveTxtColor} />
              </View>
            </View>
          </View>

          <View style={styles.eachSmallLineContainer}>
            <View style={{ width: '80%', height: '50%', justifyContent: 'center' }}>
              <Text style={{ fontFamily: 'SFProText-Semibold', fontSize: RFPercentage(2), color: Colors.blackColor }}>TYPE OF PROPERTY</Text>
            </View>
            <TouchableOpacity style={{ width: '20%', height: '50%', justifyContent: 'center', alignItems: 'flex-end', paddingRight: normalize(10) }} onPress={() => this.props.navigation.navigate('PropertyType')}>
              <Image style={{ width: '30%', height: '50%' }} source={Images.iconBrowse} resizeMode='contain' />
            </TouchableOpacity>
          </View>

          {
            this.state.condition.numberOfRooms.map((each, index) => {
              return (
                <View style={styles.eachSmallLineContainer}>
                  <View style={{ width: '50%', height: '100%', justifyContent: 'center' }}>
                    <Text style={{ fontFamily: 'SFProText-Semibold', fontSize: RFPercentage(2), color: Colors.blackColor }}>{each.name}</Text>
                  </View>
                  <View style={{ width: '50%', height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <View style={{ width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                      <TouchableOpacity style={{ width: '70%', height: '50%' }} onPress={() => {
                        let condition = this.state.condition;
                        condition.numberOfRooms[index].count = each.count > 1 ? each.count - 1 : 1;
                        this.setState({ condition: condition });
                      }}>
                        <Image style={{ width: '100%', height: '100%' }} source={Images.iconMinus} resizeMode='contain' />
                      </TouchableOpacity>
                    </View>
                    <View style={{ width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontFamily: 'SFProText-Semibold', fontSize: RFPercentage(2), color: Colors.blackColor }}>{each.count}</Text>
                    </View>
                    <View style={{ width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                      <TouchableOpacity style={{ width: '70%', height: '50%' }} onPress={() => {
                        let condition = this.state.condition;
                        condition.numberOfRooms[index].count = each.count + 1;
                        this.setState({ condition: condition });
                      }}>
                        <Image style={{ width: '100%', height: '100%' }} source={Images.iconPlus} resizeMode='contain' />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )
            })
          }

          <View style={styles.btnContainer}>
            <Button btnTxt='Update' btnStyle={{ width: '100%', height: normalize(50, 'height'), color: 'blue' }} onPress={() => this.props.navigation.goBack(null)} />
          </View>
        </View>
      </View>
    );
  }
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255,255,255,1)",
    flex: 1,
    width: width,
    height: height
  },
  body: {
    width: '100%',
    height: '100%',
    borderColor: Colors.borderColor,
    borderTopWidth: normalize(0.5, 'height'),
    marginTop: normalize(20, 'height'),
  },
  eachBigLineContainer: {
    width: '90%',
    height: '13%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: Colors.borderColor,
    borderBottomWidth: normalize(0.5, 'height')
  },
  eachSmallLineContainer: {
    width: '90%',
    height: '10%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: Colors.borderColor,
    borderBottomWidth: normalize(0.5, 'height')
  },
  btnContainer: {
    width: '90%',
    height: normalize(60, 'height'),
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: normalize(20, 'height'),
    //borderWidth: 1
  }
});