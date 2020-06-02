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
  Platform,
  ImageBackground,
  Linking
} from "react-native";
import normalize from "react-native-normalize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import GetLocation from 'react-native-get-location';
import AsyncStorage from '@react-native-community/async-storage';
import KeyboardManager from 'react-native-keyboard-manager';

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
import { Colors, Images, LoginInfo } from '@constants';

import { postData } from '../api/rest';

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logoTxt: 'In-Person & Virtual \n Digital Sign-in Platform'
    }

    this.keyboardManager();    
    this.timer = setInterval(this.watchGeoTimer, 1000);    
    this.isSettingResult = false;
  }

  componentDidMount() {
    //this.getLocation();
  
    // uncomment for skip
    this.submit();
    setTimeout(() => { this.props.navigation.navigate('Main') }, 1000);        
  }

  componentWillUnmount() {    
    clearInterval(this.timer);
  }

  keyboardManager = () => {
    if (Platform.OS === 'ios') {
      KeyboardManager.setEnable(true);
      KeyboardManager.setEnableDebugging(false);
      KeyboardManager.setKeyboardDistanceFromTextField(10);
      KeyboardManager.setPreventShowingBottomBlankSpace(true);
      KeyboardManager.setEnableAutoToolbar(true);
      KeyboardManager.setToolbarDoneBarButtonItemText("Done");
      KeyboardManager.setToolbarManageBehaviour(0);
      KeyboardManager.setToolbarPreviousNextButtonEnable(false);
      KeyboardManager.setShouldToolbarUsesTextFieldTintColor(false);
      KeyboardManager.setShouldShowTextFieldPlaceholder(true); // deprecated, use setShouldShowToolbarPlaceholder
      KeyboardManager.setShouldShowToolbarPlaceholder(true);
      KeyboardManager.setOverrideKeyboardAppearance(false);
      KeyboardManager.setShouldResignOnTouchOutside(true);
      KeyboardManager.resignFirstResponder();
      KeyboardManager.isKeyboardShowing()
        .then((isShowing) => {
        });
    }
  }

  watchGeoTimer = () => {
    if (this.isSettingResult) {
      this.isSettingResult = false;
      this.getLocation();      
    }
  }

  getLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        LoginInfo.latitude = location.latitude;
        LoginInfo.longitude = location.longitude;

        this.isLoggedInProc();
      })
      .catch(error => {        
        this.isSettingResult = true;
        Linking.canOpenURL('app-settings:').then(supported => {
          if (!supported) {
            console.log('Can\'t handle settings url');
          } else {
            Linking.openURL('app-settings:')
              .then(res => {
                console.log('open settings resp', res);
              })
              .catch(err => {
                console.log('open settings error', err);
              })
          }
        }).catch(err => console.error('An error occurred', err));        
      })
  }

  isLoggedInProc = () => {
    AsyncStorage.getItem('LoginInfo')
      .then(async (loginInfo) => {
        if (loginInfo) {
          var info = JSON.parse(loginInfo);

          LoginInfo.uniqueid = info.uniqueid;
          LoginInfo.fullname = info.fullname;
          LoginInfo.email = info.email;
          LoginInfo.telephone = info.telephone;
          LoginInfo.photourl = info.photourl;
          LoginInfo.providerid = info.providerid;
          LoginInfo.email_verified = info.email_verified;
          LoginInfo.user_account = info.user_account;
          LoginInfo.user_assigned_agent = info.user_assigned_agent,

            this.submit();
          setTimeout(() => { this.props.navigation.navigate('Main') }, 1000);
        }
        else {
          setTimeout(() => { this.props.navigation.navigate('Auth') }, 1000);
        }
      })
      .catch((err) => {
        console.log('get login info error', err);
        setTimeout(() => { this.props.navigation.navigate('Auth') }, 1000);
      })
  }

  submit = async () => {
    // uncomment for skip
    LoginInfo.uniqueid = '123';
    LoginInfo.user_account = '10';
    LoginInfo.fullname = 'Anthony Robinson';
    LoginInfo.email = 'opendemo@icloud.com';
    LoginInfo.telephone = '+13059007270';
    LoginInfo.photourl = '';
    LoginInfo.providerid = 'apple';
    LoginInfo.email_verified = true;
    LoginInfo.latitude = 40.776611;
    LoginInfo.longitude = -73.345718;
    LoginInfo.user_assigned_agent = 0;
    ///////////////

    let bodyFormData = new FormData();
    bodyFormData.append('action', 'newaccount');
    bodyFormData.append('uniqueid', LoginInfo.uniqueid);
    bodyFormData.append('fullname', LoginInfo.fullname);
    bodyFormData.append('email', LoginInfo.email);
    bodyFormData.append('telephone', LoginInfo.telephone);
    bodyFormData.append('photourl', LoginInfo.photourl);
    bodyFormData.append('providerid', LoginInfo.providerid);
    bodyFormData.append('email_verified', LoginInfo.email_verified);
    bodyFormData.append('user_latitude', LoginInfo.latitude);
    bodyFormData.append('user_longitude', LoginInfo.longitude);
    bodyFormData.append('appid', 'com.openhousemarketingsystem.open');
    bodyFormData.append('referredby', 0);

    await postData(bodyFormData)
      .then((res) => {
        console.log('post login info success', res);
        LoginInfo.photourl = res[0].user_photourl;
        LoginInfo.user_account = res[0].user_account;
        LoginInfo.user_assigned_agent = res[0].user_assigned_agent;
      })
      .catch((err) => {
        console.log('post login info error', err)
      })
  }

  render() {
    return (
      <ImageBackground style={styles.container} source={Images.splashBackground}>
        <View style={styles.modalBack}>
          <View style={{ width: '100%', height: '9%', /*borderWidth: 1*/ }}></View>
          <View style={styles.logoImgContainer}>
            <Image style={{ width: '100%', height: '110%' }} source={Images.logo} resizeMode='contain' />
          </View>
          <View style={{ width: '100%', height: '2%', /*borderWidth: 1*/ }}></View>
          <View style={styles.logoNameContainer}>
            <Text style={styles.logoName}>Open House</Text>
            <Text style={styles.logoPlusLabel}>+</Text>
          </View>
          <View style={{ width: '100%', height: '5%', /*borderWidth: 1*/ }}></View>
          <View style={styles.logoTxtContainer}>
            <Text style={styles.logoTxt}>{this.state.logoTxt}</Text>
          </View>
          <View style={{ width: '100%', height: '7%', /*borderWidth: 1*/ }}></View>
        </View>
      </ImageBackground>
    );
  }
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
// const modalWidth = normalize(width * 0.75);
// const modalHeight = normalize(height * 0.5 , 'height');

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalBack: {
    backgroundColor: 'rgba(255,255,255,1)',
    width: wp(75),
    height: hp(50),
    alignItems: 'center',
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
  },
  logoImgContainer: {
    width: '88%',
    height: '46%',
    justifyContent: 'center',
    alignItems: 'center',
    //borderWidth: 1
  },
  logoNameContainer: {
    width: '88%',
    height: '15%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    //borderWidth: 1
  },
  logoName: {
    fontFamily: 'Billabong',
    fontSize: RFPercentage(7.4),
    color: '#3A3E4D',
    //borderWidth: 1
  },
  logoPlusLabel: {
    fontFamily: 'Helvetica-Bold',
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
    color: '#E02020',
    alignSelf: 'center',
    marginBottom: normalize(10, 'height'),
    //borderWidth: 1
  },
  logoTxtContainer: {
    width: '88%',
    height: '11%',
    justifyContent: 'center',
    alignItems: 'center',
    //borderWidth: 1
  },
  logoTxt: {
    fontFamily: 'SFProText-Semibold',
    fontSize: RFPercentage(2),
    color: Colors.passiveTxtColor,
    textAlign: 'center'
  },
  // signupBtnContainer: {
  //   marginTop: normalize(20, 'height')
  // },
  // loginLinkContainer: {
  //   marginTop: normalize(20, 'height')
  // },
  // loginTxt: {
  //   fontSize: 12,
  //   color: Colors.blueColor
  // }
});