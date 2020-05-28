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
import { Colors, Images, RouteParam } from '@constants';

export default class OpenVirtualHomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <ImageBackground style={styles.container} source={{uri: RouteParam.agent.img}}>
        <View style={{ width: '100%' }}>
          <Header title='' titleColor={Colors.whiteColor} onPressBack={() => this.props.navigation.goBack(null)} />
        </View>
        <View style={styles.body}>
          <View style={styles.btnContainer}>
            <Button btnTxt='ENTER MY OPEN HOUSE' btnStyle={{ width: '100%', height: normalize(50, 'height'), color: 'blue' }} onPress={() => this.props.navigation.navigate('Signature')} />
          </View>
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
    justifyContent: 'flex-start'
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