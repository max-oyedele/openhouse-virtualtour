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
  ImageBackground,
  TouchableHighlight,
  Dimensions
} from "react-native";

import normalize from 'react-native-normalize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import PropTypes from 'prop-types';
import Overlay from 'react-native-modal-overlay';
import SignatureCapture from 'react-native-signature-capture';
import RNFetchBlob from 'rn-fetch-blob';

import { Colors, Images } from '@constants';

let isDrag = false;
export default class SignModal extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }    
  }

  saveSign() {
    if(!isDrag) return;
    isDrag = false;

    this.refs["sign"].saveImage();
    this.props.onSignOK();
    this.props.onClose();
  }

  resetSign() {
    isDrag = false
    this.refs["sign"].resetImage();    
  }

  _onDragEvent() {
    //console.warn('drag');    
    isDrag = true;    
  }

  _onSaveEvent(result) {    
    const signPath = `${RNFetchBlob.fs.dirs.DocumentDir}/signature.png`;
    RNFetchBlob.fs
      .writeFile(signPath, sign.encoded, 'base64')
      .then((res) => {        
        console.log('signature saved', res)
      })
      .catch(err => console.log('signature error', err));  
  }

  render() {
    return (
      <Overlay
        visible={this.props.visible}
        // onClose={this.onClose}
        // closeOnTouchOutside
        containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        childrenWrapperStyle={styles.signModal}
      >
        <View style={styles.signModalHeader}>
          <View style={{ width: '15%', height: '100%', justifyContent: 'center', alignItems: 'center' }}></View>
          <View style={{ width: '70%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontFamily: 'SFProText-Semibold', fontSize: RFPercentage(2), color: Colors.blackColor }}>Your Signature</Text>
          </View>
          <TouchableOpacity
            style={{ width: '15%', height: '100%', marginTop: normalize(3, 'height'), alignItems: 'flex-end' }}
            onPress={() => this.props.onClose()}
          >
            <Image style={{ width: '60%', height: '60%' }} source={Images.iconClose} resizeMode='contain' />
          </TouchableOpacity>
        </View>
        <View style={styles.signModalBody}>
          <SignatureCapture
            style={{ flex: 1 }}
            ref="sign"
            onSaveEvent={this._onSaveEvent}
            onDragEvent={this._onDragEvent}
            saveImageFileInExtStorage={false}
            showNativeButtons={false}
            showTitleLabel={false}
            viewMode={"portrait"} />
        </View>
        <View style={styles.signModalFooter}>
          <TouchableOpacity
            style={{ width: '15%', height: '100%', justifyContent: 'center', alignItems: 'center' }}
            onPress={() => this.resetSign()}
          >
            <Image style={{ width: '60%', height: '60%' }} source={Images.iconRefresh} resizeMode='contain' />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ width: '15%', height: '100%', justifyContent: 'center', alignItems: 'center' }}
            onPress={() => this.saveSign()}
          >
            <Image style={{ width: '60%', height: '60%' }} source={Images.iconOK} resizeMode='contain' />
          </TouchableOpacity>
        </View>
      </Overlay>
    );
  }
}

SignModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSignOK: PropTypes.func.isRequired
};

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  signModal: {
    backgroundColor: '#fff',
    width: '95%',
    height: '25%',
    alignSelf: 'center',
    borderRadius: 8,
    borderColor: Colors.blueColor,
    borderWidth: 3,
    padding: 0
  },
  signModalHeader: {
    width: '95%',
    height: '20%',
    flexDirection: 'row',
    //borderWidth: 1
  },
  signModalBody: {
    width: '95%',
    height: '60%',
    borderColor: Colors.blueColor,
    borderBottomWidth: 2,
    //borderWidth: 1
  },
  signModalFooter: {
    width: '95%',
    height: '20%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    //borderWidth: 1
  },
});






