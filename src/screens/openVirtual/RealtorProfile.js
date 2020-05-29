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
import { Colors, Images, RouteParam } from '@constants';

export default class RealtorProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {      
      propertiesByMeData: [
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
            //img: require('../../assets/images/profileImg.png')
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
            //img: require('../../assets/images/profileImg.png')
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
            //img: require('../../assets/images/profileImg.png')
          }
        }
      ],
    }
  }

  componentDidMount() {

  }

  onPropertyPress = () => { }

  render() {
    const btnBlueStyle = { width: width * 0.45, height: 50, color: 'blue' };
    const btnWhiteStyle = { width: width * 0.45, height: 50, color: 'white' };
    return (
      <ImageBackground style={styles.container}>
        <View style={{ width: '100%' }}>
          <Header title='PROFILE' titleColor={Colors.blackColor} onPressBack={() => this.props.navigation.goBack(null)} />
        </View>
        <View style={styles.body}>
          <View style={styles.imgAndNameContainer}>
            <View style={styles.imgContainer}>
              <Image style={{ width: '100%', height: '100%', borderRadius: 10 }} source={{uri: RouteParam.agent.img}} resizeMode='stretch' />
            </View>
            <View style={styles.nameContainer}>
              <View style={{ width: '100%', height: '20%', justifyContent: 'center' }}><Text style={{ fontFamily: 'SFProText-Bold', fontSize: RFPercentage(2.2), color: Colors.blackColor }}>{RouteParam.agent.fullname}</Text></View>
              <View style={{ width: '100%', height: '20%', justifyContent: 'center' }}><Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(1.8), color: Colors.passiveTxtColor }}>{RouteParam.agent.title}</Text></View>
              <View style={{ width: '100%', height: '20%', justifyContent: 'center' }}><Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(1.8), color: Colors.passiveTxtColor }}>{RouteParam.agent.company}</Text></View>
            </View>
          </View>

          <View style={styles.btnsContainer}>
            <View style={styles.callBtnContainer}>
              <Button btnTxt='Call' btnStyle={{ width: width * 0.66, height: normalize(50, 'height'), color: 'blue' }} onPress={() => console.log('phone call')} />
            </View>
            <View style={styles.msgBtnContainer}>
              <TouchableOpacity style={{ width: normalize(55), height: normalize(55) }} onPress={() => console.log('msg button click')}>
                <Image style={{ width: '100%', height: '100%' }} source={Images.btnMsg} resizeMode='contain' />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.listingContainer}>
            <TouchableOpacity style={styles.activeContainer} onPress={() => this.props.navigation.navigate('MyListing', { tab: 'active' })}>
              <View style={{ width: '90%', height: '30%', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontFamily: 'SFProText-Semibold', fontSize: RFPercentage(2.2), color: Colors.blackColor }}>ACTIVE LISTINGS</Text>
              </View>
              <View style={{ width: '90%', height: '30%', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(3.2), color: Colors.blackColor }}>{RouteParam.agent.activeListing}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.soldContainer} onPress={() => this.props.navigation.navigate('MyListing', { tab: 'sold-rented' })}>
              <View style={{ width: '90%', height: '30%', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontFamily: 'SFProText-Semibold', fontSize: RFPercentage(2.2), color: Colors.blackColor }}>SOLD</Text>
              </View>
              <View style={{ width: '90%', height: '30%', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(3.2), color: Colors.blackColor }}>{RouteParam.agent.sold}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.listTitleContainer}>
            <Text style={{ fontFamily: 'SFProText-Semibold', fontSize: RFPercentage(2), color: Colors.blackColor }}>PROPERTIES LISTED BY ME</Text>
          </View>
          <View style={styles.listContainer}>
            {(this.state.propertiesByMeData.length == 0) ?
              <View style={styles.emptyContainer}>
                <Text style={{ fontSize: 14 }}>No Properties</Text>
              </View>
              :
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={this.state.propertiesByMeData}
                renderItem={({ item }) => <PropertyCard cardStyle={{ width: normalize(325), height: normalize(245, 'height'), marginRight: normalize(10) }} item={item} onPress={this.onPropertyPress} />}
                keyExtractor={item => item.id}
              />
            }
          </View>
        </View>
      </ImageBackground>
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
    width: wp(100),
    height: hp(100),
    marginTop: normalize(20, 'height'),
    borderColor: Colors.borderColor,
    borderTopWidth: normalize(0.5, 'height'),
  },
  btnContainer: {
    width: '95%',
    height: normalize(60),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: normalize(20, 'height'),
    //borderWidth: 1
  },
  imgAndNameContainer: {
    width: '95%',
    height: '16%',
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingTop: normalize(5),
    paddingLeft: normalize(15),
    //borderWidth: 1
  },
  imgContainer: {
    width: normalize(70),
    height: normalize(70),
    borderRadius: 8,
    //borderWidth: 1
  },
  nameContainer: {
    width: '65%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: normalize(15),
    //borderWidth: 1
  },
  btnsContainer: {
    width: '95%',
    height: '15%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    //borderWidth: 1
  },
  callBtnContainer: {
    width: '75%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    alignSelf: 'center',
    paddingRight: normalize(6),
    //borderWidth: 1
  },
  msgBtnContainer: {
    width: '25%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    //borderWidth: 1
  },
  listingContainer: {
    width: '95%',
    height: '15%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: Colors.borderColor,
    borderTopWidth: 1,
    borderBottomWidth: 1
  },
  activeContainer: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    //borderWidth: 1
  },
  soldContainer: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    //borderWidth: 1
  },
  listTitleContainer: {
    width: '95%',
    height: normalize(30, 'height'),
    justifyContent: 'center',
    alignSelf: 'center',
    paddingLeft: 10,
    marginTop: normalize(10, 'height'),
    //borderWidth: 1
  },
  listContainer: {
    width: '95%',
    height: '40%',
    justifyContent: 'center',
    alignSelf: 'center',
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
});