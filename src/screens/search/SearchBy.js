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
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import Slider from 'react-native-slider';

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
import { Colors, Images, SearchBy } from '@constants';
import { RouteParam } from "../../constants";

export default class SearchByScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfRooms: [
        {
          name: 'BEDROOMS',
          count: SearchBy.bedrooms
        },
        {
          name: 'BATHROOMS',
          count: SearchBy.bathrooms
        },
      ],
      query: '',
      distance: SearchBy.distance,
      priceFrom: SearchBy.priceFrom.toString(),
      priceTo: SearchBy.priceTo.toString(),
      oldSearchBy: {}
    }
  }

  componentDidMount() {    
    var oldSearchBy = {
      distance: SearchBy.distance,
      priceFrom: SearchBy.priceFrom,
      priceTo: SearchBy.priceTo,
      propertyType: SearchBy.propertyType,
      bedrooms: SearchBy.bedrooms,
      bathrooms: SearchBy.bathrooms
    }    
    this.setState({oldSearchBy: oldSearchBy});
  }
  
  onApply = () => {
    if (this.state.priceFrom == '' || this.state.priceTo == '') {
      Alert.alert('Please enter the price');
      return;
    }

    SearchBy.distance = this.state.distance;
    SearchBy.priceFrom = parseInt(this.getRealValue(this.state.priceFrom));
    SearchBy.priceTo = parseInt(this.getRealValue(this.state.priceTo));
    SearchBy.bedrooms = this.state.numberOfRooms[0].count;
    SearchBy.bathrooms = this.state.numberOfRooms[1].count;

    var compareSearchBy = this.state.oldSearchBy;
    if (
      compareSearchBy.distance == SearchBy.distance &&
      compareSearchBy.priceFrom == SearchBy.priceFrom &&
      compareSearchBy.priceTo == SearchBy.priceTo &&
      compareSearchBy.bedrooms == SearchBy.bedrooms &&
      compareSearchBy.bathrooms == SearchBy.bathrooms &&
      compareSearchBy.propertyType == SearchBy.propertyType
    ) {      
      RouteParam.isChanged = false;
    }
    else{      
      RouteParam.isChanged = true;
    } 

    this.props.navigation.goBack(null);
  }

  //////////////////////// format //////////////
  format2Number(num) {
    return num.toString().replace(/(\d)(?=(\d{2})+(?!\d))/g, '$1,')
  }

  formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  getFormatValue = (value) => {
    value = value.replace(".", "");
    var partArr = value.split(",");
    var valueNoComma = '';
    partArr.forEach(each => {
      valueNoComma += each;
    })

    var realValue = valueNoComma.replace("$", "");
    if (realValue == '') return realValue;
    else return this.formatter.format(realValue).split(".")[0];
  }

  getRealValue = (value) => {
    var partArr = value.split(",");
    var valueNoComma = '';
    partArr.forEach(each => {
      valueNoComma += each;
    })

    var realValue = valueNoComma.replace("$", "");
    return realValue;
  }
  ///////////////////////////////////////////////

  render() {
    return (
      <View style={styles.container}>
        <View style={{ width: '100%' }}>
          <Header title='SEARCH BY' titleColor={Colors.blackColor} onPressBack={() => this.props.navigation.goBack(null)} />
        </View>

        <View style={styles.body}>
          <View style={[styles.eachBigLineContainer, { flexDirection: 'column' }]}>
            <View style={{ width: '100%', height: '40%', flexDirection: 'row', paddingTop: normalize(10, 'height') }}>
              <Text style={{ fontFamily: 'SFProText-Semibold', fontSize: RFPercentage(2), color: Colors.blackColor }}>SEARCH WITHIN</Text>
              <Text style={{ fontFamily: 'SFProText-Semibold', fontSize: RFPercentage(2), color: Colors.blueColor }}> {this.format2Number(this.state.distance)} MILES</Text>
            </View>
            <Slider
              // style={{width: '80%', height: '30%'}}
              minimumValue={0}
              maximumValue={100}
              step={10}
              minimumTrackTintColor='#2A5FA4'
              maximumTrackTintColor='#11DBB3'
              thumbTintColor={Colors.blueColor}
              trackStyle={{ width: normalize(330), height: normalize(1.5, 'height') }}
              value={this.state.distance}
              onValueChange={(value) => { this.setState({ distance: value }) }} />
          </View>

          <View style={[styles.eachBigLineContainer, { flexDirection: 'column', justifyContent: 'center' }]}>
            <View style={{ width: '100%', height: '30%', paddingTop: normalize(5, 'height') }}>
              <Text style={{ fontFamily: 'SFProText-Semibold', fontSize: RFPercentage(2), color: Colors.blackColor }}>PRICE</Text>
            </View>
            <View style={{ width: '100%', height: '50%', flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ backgroundColor: Colors.searchBackColor, width: '45%', height: '80%', borderRadius: 8, borderWidth: 1 }}>
                <TextInput
                  style={{ width: '100%', height: '100%', paddingLeft: normalize(10), color: Colors.blackColor }}
                  placeholder='From'
                  placeholderTextColor={Colors.passiveTxtColor}
                  keyboardType='numeric'
                  value={this.getFormatValue(this.state.priceFrom)}
                  onChangeText={(text) => this.setState({ priceFrom: text })}
                />
              </View>
              <View style={{ width: '10%', height: '80%', justifyContent: 'center', alignItems: 'center' }}><Text>-</Text></View>
              <View style={{ backgroundColor: Colors.searchBackColor, width: '45%', height: '80%', borderRadius: 8, borderWidth: 1 }}>
                <TextInput
                  style={{ width: '100%', height: '100%', paddingLeft: normalize(10), color: Colors.blackColor }}
                  placeholder='To'
                  placeholderTextColor={Colors.passiveTxtColor}
                  keyboardType='numeric'
                  value={this.getFormatValue(this.state.priceTo)}
                  onChangeText={(text) => this.setState({ priceTo: text })}
                />
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
            this.state.numberOfRooms.map((each, index) => {
              return (
                <View style={styles.eachSmallLineContainer}>
                  <View style={{ width: '50%', height: '100%', justifyContent: 'center' }}>
                    <Text style={{ fontFamily: 'SFProText-Semibold', fontSize: RFPercentage(2), color: Colors.blackColor }}>{each.name}</Text>
                  </View>
                  <View style={{ width: '50%', height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <View style={{ width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                      <TouchableOpacity style={{ width: '70%', height: '50%' }} onPress={() => {
                        let numberOfRooms = this.state.numberOfRooms;
                        numberOfRooms[index].count = each.count > 0 ? each.count - 1 : 0;
                        this.setState({ numberOfRooms: numberOfRooms });
                      }}>
                        <Image style={{ width: '100%', height: '100%' }} source={Images.iconMinus} resizeMode='contain' />
                      </TouchableOpacity>
                    </View>
                    <View style={{ width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontFamily: 'SFProText-Semibold', fontSize: RFPercentage(2), color: Colors.blackColor }}>{each.count}</Text>
                    </View>
                    <View style={{ width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                      <TouchableOpacity style={{ width: '70%', height: '50%' }} onPress={() => {
                        let numberOfRooms = this.state.numberOfRooms;
                        numberOfRooms[index].count = each.count + 1;
                        this.setState({ numberOfRooms: numberOfRooms });
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
            <Button btnTxt='Apply' btnStyle={{ width: '100%', height: normalize(50, 'height'), color: 'blue' }} onPress={()=>this.onApply()} />
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