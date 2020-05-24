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

import Overlay from 'react-native-modal-overlay';

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
import { Colors, Images, PropertyCardTheme, LoginInfo, SearchBy, SearchWordData } from '@constants';
import { getContentByAction } from '../../api/rest';

export default class ResultListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visiblePropertyType: false,
      visibleNumberOfRooms: false,
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
            name: 'BEDS',
            count: 1
          },
          {
            name: 'BATHS',
            count: 1
          },
        ]
      },
      resultData: [
        // {
        //   id: 'MLS.123456',
        //   name: 'Dix Hills',
        //   img: require('../../assets/images/favoriteImg1.png'),
        //   state: 'NY',
        //   price: 420,
        //   period: 'Monthly',
        //   subTxt: 'Dix Hills',
        //   address: '123 Main Street - First Floor',
        //   number: 11746,
        //   type: 'rent',
        //   location: 'Toronto',
        //   region: {
        //     latitude: 37.78825,
        //     longitude: -122.4324,
        //     latitudeDelta: 0.0922,
        //     longitudeDelta: 0.0421,
        //   },
        //   sqm: 230,
        //   desc: 'This Stately Brick Colonial Was Completely Renovated In 2001, Boasting 5 Beds/5.5 Baths, 2 Story Grand Entry Foyer, Huge Granite Eat-In Kitchen W/ Center Island W/ Wine Fridge, Stainless Designer Appliances W/ Gas Cooking, Radiant Heated Floor & Double Wall Ovens. Office, Fam Room W/ Wood Burning/Gas Fplc & 4K Projector Theater System, Lr W/ Gas Flpc, FDR W/ Coffered Ceiling, Master Suite W/ Sitting Room & Marble Bathroom W/ Radiant Heated Floors. Gated 1 Acre Property W/ IG Pool/Cabana.',
        //   detailImgs: [
        //     { img: require('../../assets/images/favoriteImg1.png') },
        //     { img: require('../../assets/images/favoriteImg2.png') },
        //     { img: require('../../assets/images/favoriteImg1.png') },
        //     { img: require('../../assets/images/favoriteImg2.png') },
        //   ],
        //   tags: [
        //     {
        //       label: 'Beds',
        //       value: 3,
        //       iconImg: Images.iconBlackBed
        //     },
        //     {
        //       label: 'Baths',
        //       value: 1,
        //       iconImg: Images.iconBlackBath
        //     },
        //   ],
        //   owner: {
        //     name: 'Anthony Robinson Duran',
        //     role: 'Licensed Real State Salesperson',
        //     act: 'Brought By',
        //     img: require('../../assets/images/profileImg.png')
        //   }
        // },
        // {
        //   id: 'MLS.123457',
        //   name: 'Historical Lake House',
        //   img: require('../../assets/images/favoriteImg2.png'),
        //   state: 'NY',
        //   price: 23,
        //   period: 'Monthly',
        //   subTxt: 'Dix Hills',
        //   address: '123 Main Street - First Floor',
        //   number: 11746,
        //   type: 'rent',
        //   location: 'Toronto',
        //   region: {
        //     latitude: 37.78825,
        //     longitude: -122.4324,
        //     latitudeDelta: 0.0922,
        //     longitudeDelta: 0.0421,
        //   },
        //   sqm: 230,
        //   desc: 'This Stately Brick Colonial Was Completely Renovated In 2001, Boasting 5 Beds/5.5 Baths, 2 Story Grand Entry Foyer, Huge Granite Eat-In Kitchen W/ Center Island W/ Wine Fridge, Stainless Designer Appliances W/ Gas Cooking, Radiant Heated Floor & Double Wall Ovens. Office, Fam Room W/ Wood Burning/Gas Fplc & 4K Projector Theater System, Lr W/ Gas Flpc, FDR W/ Coffered Ceiling, Master Suite W/ Sitting Room & Marble Bathroom W/ Radiant Heated Floors. Gated 1 Acre Property W/ IG Pool/Cabana.',
        //   detailImgs: [
        //     { img: require('../../assets/images/favoriteImg1.png') },
        //     { img: require('../../assets/images/favoriteImg2.png') },
        //     { img: require('../../assets/images/favoriteImg1.png') },
        //     { img: require('../../assets/images/favoriteImg2.png') },
        //   ],
        //   tags: [
        //     {
        //       label: 'Beds',
        //       value: 3,
        //       iconImg: Images.iconBlackBed
        //     },
        //     {
        //       label: 'Baths',
        //       value: 2,
        //       iconImg: Images.iconBlackBath
        //     },
        //   ],
        //   owner: {
        //     name: 'Anthony Robinson Duran',
        //     role: 'Licensed Real State Salesperson',
        //     act: 'Brought By',
        //     img: require('../../assets/images/profileImg.png')
        //   }
        // },
        // {
        //   id: 'MLS.123458',
        //   name: '3 Bedroom Modern House',
        //   img: require('../../assets/images/favoriteImg1.png'),
        //   state: 'NY',
        //   price: 2.3,
        //   period: 'Monthly',
        //   subTxt: 'Dix Hills',
        //   address: '123 Main Street - First Floor',
        //   number: 11746,
        //   type: 'rent',
        //   location: 'Toronto',
        //   region: {
        //     latitude: 37.78825,
        //     longitude: -122.4324,
        //     latitudeDelta: 0.0922,
        //     longitudeDelta: 0.0421,
        //   },
        //   sqm: 230,
        //   desc: 'This Stately Brick Colonial Was Completely Renovated In 2001, Boasting 5 Beds/5.5 Baths, 2 Story Grand Entry Foyer, Huge Granite Eat-In Kitchen W/ Center Island W/ Wine Fridge, Stainless Designer Appliances W/ Gas Cooking, Radiant Heated Floor & Double Wall Ovens. Office, Fam Room W/ Wood Burning/Gas Fplc & 4K Projector Theater System, Lr W/ Gas Flpc, FDR W/ Coffered Ceiling, Master Suite W/ Sitting Room & Marble Bathroom W/ Radiant Heated Floors. Gated 1 Acre Property W/ IG Pool/Cabana.',
        //   detailImgs: [
        //     { img: require('../../assets/images/favoriteImg1.png') },
        //     { img: require('../../assets/images/favoriteImg2.png') },
        //     { img: require('../../assets/images/favoriteImg1.png') },
        //     { img: require('../../assets/images/favoriteImg2.png') },
        //   ],
        //   tags: [
        //     {
        //       label: 'Beds',
        //       value: 3,
        //       iconImg: Images.iconBlackBed
        //     },
        //     {
        //       label: 'Baths',
        //       value: 2,
        //       iconImg: Images.iconBlackBath
        //     },
        //   ],
        //   owner: {
        //     name: 'Anthony Robinson Duran',
        //     role: 'Licensed Real State Salesperson',
        //     act: 'Brought By',
        //     img: require('../../assets/images/profileImg.png')
        //   }
        // }
      ],
    }
  }

  componentDidMount() {
    this.getSearchResult();
  }

  onSearch = () => {
    //this.props.navigation.navigate('Location');
  }

  getSearchResult = () => {
    var searchParam = {
      action: 'property_search',
      user_latitude: LoginInfo.latitude,
      user_longitude: LoginInfo.longitude,      
      user_id: LoginInfo.uniqueid,      
      search_city: SearchBy.query,
      listingtype: SearchBy.listingType,
      propertytype: SearchBy.propertyType,
      pricefrom: SearchBy.priceFrom,
      priceto: SearchBy.priceTo,
      bedrooms: SearchBy.bedrooms,
      bathrooms: SearchBy.bathrooms,
      distance: SearchBy.distance,
      sortby: SearchBy.sortBy,
      ascdesc: SearchBy.ascdesc
    };

    getContentByAction(searchParam)
      .then((res) => {        
        console.log('searchData', res);
        this.setState({ resultData: res });
      })
      .catch((err) => {
        console.log('get search data error', err)
      })
  }

  getPropertyType = () => {
    var propertyTypes = this.state.condition.propertyType;
    var retValue = propertyTypes[0].name;

    propertyTypes.forEach(element => {
      if (element.checked) retValue = element.name;
    });

    return retValue;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ width: '100%' }}>
          <Header title='DIX HILLS, NY' titleColor={Colors.blackColor} rightIcon={Images.iconMap} onPressBack={() => this.props.navigation.goBack(null)} onPressRightIcon={() => this.props.navigation.navigate('ResultMap')} />
        </View>

        <View style={styles.body}>
          <View style={styles.searchShadowContainer}>
            <View style={styles.searchInnerContainer}>

              <View style={styles.locationLabelAndFilter}>
                <Text style={{ fontFamily: 'SFProText-Semibold', fontSize: RFPercentage(2), color: Colors.passiveTxtColor }}>LOCATION</Text>
                <TouchableOpacity style={{ width: '6%', height: '90%', marginRight: normalize(10) }} onPress={() => this.props.navigation.navigate('SearchBy')}>
                  <Image style={{ width: '100%', height: '100%' }} source={Images.iconFilter} resizeMode='contain' />
                </TouchableOpacity>
              </View>

              <SearchBox boxStyle={{ width: width * 0.9, height: normalize(35, 'height'), backgroundColor: Colors.searchBackColor, borderColor: Colors.searchBackColor, btnColor: Colors.weakBlackColor }} onSearch={this.onSearch} />

              <View style={styles.conditionContainer}>
                <View style={styles.conditionInnerContainer}>
                  <TouchableOpacity style={{ width: '50%', height: '100%' }} onPress={() => this.props.navigation.navigate('PropertyType')}>
                    <View style={{ width: '100%', height: '50%', justifyContent: 'center' }}>
                      <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(1.8), color: Colors.passiveTxtColor }}>PROPERTY TYPE</Text>
                    </View>
                    <View style={{ width: '100%', height: '50%', justifyContent: 'center' }}>
                      <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(2.2), color: Colors.blackColor }}>{this.getPropertyType()}</Text>
                    </View>
                  </TouchableOpacity>

                  {this.state.condition.numberOfRooms.map((each, index) => {
                    return (
                      <TouchableOpacity key={each.name} style={{ width: '25%', height: '100%', borderColor: Colors.borderColor, borderLeftWidth: normalize(0.5) }} onPress={() => this.setState({ visibleNumberOfRooms: true })}>
                        <View style={{ width: '100%', height: '50%', justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(1.8), color: Colors.passiveTxtColor }}>{each.name}</Text>
                        </View>
                        <View style={{ width: '100%', height: '50%', justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(2.2), color: Colors.blackColor }}>{each.count}+</Text>
                        </View>
                      </TouchableOpacity>
                    )
                  })}
                </View>
              </View>

            </View>
          </View>

          <View style={styles.listContainer}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={this.state.resultData}
              renderItem={({ item }) => <PropertyCard cardStyle={{ width: width * 0.95, height: normalize(245, 'height'), marginBottom: normalize(10, 'height'), marginRight: 0 }} cardTheme={PropertyCardTheme[1]} item={item} onPress={this.onPropertyPress} />}
              keyExtractor={item => item.id}
            />
          </View>
        </View>

        <Overlay
          visible={this.state.visibleNumberOfRooms}
          // onClose={this.onClose}
          // closeOnTouchOutside
          containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          childrenWrapperStyle={styles.modal}
        >
          <View style={styles.modalHeader}>
            <View style={{ width: '15%', height: '100%', justifyContent: 'center', alignItems: 'center' }}></View>
            <View style={{ width: '70%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontFamily: 'SFProText-Semibold', fontSize: RFPercentage(2.2), color: Colors.whiteColor }}>NUMBER OF ROOMS</Text>
            </View>
            <TouchableOpacity
              style={{ width: '15%', height: '100%', marginTop: normalize(3, 'height'), alignItems: 'flex-end' }}
              onPress={() => this.setState({ visibleNumberOfRooms: false })}
            >
              <Image style={{ width: '50%', height: '50%' }} source={Images.iconWhiteClose} resizeMode='contain' />
            </TouchableOpacity>
          </View>

          <View style={styles.modalBodyBack}>
            <View style={styles.modalBody}>
              {
                this.state.condition.numberOfRooms.map((each, index) => {
                  return (
                    <View style={styles.eachLine}>
                      <View style={{ width: '50%', height: '100%', justifyContent: 'center', paddingLeft: normalize(10) }}>
                        <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(2.2), color: Colors.blackColor }}>{each.name}</Text>
                      </View>
                      <View style={{ width: '50%', height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingRight: normalize(10) }}>
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
                          <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(2.2), color: Colors.blackColor }}>{each.count}</Text>
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
            </View>

            <View style={styles.modalBtnContainer}>
              <Button btnTxt='Apply' btnStyle={{ width: '100%', height: normalize(50, 'height'), color: 'blue' }} onPress={() => this.setState({ visibleNumberOfRooms: false })} />
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
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: normalize(-8, 'height'),
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
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: Colors.borderColor,
    borderRadius: normalize(10),
    borderWidth: normalize(0.5),
  },
  locationLabelAndFilter: {
    width: '95%',
    height: '20%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingLeft: normalize(10),
    marginBottom: normalize(5, 'height'),
    //borderWidth: 1
  },
  conditionContainer: {
    width: '95%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: normalize(10, 'height'),
    borderColor: Colors.borderColor,
    borderTopWidth: normalize(0.5),
    //borderWidth: 1
  },
  conditionInnerContainer: {
    width: '95%',
    height: '70%',
    flexDirection: 'row',
    //borderWidth: 1
  },
  listContainer: {
    width: '95%',
    height: '70%',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: normalize(10, 'height'),
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
    //backgroundColor: '#eeeeee',
    width: '100%',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    // opacity: 0.7
    // borderColor: '#fff',
    // borderWidth: 1
  },

  eachLine: {
    backgroundColor: '#eeeeee',
    width: '100%',
    height: '45%',
    flexDirection: 'row',
    borderRadius: 10,
    marginTop: normalize(10, 'height')
  },
  modalBtnContainer: {
    width: '100%',
    height: normalize(60, 'height'),
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: normalize(20, 'height'),
    //borderWidth: 1
  }
});