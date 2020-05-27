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
import { appleSignin, fbSignin, googleSignin, twitterSignin } from '../../api/Firebase';

import { postLoginInfo } from '../../api/rest';

export default class SocialLoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logoTxt: 'By downloading and sign-in to this application. You are indicating that you are indicating that you are agreeing with the terms of used and condition of Open House Marketing System'
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
        Alert.alert('Apple SignIn is failed');
        console.log('apple signin error', err);
      })
  }

  onFBSignin = async () => {
    // await fbSignin()
    //   .then(async (res) => {
    //     //console.log('fb signin success', res);        
    //     LoginInfo.uniqueid = res.user.uid;
    //     LoginInfo.fullname = res.user.displayName;
    //     LoginInfo.email = res.user.email;
    //     LoginInfo.telephone = res.user.phoneNumber;
    //     LoginInfo.photourl = res.user.photoURL;
    //     LoginInfo.providerid = 'facebook';
    //     LoginInfo.email_verified = res.user.emailVerified;        
    //
    //     this.props.navigation.navigate('Form');
    //   })
    //   .catch((err) => {
    //     Alert.alert('Facebook SignIn is failed');
    //     console.log('fb signin error', err)
    //   })
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
        Alert.alert('Google SignIn is failed');
        console.log('google signin error', err)
      })
  }

  onTwitterSignin = async () => {
    // await twitterSignin()
    //   .then(async (res) => {
    //     console.log('twitter signin success', res);        
    //   })
    //   .catch((err) => {
    //     Alert.alert('Twitter SignIn is failed');
    //     console.log('twitter signin error', err)
    //   })
  }

  render() {
    return (
      <ImageBackground style={styles.container} source={Images.splashBackground}>
        <View style={styles.modalBack}>
          <View style={styles.labelContainer}>
            <Text style={{ fontFamily: 'SFProText-Semibold', fontSize: RFPercentage(2.5), color: Colors.passiveTxtColor, textAlign: 'center' }}>
              For personalized experiences sign into your account using
            </Text>
          </View>

          <View style={styles.btnsContainer}>
            <TouchableOpacity style={styles.btnContainer} onPress={() => this.onFBSignin()}>
              <Image style={styles.btnImg} source={Images.btnFBLogin} resizeMode='contain' />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnContainer} onPress={() => this.onGoogleSignin()}>
              <Image style={styles.btnImg} source={Images.btnGoogleLogin} resizeMode='contain' />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnContainer} onPress={() => this.onTwitterSignin()}>
              <Image style={styles.btnImg} source={Images.btnTwitterLogin} resizeMode='contain' />
            </TouchableOpacity>
          </View>
          <View style={styles.appleBtnContainer}>
            <AppleButton
              buttonStyle={AppleButton.Style.BLACK}
              buttonType={AppleButton.Type.SIGN_IN}
              style={styles.appleBtn}
              onPress={() => this.onAppleSignin()} />
          </View>

          <View style={styles.txtContainer}>
            <Text style={{ fontFamily: 'SFProText-Semibold', fontSize: RFPercentage(1.6), color: Colors.passiveTxtColor, textAlign: 'center' }}>{this.state.logoTxt}</Text>
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
  labelContainer: {
    width: '80%',
    height: '21%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    //borderWidth: 1  
  },
  btnsContainer: {
    width: '90%',
    height: '30%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: normalize(10, 'height'),
    //borderWidth: 1
  },
  btnContainer: {
    width: '33%',
    //width: '24%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    //borderWidth: 1
  },
  btnImg: {
    width: '90%',
    height: '90%',
    //borderWidth: 1
  },
  appleBtnContainer: {
    width: '90%',
    height: '18%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: normalize(6, 'height'),
    //borderWidth: 2
  },
  appleBtn: {
    width: '90%',
    height: '80%'
  },
  txtContainer: {
    width: '80%',
    height: '25%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: normalize(18, 'height'),
    //borderWidth: 1   
  },
});