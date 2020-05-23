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
  ImageBackground
} from "react-native";

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

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  componentDidMount() {

  }

  onLogin = () => {
    //this.props.navigation.navigate('Welcome');
  }

  onFbLogin = () => {

  }

  render() {
    return (
      <ImageBackground style={styles.container} source={Images.splashBackground}>
        <View style={styles.overlay} />
        <Header title='LOGIN' titleColor={Colors.whiteColor} onPressBack={() => this.props.navigation.goBack(null)} />
        <View style={styles.body}>
          <View style={styles.inputBoxContainer}>
            <TextInput
              style={styles.txtInput}
              value={this.state.email}
              placeholder='Email'
              onChangeText={(text) => this.setState({ email: text })}
            />
          </View>
          <View style={styles.inputBoxContainer}>
            <TextInput
              style={styles.txtInput}
              value={this.state.password}
              placeholder='Password'
              secureTextEntry={true}
              onChangeText={(text) => this.setState({ password: text })}
            />
          </View>
          <View style={styles.btnsContainer}>
            <Button btnTxt='Login' btnStyle={{ width: 160, height: 50, color: 'blue' }} onPress={() => this.onLogin()} />
            <Button btnTxt='Sign up' btnStyle={{ width: 160, height: 50, color: 'white' }} onPress={() => this.props.navigation.navigate('Signup')} />
          </View>
          <View style={styles.orLineContainer}>
            <Image source={Images.orLine} />
            <Text style={styles.orLineTxt}>OR</Text>
            <Image source={Images.orLine} />
          </View>
          <View style={styles.fbLoginContainer}>
            <Button btnTxt='Facebook' btnStyle={{ width: '100%', height: 50, color: 'blue' }} onPress={() => this.onFbLogin()} />
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.signupContainer}>
            <Text style={styles.txtLabel}>Need an account?</Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')}>
              <Text style={styles.txtLink}>Sign up</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.forgotPwdContainer}>
            <Text style={styles.txtLabel}>Forgot your password?</Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgotPwd')}>
              <Text style={styles.txtLink}>Retrieve</Text>
            </TouchableOpacity>
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
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    //borderWidth: 2
  },
  inputBoxContainer: {
    width: '90%',
    height: 40,
    marginTop: 10
  },
  txtInput: {
    backgroundColor: 'rgba(255,255,255,1)',
    height: '100%',
    borderRadius: 4,
    borderColor: Colors.blueColor,
    borderWidth: 1,
    paddingLeft: 15
  },
  btnsContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30
  },
  orLineContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30
  },
  orLineTxt: {
    color: 'white'
  },
  fbLoginContainer: {
    width: '90%',
    marginTop: 30
  },
  footer: {
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    //borderWidth: 2
  },
  signupContainer: {
    width: '50%',
    flexDirection: 'row',
    marginLeft: '5%'
  },
  txtLabel: {
    color: 'white'
  },
  txtLink: {
    color: '#F7B500',
    marginLeft: 20
  },
  forgotPwdContainer: {
    width: '60%',
    flexDirection: 'row',
    marginLeft: '5%'
  }
});