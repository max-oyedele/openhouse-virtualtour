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

export default class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      email: '',
      password: '',
      cPassword:''
    }
  }

  componentDidMount() {

  }

  onLogin = () => {

  }

  onSignup = () => {
    this.props.navigation.navigate('Form');
  }
  
  render() {
    return (
      <ImageBackground style={styles.container} source={Images.splashBackground}>
        <View style={styles.overlay} />
        <Header title='SIGN UP' titleColor={Colors.whiteColor} onPressBack={() => this.props.navigation.goBack(null)} />
        <View style={styles.body}>
          <View style={styles.inputBoxContainer}>
            <TextInput
              style={styles.txtInput}
              value={this.state.fullName}
              placeholder='Enter Your Full Name'
              onChangeText={(text) => this.setState({ fullName: text })}
            />
          </View>
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
          <View style={styles.inputBoxContainer}>
            <TextInput
              style={styles.txtInput}
              value={this.state.cPassword}
              placeholder='Confirm Password'
              secureTextEntry={true}
              onChangeText={(text) => this.setState({ cPassword: text })}
            />
          </View>                    
          <View style={styles.signupContainer}>
            <Button btnTxt='Sign up' btnStyle={{ width: '100%', height: 50, color: 'blue' }} onPress={() => this.onSignup()} />
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.loginContainer}>
            <Text style={styles.txtLabel}>Already member?</Text>
            <TouchableOpacity onPress={() => this.onLogin()}>
              <Text style={styles.txtLink}>Login</Text>
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
  signupContainer: {
    width: '90%',
    marginTop: 30
  },
  footer: {
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    //borderWidth: 2
  },
  loginContainer: {
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
  }  
});