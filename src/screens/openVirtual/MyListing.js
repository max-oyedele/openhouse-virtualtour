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
  ImageBackground,
  FlatList
} from "react-native";
import normalize from 'react-native-normalize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

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

export default class MyListingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: this.props.route.params.tab,
      activeData: [],
      soldRentedData: [],     
    }
  }

  componentDidMount() {
    
  }

  onPropertyPress = () => { }

  render() {
    const btnBlueStyle = { width: width * 0.45, height: normalize(50, 'height'), color: 'blue' };
    const btnWhiteStyle = { width: width * 0.45, height: normalize(50, 'height'), color: 'white' };
    return (
      <ImageBackground style={styles.container}>
        <View style={{ width: '100%' }}>
          <Header title={this.state.tab == 'active' ? 'ACTIVE LISTINGS' : 'SOLD / RENDTED'} titleColor={Colors.blackColor} onPressBack={() => this.props.navigation.goBack(null)} />
        </View>
        <View style={styles.body}>
          <View style={styles.btnContainer}>
            <Button btnTxt='ACTIVE' btnStyle={this.state.tab === 'active' ? btnBlueStyle : btnWhiteStyle} onPress={() => this.setState({ tab: 'active' })} />
            <Button btnTxt='SOLD / RENTED' btnStyle={this.state.tab === 'sold-rented' ? btnBlueStyle : btnWhiteStyle} onPress={() => this.setState({ tab: 'sold-rented' })} />
          </View>
          <View style={styles.listContainer}>
            {((this.state.tab === 'active' && this.state.activeData.length == 0) ||
              (this.state.tab === 'sold-rented' && this.state.soldRentedData.length == 0)) ?
              <View style={styles.emptyContainer}>
                <Text style={{ fontFamily: 'SFProText-Semibold', fontSize: RFPercentage(2) }}>Add Properties</Text>
                <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(1.8), color: Colors.passiveTxtColor, textAlign: 'center', marginTop: normalize(10, 'height') }}>Press the bookmark button to add an property</Text>
              </View>
              :
              <FlatList
                showsVerticalScrollIndicator={false}
                data={this.state.tab === 'active' ? this.state.activeData : this.state.soldRentedData}
                renderItem={({ item }) => <PropertyCard cardStyle={{ width: width * 0.95, height: normalize(245, 'height'), marginBottom: normalize(10, 'height'), marginRight: 0 }} item={item} onPress={this.onPropertyPress} />}
                keyExtractor={item => item.id}
              />
            }
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
    height: '100%',
    marginTop: normalize(20, 'height'),
    borderColor: Colors.borderColor,
    borderTopWidth: normalize(0.5, 'height'),
  },
  btnContainer: {
    width: '95%',
    height: normalize(60),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: normalize(20, 'height'),
    //borderWidth: 1
  },
  listContainer: {
    width: '95%',
    height: '76%',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: normalize(15, 'height'),
    //borderWidth: 1
  },
  emptyContainer: {
    width: '60%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    //borderWidth: 1
  }
});