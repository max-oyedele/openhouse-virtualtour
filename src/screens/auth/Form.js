import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Animated,
  ScrollView,
  KeyboardAvoidingView,
  Text,
  Image,
  ImageBackground,
  TextInput,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Platform,
} from "react-native";
import normalize from "react-native-normalize";

import TextInputMask from 'react-native-text-input-mask';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

import {
  Button,
  Header,
} from '@components';

import { Colors, Images, LoginInfo, RouteParam } from '@constants';
import { verifyPhoneNumber } from '../../api/Firebase';
import { postData } from '../../api/rest';

export default class FormScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: LoginInfo.fullname,
      email: LoginInfo.email,
      telephone: LoginInfo.telephone,
      country_additional_prefix: LoginInfo.telephone ? false : true,
      spinner: false
    }
  }

  componentDidMount() {

  }

  validatePhoneNumber = () => {
    // var regexp = /^[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/
    // return regexp.test(this.state.telephone)

    return true;
  }

  onNext = async () => {
    if (this.state.fullname == null || this.state.fullname == '') {
      Alert.alert('Please enter your full name');
      return;
    }
    if (this.state.email == null || this.state.email == '') {
      Alert.alert('Please enter your email address');
      return;
    }
    if (this.state.telephone == null || this.state.telephone == '') {
      Alert.alert('Please enter your phone number');
      return;
    }

    LoginInfo.fullname = this.state.fullname;
    LoginInfo.email = this.state.email;
    LoginInfo.telephone = this.state.telephone;

    // if (RouteParam.deviceType === 'pad') {
    //   this.submit();
    //   return;
    // }

    this.setState({ spinner: true });

    if (this.validatePhoneNumber()) {      
      var phoneNumber = this.state.country_additional_prefix ? '+86' + this.state.telephone : this.state.telephone;
      console.log('phonenumber', phoneNumber);
      await verifyPhoneNumber(phoneNumber)
        .then((verifyResult) => {
          //console.log('verifyResult', verifyResult)
          RouteParam.verifyResult = verifyResult;
          
          this.setState({ spinner: false });
          this.props.navigation.navigate('SMS');
        })
        .catch((err) => {          
          // Alert.alert(
          //   'Verify Phone Number Failed. Try again later',
          //   '',
          //   [
          //     { text: 'OK', onPress: () => {this.setState({ spinner: false }); this.submit(); }}
          //   ]
          // );

          this.setState({ spinner: false }); this.submit();

          console.log('verify phone number error', err);                    
        })
    }
    else {
      Alert.alert(
        'Invalid Phone Number',
        '',
        [
          { text: 'OK', onPress: () => this.setState({ spinner: false }) }
        ]
      );
      console.log('invalide phone number');
    }
  }

  // for apple reivew skip
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
    bodyFormData.append('phone_verified', 0);
    bodyFormData.append('user_latitude', LoginInfo.latitude);
    bodyFormData.append('user_longitude', LoginInfo.longitude);
    bodyFormData.append('appid', 'com.openhousemarketingsystem.open');
    bodyFormData.append('referredby', 0);

    await postData(bodyFormData)
      .then((res) => {
        //console.warn('post login info success', res);

        LoginInfo.photourl = res[0].user_photourl;
        LoginInfo.user_account = res[0].user_account;
        LoginInfo.user_pick_an_agent = res[0].user_pick_an_agent;
        LoginInfo.user_assigned_agent = res[0].user_assigned_agent;

        AsyncStorage.setItem('LoginInfo', JSON.stringify(LoginInfo));
        this.props.navigation.navigate('Welcome');
      })
      .catch((err) => console.log('post login info error', err))
  }
  ///////////////////////

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}>
        <ImageBackground style={styles.container} source={Images.splashBackground}>
          <View style={styles.overlay} />
          <Spinner
            visible={this.state.spinner}
          />
          <View style={{ width: '100%' }}>
            <Header title='CONFIRM YOUR INFORMATION' titleColor={Colors.whiteColor} onPressBack={() => this.props.navigation.goBack(null)} />
          </View>
          <View style={styles.body}>
            <View style={styles.txtLabelContainer}>
              <Text style={styles.txtLabel}>Enter your information and we will send you an activation confirmation code.</Text>
            </View>

            <View style={styles.inputBoxContainer}>
              <TextInput
                style={styles.txtInput}
                autoFocus={this.state.fullname ? false : true}
                value={this.state.fullname}
                placeholder='Full name'
                placeholderTextColor={Colors.weakBlackColor}
                editable={LoginInfo.fullname ? false : true}
                onChangeText={(text) => this.setState({ fullname: text })}
              />
            </View>
            <View style={styles.inputBoxContainer}>
              <TextInput
                style={styles.txtInput}
                autoFocus={this.state.email ? true : false}
                value={this.state.email}
                placeholder='E-mail'
                placeholderTextColor={Colors.weakBlackColor}
                editable={LoginInfo.email ? false : true}
                onChangeText={(text) => this.setState({ email: text })}
              />
            </View>
            <View style={styles.inputBoxContainer}>
              {/* <TextInput
                style={styles.txtInput}                
                keyboardType={'numeric'}
                value={this.state.telephone}
                placeholder='Cell Phone Number'
                placeholderTextColor={Colors.weakBlackColor}
                editable={LoginInfo.telephone ? false : true}
                onChangeText={(telephone) => this.setState({ telephone })}
              /> */}
              <TextInputMask
                refInput={ref => { this.input = ref }}
                style={styles.txtInput}
                placeholder='Cell Phone Number'
                placeholderTextColor={Colors.weakBlackColor}
                value={this.state.telephone}
                keyboardType={'numeric'}
                editable={LoginInfo.telephone ? false : true}
                onChangeText={(formatted, extracted) => {
                  this.setState({ telephone: extracted });
                }}
                mask={"+86 ([000]) [0000] - [0000]"}
              />
            </View>
            <View style={styles.nextContainer}>
              <Button btnTxt='Next'
                btnStyle={{ width: '100%', height: normalize(50, 'height'), color: 'blue' }}
                onPress={() => this.onNext()} />
            </View>
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
    marginTop: normalize(10, 'height')
  },
  txtInput: {
    backgroundColor: 'rgba(255,255,255,1)',
    height: '100%',
    borderRadius: 8,
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