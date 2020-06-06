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
  Dimensions
} from "react-native";
import normalize from 'react-native-normalize';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import SafeAreaView from 'react-native-safe-area-view';
import { SliderBox } from "react-native-image-slider-box";

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
import { Colors, Images, LoginInfo } from '@constants';

export default class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      images: [
        require('../assets/images/welcome1.png'),
        require('../assets/images/welcome2.png'),
        require('../assets/images/welcome3.png'),
        require('../assets/images/welcome4.png'),
      ],
      title: [
        'Let’s Get \n Started',
        'Your Next Home \n Is Waiting…',
        'Photos, Videos \n and More…',
        'See It Before You \n Buy or Rent It…'
      ],
      description: [
        'Step Inside Your Dream Home Without Leaving Your Couch with Open™',
        'Whether you’re looking to buy your first house, searching for a new home for your growing family or simply checking listings in your area, you’ll find the best list of homes tailored to your needs with Open™',
        'We want to make your home search experience more interactive, which is why every listing will include high resolution photos and a video of each room.',
        'You can now virtually explore that dream kitchen or that perfect walk-in closet.  Get a genuine feel of what it’s like to live there even when you’re on the go!'
      ]
    }
  }

  componentDidMount() {

  }

  onEnter = (index) => {
    if(LoginInfo.user_pick_an_agent){
      setTimeout(() => { this.props.navigation.navigate('Agent') }, 1000);
    }
    else{
      setTimeout(() => { this.props.navigation.navigate('Main') }, 1000);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <SliderBox      
          ref={ref=>this.ref=ref}    
          images={this.state.images}
          sliderBoxHeight={sliderBoxHeight}
          currentImageEmitter={index => this.setState({ index: index })}
          onCurrentImagePressed={index => this.onEnter(index)}
        />
        <View style={styles.txtContentContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              {this.state.title[this.state.index]}
            </Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>
              {this.state.description[this.state.index]}
            </Text>
          </View>          
        </View>
      </View>
    );
  }
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const sliderBoxAspectRatio = 0.93;
const sliderBoxHeight = height * 0.6//width / sliderBoxAspectRatio;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255,255,255,1)",
    flex: 1,
    width: width,
    height: height
  },
  txtContentContainer: {
    width: width,
    height: height - sliderBoxHeight,
    //justifyContent: 'center',
    marginTop: normalize(30, 'height'),
    alignItems: 'center',
  },
  titleContainer: {
    width: '100%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    //borderWidth: 1
  },
  title: {
    fontFamily: 'SFProText-Bold',
    fontSize: RFPercentage(5),
    color: Colors.blackColor,
    textAlign: 'center',    
  },
  descriptionContainer: {
    width: '93%',
    height: '40%',
    alignItems: 'center',
    marginTop: normalize(20, 'height'),
    //borderWidth: 1
  },
  description: {
    fontFamily: 'SFProText-Regular',
    fontSize: RFPercentage(2),
    color: '#50505A',
    textAlign: 'center'
  },
  // homeBtnContainer: {
  //   width: '90%',
  //   height: '15%',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginTop: normalize(-50, 'height')
  // },
  // homeImg: {
  //   width: '100%',
  //   height: '100%'
  // }
});