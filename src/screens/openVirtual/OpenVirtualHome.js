import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Animated,
  ScrollView,
  Text,
  Image,
  ImageBackground,
  TextInput,
  Alert,
  Linking,
  TouchableOpacity,
  Dimensions
} from "react-native";
import normalize from 'react-native-normalize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

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
import { Colors, Images, LoginInfo, RouteParam } from '@constants';
import { getContentByAction, postData, getLiveInfo } from '../../api/rest';

export default class OpenVirtualHomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      property_mlsnumber: '',
      page_background_photo: '',
      display_live_oh_button: false,
      display_virtual_tour_button: false,
      property_virtual_tour_url: '',
      live_oh_signagure_required: false,
      virtual_tour_signagure_required: false,
    }
  }

  componentDidMount() {
    this.getData();
    RouteParam.pdfUrl = '';
    RouteParam.browseUrl = '';
  }

  getData = () => {
    var dataParam = {
      action: 'open_house_intro',
      user_latitude: LoginInfo.latitude,
      user_longitude: LoginInfo.longitude,
      user_id: LoginInfo.uniqueid,
      user_account: LoginInfo.user_account,
      user_assigned_agent: LoginInfo.user_assigned_agent,
      property_recordno: RouteParam.propertyRecordNo
    };

    getContentByAction(dataParam)
      .then((res) => {
        if (res) {
          //console.log('openvirtual', res);  
          this.setState({
            property_mlsnumber: res[0].property_mlsnumber,
            page_background_photo: res[0].page_background_photo,
            display_live_oh_button: res[0].display_live_oh_button,
            display_virtual_tour_button: res[0].display_virtual_tour_button,
            property_virtual_tour_url: res[0].property_virtual_tour_url,
            live_oh_signagure_required: res[0].live_oh_signagure_required,
            virtual_tour_signagure_required: res[0].virtual_tour_signagure_required,
          });

          RouteParam.pdfUrl = res[0].prefill_pdf_url;
          RouteParam.browseUrl = res[0].property_virtual_tour_url;
          RouteParam.openHouseIntro = res[0];
        }
      })
      .catch((err) => {
        console.log('get openhouse into error', err);
      })
  }

  onLiveOpen = () => {
    var param = {
      user_account: LoginInfo.user_account,
      user_fullname: LoginInfo.fullname,
      user_latitude: LoginInfo.latitude,
      user_longitude: LoginInfo.longitude,
      property_recordno: RouteParam.propertyRecordNo
    };

    getLiveInfo(param)
      .then((res) => {
        //console.log('live info', res);        
        RouteParam.liveInfo = res[0];

        if (this.state.live_oh_signagure_required) {
          this.props.navigation.navigate('Signature', { from: 'live' });
        }
        else {
          this.postAttendee();
          if (RouteParam.liveInfo.error === undefined) {
            this.sendPushNotification(RouteParam.agent.fcmToken);
            this.props.navigation.navigate('LiveCall');
          }
        }
      })
      .catch((err) => {
        console.log('get live info error', err);
      })
  }

  onVirtualTour = () => {
    this.postAttendee();

    if (this.state.virtual_tour_signagure_required) {
      this.props.navigation.navigate('Signature', { from: 'virtual_tour' });
    }
    else {
      Linking.canOpenURL(this.state.property_virtual_tour_url).then(supported => {
        if (supported) {
          Linking.openURL(this.state.property_virtual_tour_url)
            .then(() => { })
            .catch((err) => console.log('open browse url error'))

          this.props.navigation.navigate('Property');
        } else {
          console.log('open browser error');
        }
      });
    }
  }

  postAttendee = async () => {
    let bodyFormData = new FormData();
    bodyFormData.append('action', 'post_oh_attendee');
    bodyFormData.append('user_account', LoginInfo.user_account);
    bodyFormData.append('property_recordno', RouteParam.propertyRecordNo);
    bodyFormData.append('user_latitude', LoginInfo.latitude);
    bodyFormData.append('user_longitude', LoginInfo.longitude);

    await postData(bodyFormData)
      .then((res) => {
        console.log('post attendee success', res);
      })
      .catch((err) => {
        console.log('post attendee error', err)
      })
  }

  sendPushNotification = async (fcmToken) => {
    console.log('target token', fcmToken);
    if (fcmToken == '' || fcmToken == null) return;
    const FIREBASE_API_KEY = "AAAA6khpGvI:APA91bElZqWvEebRsUXMwIxdEF3s21admbURH9MBx5K9ztGw-GU9at5IJ0OVRd9uMzcQHu34vfl_4pdZZOfhhRtM8v-Ya2-QLUwtbtBFxrtczhf4C7j0vhfZueJDVN1NabnXYfZ_r-o1";

    const message = {
      to: fcmToken,
      notification: {
        title: 'Incoming Attendee Request',
        body: LoginInfo.fullname + ' would like to enter your live stream',
        alertTitle: 'Incoming Video-Chat Request',
        alertBody: LoginInfo.fullname + ' would like to enter your live open house stream. Would you like to accept the incoming video call?',
        propertyNo: RouteParam.propertyRecordNo
      },
      data: {
        title: 'Incoming Attendee Request',
        body: LoginInfo.fullname + ' would like to enter your live stream',
        alertTitle: 'Incoming Video-Chat Request',
        alertBody: LoginInfo.fullname + ' would like to enter your live open house stream. Would you like to accept the incoming video call?',
        propertyNo: RouteParam.propertyRecordNo
      },      
      apns: {
        payload: {
          aps: {
            contentAvailable: true,            
            'content-available': true,            
          }
        },
        headers: {
          'apns-push-type': 'background',
          'apns-priority': '5',
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

  render() {
    if (this.state.page_background_photo == '') return null;
    return (
      <ImageBackground style={styles.container} source={{ uri: this.state.page_background_photo }}>
        <View style={{ width: '100%' }}>
          <Header title={this.state.property_mlsnumber} titleColor={Colors.whiteColor} onPressBack={() => this.props.navigation.goBack(null)} />
        </View>
        <View style={styles.body}>
          {
            this.state.display_live_oh_button &&
            <View style={styles.btnContainer}>
              <Button btnTxt='ENTER LIVE OPEN HOUSE' btnStyle={{ width: '100%', height: normalize(50, 'height'), color: 'blue' }} onPress={() => this.onLiveOpen()} />
            </View>
          }
          {
            this.state.display_virtual_tour_button &&
            <View style={styles.btnContainer}>
              <Button btnTxt='VIEW VIRTUAL TOUR' btnStyle={{ width: '100%', height: normalize(50, 'height'), color: 'blue' }} onPress={() => this.onVirtualTour()} />
            </View>
          }
          {/* <View style={styles.questionContainer}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('RealtorProfile')}>
              <Text style={{ fontSize: RFPercentage(2.2), color: Colors.whiteColor }}>Have a question?</Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </ImageBackground>
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
  body: {
    width: '100%',
    height: height * .8,
    marginTop: normalize(20, 'height'),
    justifyContent: 'flex-end',
    //borderWidth: 1
  },
  btnContainer: {
    width: '90%',
    height: normalize(50, 'height'),
    alignSelf: 'center',
    justifyContent: 'flex-start',
    marginTop: normalize(15, 'height')
  },
  questionContainer: {
    width: '50%',
    height: normalize(20, 'height'),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: normalize(10, 'height')
  },
});