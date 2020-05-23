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
import { RFPercentage } from "react-native-responsive-fontsize";
import SwitchSelector from 'react-native-switch-selector';

import { Colors, Images, PropertyCardTheme } from '@constants';
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
import { getContentByAction } from '../../api/rest';

export default class PropertyTypeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: false,
      propertyTypeList: [
        // {
        //   name: 'Single Family Home',
        //   checked: 1
        // },
        // {
        //   name: 'Multi-Family Home',
        //   checked: 0
        // },
        // {
        //   name: 'Condominum',
        //   checked: 0
        // },
        // {
        //   name: 'Co-Op',
        //   checked: 0
        // },
        // {
        //   name: 'Timeshare',
        //   checked: 0
        // },
        // {
        //   name: 'Rental Property',
        //   checked: 0
        // },
        // {
        //   name: 'Commercial Property',
        //   checked: 0
        // },
      ],        
    }
  }

  componentDidMount() {    
    this.getCategory();
  }

  getCategory = () => {
    var categoryParam = {
      action: 'properties_categories',
      user_latitude: 40.776611,//LoginInfo.latitude,
      user_longitude: -73.345718,//LoginInfo.longitude,
      user_id: 1, //LoginInfo.uniqueid
    };
    
    getContentByAction(categoryParam)
    .then((res)=>{
      //console.log('category', res)
      var sortedRes = res.sort((a, b) => {return a.properties_category_displayorder - b.properties_category_displayorder})
      var propertyTypeList = [];
      sortedRes.forEach(each => {
        var eachPropertyType = {
          name: each.properties_category_long_desc,
          checked: 0
        }
        propertyTypeList.push(eachPropertyType);
      });
      
      propertyTypeList[0].checked = 1; //default
      this.setState({ propertyTypeList: propertyTypeList });
    })
    .catch((err)=>{
      console.log('get category error', err)
    })
  }

  clearSwitch = (selectedIndex, selectedValue) => {
    let { propertyTypeList } = this.state;
    propertyTypeList[selectedIndex].checked = selectedValue;
    
    if(selectedValue){
        propertyTypeList.map((each, index) => {
        if(index != selectedIndex) propertyTypeList[index].checked = 0;
      })
    }
    
    if(!selectedValue){
      let nonSelectedCount = 0;
      propertyTypeList.map((each, index) => {
        if(!each.checked) nonSelectedCount++;
      })
      if(nonSelectedCount == propertyTypeList.length){
        propertyTypeList[0].checked = 1
      }
    }

    this.setState({ 
      propertyTypeList: propertyTypeList,
      refresh: !this.state.refresh 
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ width: '100%' }}>
          <Header title='TYPE OF PROPERTY' titleColor={Colors.blackColor} onPressBack={() => this.props.navigation.goBack(null)} />
        </View>

        <View style={styles.body}>
          {
            this.state.propertyTypeList.map((each, index) => {
              return (
                <View key={index} style={styles.eachLineContainer}>
                  <View style={styles.nameContainer}>
                    <Text style={{fontFamily: 'SFProText-Regular', fontSize: RFPercentage(2.2), color: Colors.blackColor}}>{each.name}</Text>
                  </View>
                  <View style={styles.switchContainer}>
                    <SwitchSelector
                      style={{ width: '53%', height: normalize(30) }}
                      height={normalize(30)}
                      backgroundColor={each.checked ? Colors.blueColor : Colors.borderColor}
                      selectedColor='#00f'
                      buttonColor={Colors.whiteColor}
                      initial={index == 0 ? 1 : 0}
                      value={each.checked}
                      onPress={value => {
                        this.clearSwitch(index, value);
                      }}
                      hasPadding
                      options={[
                        { label: "", value: 0 },
                        { label: "", value: 1 }
                      ]}
                    />
                  </View>
                </View>
              )
            })
          }
        </View>
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
  body: {
    width: '100%',
    height: '100%',
    borderColor: Colors.borderColor,
    borderTopWidth: normalize(0.5, 'height'),
    marginTop: normalize(20, 'height'),
    paddingTop: normalize(10, 'height')
  },
  eachLineContainer: {
    width: '90%',
    height: '10%',
    flexDirection: 'row',
    alignSelf: 'center',
    borderColor: Colors.borderColor,
    borderBottomWidth: normalize(0.5, 'height')
  },
  nameContainer: {
    width: '70%',
    height: '100%',
    justifyContent: 'center',
    paddingLeft: normalize(10),
    //borderWidth: 1
  },
  switchContainer: {
    width: '30%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    //borderWidth: 2
  }
});