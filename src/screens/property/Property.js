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
  FlatList,
  TouchableOpacity,
  Dimensions,
  ImageBackground
} from "react-native";
import normalize from 'react-native-normalize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import { BlurView } from "@react-native-community/blur";
import ViewMoreText from 'react-native-view-more-text';

import Icon from 'react-native-vector-icons/FontAwesome';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

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

import { Colors, Images, RouteParam, LoginInfo } from '@constants';
import { getContentByAction, postSaveOrRemoveProperty } from '../../api/rest';

export default class PropertyScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavorite: false,
      property: {
        // id: 'MLS. 123456',
        // name: '3 Bedroom Modern House',
        // img: require('../../assets/images/propertyImg.png'),
        // state: 'NY',
        // price: 2.3,
        // period: 'Monthly',
        // subTxt: 'Dix Hills',
        // address: '123 Main Street - First Floor',
        // number: 11746,
        // type: 'rent',
        // location: 'Toronto',
        // region: {
        //   latitude: 37.78825,
        //   longitude: -122.4324,
        //   latitudeDelta: 0.0922,
        //   longitudeDelta: 0.0421,
        // },
        // sqm: 230,
        // desc: 'This Stately Brick Colonial Was Completely Renovated In 2001, Boasting 5 Beds/5.5 Baths, 2 Story Grand Entry Foyer, Huge Granite Eat-In Kitchen W/ Center Island W/ Wine Fridge, Stainless Designer Appliances W/ Gas Cooking, Radiant Heated Floor & Double Wall Ovens. Office, Fam Room W/ Wood Burning/Gas Fplc & 4K Projector Theater System, Lr W/ Gas Flpc, FDR W/ Coffered Ceiling, Master Suite W/ Sitting Room & Marble Bathroom W/ Radiant Heated Floors. Gated 1 Acre Property W/ IG Pool/Cabana.',
        // detailImgs: [
        //   { img: require('../../assets/images/favoriteImg1.png') },
        //   { img: require('../../assets/images/favoriteImg2.png') },
        //   { img: require('../../assets/images/featureImg1.png') },
        //   { img: require('../../assets/images/featureImg2.png') },
        // ],
        // tags: [
        //   {
        //     label: 'Beds',
        //     value: 3,
        //     iconImg: Images.iconWhiteBed
        //   },
        //   {
        //     label: 'Baths',
        //     value: 2,
        //     iconImg: Images.iconWhiteBath
        //   },
        // ],
        // owner: {
        //   name: 'Anthony Robinson Duran',
        //   role: 'Licensed Real State Salesperson',
        //   act: 'Brought By',
        //   img: require('../../assets/images/profileImg.png')
        // }
      },
      propertyPhotoData: [],
      agentCard: '',
      sticky: false,
    }
  }

  componentDidMount() {   
    this.getProperty();
    this.getPropertyPhoto();
    this.getAgentCard();    
  }  

  getProperty = () => {
    var propertyParam = {
      action: 'property_detail',
      user_latitude: LoginInfo.latitude,
      user_longitude: LoginInfo.longitude,      
      user_id: LoginInfo.uniqueid,
      property_recordno: RouteParam.propertyRecordNo,//this.props.route.params.propertyRecordNo
    };

    getContentByAction(propertyParam)
      .then((res) => {
        console.log('property', res)
        this.setState({ 
          property: res[0],
          isFavorite: res[0].property_isFavorite
        });
      })
      .catch((err) => {
        console.log('get feature property error', err)
      })
  }

  getPropertyPhoto = () => {
    var photoParam = {
      action: 'property_photos',
      user_latitude: LoginInfo.latitude,
      user_longitude: LoginInfo.longitude,      
      user_id: LoginInfo.uniqueid,
      property_recordno: RouteParam.propertyRecordNo,//this.props.route.params.propertyRecordNo
    };

    getContentByAction(photoParam)
      .then((res) => {
        //console.log('property', res)      
        this.setState({ propertyPhotoData: res });
      })
      .catch((err) => {
        console.log('get property photo error', err)
      })
  }

  getAgentCard = () => {
    var cardParam = {
      action: 'agent_card',
      user_latitude: LoginInfo.latitude,
      user_longitude: LoginInfo.longitude,      
      user_id: LoginInfo.uniqueid,
      user_assigned_agent: 0, //hard code
      property_recordno: RouteParam.propertyRecordNo,//this.props.route.params.propertyRecordNo
    };

    getContentByAction(cardParam)
      .then((res) => {
        //console.log('card', res)      
        this.setState({ agentCard: res[0] });
      })
      .catch((err) => {
        console.log('get agent card error', err)
      })
  }

  formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  onBookmark = async () => {
    var addRemoveFlag = this.state.isFavorite ? 'remove' : 'add';
    var favoriteParam = {
      action: 'favorites_properties',
      user_latitude: LoginInfo.latitude,
      user_longitude: LoginInfo.longitude,      
      user_id: LoginInfo.uniqueid,
      user_action: addRemoveFlag,
      property_recordno: RouteParam.propertyRecordNo,//this.props.route.params.propertyRecordNo
    };

    let bodyFormData = new FormData();
    bodyFormData.append('action', favoriteParam.action);    
    bodyFormData.append('user_latitude', favoriteParam.user_latitude);
    bodyFormData.append('user_longitude', favoriteParam.user_longitude); 
    bodyFormData.append('user_id', favoriteParam.user_id); 
    bodyFormData.append('user_action', favoriteParam.user_action); 
    bodyFormData.append('property_recordno', favoriteParam.property_recordno);
        
    await postSaveOrRemoveProperty(bodyFormData)
      .then((res) => console.log('post save or remove favorite success', res))
      .catch((err) => console.log('post save or remove favorite error', err))
    
    this.setState({ isFavorite: !this.state.isFavorite });
  }

  renderViewMore(onPress) {
    return (
      <Text style={{ fontSize: RFPercentage(1.7), color: Colors.blueColor, alignSelf: 'flex-end', marginTop: normalize(5, 'height') }} onPress={onPress}>View more</Text>
    )
  }
  renderViewLess(onPress) {
    return (
      <Text style={{ fontSize: RFPercentage(1.7), color: Colors.blueColor, alignSelf: 'flex-end', marginTop: normalize(5, 'height') }} onPress={onPress}>View less</Text>
    )
  }

  handleScroll = (event) => {
    //console.log(event.nativeEvent.contentOffset.y)
    let y = event.nativeEvent.contentOffset.y;

    if (!this.state.sticky && y > 60) {
      this.setState({
        sticky: true,
      })
    }
    else if (this.state.sticky && y < 60) {
      this.setState({
        sticky: false,
      })
    }
  }

  render() {
    return (
      <ScrollView
        ref={ref => this.scrollRef = ref}
        style={styles.container}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
        onScroll={this.handleScroll}
        scrollEventThrottle={16}
      >
        {
          this.state.sticky ? (
            <View style={{ width: '100%' }}>
              <Header title={this.state.property.property_recordno} titleColor={Colors.blackColor} isSticky={true} onPressBack={() => this.props.navigation.goBack(null)} />
            </View>
          )
            : <View></View>
        }
        <ImageBackground style={styles.propertyImgBack} source={{ uri: this.state.property.property_main_photo_url }}>
          {
            this.state.sticky ? <View></View> :
              (
                <View style={{ width: '100%' }}>
                  <Header title={this.state.property.property_recordno} titleColor={Colors.whiteColor} onPressBack={() => this.props.navigation.goBack(null)} />
                </View>

              )
          }


          <View style={[styles.labelTagLine, this.state.sticky ? { marginTop: normalize(390, 'height') } : { marginTop: normalize(347, 'height') }]}>
            <LabelTag tagTxt={this.state.property.property_listing_type === 'R' ? 'For Rent' : 'For Sale'} tagStyle={{ width: normalize(85), height: normalize(25, 'height') }} />
          </View>

          <View style={styles.blurCard}>
            <BlurView
              //styles={styles.blurView}
              borderRadius={normalize(20)}
              blurRadius={10} //android
              blurType="light"
              blurAmount={3}
              reducedTransparencyFallbackColor="white" //ios
            >
              <View style={styles.blurViewCover}></View>
            </BlurView>
          </View>

          <View style={[styles.blurCard, { marginTop: normalize(-250, 'height') }]}>
            <View style={styles.topPart}>
              <View style={styles.leftPart}>
                <View style={styles.leftNameLine}>
                  <Text style={{ fontFamily: 'SFProText-Bold', fontSize: RFPercentage(5), color: 'white' }}>{this.state.property.property_address1}</Text>
                </View>
                <View style={styles.leftPriceLine}>
                  <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(3.8), color: 'white' }}>{this.formatter.format(this.state.property.property_amount).split(".")[0]}</Text>
                </View>
                <View style={styles.leftTagLine}>
                  <View style={styles.eachTagContainer}>
                    <Image style={{ width: '30%', height: '100%' }} resizeMode='contain' source={Images.iconWhiteBed} />
                    <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(2.5), color: 'white', marginLeft: normalize(15) }}>{this.state.property.property_bedrooms}</Text>
                    <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(2.5), color: 'white', marginLeft: normalize(5) }}>Beds</Text>
                  </View>
                  <View style={[styles.eachTagContainer, { marginLeft: normalize(30) }]}>
                    <Image style={{ width: '30%', height: '100%' }} resizeMode='contain' source={Images.iconWhiteBath} />
                    <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(2.5), color: 'white', marginLeft: normalize(15) }}>{this.state.property.property_bathrooms}</Text>
                    <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(2.5), color: 'white', marginLeft: normalize(5) }}>Baths</Text>
                  </View>
                </View>
              </View>
              <View style={styles.rightPart}>
                <TouchableOpacity onPress={() => this.onBookmark()}>
                  <View style={{ backgroundColor: '#555', width: normalize(36), height: normalize(36), borderRadius: normalize(18), justifyContent: 'center', alignItems: 'center' }}>
                    <Image style={{ width: '50%', height: '50%' }} resizeMode='contain' source={this.state.isFavorite ? Images.iconRedBookmark : Images.iconWhiteBookmark} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.bottomPart}>
              <TouchableOpacity onPress={() => this.scrollRef.scrollTo({ y: normalize(667, 'height') })}>
                <Image style={{ width: normalize(15), height: normalize(15) }} resizeMode='contain' source={Images.iconDetail} />
              </TouchableOpacity>
            </View>
          </View>

        </ImageBackground>

        <View style={styles.enterBtnContainer}>
          <Button btnTxt='Walk Around! Enter Virtual Open House' btnStyle={{ width: '100%', height: normalize(50, 'height'), color: 'blue' }} onPress={() => this.props.navigation.navigate('OpenVirtual')} />
        </View>

        <View style={styles.descContainer}>
          <Text style={{ fontFamily: 'SFProText-Semibold', fontSize: RFPercentage(2), color: Colors.blackColor, marginTop: normalize(7, 'height'), marginBottom: normalize(7, 'height') }}>DESCRIPTION</Text>
          <ViewMoreText
            style={{ marginTop: normalize(7, 'height') }}
            numberOfLines={3}
            renderViewMore={this.renderViewMore}
            renderViewLess={this.renderViewLess}
          >
            <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(1.7), color: Colors.passiveTxtColor, lineHeight: normalize(20, 'height') }}>{this.state.property.property_long_description}</Text>
          </ViewMoreText>
        </View>

        <View style={styles.addressContainer}>
          <Text style={{ fontFamily: 'SFProText-Semibold', fontSize: RFPercentage(2), color: Colors.blackColor, marginTop: normalize(20, 'height') }}>ADDRESS</Text>
          <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(1.7), color: Colors.passiveTxtColor, marginTop: normalize(7, 'height') }}>{this.state.property.property_address1}</Text>
          <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(1.7), color: Colors.passiveTxtColor, marginTop: normalize(7, 'height') }}>{this.state.property.property_city}, {this.state.property.property_state} {this.state.property.property_recordno}</Text>
        </View>

        <View style={styles.callCardContainer}>
          <CallCard
            userName={this.state.agentCard.agent_fullname}
            userRole={this.state.agentCard.agent_title}
            userAct='Presented By'
            userImg={{ uri: this.state.agentCard.agent_photourl }}
          />
        </View>

        <View style={styles.photoContainer}>
          <Text style={{ fontFamily: 'SFProText-Semibold', fontSize: RFPercentage(2), color: Colors.blackColor, marginTop: normalize(7, 'height') }}>PHOTOS</Text>
          <FlatList
            keyExtractor={item => item.property_photourl}
            data={this.state.propertyPhotoData}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <View key={item.img} style={{ width: width * 0.3, height: 100, marginTop: normalize(7, 'height'), marginRight: normalize(7), borderRadius: normalize(8), /*borderWidth: 1*/ }}>
                  <Image style={{ width: '100%', height: '100%', borderRadius: normalize(8) }} resizeMode='stretch' source={{ uri: item.property_photourl }} />
                </View>
              )
            }}
          />
        </View>
        <View style={styles.mapContainer}>        
          <MapView
            initialRegion={{
              latitude: this.state.property.property_latitude,
              longitude: this.state.property.property_longitude,
              latitudeDelta: 0.0922 / 5,
              longitudeDelta: 0.0421 / 5,
            }}
            region={{
              latitude: this.state.property.property_latitude,
              longitude: this.state.property.property_longitude,
              latitudeDelta: 0.0922 / 5,
              longitudeDelta: 0.0421 / 5,
            }}
            style={{ flex: 1 }}
            showsUserLocation={true}
            showsCompass={true}
            showsPointsOfInterest={false}
            zoomControlEnabled={true}
          >
            <Marker
              coordinate={{
                latitude: this.state.property.property_latitude,
                longitude: this.state.property.property_longitude
              }}              
              title={this.state.property.property_city}
            >
              <View style={{width: normalize(20), height: normalize(30, 'height')}}>
                <Image style={{width: '100%', height: '100%'}} source={Images.marker} />
              </View>
            </Marker>
          </MapView>
        </View>
        {/* <View style={{ width: '100%', height: normalize(20, 'height') }}></View> */}

      </ScrollView>
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
    //borderWidth: 1,
    //borderColor: '#ff0000'
  },
  propertyImgBack: {
    width: '100%',
    //height: height * 0.75,
    height: height,
    //justifyContent: 'space-between',
    //borderWidth: 1
  },



  labelTagLine: {
    width: '85%',
    height: normalize(30, 'height'),
    //marginTop: normalize(327, 'height'),
    alignSelf: 'center'
  },
  blurCard: {
    width: '95%',
    height: '35%',
    alignSelf: 'center',
    marginBottom: normalize(13, 'height'),
    //borderWidth: 2
  },
  blurView: { //not applied

  },
  blurViewCover: {
    backgroundColor: Colors.blackColor,
    width: '100%',
    height: '100%',
    opacity: 0.5,
    borderRadius: normalize(20)
  },
  topPart: {
    width: '100%',
    height: '83%',
    flexDirection: 'row',
    paddingLeft: normalize(15),
    //borderWidth: 1,    
  },
  leftPart: {
    width: '80%',
    height: '100%',
    justifyContent: 'center'
    //borderWidth: 1
  },
  rightPart: {
    width: '20%',
    height: '100%',
    alignItems: 'center',
    marginTop: normalize(17, 'height'),
    //borderWidth: 1
  },
  bottomPart: {
    width: '100%',
    height: '17%',
    justifyContent: 'center',
    alignItems: 'center',
    //borderWidth: 1
  },
  leftNameLine: {
    width: '100%',
    height: '60%',
    justifyContent: 'center',
    //borderWidth: 1
  },
  leftPriceLine: {
    width: '100%',
    height: '25%',
    //borderWidth: 1
  },
  leftTagLine: {
    width: '100%',
    height: '15%',
    flexDirection: 'row',
    alignItems: 'center',
    //borderWidth: 1
  },
  eachTagContainer: {
    width: '35%',
    height: '70%',
    flexDirection: 'row',
    alignItems: 'center',
  },



  enterBtnContainer: {
    width: '90%',
    height: '5%',
    justifyContent: 'center',
    alignSelf: 'center',
    // marginTop: normalize(10, 'height'),
    // borderColor: Colors.borderColor,
    // borderTopWidth: normalize(1, 'height')
  },
  descContainer: {
    width: '90%',
    // height: '10%',
    alignSelf: 'center',
    //borderWidth: 1
  },
  addressContainer: {
    width: '90%',
    height: normalize(80, 'height'),
    alignSelf: 'center',
    borderColor: Colors.borderColor,
    borderTopWidth: normalize(0.5, 'height'),
    marginTop: normalize(20, 'height'),
    //borderWidth: 1
  },
  callCardContainer: {
    width: width * 0.9,
    height: normalize(100, 'height'),
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: normalize(8, 'height'),
    //borderWidth: 1
  },
  photoContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: normalize(8, 'height'),
    //borderWidth: 1
  },
  mapContainer: {
    width: width,
    height: normalize(330, 'height'),
    marginTop: normalize(10, 'height'),
    borderColor: Colors.borderColor,
    borderTopWidth: normalize(0.5, 'height'),
  },
});

