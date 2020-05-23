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

import Modal from 'react-native-modal';

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

export default class ForgotPwdScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      isSent: false
    }
  }

  componentDidMount() {

  }

  onSend = () => {
    setTimeout(() => { this.setState({ isSent: true }) }, 2000);
  }

  render() {
    return (
      <ImageBackground style={styles.container} source={Images.splashBackground}>
        <View style={styles.overlay} />
        <Header title='FORGOT PASSWORD' titleColor={Colors.whiteColor} onPressBack={() => this.props.navigation.goBack(null)} />
        <View style={styles.body}>
          <View style={styles.inputBoxContainer}>
            <TextInput
              style={styles.txtInput}
              value={this.state.email}
              placeholder='Enter Your Email Address'
              onChangeText={(text) => this.setState({ email: text })}
            />
          </View>
          <View style={styles.sendContainer}>
            <Button btnTxt='Send' btnStyle={{ width: '100%', height: 50, color: 'blue' }} onPress={() => this.onSend()} />
          </View>
        </View>
        <Modal ref='sentModal' isVisible={this.state.isSent}>
          <TouchableOpacity
            onPress={() => {
              this.refs.sentModal.close();
              this.setState({ isSent: false });
            }}
          >
            <View style={styles.sentModalContainer}>
              <View style={styles.sentImgContainer}>
                <Image
                  source={Images.check}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.checkTxtContainer}>
                <Text style={styles.checkTxt}>Check Your Mailbox.</Text>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </ImageBackground>
    );
  }
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const sentModalContainerWidth = width * 0.5;

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
  inputBoxContainer: {
    width: '90%',
    height: 40,
    marginTop: 40
  },
  txtInput: {
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: 4,
    borderColor: Colors.blueColor,
    borderWidth: 1,
    paddingLeft: 15
  },
  sendContainer: {
    width: '90%',
    marginTop: 30
  },
  sentModalContainer: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    padding: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'center',
    width: sentModalContainerWidth,
    height: sentModalContainerWidth,
    marginTop: -80,
    borderRadius: 20,
  },
  sentImgContainer: {
    width: '85%',
    height: '85%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkTxtContainer: {
    height: '15%'
  },
  checkTxt: {
    fontSize: 16
  }
});