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
import normalize from "react-native-normalize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/FontAwesome';
Platform.OS === 'ios' ? Icon.loadFont() : '';

import { Colors, Images } from '@constants';
import { Button } from '@components';

export default class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: 'Jonathan Smith',
        img: require('../assets/images/profileImg.png')
      }
    }
  }
  componentDidMount = () => {
        
  }

  render() {
    let { navigation, onToggleMenu, onLogout } = this.props;

    return (
      <ImageBackground style={styles.container} source={Images.sideBlurBack}>
        <View style={styles.sideMenuIcon}>
          <TouchableOpacity onPress={() => onToggleMenu()}>
            <Icon
              name='bars'
              size={30}
              color={Colors.blackColor}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.profileImgNameContainer}>
          <View style={styles.profileImgContainer}>
            <Image style={{ width: '100%', height: '100%' }} source={this.state.user.img} resizeMode='contain' />
          </View>
          <Text style={[styles.menuItemTxt, { marginTop: normalize(10, 'height') }]}>{this.state.user.name}</Text>
        </View>
        <View style={styles.bodyContainer}>
          <TouchableOpacity style={[styles.menuItemContainer, { marginTop: normalize(10, 'height') }]}>
            <Text style={styles.menuItemTxt}>FOR RENT</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItemContainer}>
            <Text style={styles.menuItemTxt}>FOR SALE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItemContainer} onPress={() => navigation.navigate('SearchStack')}>
            <Text style={styles.menuItemTxt}>SEARCH</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItemContainer} onPress={() => navigation.navigate('Favorites')}>
            <Text style={styles.menuItemTxt}>FAVORITES</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItemContainer} onPress={() => navigation.navigate('Setting', { screen: 'Preference' })}>
            <Text style={styles.menuItemTxt}>MY PREFERENCE</Text>
          </TouchableOpacity>

          <View style={[styles.menuItemContainer, {marginTop: normalize(40, 'height')}]}>
            <Button btnTxt='Log out' btnStyle={{ width: width * 0.45, height: normalize(50, 'height'), color: 'blue' }} onPress={() => onLogout()} />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object.isRequired,
  onToggleMenu: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired
};

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    left: 0,
    // top: 0,
    top: normalize(-25, 'height'),
    width: width * 0.8,
    //height: height,
    height: height + normalize(70, 'height'),
    //opacity: 0.95,
    zIndex: 10
  },
  sideMenuIcon: {
    width: '10%',
    position: 'absolute',
    top: normalize(50, 'height'),
    left: normalize(22),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImgNameContainer: {
    width: '50%',
    height: '20%',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: normalize(80, 'height'),
    //borderWidth: 1,
  },
  profileImgContainer: {
    width: normalize(100),
    height: normalize(100),
    borderRadius: normalize(50),
    borderColor: Colors.borderColor,
    borderWidth: normalize(1)
  },
  bodyContainer: {
    width: '100%',
    borderColor: Colors.borderColor,
    borderTopWidth: normalize(1.5, 'height')
  },
  menuItemContainer: {
    width: '100%',
    height: '11%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: normalize(3, 'height'),
    //borderWidth: 1
  },
  menuItemTxt: {
    fontFamily: 'SFProText-Semibold',
    fontSize: RFPercentage(2),
    color: Colors.blackColor
  },
});