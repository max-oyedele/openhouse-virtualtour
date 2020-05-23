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
  TouchableOpacity,
  Dimensions,
  Platform
} from "react-native";
import normalize from 'react-native-normalize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import { WebView } from 'react-native-webview';//ios
import PDFView from 'react-native-view-pdf';//android

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

export default class SignatureScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // propertyPdf: require('../../assets/property.pdf'),
      propertyPdfUrl: 'https://www.dos.ny.gov/forms/licensing/1736-a.pdf',
      visibleSignForm: false
    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <ImageBackground style={styles.container}>
        <SignModal
          visible={this.state.visibleSignForm}
          onClose={() => this.setState({ visibleSignForm: false })}
          onSignOK={() => this.props.navigation.navigate('VideoProperty')}
        />
        <View style={{ width: '100%' }}>
          <Header title='AGENCY DISCLOSURE FORM' titleColor={Colors.blackColor} onPressBack={() => this.props.navigation.goBack(null)} />
        </View>
        <View style={styles.body}>
          <View style={styles.pdfContainer}>
            {Platform.OS === 'ios' ?
              <WebView source={{uri:this.state.propertyPdfUrl}} />
              :
              <PDFView
                fadeInDuration={250.0}
                style={{ flex: 1 }}
                // resource={this.state.propertyPdf}
                resourceType='file'
                onLoad={() => console.log(`PDF rendered`)}
                onError={(err) => console.log('Cannot render PDF', err)}
              />
            }
          </View>
          <View style={styles.btnContainer}>
            <Button btnTxt='AGREE AND SIGN' btnStyle={{ width: '100%', height: normalize(50, 'height'), color: 'blue' }} onPress={() => this.setState({ visibleSignForm: true })} />
          </View>
          <View style={styles.questionContainer}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('RealtorProfile')}>
              <Text style={{ fontSize: RFPercentage(2.2), color: Colors.blueColor }}>Have a question?</Text>
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
    height: '70%',
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