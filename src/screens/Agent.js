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
  Dimensions,
  FlatList
} from "react-native";
import normalize from 'react-native-normalize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import AsyncStorage from "@react-native-community/async-storage";
import messaging from '@react-native-firebase/messaging';

import {
  BrowseCard,
  Button,
  CallCard,
  AgentCard,
  Header,
  LabelTag,
  PropertyCard,
  SearchBox,
  SideMenu,
  SignModal
} from '@components';
import { Colors, Images, LoginInfo, agentData } from '@constants';
import { getContentByAction, postData } from '../api/rest';

export default class AgentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: false,
      selectedIndex: -1,
      agentData: []
    };
  }

  componentDidMount() {
    this.getAgent();
  }

  getAgent = () => {
    var agentParam = {
      action: 'pick_partner_agent',
      user_latitude: LoginInfo.latitude,
      user_longitude: LoginInfo.longitude,
      user_id: LoginInfo.uniqueid,
      user_email: LoginInfo.email
    };
    //console.log('agent Param', agentParam);
    getContentByAction(agentParam)
      .then((res) => {
        if (res) {
          console.log('agent data', res);
          this.setState({
            agentData: res,
          });
        }
      })
      .catch((err) => {
        console.log('get agent error', err);
      })
  }

  sendPushNotification = async (fcmToken) => {
    console.log('target token', fcmToken);
    if (fcmToken == '' || fcmToken == null) return;
    const FIREBASE_API_KEY = "AAAA6khpGvI:APA91bElZqWvEebRsUXMwIxdEF3s21admbURH9MBx5K9ztGw-GU9at5IJ0OVRd9uMzcQHu34vfl_4pdZZOfhhRtM8v-Ya2-QLUwtbtBFxrtczhf4C7j0vhfZueJDVN1NabnXYfZ_r-o1";        
    
    const message = {
      to: fcmToken,      
      data: {
        title: 'New Client Alert',
        body: 'Congratulations! ' + LoginInfo.fullname + ' have selected you as his/her preferred real estate agent.',
      },
      content_available: true,      
      apns: {
        payload: {
          aps: {            
            contentAvailable: true
          }          
        },
        headers: {
          'apns-push-type': 'background',
          'apns-priority': '30',
          'apns-topic': 'com.ecaptureinc.agentplus'
        }
      },            
    }

    fetch("https://fcm.googleapis.com/fcm/send",    
      {
        method: "POST",
        headers: {
          "Authorization": "key=" + FIREBASE_API_KEY,          
          "Content-Type": "application/json"
        },
        body: JSON.stringify(message)
      })
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        console.log('push notification response', responseJson);
      })
      .catch(err => {
        console.log('response error', err);
      })
  }

  onClickAgent = (index) => {
    this.setState({ selectedIndex: index });
    let desc = 'Are you sure you want to select ' +
      this.state.agentData[index].realtor_full_name +
      ' from ' +
      this.state.agentData[index].realtor_company +
      ' as your preferred real estate agent?';

    Alert.alert(
      'Please confirm',
      desc,
      [
        { text: 'Yes', onPress: () => this.onYes() },
        { text: 'No', onPress: () => { } },
      ],
      {
        cancelable: true
      }
    );
  }

  onYes = async () => {
    let userAssignedAgent = this.state.agentData[this.state.selectedIndex].realtor_account;
    LoginInfo.user_assigned_agent = userAssignedAgent;
    //await AsyncStorage.setItem('UserAssignedAgent', userAssignedAgent.toString());
    await AsyncStorage.setItem('LoginInfo', JSON.stringify(LoginInfo));

    let agentFCMToken = this.state.agentData[this.state.selectedIndex].fcmToken;
    this.sendPushNotification(agentFCMToken);

    this.props.navigation.navigate('Main');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={{ fontFamily: 'SFProText-Bold', fontSize: RFPercentage(2.2), color: Colors.blackColor, textAlign: 'center' }}>
            SELECT YOUR PREFERRED AGENT
          </Text>
        </View>
        <View style={styles.guideContainer}>
          <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(2.2), color: Colors.blackColor, textAlign: 'center' }}>
            Welcome to Open House+
          </Text>
          <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(2), color: Colors.blackColor, textAlign: 'center', marginTop: normalize(10, 'height') }}>
            To enhance your user's experience,
            {"\n"}please select your preferred agents
            {"\n"}from the list below.
          </Text>
        </View>
        <ScrollView style={{ marginTop: normalize(10, 'height') }}>
          {
            this.state.agentData.map((each, index) => {
              return (
                <TouchableOpacity key={index} style={styles.eachContainer}
                  onPress={() => this.onClickAgent(index)}>
                  <AgentCard
                    agentName={each.realtor_full_name}
                    agentTitle={each.realtor_title}
                    agentCompany={each.realtor_company}
                    agentImg={{ uri: each.realtor_photo_url }}
                    isSelected={index == this.state.selectedIndex}
                  />
                </TouchableOpacity>
              )
            })
          }
        </ScrollView>
        <View style={{ width: '100%', height: normalize(10, 'height') }}></View>
      </View>
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
    height: height
  },
  headerContainer: {
    width: '100%',
    height: '8%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.borderColor,
    borderBottomWidth: normalize(0.5, 'height'),
    marginTop: normalize(20, 'height'),
  },
  guideContainer: {
    width: '100%',
    height: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.borderColor,
    borderBottomWidth: normalize(0.5, 'height'),
  },
  eachContainer: {
    width: '95%',
    height: normalize(100, 'height'),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: normalize(5, 'height'),
    // borderColor: Colors.borderColor,
    // borderWidth: normalize(0.5, 'height'),        
  },
});