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
import { Colors, Images, PropertyCardTheme, RouteParam } from '@constants';
import { getContentByAction } from '../api/rest';

export default class FavoritesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'favorites',
      favoritesData: [
        // {
        //   id: 'MLS.123456',
        //   name: 'Dix Hills',
        //   img: require('../assets/images/favoriteImg1.png'),
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
        //     { img: require('../assets/images/favoriteImg1.png') },
        //     { img: require('../assets/images/favoriteImg2.png') },
        //     { img: require('../assets/images/favoriteImg1.png') },
        //     { img: require('../assets/images/favoriteImg2.png') },
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
        //     img: require('../assets/images/profileImg.png')
        //   }
        // },
        // {
        //   id: 'MLS.123457',
        //   name: 'Historical Lake House',
        //   img: require('../assets/images/favoriteImg2.png'),
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
        //     { img: require('../assets/images/favoriteImg1.png') },
        //     { img: require('../assets/images/favoriteImg2.png') },
        //     { img: require('../assets/images/favoriteImg1.png') },
        //     { img: require('../assets/images/favoriteImg2.png') },
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
        //     img: require('../assets/images/profileImg.png')
        //   }
        // },
        // {
        //   id: 'MLS.123458',
        //   name: '3 Bedroom Modern House',
        //   img: require('../assets/images/favoriteImg1.png'),
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
        //     { img: require('../assets/images/favoriteImg1.png') },
        //     { img: require('../assets/images/favoriteImg2.png') },
        //     { img: require('../assets/images/favoriteImg1.png') },
        //     { img: require('../assets/images/favoriteImg2.png') },
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
        //     img: require('../assets/images/profileImg.png')
        //   }
        // }
      ],
      viewedData: [],
      // viewedData: [
      //   {
      //     id: 'MLS.123456',
      //     name: '3 Bedroom Modern House',
      //     img: require('../assets/images/favoriteImg1.png'),
      //     state: 'NY',
      //     price: 2.3,
      //     period: 'Monthly',
      //     subTxt: 'Dix Hills',
      //     address: '123 Main Street - First Floor',
      //     number: 11746,
      //     type: 'rent',
      //     location: 'Toronto',
      //     region: {
      //       latitude: 37.78825,
      //       longitude: -122.4324,
      //       latitudeDelta: 0.0922,
      //       longitudeDelta: 0.0421,
      //     },
      //     sqm: 230,
      //     desc: 'This Stately Brick Colonial Was Completely Renovated In 2001, Boasting 5 Beds/5.5 Baths, 2 Story Grand Entry Foyer, Huge Granite Eat-In Kitchen W/ Center Island W/ Wine Fridge, Stainless Designer Appliances W/ Gas Cooking, Radiant Heated Floor & Double Wall Ovens. Office, Fam Room W/ Wood Burning/Gas Fplc & 4K Projector Theater System, Lr W/ Gas Flpc, FDR W/ Coffered Ceiling, Master Suite W/ Sitting Room & Marble Bathroom W/ Radiant Heated Floors. Gated 1 Acre Property W/ IG Pool/Cabana.',
      //     detailImgs: [
      //       { img: require('../assets/images/favoriteImg1.png') },
      //       { img: require('../assets/images/favoriteImg2.png') },
      //       { img: require('../assets/images/favoriteImg1.png') },
      //       { img: require('../assets/images/favoriteImg2.png') },
      //     ],
      //     tags: [
      //       {
      //         label: 'Beds',
      //         value: 3,
      //         iconImg: Images.iconBlackBed
      //       },
      //       {
      //         label: 'Baths',
      //         value: 2,
      //         iconImg: Images.iconBlackBath
      //       },
      //     ],
      //     owner: {
      //       name: 'Anthony Robinson Duran',
      //       role: 'Licensed Real State Salesperson',
      //       act: 'Brought By',
      //       img: require('../assets/images/profileImg.png')
      //     }
      //   }
      // ]
    }    
  }

  componentDidMount() {
    this.listener = this.props.navigation.addListener('focus', this.componentDidFocus.bind(this));        
  }

  componentDidFocus = () => {
    this.getData();
  }

  getData = () => {
    var dataParam = {
      action: 'properties_viewed_or_favorited',
      user_latitude: 40.776611,//LoginInfo.latitude,
      user_longitude: -73.345718,// LoginInfo.longitude,      
      user_id: 1,//LoginInfo.uniqueid,
      page_type: this.state.tab,
    };

    getContentByAction(dataParam)
    .then((res)=>{
      //console.log('data', res)     
      var sortedRes = res.sort((a, b) => {return a.properties_displayorder - b.properties_displayorder})      
      if(this.state.tab == 'favorites') this.setState({ favoritesData: sortedRes });
      else if(this.state.tab == 'viewed') this.setState({ viewedData: sortedRes });
    })
    .catch((err)=>{
      console.log('get data error', err)
    })
  }  

  onPropertyPress = (propertyRecordNo) => { 
    RouteParam.param1 = propertyRecordNo;    
    this.props.navigation.navigate('PropertyStack');
  }

  render() {
    const btnBlueStyle = { width: width * 0.45, height: normalize(50, 'height'), color: 'blue' };
    const btnWhiteStyle = { width: width * 0.45, height: normalize(50, 'height'), color: 'white' };
    return (
      <ImageBackground style={styles.container}>
        <View style={{ width: '100%' }}>
          <Header title={this.state.tab == 'favorites' ? 'FAVORITES' : 'LAST VIEWED'} titleColor={Colors.blackColor} onPressBack={() => this.props.navigation.goBack(null)} />
        </View>
        <View style={styles.body}>
          <View style={styles.btnContainer}>
            <Button btnTxt='FAVORITES' btnStyle={this.state.tab === 'favorites' ? btnBlueStyle : btnWhiteStyle} onPress={() => {this.setState({ tab: 'favorites' }, this.getData)}} />
            <Button btnTxt='LAST VIEWED' btnStyle={this.state.tab === 'viewed' ? btnBlueStyle : btnWhiteStyle} onPress={() => {this.setState({ tab: 'viewed' }, this.getData)}} />
          </View>
          <View style={styles.listContainer}>
            {((this.state.tab === 'favorites' && this.state.favoritesData.length == 0) ||
              (this.state.tab === 'viewed' && this.state.viewedData.length == 0)) ?
              <View style={styles.emptyContainer}>
                <Text style={{ fontFamily: 'SFProText-Semibold', fontSize: 14, color: Colors.blackColor }}>Add Properties</Text>
                <Text style={{ fontFamily: 'SFProText-Regular', fontSize: 12, color: Colors.passiveTxtColor, textAlign: 'center', marginTop: normalize(10, 'height') }}>Press the bookmark button to add an property</Text>
              </View>
              :
              <FlatList                
                showsVerticalScrollIndicator={false}
                data={this.state.tab === 'favorites' ? this.state.favoritesData : this.state.viewedData}
                renderItem={({ item }) => <PropertyCard cardStyle={{ width: width * 0.95, height: normalize(245, 'height'), marginBottom: normalize(10, 'height'), marginRight: 0 }} cardTheme={PropertyCardTheme[1]} item={item} onPress={() => this.onPropertyPress(item.property_recordno)} />}
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
  listContainer: {
    width: '95%',
    //height: '62%',
    height: '75%',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: normalize(18, 'height'),
    //borderWidth: 1
  },
  emptyContainer: {
    width: '60%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    //borderWidth: 1
  }
});