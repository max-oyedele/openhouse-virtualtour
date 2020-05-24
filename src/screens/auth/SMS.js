import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Animated,
  ScrollView,
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

import { postLoginInfo } from '../../api/rest';
import { signInWithPhoneNumber } from '../../api/Firebase';
import auth from '@react-native-firebase/auth'

import { Colors, Images, LoginInfo } from '@constants';
import {
  Button,
  Header,
} from '@components';

export default class SMSScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verificationCode: '',
      confirmResult: null,
      userId: '',
    }
  }

  componentDidMount() {
    console.log(this.props.route.params.confirmResult);
    let confirmResult = this.props.route.params.confirmResult;
    this.setState({ confirmResult: confirmResult });
  }

  onConfirm = async () => {
    const { confirmResult, verificationCode } = this.state;
    if (verificationCode.length == 6) {
      confirmResult
        .confirm(verificationCode)
        .then(user => {
          this.setState({ userId: user.uid });
          Alert.alert(`Verified! ${user.uid}`);
          this.submit();
        })
        .catch(error => {
          console.log('verification error', error);
          Alert.alert('Verification Code is wrong!');
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
    bodyFormData.append('latitude', LoginInfo.latitude);
    bodyFormData.append('longitude', LoginInfo.longitude);
    bodyFormData.append('appid', 'com.openhousemarketingsystem.open');
    bodyFormData.append('referredby', 0);

    await postLoginInfo(bodyFormData)
      .then((res) => console.log('post login info success', res))
      .catch((err) => console.log('post login info error', err))

    this.props.navigation.navigate('Welcome');
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
                onChangeText={(verificationCode) => this.setState({ verificationCode })}
              />
            </View>
            <View style={styles.nextContainer}>
              <Button btnTxt='Confirm' btnStyle={{ width: '100%', height: normalize(50, 'height'), color: 'blue' }} onPress={() => this.onConfirm()} />
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