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
  ImageBackground,
  ActivityIndicator
} from "react-native";
import normalize from 'react-native-normalize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import Spinner from 'react-native-loading-spinner-overlay';
import Video from 'react-native-video';

import Icon from 'react-native-vector-icons/FontAwesome';
import MapView from 'react-native-maps';

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

export default class VideoPlayScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoIndex: this.props.route.params.videoIndex,
      videoUrl: 'http://www.openhousemarketingsystem.com/application/data/videos/virtualplus/properties/1.mp4',
      mode: 'img',
      spinner: false,
      property: {
        id: 'MLS. 1234567890',
        name: '3 Bedroom Modern House',
        img: require('../../assets/images/videoImg.png'),
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
        detailVideos: [
          {
            name: 'FRONT OF HOUSE',
            desc: 'Great entry path to the property with lots of flowers',
            video: require('../../assets/images/videoImg.png'),
            playtime: '3:16'
          },
          {
            name: 'LIVING ROOM',
            desc: 'Spacious Living Room With Great Windows and Celing Fan',
            video: require('../../assets/images/videoImg.png'),
            playtime: '2:25'
          },
          {
            name: 'KITCHEN',
            desc: 'Modern Kitchen With Lots of Cabinets and Great Countertop',
            video: require('../../assets/images/videoImg.png'),
            playtime: '4:15'
          },
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
    }
    this.player = '';
  }

  componentDidMount() {
    //console.log('videoId', this.props.route.params.videoId);
  }

  onBuffer = () => { }
  onError = () => { }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ width: '100%' }}>
          <Header title={this.state.property.detailVideos[this.state.videoIndex].name} titleColor={Colors.blackColor} onPressBack={() => this.props.navigation.goBack(null)} />
        </View>


        <View style={styles.imgVideoContainer}>
          <ActivityIndicator style={{ position: 'absolute' }} animating={this.state.spinner} />
          {
            this.state.mode === 'img' ?
              (
                <ImageBackground style={styles.imgBack} source={this.state.property.img} resizeMode='cover'>
                  <TouchableOpacity
                    style={styles.btnPlay}
                    onPress={() => this.setState({
                      spinner: true,
                      mode: 'video'
                    })}
                  >
                    <Image style={{ width: '100%', height: '100%' }} source={Images.btnVideoPlay} />
                  </TouchableOpacity>
                </ImageBackground>
              ) :
              (
                // <WebView
                //   source={{ uri: "https://www.youtube.com/watch?v=" + this.state.videoId }}
                //   onLoadStart={() => this.setState({ spinner: true })}
                //   onLoadEnd={() =>{ this.setState({ spinner: false }); console.log('load end')}}
                //   domStorageEnabled={true}
                //   javaScriptEnabled={true}
                // />
                <Video
                  style={{ width: '100%', height: '100%' }}
                  source={{ uri: this.state.videoUrl }}   // Can be a URL or a local file.
                  ref={(ref) => {
                    this.player = ref
                  }}
                  controls = {true}
                  onBuffer={this.onBuffer}
                  onError={this.videoError}
                  onLoad={() => this.setState({ spinner: false })}
                />
              )
          }          
        </View>

        <View style={styles.descContainer}>
          <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(1.9), color: Colors.blackColor }}>{this.state.property.detailVideos[this.state.videoIndex].desc}</Text>
        </View>
        <View style={styles.callCardContainer}>
          <CallCard
            userName={this.state.property.owner.name}
            userRole={this.state.property.owner.role}
            userAct={this.state.property.owner.act}
            userImg={this.state.property.owner.img}
          />
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
    //borderWidth: 1,    
  },
  imgVideoContainer: {
    width: '100%',
    height: normalize(220, 'height'),
    marginTop: normalize(20, 'height'),
    justifyContent: 'center',
    alignItems: 'center',
    //borderWidth: 1
  },
  imgBack: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    //borderWidth: 1
  },
  btnPlay: {
    width: normalize(90),
    height: normalize(70, 'height'),
    alignSelf: 'center',    
  },
  descContainer: {
    width: '90%',
    height: normalize(40, 'height'),
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: normalize(10, 'height'),
    //borderWidth: 1
  },
  callCardContainer: {
    width: width * 0.9,
    height: normalize(100, 'height'),
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: normalize(10, 'height'),
    //borderWidth: 1
  },
});