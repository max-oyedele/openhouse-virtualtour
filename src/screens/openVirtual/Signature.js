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
  Dimensions,
  Platform
} from "react-native";
import normalize from 'react-native-normalize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import { WebView } from 'react-native-webview';//ios
import PDFView from 'react-native-view-pdf';//android
import RNFetchBlob from 'rn-fetch-blob';

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

export default class SignatureScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleSignForm: false
    }
  }

  componentDidMount() {
    
  }

  onSignOK = () => {   
    this.postSignature();
    this.postAttendee();

    const { from } = this.props.route.params;
    if(from === 'live') {
      if(RouteParam.liveInfo.error == undefined) {
        this.props.navigation.navigate('LiveCall');
      }
      //console.log('live info error');      
    }      
    else if(from === 'virtual_tour') {
      Linking.canOpenURL(RouteParam.browseUrl).then(supported => {
        if (supported) {
          Linking.openURL(RouteParam.browseUrl)
            .then(() => { })
            .catch((err) => {
              //console.log('open browse url error');
            })
            this.props.navigation.navigate('Property');
        } else {
          //console.log('open browser error');
        }
      });     
    }
  }
  
  postSignature = async () => {    
    let signaturePath = `${RNFetchBlob.fs.dirs.DocumentDir}/signature.png`;    
    let uri = Platform.OS === 'ios' ? signaturePath : 'file://' + signaturePath;

    let filetoupload = LoginInfo.user_account + '.png';  
    let photo_id = LoginInfo.user_account + '-' + RouteParam.propertyRecordNo;
    
    let data = new FormData();
    data.append('photo_id', photo_id);
    data.append('photo_type', 's');    
    data.append('filetoupload', {
      uri: uri,
      name: filetoupload,
      type: 'image/png',
    });      

    fetch("http://www.openhousemarketingsystem.com/application/virtualplus/v1/uploadimage.php", {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      body: data,
    })
      .then(res => res.json())      
      .then(res => {        
        //console.log('post sign success', res)
      })
      .catch((err)=>{
        //console.log('post sign error',err);
      })
      .done();   
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
        //console.log('post attendee success', res);
      })
      .catch((err) => {
        //console.log('post attendee error', err)
      })
  }

  render() {
    return (
      <ImageBackground style={styles.container}>
        <SignModal
          visible={this.state.visibleSignForm}
          onClose={() => this.setState({ visibleSignForm: false })}
          onSignOK={() => this.onSignOK()}
        />
        <View style={{ width: '100%' }}>
          <Header title='AGENCY DISCLOSURE FORM' titleColor={Colors.blackColor} onPressBack={() => this.props.navigation.goBack(null)} />
        </View>
        <View style={styles.body}>
          <View style={styles.pdfContainer}>
            <WebView source={{ uri: RouteParam.pdfUrl }} />
          </View>
          <View style={styles.btnContainer}>
            <Button btnTxt='AGREE AND SIGN' btnStyle={{ width: '100%', height: normalize(50, 'height'), color: 'blue' }} onPress={() => this.setState({ visibleSignForm: true })} />
          </View>
          {/* <View style={styles.questionContainer}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('RealtorProfile')}>
              <Text style={{ fontSize: RFPercentage(2.2), color: Colors.blueColor }}>Have a question?</Text>
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
    height: height,
  },
  body: {
    width: '100%',
    height: height,
    marginTop: normalize(20, 'height'),
    alignItems: 'center'
    //borderWidth: 2
  },
  pdfContainer: {
    width: '95%',
    height: '75%',
    justifyContent: 'center',
    alignSelf: 'center',
    //borderWidth: 1
  },
  emptyContainer: {
    width: '60%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    //borderWidth: 1
  },
  btnContainer: {
    width: '90%',
    height: normalize(50, 'height'),
    alignSelf: 'center',
    justifyContent: 'flex-start',
    marginTop: normalize(20, 'height')
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