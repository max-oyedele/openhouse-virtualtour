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
  Linking,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from "react-native";
import normalize from "react-native-normalize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import { AppleButton } from '@invertase/react-native-apple-authentication';

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
import { appleSignin, fbSignin, googleSignin } from '../../api/Firebase';

import { postData } from '../../api/rest';

export default class SocialLoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logoTxt: 'By sign-in to this application, you are indicating that you agree with the terms and condition of Open™ House Marketing System'
    }
  }

  componentDidMount() {

  }

  onAppleSignin = async () => {
    await appleSignin()
      .then(async (res) => {
        console.log('apple signin success', res);

        LoginInfo.uniqueid = res.user.uid;
        LoginInfo.fullname = res.user.displayName;
        LoginInfo.email = res.user.email;
        LoginInfo.telephone = res.user.phoneNumber;
        LoginInfo.photourl = res.user.photoURL;
        LoginInfo.providerid = 'apple';
        LoginInfo.email_verified = res.user.emailVerified;

        this.props.navigation.navigate('Form');
      })
      .catch((err) => {
        //Alert.alert('Apple SignIn is failed');
        console.log('apple signin error', err);
      })
  }

  onGoogleSignin = async () => {
    await googleSignin()
      .then(async (res) => {
        //console.log('google signin success', res);

        LoginInfo.uniqueid = res.user.uid;
        LoginInfo.fullname = res.user.displayName;
        LoginInfo.email = res.user.email;
        LoginInfo.telephone = res.user.phoneNumber;
        LoginInfo.photourl = res.user.photoURL;
        LoginInfo.providerid = 'google';
        LoginInfo.email_verified = res.user.emailVerified;

        this.props.navigation.navigate('Form');
      })
      .catch((err) => {
        //Alert.alert('Google SignIn is failed');
        console.log('google signin error', err)
      })
  }

  // onFBSignin = async () => {
  //   await fbSignin()
  //     .then(async (res) => {
  //       //console.log('fb signin success', res);        
  //       LoginInfo.uniqueid = res.user.uid;
  //       LoginInfo.fullname = res.user.displayName;
  //       LoginInfo.email = res.user.email;
  //       LoginInfo.telephone = res.user.phoneNumber;
  //       LoginInfo.photourl = res.user.photoURL;
  //       LoginInfo.providerid = 'facebook';
  //       LoginInfo.email_verified = res.user.emailVerified;

  //       this.props.navigation.navigate('Form');
  //     })
  //     .catch((err) => {
  //       //Alert.alert('Facebook SignIn is failed');
  //       console.log('fb signin error', err)
  //     })
  // }   

  render() {
    return (
      <ImageBackground style={styles.container} source={Images.splashBackground}>
        <View style={styles.modalBack}>
          
          <View style={styles.logoImgContainer}>
            <Image style={{ width: '90%', height: '100%' }} source={Images.logo} resizeMode='contain' />
          </View>          
          <View style={styles.logoNameContainer}>
            <Text style={styles.logoName}>Open House</Text>
            <Text style={styles.logoPlusLabel}>+</Text>
          </View>          

          <View style={styles.labelContainer}>
            <Text style={{ fontSize: RFPercentage(2), color: Colors.passiveTxtColor, textAlign: 'center' }}>
              For Personalized Experience, Please Sign In To Your Account Using:
            </Text>
          </View>

          <View style={styles.btnsContainer}>
            {/* <View style={styles.btnContainer}>
              <TouchableOpacity style={styles.btnImg} onPress={() => this.onFBSignin()}>
                <Image style={{ width: '100%', height: '100%', borderRadius: normalize(5) }} source={Images.btnFBLogin} resizeMode='stretch' />
              </TouchableOpacity>
            </View> */}
            <View style={styles.btnContainer}>
              <TouchableOpacity style={styles.btnImg} onPress={() => this.onGoogleSignin()}>
                <Image style={{ width: '100%', height: '100%', borderRadius: normalize(5) }} source={Images.btnGoogleLogin} resizeMode='stretch' />
              </TouchableOpacity>
            </View>
            <View style={styles.appleBtnContainer}>
              <AppleButton
                buttonStyle={AppleButton.Style.BLACK}
                buttonType={AppleButton.Type.SIGN_IN}
                style={styles.appleBtn}
                onPress={() => this.onAppleSignin()} />
            </View>
          </View>

          <View style={styles.txtContainer}>
            <Text style={{ fontSize: RFPercentage(1.6), color: Colors.passiveTxtColor, textAlign: 'center' }}>{this.state.logoTxt}</Text>
          </View>
        </View>
      </ImageBackground >
    );
  }
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

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
    width: wp(85),
    height: hp(60),
    justifyContent: 'center',
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
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    //borderWidth: 1
  },
  logoNameContainer: {
    width: '88%',
    height: '12%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    //borderWidth: 1
  },
  logoName: {
    fontFamily: 'Billabong',
    fontSize: RFPercentage(7.4),
    color: Colors.blackColor,
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
  labelContainer: {
    width: '88%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: normalize(5, 'height'),
    //borderWidth: 1  
  },
  btnsContainer: {
    width: '88%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    //borderWidth: 5
  },
  btnContainer: {
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    //borderWidth: 1
  },
  btnImg: {
    width: '100%',
    height: '72%',
    //borderWidth: 1
  },
  appleBtnContainer: {
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    //borderWidth: 1
  },
  appleBtn: {
    width: '100%',
    height: '72%'
  },
  txtContainer: {
    width: '88%',
    height: '12%',
    justifyContent: 'center',
    alignItems: 'center',
    //borderWidth: 1   
  },
});