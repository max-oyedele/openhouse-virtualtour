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

export default class VideoPropertyScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
          //img: require('../../assets/images/profileImg.png')
        }
      }
    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={{ width: '100%' }}>
          <Header title={this.state.property.id} titleColor={Colors.blackColor} rightIcon={Images.iconFavorite} onPressBack={() => this.props.navigation.goBack(null)} />
        </View>

        <View style={styles.imgContainer}>
          <Image style={{ width: '100%', height: '100%' }} source={this.state.property.img} resizeMode='cover' />
        </View>
        <View style={styles.labelTagLine}>
          <View style={{ marginBottom: 10 }}>
            <LabelTag tagTxt={this.state.property.type === 'rent' ? 'For Rent' : 'For Sale'} tagStyle={{ width: 85, height: 25 }} />
          </View>
        </View>

        <View style={styles.propertyFeaturePart}>
          {/* <View style={styles.nameLine}>
            <Text style={{ fontSize: 32, color: Colors.blackColor }}>{this.state.property.name}</Text>
          </View> */}
          <View style={styles.priceLine}>
            <Text style={{ fontFamily: 'SFProText-Semibold', fontSize: RFPercentage(3), color: Colors.weakBlackColor }}>${this.state.property.price.toFixed(3)} / {this.state.property.period}</Text>
          </View>
          <View style={styles.tagLine}>
            <View style={styles.eachTagContainer}>
              <Image style={{ width: '25%', height: '100%' }} resizeMode='contain' source={this.state.property.tags[0].iconImg} />
              <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(2.1), color: Colors.blackColor, marginLeft: normalize(5) }}> {this.state.property.tags[0].value}</Text>
              <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(2.1), color: Colors.blackColor, marginLeft: normalize(5) }}>{this.state.property.tags[0].label}</Text>
            </View>
            <View style={{ width: '3%', height: '100%', alignItems: 'center', marginLeft: normalize(10) }}>
              <Image style={{ width: '70%', height: '100%' }} source={Images.markDot} resizeMode='contain' />
            </View>
            <View style={[styles.eachTagContainer, {marginLeft: normalize(12)}]}>
              <Image style={{ width: '25%', height: '100%' }} resizeMode='contain' source={this.state.property.tags[1].iconImg} />
              <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(2.1), color: Colors.blackColor, marginLeft: normalize(5) }}> {this.state.property.tags[1].value}</Text>
              <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(2.1), color: Colors.blackColor, marginLeft: normalize(5) }}>{this.state.property.tags[1].label}</Text>
            </View>
          </View>
        </View>

        <View style={styles.videosContainer}>
          <Text style={{ fontFamily: 'SFProText-Semibold', fontSize: RFPercentage(2), color: Colors.blackColor, marginTop: normalize(15, 'height') }}>VIDEOS</Text>
          {this.state.property.detailVideos.map((each, index) => {
            let key = each.name + index;
            return (
              <View key={key} style={styles.eachUnderlineContainer}>
                <View style={styles.eachLineContainer}>
                  <View style={styles.videoContainer}>
                    <ImageBackground style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }} imageStyle={{ borderRadius: normalize(10)}} source={this.state.property.detailVideos[0].video} resizeMode='stretch'>
                      <TouchableOpacity style={{ width: '50%', height: '50%' }} onPress={() => this.props.navigation.navigate('VideoPlay', { videoIndex: index })}>
                        <Image style={{ width: '100%', height: '100%' }} source={Images.btnVideoPlay} />
                      </TouchableOpacity>
                    </ImageBackground>
                  </View>
                  <View style={styles.txtContainer}>
                    <View style={styles.subNameContainer}>
                      <Text style={{ fontFamily: 'SFProText-Semibold', fontSize: RFPercentage(2.2), color: Colors.blackColor }}>{each.name}</Text>
                    </View>
                    <View style={styles.subDescContainer}>
                      <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(2), color: Colors.passiveTxtColor }}>{each.desc}</Text>
                    </View>
                    <View style={styles.playtimeContainer}>
                      <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(2), color: Colors.blackColor }}>{each.playtime}</Text>
                    </View>
                  </View>
                </View>
              </View>
            )
          })}
        </View>

        <View style={styles.addressContainer}>
          <Text style={{ fontFamily: 'SFProText-Semibold', fontSize: RFPercentage(2), color: Colors.blackColor, marginTop: normalize(7, 'height') }}>ADDRESS</Text>
          <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(2), color: Colors.passiveTxtColor, marginTop: normalize(7, 'height') }}>{this.state.property.address}</Text>
          <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(2), color: Colors.passiveTxtColor, marginTop: normalize(7, 'height') }}>{this.state.property.subTxt}, {this.state.property.state} {this.state.property.number}</Text>
        </View>
        <View style={styles.callCardContainer}>
          <CallCard
            userName={this.state.property.owner.name}
            userRole={this.state.property.owner.role}
            userAct={this.state.property.owner.act}
            userImg={this.state.property.owner.img}
          />
        </View>

        <View style={{ width: '100%', height: normalize(80, 'height') }}></View>
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
    //borderWidth: 1,    
  },
  imgContainer: {
    width: '100%',
    height: normalize(220, 'height'),
    marginTop: normalize(20, 'height'),
    //borderWidth: 1
  },
  labelTagLine: {
    width: '90%',
    height: normalize(50, 'height'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    alignSelf: 'center',
    marginTop: normalize(-50, 'height')
  },
  propertyFeaturePart: {
    width: '90%',
    height: normalize(60, 'height'),
    alignSelf: 'center',
    marginTop: normalize(20, 'height'),
    //borderWidth: 1
  },
  nameLine: {
    width: '100%',
    height: '45%',
    //borderWidth: 1
  },
  priceLine: {
    width: '100%',
    //height: '35%',
    height: '50%',
    //borderWidth: 1
  },
  tagLine: {
    width: '100%',
    //height: '20%',
    height: '35%',
    flexDirection: 'row',
    alignItems: 'center',
    //borderWidth: 1
  },
  eachTagContainer: {
    width: normalize(80),
    height: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    //borderWidth: 1
  },
  videosContainer: {
    width: '90%',
    height: normalize(400, 'height'),
    borderColor: Colors.borderColor,
    borderTopWidth: normalize(0.5, 'height'),
    alignSelf: 'center',
    marginTop: normalize(5, 'height'),
    //paddingTop: normalize(10, 'height'),
    //borderWidth: 2
  },
  eachUnderlineContainer: {
    width: '100%',
    height: '35%',
    borderColor: Colors.borderColor,
    borderBottomWidth: normalize(0.5, 'height'),
  },
  eachLineContainer: {
    width: '100%',
    height: '80%',
    flexDirection: 'row',
    marginTop: normalize(14, 'height')
  },
  videoContainer: {
    width: '45%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',        
    //borderWidth: 1
  },
  txtContainer: {
    width: '55%',
    height: '100%',
    marginLeft: normalize(6),
    //borderWidth: 1
  },
  subNameContainer: {
    width: '90%',
    height: '20%',
    justifyContent: 'center',
    alignSelf: 'center',
    //borderWidth: 1,
  },
  subDescContainer: {
    width: '90%',
    height: '55%',
    alignSelf: 'center',
    paddingTop: normalize(5, 'height'),
    //borderWidth: 1,
  },
  playtimeContainer: {
    width: '90%',
    height: '25%',
    justifyContent: 'flex-end',
    alignSelf: 'center',
    //borderWidth: 1,
  },
  addressContainer: {
    width: '90%',
    height: normalize(70, 'height'),
    alignSelf: 'center',
    marginTop: normalize(60, 'height'),
    //borderWidth: 1
  },
  callCardContainer: {
    width: width * 0.9,
    height: normalize(100, 'height'),
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: normalize(15, 'height'),
    //borderWidth: 1
  },
});