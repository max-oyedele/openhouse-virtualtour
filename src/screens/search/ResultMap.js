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
  ImageBackground,
  FlatList,
  Dimensions,
  Platform
} from "react-native";
import normalize from 'react-native-normalize';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import Overlay from 'react-native-modal-overlay';

import Icon from 'react-native-vector-icons/FontAwesome';
Platform.OS === 'ios' ? Icon.loadFont() : '';

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
  SignModal,
} from '@components';

export default class ResultMapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleModal: false,
      condition: {
        fromPrice: 100,
        toPrice: 1000,
        bedRooms: 1,
        bathRooms: 3,
        distance: 13,
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
      resultData: [
        {
          id: 'MLS.123456',
          name: 'Dix Hills',
          img: require('../../assets/images/favoriteImg1.png'),
          state: 'NY',
          price: 420,
          period: 'Monthly',
          subTxt: 'Dix Hills',
          address: '123 Main Street - First Floor',
          number: 11746,
          type: 'rent',
          location: 'Toronto',
          region: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
          sqm: 230,
          desc: 'This Stately Brick Colonial Was Completely Renovated In 2001, Boasting 5 Beds/5.5 Baths, 2 Story Grand Entry Foyer, Huge Granite Eat-In Kitchen W/ Center Island W/ Wine Fridge, Stainless Designer Appliances W/ Gas Cooking, Radiant Heated Floor & Double Wall Ovens. Office, Fam Room W/ Wood Burning/Gas Fplc & 4K Projector Theater System, Lr W/ Gas Flpc, FDR W/ Coffered Ceiling, Master Suite W/ Sitting Room & Marble Bathroom W/ Radiant Heated Floors. Gated 1 Acre Property W/ IG Pool/Cabana.',
          detailImgs: [
            { img: require('../../assets/images/favoriteImg1.png') },
            { img: require('../../assets/images/favoriteImg2.png') },
            { img: require('../../assets/images/favoriteImg1.png') },
            { img: require('../../assets/images/favoriteImg2.png') },
          ],
          tags: [
            {
              label: 'Beds',
              value: 3,
              iconImg: Images.iconBlackBed
            },
            {
              label: 'Baths',
              value: 1,
              iconImg: Images.iconBlackBath
            },
          ],
          owner: {
            name: 'Anthony Robinson Duran',
            role: 'Licensed Real State Salesperson',
            act: 'Brought By',
            img: require('../../assets/images/profileImg.png')
          }
        },
        {
          id: 'MLS.123457',
          name: 'Historical Lake House',
          img: require('../../assets/images/favoriteImg2.png'),
          state: 'NY',
          price: 23,
          period: 'Monthly',
          subTxt: 'Dix Hills',
          address: '123 Main Street - First Floor',
          number: 11746,
          type: 'rent',
          location: 'Toronto',
          region: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
          sqm: 230,
          desc: 'This Stately Brick Colonial Was Completely Renovated In 2001, Boasting 5 Beds/5.5 Baths, 2 Story Grand Entry Foyer, Huge Granite Eat-In Kitchen W/ Center Island W/ Wine Fridge, Stainless Designer Appliances W/ Gas Cooking, Radiant Heated Floor & Double Wall Ovens. Office, Fam Room W/ Wood Burning/Gas Fplc & 4K Projector Theater System, Lr W/ Gas Flpc, FDR W/ Coffered Ceiling, Master Suite W/ Sitting Room & Marble Bathroom W/ Radiant Heated Floors. Gated 1 Acre Property W/ IG Pool/Cabana.',
          detailImgs: [
            { img: require('../../assets/images/favoriteImg1.png') },
            { img: require('../../assets/images/favoriteImg2.png') },
            { img: require('../../assets/images/favoriteImg1.png') },
            { img: require('../../assets/images/favoriteImg2.png') },
          ],
          tags: [
            {
              label: 'Beds',
              value: 3,
              iconImg: Images.iconBlackBed
            },
            {
              label: 'Baths',
              value: 2,
              iconImg: Images.iconBlackBath
            },
          ],
          owner: {
            name: 'Anthony Robinson Duran',
            role: 'Licensed Real State Salesperson',
            act: 'Brought By',
            img: require('../../assets/images/profileImg.png')
          }
        },
        {
          id: 'MLS.123458',
          name: '3 Bedroom Modern House',
          img: require('../../assets/images/favoriteImg1.png'),
          state: 'NY',
          price: 2.3,
          period: 'Monthly',
          subTxt: 'Dix Hills',
          address: '123 Main Street - First Floor',
          number: 11746,
          type: 'rent',
          location: 'Toronto',
          region: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
          sqm: 230,
          desc: 'This Stately Brick Colonial Was Completely Renovated In 2001, Boasting 5 Beds/5.5 Baths, 2 Story Grand Entry Foyer, Huge Granite Eat-In Kitchen W/ Center Island W/ Wine Fridge, Stainless Designer Appliances W/ Gas Cooking, Radiant Heated Floor & Double Wall Ovens. Office, Fam Room W/ Wood Burning/Gas Fplc & 4K Projector Theater System, Lr W/ Gas Flpc, FDR W/ Coffered Ceiling, Master Suite W/ Sitting Room & Marble Bathroom W/ Radiant Heated Floors. Gated 1 Acre Property W/ IG Pool/Cabana.',
          detailImgs: [
            { img: require('../../assets/images/favoriteImg1.png') },
            { img: require('../../assets/images/favoriteImg2.png') },
            { img: require('../../assets/images/favoriteImg1.png') },
            { img: require('../../assets/images/favoriteImg2.png') },
          ],
          tags: [
            {
              label: 'Beds',
              value: 3,
              iconImg: Images.iconBlackBed
            },
            {
              label: 'Baths',
              value: 2,
              iconImg: Images.iconBlackBath
            },
          ],
          owner: {
            name: 'Anthony Robinson Duran',
            role: 'Licensed Real State Salesperson',
            act: 'Brought By',
            img: require('../../assets/images/profileImg.png')
          }
        }
      ],
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
        <ImageBackground style={styles.body} source={Images.mapBack}>
          <View style={{ width: '100%' }}>
            <Header title='MAP' titleColor={Colors.blackColor} rightIcon={Images.iconSort} onPressBack={() => this.props.navigation.goBack(null)} onPressRightIcon={() => this.setState({ visibleModal: true })} />
          </View>
          <View style={styles.searchShadowContainer}>
            <View style={styles.searchInnerContainer}>
              <SearchBox boxStyle={{ width: width*0.9, height: normalize(35, 'height'), backgroundColor: Colors.searchBackColor, borderColor: Colors.searchBackColor, btnColor: Colors.weakBlackColor }} onSearch={this.onSearch} />
            </View>
          </View>
        </ImageBackground>
        <View style={styles.mapContainer}>

        </View>
        <View style={styles.listContainer}>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={this.state.resultData}
            renderItem={({ item }) => <PropertyCard cardStyle={{ width: normalize(325), height: normalize(245, 'height'), marginTop: normalize(10, 'height'), marginRight: normalize(10) }} cardTheme={PropertyCardTheme[1]} item={item} onPress={this.onPropertyPress} />}
            keyExtractor={item => item.id}
          />
        </View>        

        <Overlay
          visible={this.state.visibleModal}
          // onClose={this.onClose}
          // closeOnTouchOutside
          containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          childrenWrapperStyle={styles.modal}
        >
          <View style={styles.modalHeader}>
            <View style={{ width: '15%', height: '100%', justifyContent: 'center', alignItems: 'center' }}></View>
            <View style={{ width: '70%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontFamily: 'SFProText-Semibold', fontSize: RFPercentage(2.2), color: Colors.whiteColor }}>SORT BY</Text>
            </View>
            <TouchableOpacity
              style={{ width: '15%', height: '100%', marginTop: normalize(3, 'height'), alignItems: 'flex-end' }}
              onPress={() => this.setState({ visibleModal: false })}
            >
              <Image style={{ width: '50%', height: '50%' }} source={Images.iconWhiteClose} resizeMode='contain' />
            </TouchableOpacity>
          </View>

          <View style={styles.modalBodyBack}>
            <View style={styles.modalBody}>
              <TouchableOpacity style={styles.eachLine}>
                <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(2.2), color: Colors.blackColor }}>LOW TO HIGH ($)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.eachLine}>
                <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(2.2), color: Colors.blackColor }}>HIGH TO LOW ($)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.eachLine}>
                <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(2.2), color: Colors.blackColor }}>DATE POSTED (New to Old)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.eachLine}>
                <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(2.2), color: Colors.blackColor }}>DATE POSTED (Old to New)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.eachLine, {borderBottomWidth: 0}]}>
                <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(2.2), color: Colors.blackColor }}>DISTANCE TO YOUR LOCATION</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.modalBtnContainer}>
              <Button btnTxt='Apply' btnStyle={{ width: '100%', height: normalize(50, 'height'), color: 'blue' }} onPress={() => this.setState({ visibleModal: false })} />
            </View>
          </View>

        </Overlay>

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
    height: height,
  },
  body: {
    width: '100%',
    //height: height - normalize(310, 'height'),
    height: height - normalize(260, 'height'),
    // borderColor: Colors.borderColor,
    // borderTopWidth: normalize(0.5, 'height'),
    // borderWidth: 2
  },
  searchShadowContainer: {
    width: '95%',
    height: '13%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: normalize(20, 'height'),
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
  mapContainer: {},
  listContainer: {
    width: '95%',
    height: normalize(280, 'height'),
    justifyContent: 'center',
    alignSelf: 'center',
    //marginTop: normalize(10, 'height'),
    //borderWidth: 1
  },

  modal: {
    backgroundColor: '#323643',
    width: width,
    height: height,
    justifyContent: 'center',
    alignSelf: 'center',
    opacity: 0.5
  },
  modalHeader: {
    width: '95%',
    height: normalize(30, 'height'),
    flexDirection: 'row',
    marginTop: normalize(30, 'height'),
    //borderWidth: 1
  },
  modalBodyBack: {    
    width: '100%',
    height: '90%',
    justifyContent: 'center',
    alignSelf: 'center',
    //borderWidth: 1
  },
  modalBody: {
    backgroundColor: '#eeeeee',
    width: '100%',
    height: '50%',
    borderRadius: 10,
    opacity: 0.7
    // borderColor: '#fff',
    // borderWidth: 1
  },
  eachLine: {
    width: '100%',
    height: '20%',
    borderColor: Colors.borderColor,
    borderBottomWidth: normalize(0.5, 'height'),
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalBtnContainer: {
    width: '100%',
    height: normalize(60, 'height'),
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: normalize(20, 'height'),
    //borderWidth: 1
  },  
});