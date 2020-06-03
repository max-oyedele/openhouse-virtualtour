import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Animated,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  DeviceEventEmitter,
} from "react-native";
import normalize from "react-native-normalize";
import AsyncStorage from '@react-native-community/async-storage';

import {
  Button,
  Header,
} from '@components';
import { Colors, Images, LoginInfo, RouteParam } from '@constants';
import { postData } from '../../api/rest';

export default class SMSScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verificationCode: '',      
      userId: '',
      isBtnShow: false
    }
  }

  componentDidMount() {   
    console.log('rpcr', RouteParam.confirmResult);
  }

  onInputCode = (verificationCode) => {
    this.setState({ verificationCode: verificationCode });
    if (verificationCode.length == 6) {
      this.setState({ isBtnShow: true });
    }
    else this.setState({ isBtnShow: false });
  }

  onConfirm = async () => {
    const { verificationCode } = this.state;
    if (verificationCode.length == 6) {
      RouteParam.confirmResult
        .confirm(verificationCode)
        .then(user => {          
          //Alert.alert('Verified');

          LoginInfo.fullname = RouteParam.loginEssentialInfo.fullname;
          LoginInfo.email = RouteParam.loginEssentialInfo.email;
          LoginInfo.telephone = RouteParam.loginEssentialInfo.telephone;

          Keyboard.dismiss();
          this.submit();
        })
        .catch(error => {
          //console.log('verification error', error);
          Alert.alert('Invalid Activation Code. \n You\'ve entered an invalid activation code. \n Please try again');
        })
    } else {
      Alert.alert('Please enter a 6 digit OTP code.')
    }
  }

  submit = async () => {
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
        //console.log('post login info success', res);

        LoginInfo.photourl = res[0].user_photourl;
        LoginInfo.user_account = res[0].user_account;
        LoginInfo.user_assigned_agent = res[0].user_assigned_agent;

        AsyncStorage.setItem('LoginInfo', JSON.stringify(LoginInfo));
        this.props.navigation.navigate('Welcome');
      })
      .catch((err) => console.log('post login info error', err))
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}>
        <ImageBackground style={styles.container} source={Images.splashBackground}>
          <View style={styles.overlay} />
          <View style={{ width: '100%' }}>
            <Header title='CONFIRMATION' titleColor={Colors.whiteColor} onPressBack={() => this.props.navigation.goBack(null)} />
          </View>
          <View style={styles.body}>
            <View style={styles.txtLabelContainer}>
              <Text style={styles.txtLabel}>Please enter the verification code from the text message we just sent you.</Text>
            </View>
            <View style={styles.inputBoxContainer}>
              <TextInput
                style={styles.txtInput}
                autoFocus={true}
                keyboardType={'numeric'}
                value={this.state.verificationCode}
                placeholder='Code'
                placeholderTextColor={Colors.weakBlackColor}
                onChangeText={(verificationCode) => this.onInputCode(verificationCode)}
              />
            </View>
            { this.state.isBtnShow &&  
              <View style={styles.nextContainer}>
                <Button btnTxt='Confirm' btnStyle={{ width: '100%', height: normalize(50, 'height'), color: 'blue' }} onPress={() => this.onConfirm()} />
              </View>
            }
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
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
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'black',
    opacity: 0.5
  },
  body: {
    width: '100%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    //borderWidth: 2
  },
  txtLabelContainer: {
    width: '90%',
  },
  txtLabel: {
    fontFamily: 'SFProText-Bold',
    fontSize: 14,
    color: 'white'
  },
  inputBoxContainer: {
    width: '90%',
    height: normalize(50, 'height'),
    marginTop: normalize(40, 'height')
  },
  txtInput: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,1)',
    height: '100%',
    borderRadius: 4,
    borderColor: Colors.blueColor,
    borderWidth: 1,
    paddingLeft: 15,
    color: Colors.blackColor
  },
  nextContainer: {
    width: '90%',
    marginTop: normalize(30, 'height')
  },
});