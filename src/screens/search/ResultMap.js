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
  ActivityIndicator,
  FlatList,
  Dimensions,
  Platform
} from "react-native";
import normalize from 'react-native-normalize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import Overlay from 'react-native-modal-overlay';
import MapView, { Marker } from 'react-native-maps';

import Icon from 'react-native-vector-icons/FontAwesome';
Platform.OS === 'ios' ? Icon.loadFont() : '';

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
import { Colors, Images, PropertyCardTheme, LoginInfo, SearchBy, SearchWordData, PropertyTypeData } from '@constants';
import { getContentByAction } from '../../api/rest';

export default class ResultMapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: false,
      spinner: false,
      visibleModal: false,
      resultData: [],
      markerData: [],
      sortByListData: [
        {
          sortBy: 'property_price',
          sortOrder: 'asc',
          label: 'LOW TO HIGH ($)'
        },
        {
          sortBy: 'property_price',
          sortOrder: 'desc',
          label: 'HIGH TO LOW ($)'
        },
        {
          sortBy: 'property_listing_date',
          sortOrder: 'desc',
          label: 'DATE POSTED (New to Old)'
        },
        {
          sortBy: 'property_listing_date',
          sortOrder: 'asc',
          label: 'DATE POSTED (Old to New)'
        },
        {
          sortBy: 'distance',
          sortOrder: 'asc',
          label: 'DISTANCE TO YOUR LOCATION'
        },
      ],
      sortBy: SearchBy.sortBy,
      sortOrder: SearchBy.sortOrder,
      oldSortBy: SearchBy.sortBy,
      oldSortOrder: SearchBy.sortOrder,
    }
  }

  componentDidMount() {
    this.getSearchResult();
  }

  getSearchResult = () => {
    var searchParam = {
      action: 'property_search',
      user_latitude: LoginInfo.latitude,
      user_longitude: LoginInfo.longitude,
      user_id: '123', //LoginInfo.uniqueid,      
      search_city: SearchBy.query,
      listingtype: SearchBy.listingType,
      propertytype: SearchBy.propertyTypeIndex,
      pricefrom: SearchBy.priceFrom,
      priceto: SearchBy.priceTo,
      bedrooms: SearchBy.bedrooms,
      bathrooms: SearchBy.bathrooms,
      distance: SearchBy.distance,
      sortby: SearchBy.sortBy,
      ascdesc: SearchBy.sortOrder
    };
    //console.log('param', searchParam);
    this.setState({ spinner: true, resultData: [] });

    getContentByAction(searchParam)
      .then((res) => {
        //console.log('searchData', res);
        var sortedRes = res.sort((a, b) => { return a.properties_displayorder - b.properties_displayorder })

        var markerData = [];
        res.forEach((each) => {
          markerData.push({
            coordinate: {
              latitude: each.property_latitude,
              longitude: each.property_longitude
            },
            title: each.property_address1
          })
        });
        this.setState({
          resultData: sortedRes,
          markerData: markerData,
          spinner: false
        })
      })
      .catch((err) => {
        console.log('get search data error', err);
        this.setState({ spinner: false });
      })
  }

  onSearch = () => {
    //this.props.navigation.navigate('Location');
  }

  onApply = () => {
    SearchBy.sortBy = this.state.sortBy;
    SearchBy.sortOrder = this.state.sortOrder;

    this.setState({ visibleModal: false })
    this.getSearchResult();
    //console.log('searchBy', SearchBy);
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.body}>
          <View style={{ width: '100%', zIndex: 1 }}>
            <Header title='MAP' titleColor={Colors.blackColor} rightIcon={Images.iconSort} onPressBack={() => this.props.navigation.goBack(null)} onPressRightIcon={() => this.setState({ visibleModal: true, oldSortBy: this.state.sortBy, oldSortOrder: this.state.sortOrder })} />
          </View>
          <View style={styles.searchShadowContainer}>
            <View style={styles.searchInnerContainer}>
              <SearchBox boxStyle={{ width: width * 0.9, height: normalize(35, 'height'), backgroundColor: Colors.searchBackColor, borderColor: Colors.searchBackColor, btnColor: Colors.weakBlackColor }} onSearch={this.onSearch} />
            </View>
          </View>

          <View style={styles.mapContainer}>
            <MapView
              initialRegion={{
                latitude: LoginInfo.latitude,
                longitude: LoginInfo.longitude,
                latitudeDelta: 0.0922 / 5,
                longitudeDelta: 0.0421 / 5,
              }}
              region={{
                latitude: LoginInfo.latitude,
                longitude: LoginInfo.longitude,
                latitudeDelta: 0.0922 / 5,
                longitudeDelta: 0.0421 / 5,
              }}
              style={{ flex: 1 }}
              showsUserLocation={true}
              showsCompass={true}
              showsPointsOfInterest={false}
              zoomControlEnabled={true}
            >
              {
                this.state.markerData.map((each) => (
                  <Marker
                    key={each.property_recordno}
                    coordinate={each.coordinate}
                    title={each.title}
                  >
                    <View style={{ width: normalize(20), height: normalize(30, 'height') }}>
                      <Image style={{ width: '100%', height: '100%' }} source={Images.marker} />
                    </View>
                  </Marker>
                ))
              }
            </MapView>
          </View>
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
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={this.state.resultData}
              renderItem={({ item }) => <PropertyCard cardStyle={{ width: normalize(325), height: normalize(245, 'height'), marginTop: normalize(10, 'height'), marginRight: normalize(10) }} cardTheme={PropertyCardTheme[1]} item={item} onPress={this.onPropertyPress} />}
              keyExtractor={item => item.property_recordno}
            />
          }
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
              onPress={() => this.setState({ visibleModal: false, sortBy: this.state.oldSortBy, sortOrder: this.state.oldSortOrder })}
            >
              <Image style={{ width: '50%', height: '50%' }} source={Images.iconWhiteClose} resizeMode='contain' />
            </TouchableOpacity>
          </View>

          <View style={styles.modalBodyBack}>
            <View style={styles.modalBody}>
              {
                this.state.sortByListData.map((each, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.eachLine,
                    index == this.state.sortByListData.length - 1 ? { borderBottomWidth: 0 } : null,
                    ]}
                    onPress={() => this.setState({ sortBy: each.sortBy, sortOrder: each.sortOrder })}
                  >
                    <Text style={{
                      fontFamily: 'SFProText-Regular',
                      fontSize: RFPercentage(2.2),
                      color: (each.sortBy == this.state.sortBy && each.sortOrder == this.state.sortOrder) ? Colors.blueColor : Colors.blackColor
                    }}>
                      {each.label}
                    </Text>
                  </TouchableOpacity>
                ))
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
    zIndex: 1,
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
  mapContainer: {
    width: width,
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0
  },
  listContainer: {
    width: '95%',
    height: normalize(280, 'height'),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    //marginTop: normalize(10, 'height'),
    //borderWidth: 1
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