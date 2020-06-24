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
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  ImageBackground
} from "react-native";
import normalize from 'react-native-normalize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import { BlurView } from "@react-native-community/blur";
import ViewMoreText from 'react-native-view-more-text';

import ImageView from 'react-native-image-view';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import MapView, { Marker } from 'react-native-maps';

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
import { getContentByAction, postData } from '../../api/rest';

export default class PropertyScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavorite: false,
      property: {},
      propertyPhotoData: [],
      propertyPhotoDetailData: [],
      agentCard: '',
      sticky: false,
      spinner: false,
      isImageViewVisible: false,
      imageIndex: 0
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
      user_account: LoginInfo.user_account,
      property_recordno: RouteParam.propertyRecordNo,
    };

    this.setState({ spinner: true });
    getContentByAction(propertyParam)
      .then((res) => {
        //console.log(res);
        this.setState({
          property: res[0],
          isFavorite: res[0].property_isFavorite,
          spinner: false
        });
      })
      .catch((err) => {
        console.log('get feature property error', err);
        this.setState({ spinner: false });
      })
  }

  getPropertyPhoto = () => {
    var photoParam = {
      action: 'property_photos',
      user_latitude: LoginInfo.latitude,
      user_longitude: LoginInfo.longitude,
      user_id: LoginInfo.uniqueid,
      property_recordno: RouteParam.propertyRecordNo,
    };

    getContentByAction(photoParam)
      .then((res) => {
        this.setState({ propertyPhotoData: res });

        var propertyPhotoDetailData = [];
        res.forEach((each) => {
          var photo = {
            source: { uri: each.property_photourl },
            width: width,
            height: width
          };
          propertyPhotoDetailData.push(photo);
        })
        this.setState({ propertyPhotoDetailData: propertyPhotoDetailData });
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
      user_assigned_agent: LoginInfo.user_assigned_agent,
      property_recordno: RouteParam.propertyRecordNo,
    };

    getContentByAction(cardParam)
      .then((res) => {
        if (res.length > 0) {
          //console.log('agentCard', res[0]);          
          this.setState({ agentCard: res[0] });
        }
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
      property_recordno: RouteParam.propertyRecordNo,
    };

    let bodyFormData = new FormData();
    bodyFormData.append('action', favoriteParam.action);
    bodyFormData.append('user_latitude', favoriteParam.user_latitude);
    bodyFormData.append('user_longitude', favoriteParam.user_longitude);
    bodyFormData.append('user_id', favoriteParam.user_id);
    bodyFormData.append('user_action', favoriteParam.user_action);
    bodyFormData.append('property_recordno', favoriteParam.property_recordno);

    await postData(bodyFormData)
      .then((res) => console.log('post save or remove favorite success', res))
      .catch((err) => console.log('post save or remove favorite error', err))

    this.setState({ isFavorite: !this.state.isFavorite });
  }

  onOpenVirtual = () => {
    RouteParam.agent.fullname = this.state.agentCard.agent_fullname;
    RouteParam.agent.title = this.state.agentCard.agent_title;
    RouteParam.agent.img = this.state.agentCard.agent_photourl;
    // RouteParam.agent.activeListing = this.state.agentCard.activeListing;
    // RouteParam.agent.sold = this.state.agentCard.sold;

    this.props.navigation.navigate('OpenVirtual');
  }

  onCall = () => {
    let phoneNumber = this.state.agentCard.agent_telephone;

    phoneNumber = phoneNumber.replace("(", "");
    phoneNumber = phoneNumber.replace(")", "");
    phoneNumber = phoneNumber.replace("-", "");
    phoneNumber = phoneNumber.replace(/\s+/g, '');
    phoneNumber = '1' + phoneNumber;

    RNImmediatePhoneCall.immediatePhoneCall(phoneNumber);
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
        bounces={false}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
        onScroll={this.handleScroll}
        scrollEventThrottle={16}
      >
        {
          this.state.sticky ? (
            <View style={{ width: '100%' }}>
              <Header title={this.state.property.property_mlsnumber} titleColor={Colors.blackColor} isSticky={true} onPressBack={() => this.props.navigation.goBack(null)} />
            </View>
          )
            : <View></View>
        }
        <ImageBackground style={styles.propertyImgBack} source={{ uri: this.state.property.property_main_photo_url }}>
          {
            this.state.sticky ? <View></View> :
              (
                <View style={{ width: '100%' }}>
                  <Header title={this.state.property.property_mlsnumber} titleColor={Colors.whiteColor} onPressBack={() => this.props.navigation.goBack(null)} />
                </View>
              )
          }

          <ActivityIndicator style={{ position: 'absolute' }} animating={this.state.spinner} />

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
                  <Text style={{ fontFamily: 'SFProText-Bold', fontSize: RFPercentage(4), color: 'white' }}>{this.state.property.property_address1}</Text>
                  <View style={styles.leftCityStateLine}>
                    <Text style={{ fontFamily: 'SFProText-Bold', fontSize: RFPercentage(3.5), color: 'white' }}>{this.state.property.property_city}</Text>
                    <Text style={{ fontFamily: 'SFProText-Bold', fontSize: RFPercentage(3.5), color: 'white' }}>, {this.state.property.property_state}</Text>
                  </View>
                </View>
                <View style={styles.leftPriceLine}>
                  <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(3.5), color: 'white' }}>{this.formatter.format(this.state.property.property_amount).split(".")[0]}</Text>
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

        {
          this.state.property.property_openhouse &&
          <View style={styles.enterBtnContainer}>
            <Button btnTxt='Virtual Tour or Live Open House' btnStyle={{ width: '100%', height: normalize(50, 'height'), color: 'blue' }} onPress={() => this.onOpenVirtual()} />
          </View>
        }

        <View style={styles.descContainer}>
          <Text style={{ fontFamily: 'SFProText-Semibold', fontSize: RFPercentage(2), color: Colors.blackColor, marginTop: normalize(7, 'height'), marginBottom: normalize(7, 'height') }}>DESCRIPTION</Text>
          <ViewMoreText
            key={this.state.property.property_long_description}
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

        {
          LoginInfo.user_assigned_agent != 0 && this.state.agentCard != '' &&
          <View style={styles.callCardContainer}>
            <CallCard
              userName={this.state.agentCard.agent_fullname}
              userRole={this.state.agentCard.agent_title}
              userCompany={this.state.agentCard.realtor_company}
              userImg={{ uri: this.state.agentCard.agent_photourl }}
              onCall={this.onCall}
            />
          </View>
        }

        <View style={styles.photoContainer}>
          <Text style={{ fontFamily: 'SFProText-Semibold', fontSize: RFPercentage(2), color: Colors.blackColor }}>PHOTOS</Text>
          <FlatList
            keyExtractor={item => item.property_photourl}
            data={this.state.propertyPhotoData}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={{ width: width * 0.3, height: 100, marginTop: normalize(7, 'height'), marginRight: normalize(7), borderRadius: normalize(8) }}
                  onPress={() => this.setState({
                    isImageViewVisible: true,
                    imageIndex: this.state.propertyPhotoData.indexOf(item)
                  })}
                >
                  <Image style={{ width: width * 0.3, height: 100, borderRadius: normalize(8) }} source={{ uri: item.property_photourl }} resizeMode='stretch' />
                </TouchableOpacity>
              )
            }}
          />
        </View>

        {
          this.state.isImageViewVisible &&
          <ImageView
            images={this.state.propertyPhotoDetailData}
            imageIndex={this.state.imageIndex}
            isVisible={this.state.isImageViewVisible}
            onClose={() => this.setState({ isImageViewVisible: false })}
          />
        }

        <View style={styles.mapContainer}>
          <MapView
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
              title={this.state.property.property_address1}
            >
              <View style={{ width: normalize(30), height: normalize(30, 'height') }}>
                <Image style={{ width: '100%', height: '100%' }} source={Images.marker} />
              </View>
            </Marker>
          </MapView>
        </View>

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
    justifyContent: 'center',
    alignItems: 'center',
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
    height: '85%',
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
    height: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    //borderWidth: 1
  },
  leftNameLine: {
    width: '100%',
    height: '60%',
    justifyContent: 'center',
    marginTop: normalize(15, 'height'),
    //borderWidth: 1
  },
  leftCityStateLine: {
    width: '100%',
    height: '30%',
    flexDirection: 'row',
    alignItems: 'center',
    //borderWidth: 1
  },
  leftPriceLine: {
    width: '100%',
    height: '20%',
    justifyContent: 'center',
    //borderWidth: 1
  },
  leftTagLine: {
    width: '100%',
    height: '20%',
    flexDirection: 'row',
    //alignItems: 'center',
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
    //height: '10%',
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
    height: normalize(100),
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: normalize(20, 'height'),
    //borderWidth: 1
  },
  photoContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: normalize(20, 'height'),
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

