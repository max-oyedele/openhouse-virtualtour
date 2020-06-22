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
  ActivityIndicator,
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
import { Colors, Images, LoginInfo, RouteParam, SearchBy, SearchWordData, PropertyTypeData } from '@constants';
import { getContentByAction } from '../../api/rest';

export default class ResultListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: false,
      spinner: false,
      visibleNumberOfRooms: false,
      numberOfRooms: [
        {
          name: 'BEDS',
          count: SearchBy.bedrooms
        },
        {
          name: 'BATHS',
          count: SearchBy.bathrooms
        },
      ],
      oldBedrooms: '',
      oldBathrooms: '',
      resultData: [],
      headerTitle: ''
    }

    this.listener = this.props.navigation.addListener('focus', this.componentDidFocus.bind(this));
  }

  componentDidMount() {

  }

  componentDidFocus() {
    if (!RouteParam.isChanged) return;
    RouteParam.isChanged = false;

    let numberOfRooms = this.state.numberOfRooms;
    numberOfRooms[0].count = SearchBy.bedrooms;
    numberOfRooms[1].count = SearchBy.bathrooms;
    this.setState({
      numberOfRooms: numberOfRooms,
      refresh: !this.state.refresh
    });

    if (RouteParam.searchKind === 'searchByQuery') {
      if (SearchBy.propertyType == 6) {
        SearchBy.listingType = 'R';
      }
      this.setState({ headerTitle: SearchBy.query })
      this.getSearchByQuery();
    }
    else if (RouteParam.searchKind === 'searchByCategory') {
      if (SearchBy.categoryForHeader != '') {
        this.setState({ headerTitle: SearchBy.categoryForHeader })
      }
      else {
        this.setState({ headerTitle: this.getPropertyTypeFromId(SearchBy.propertyType).properties_category_short_desc });
      }
      this.getSearchByCategory();
    }
  }

  componentWillUnmount() {
    //if (this.listener) this.listener.remove();
  }

  getSearchByQuery = () => {
    var searchParam = {
      action: 'property_search',
      user_latitude: LoginInfo.latitude,
      user_longitude: LoginInfo.longitude,
      user_id: LoginInfo.uniqueid,
      user_account: LoginInfo.user_account,
      search_city: SearchBy.query,
      listingtype: SearchBy.listingType,
      propertytype: SearchBy.propertyType,
      pricefrom: SearchBy.priceFrom,
      priceto: SearchBy.priceTo,
      bedrooms: SearchBy.bedrooms,
      bathrooms: SearchBy.bathrooms,
      distance: SearchBy.distance,
      sortby: SearchBy.sortBy,
      ascdesc: SearchBy.sortOrder
    };
    this.setState({ spinner: true, resultData: [] });

    getContentByAction(searchParam)
      .then((res) => {
        if (res.length == 0 || typeof res[0].error === 'defined') {
          this.setState({ spinner: false });
          return;
        }

        var sortedRes = res.sort((a, b) => { return a.properties_displayorder - b.properties_displayorder })
        var filterByListingRes = sortedRes.filter((each) => each.property_listing_type == SearchBy.listingType);
        this.setState({ resultData: filterByListingRes, spinner: false });

        RouteParam.mapResultData = sortedRes;
      })
      .catch((err) => {
        console.log('get search data error', err);
        this.setState({ spinner: false });
      })
  }

  getSearchByCategory = () => {
    var searchParam = {
      action: 'property_search_by_category',
      user_latitude: LoginInfo.latitude,
      user_longitude: LoginInfo.longitude,
      user_id: LoginInfo.uniqueid,
      user_account: LoginInfo.user_account,
      propertytype: SearchBy.propertyType,
    };
    this.setState({ spinner: true, resultData: [] });

    getContentByAction(searchParam)
      .then((res) => {
        if (res.length == 0 || typeof res[0].error === 'defined') {
          this.setState({ spinner: false });
          return;
        }

        var sortedRes = res.sort((a, b) => { return a.properties_displayorder - b.properties_displayorder });
        this.setState({ resultData: sortedRes, spinner: false });
        RouteParam.mapResultData = sortedRes;
      })
      .catch((err) => {
        console.log('get search data error', err);
        this.setState({ spinner: false });
      })
  }

  getPropertyTypeFromId = (categoryId) => {
    var propertyType = PropertyTypeData.filter((each) => each.properties_category_id == categoryId);
    var retValue = propertyType[0];
    retValue.properties_category_short_desc = retValue.properties_category_short_desc ? retValue.properties_category_short_desc : 'No title';
    return retValue;
  }

  onPropertyPress = (propertyRecordNo) => {
    RouteParam.propertyRecordNo = propertyRecordNo;
    this.props.navigation.navigate('PropertyStack');
  }

  onSearch = (query) => {
    RouteParam.searchKind = 'searchByQuery';
    SearchBy.query = query;    
    this.getSearchByQuery();
  }

  onApply = () => {
    this.setState({ visibleNumberOfRooms: false })
    this.getSearchByQuery();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ width: '100%' }}>
          <Header title={this.state.headerTitle.toUpperCase()} titleColor={Colors.blackColor} rightIcon={Images.iconMap} onPressBack={() => this.props.navigation.goBack(null)} onPressRightIcon={() => this.props.navigation.navigate('ResultMap')} />
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
              
              <View style={styles.conditionContainer}>
                <View style={styles.conditionInnerContainer}>
                  <TouchableOpacity style={{ width: '50%', height: '100%' }} onPress={() => this.props.navigation.navigate('PropertyType')}>
                    <View style={{ width: '100%', height: '50%', justifyContent: 'center' }}>
                      <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(1.8), color: Colors.passiveTxtColor }}>PROPERTY TYPE</Text>
                    </View>
                    <View style={{ width: '100%', height: '50%', justifyContent: 'center' }}>
                      <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(2.2), color: Colors.blackColor }}>{this.getPropertyTypeFromId(SearchBy.propertyType).properties_category_short_desc}</Text>
                    </View>
                  </TouchableOpacity>

                  {this.state.numberOfRooms.map((each, index) => {
                    return (
                      <TouchableOpacity key={index} style={{ width: '25%', height: '100%', borderColor: Colors.borderColor, borderLeftWidth: normalize(0.5) }}
                        onPress={() => {
                          this.setState({
                            visibleNumberOfRooms: true,
                            oldBedrooms: SearchBy.bedrooms,
                            oldBathrooms: SearchBy.bathrooms
                          })
                        }
                        }
                      >
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

          <View style={styles.searchBoxContainer}>
            <SearchBox boxStyle={{ width: width * 0.9, height: normalize(35, 'height'), backgroundColor: Colors.searchBackColor, borderColor: Colors.searchBackColor, btnColor: Colors.weakBlackColor }} onSearch={this.onSearch} />
          </View>

          <View style={styles.listContainer}>
            <ActivityIndicator style={{ position: 'absolute' }} animating={this.state.spinner} />
            {
              this.state.resultData.length == 0 && this.state.spinner == false ?
                <View style={styles.emptyContainer}>
                  <Text style={{ fontFamily: 'SFProText-Semibold', fontSize: 14, color: Colors.blackColor }}>No Result Data</Text>
                </View>
                :
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={this.state.resultData}
                  renderItem={({ item }) => <PropertyCard cardStyle={{ width: width * 0.95, height: normalize(245, 'height'), marginBottom: normalize(10, 'height'), marginRight: 0 }} item={item} onPress={() => this.onPropertyPress(item.property_recordno)} />}
                  keyExtractor={item => item.property_recordno}
                />
            }
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
              onPress={() => {
                let numberOfRooms = this.state.numberOfRooms;
                numberOfRooms[0].count = this.state.oldBedrooms;
                numberOfRooms[1].count = this.state.oldBathrooms;
                this.setState({
                  visibleNumberOfRooms: false,
                  numberOfRooms: numberOfRooms
                })
              }}
            >
              <Image style={{ width: '50%', height: '50%' }} source={Images.iconWhiteClose} resizeMode='contain' />
            </TouchableOpacity>
          </View>

          <View style={styles.modalBodyBack}>
            <View style={styles.modalBody}>
              {
                this.state.numberOfRooms.map((each, index) => {
                  return (
                    <View key={index} style={styles.eachLine}>
                      <View style={{ width: '50%', height: '100%', justifyContent: 'center', paddingLeft: normalize(10) }}>
                        <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(2.2), color: Colors.blackColor }}>{each.name}</Text>
                      </View>
                      <View style={{ width: '50%', height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingRight: normalize(10) }}>
                        <View style={{ width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                          <TouchableOpacity style={{ width: '70%', height: '50%' }} onPress={() => {
                            let numberOfRooms = this.state.numberOfRooms;
                            numberOfRooms[index].count = each.count > 1 ? each.count - 1 : 1;
                            this.setState({ numberOfRooms: numberOfRooms });

                            if (index == 0) SearchBy.bedrooms = numberOfRooms[index].count;
                            else if (index == 1) SearchBy.bathrooms = numberOfRooms[index].count;
                          }}>
                            <Image style={{ width: '100%', height: '100%' }} source={Images.iconMinus} resizeMode='contain' />
                          </TouchableOpacity>
                        </View>
                        <View style={{ width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(2.2), color: Colors.blackColor }}>{each.count}</Text>
                        </View>
                        <View style={{ width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                          <TouchableOpacity style={{ width: '70%', height: '50%' }} onPress={() => {
                            let numberOfRooms = this.state.numberOfRooms;
                            numberOfRooms[index].count = each.count + 1;
                            this.setState({ numberOfRooms: numberOfRooms });

                            if (index == 0) SearchBy.bedrooms = numberOfRooms[index].count;
                            else if (index == 1) SearchBy.bathrooms = numberOfRooms[index].count;
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
              <Button btnTxt='Apply' btnStyle={{ width: '100%', height: normalize(50, 'height'), color: 'blue' }} onPress={this.onApply} />
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
  searchBoxContainer: {
    width: '95%',
    // height: '22%',
    marginTop: normalize(-100, 'height'),
    alignSelf: 'center',
    zIndex: 1,
    //borderWidth: 1    
  },
  conditionContainer: {
    width: '95%',
    height: '43%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: normalize(40, 'height'),
    borderColor: Colors.borderColor,
    borderTopWidth: normalize(0.5),
    //borderWidth: 1
  },
  conditionInnerContainer: {
    width: '95%',
    height: '83%',
    flexDirection: 'row',
    //borderWidth: 1
  },
  listContainer: {
    position: 'absolute',
    top: normalize(135, 'height'),
    left: '2.5%',
    width: '95%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    // alignSelf: 'center',
    // marginTop: normalize(70, 'height'),
    // borderWidth: 1
  },
  emptyContainer: {
    width: '60%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
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