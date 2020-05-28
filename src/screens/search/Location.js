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

import { Colors, Images } from '@constants';
import {
  BrowseCard,
  Button,
  CallCard,
  Header,
  LabelTag,
  PropertyCard,
  SearchBox,
  SideMenu,
  SignModal,
} from '@components';
import { RFPercentage } from "react-native-responsive-fontsize";
import { SearchBy } from "../../constants";

export default class LocationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastSearches: [
        {
          name: 'PLAINVIEW',
          state: 'NY',
          bedrooms: 3,
          bathrooms: 1
        },
      ],
      popularCities: [
        {
          name: 'DIX HILLS',
          state: 'NY',
          properties: 183
        },
        {
          name: 'Monaco',
          state: '',
          properties: 79
        },
      ],
      
    }
  }

  componentDidMount() {

  }

  onSearch = () => {
    this.props.navigation.navigate('ResultList');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ width: '100%' }}>
          <Header title='LOCATION' titleColor={Colors.blackColor} onPressBack={() => this.props.navigation.goBack(null)} />
        </View>

        <View style={styles.body}>
          <View style={styles.searchShadowContainer}>
            <View style={styles.searchInnerContainer}>
              <SearchBox boxStyle={{ width: width * 0.9, height: normalize(35, 'height'), backgroundColor: Colors.searchBackColor, borderColor: Colors.searchBackColor, btnColor: Colors.weakBlackColor }} onSearch={this.onSearch} />
            </View>
          </View>

          <View style={styles.nearestPropertiesContainer}>
            <TouchableOpacity style={{ width: '10%', height: '20%' }} onPress={() => { }}>
              <Image style={{ width: '100%', height: '100%' }} source={Images.iconNearest} resizeMode='contain' />
            </TouchableOpacity>
            <View style={styles.nearestProperties}>
              <Text style={{ fontFamily: 'SFProText-Semibold', fontSize: RFPercentage(2.2), color: Colors.blackColor}}>Search Nearest Properties</Text>
            </View>
          </View>

          <View style={styles.lineLabel}>
            <Text style={{ fontFamily: 'SFProText-Semibold', fontSize: RFPercentage(2.2), color: Colors.blackColor}}>LAST SEARCHES</Text>
          </View>
          <View style={styles.lastSearchContainer}>
            <View style={styles.lastSearchEachContainer}>
              <TouchableOpacity style={{ width: '10%', height: '20%' }} onPress={() => { }}>
                <Image style={{ width: '100%', height: '100%' }} source={Images.iconBack} resizeMode='contain' />
              </TouchableOpacity>
              <View style={styles.lastSearch}>
                <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(2.5), color: Colors.blackColor }}>PLAINVIEW, NY</Text>
                <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(1.8), color: Colors.passiveTxtColor }}>3 Bedrooms</Text>
                <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(1.8), color: Colors.passiveTxtColor }}>1 Bathroom</Text>
              </View>
            </View>
          </View>

          <View style={styles.lineLabel}>
            <Text style={{ fontFamily: 'SFProText-Semibold', fontSize: RFPercentage(2.2), color: Colors.blackColor}}>POPULAR CITIES</Text>
          </View>
          <View style={styles.popularCityContainer}>
            {
              this.state.popularCities.map((each, index) => {
                return (
                  <View style={styles.popularCityEachContainer}>
                    <TouchableOpacity style={{ width: '10%', height: '20%' }} onPress={() => { }}>
                      <Image style={{ width: '100%', height: '100%' }} source={Images.iconStar} resizeMode='contain' />
                    </TouchableOpacity>
                    <View style={styles.popularCity}>
                      <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(2.5), color: Colors.blackColor }}>{each.name}{each.state ? ', ' + each.state : ''}</Text>
                      <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(1.8), color: Colors.passiveTxtColor }}>({each.properties} Properties)</Text>
                    </View>
                  </View>
                )
              })
            }
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
    marginTop: normalize(20, 'height'),
    // borderColor: Colors.borderColor,
    // borderTopWidth: normalize(0.5, 'height'),
  },
  searchShadowContainer: {
    width: '95%',
    height: '8%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: normalize(10, 'height'),
    borderColor: Colors.borderColor,
    borderRadius: normalize(10),
    borderWidth: normalize(0.5),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8.00,
    elevation: 1,
  },
  searchInnerContainer: {
    backgroundColor: 'rgba(255,255,255,1)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: Colors.borderColor,
    borderRadius: normalize(10),
    borderWidth: normalize(0.5),
  },
  nearestPropertiesContainer: {
    width: '95%',
    height: '10%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    //borderWidth: 1
  },
  nearestProperties: {
    width: '90%',
    height: '100%',
    justifyContent: 'center',
    paddingLeft: normalize(10),
    //borderWidth: 1
  },
  lineLabel: {
    width: '95%',
    height: '5%',
    justifyContent: 'flex-end',
    alignSelf: 'center',
    paddingLeft: normalize(10),
    marginTop: normalize(10, 'height'),
    //borderWidth: 1
  },
  lastSearchContainer: {
    width: '95%',
    height: normalize(70, 'height'),
    alignSelf: 'center',
    //borderWidth: 1
  },
  lastSearchEachContainer: {
    width: '100%',
    height: normalize(70, 'height'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  lastSearch: {
    width: '90%',
    height: '100%',
    justifyContent: 'center',
    paddingLeft: normalize(10),
    borderColor: Colors.borderColor,
    borderBottomWidth: normalize(1)
  },
  popularCityContainer: {
    width: '95%',
    height: normalize(70, 'height'),
    alignSelf: 'center',
    //borderWidth: 1
  },
  popularCityEachContainer: {
    width: '100%',
    height: normalize(70, 'height'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  popularCity: {
    width: '90%',
    height: '100%',
    justifyContent: 'center',
    paddingLeft: normalize(10),
    borderColor: Colors.borderColor,
    borderBottomWidth: normalize(1)
  },
});