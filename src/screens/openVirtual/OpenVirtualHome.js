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
import { getContentByAction, postData } from '../../api/rest';

export default class OpenVirtualHomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      property_mlsnumber: '',
      page_background_photo: '',
      display_live_oh_button: false,
      display_virtual_tour_button: false,
      property_virtual_tour_url: ''
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
          //console.log('res', res);
          this.setState({
            property_mlsnumber: res[0].property_mlsnumber,
            page_background_photo: res[0].page_background_photo,
            display_live_oh_button: res[0].display_live_oh_button,            
            display_virtual_tour_button: res[0].display_virtual_tour_button,
            property_virtual_tour_url: res[0].property_virtual_tour_url,
            virtual_tour_signagure_required: res[0].virtual_tour_signagure_required
          });

          RouteParam.pdfUrl = res[0].prefill_pdf_url;                    
          RouteParam.browseUrl = res[0].property_virtual_tour_url;
        }
      })
      .catch((err) => {
        console.log('get openhouse into error', err)
      })
  }

  onLiveOpen = () => {}

  onVirtualTour = () => {
    if(!this.state.virtual_tour_signagure_required){      
      Linking.canOpenURL(this.state.property_virtual_tour_url).then(supported => {
        if (supported) {
          Linking.openURL(this.state.property_virtual_tour_url)
          .then(()=>{})
          .catch((err)=>console.log('open browse url error'))
        } else {
          console.log('open browser error');
        }
      });

      this.postAttendee();
    } 
    else this.props.navigation.navigate('Signature');        
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

  render() {
    if(this.state.page_background_photo == '') return null;
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
          <View style={styles.questionContainer}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('RealtorProfile')}>
              <Text style={{ fontSize: RFPercentage(2.2), color: Colors.whiteColor }}>Have a question?</Text>
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