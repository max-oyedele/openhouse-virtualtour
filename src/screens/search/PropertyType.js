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
import { Colors, Images, LoginInfo, SearchBy, PropertyTypeData } from '@constants';
import { RouteParam } from "../../constants";

export default class PropertyTypeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: false,
      propertyTypeCheckedList: [],
      oldCheckedList: []
    }    
  }

  componentDidMount() {    
    this.getCheckedList();
  }

  getCheckedList = () => {    
    var propertyTypeCheckedList = [];
    PropertyTypeData.forEach((each, index) => {
      if(each.properties_category_id == SearchBy.propertyType) propertyTypeCheckedList[index] = 1;
      else propertyTypeCheckedList[index] = 0;
    });      

    var oldCheckedList = [];
    propertyTypeCheckedList.forEach(each=>oldCheckedList.push(each));

    this.setState({ 
      propertyTypeCheckedList: propertyTypeCheckedList,
      oldCheckedList: oldCheckedList
    });     
  }  

  controlSwitch = (selectedIndex, selectedValue) => {
    let { propertyTypeCheckedList } = this.state;    

    propertyTypeCheckedList[selectedIndex] = selectedValue;

    if (selectedValue) {
      propertyTypeCheckedList.map((each, index) => {
        if (index != selectedIndex) propertyTypeCheckedList[index] = 0;
      })
      SearchBy.propertyType = PropertyTypeData[selectedIndex].properties_category_id;
    }

    if (!selectedValue) {
      let nonSelectedCount = 0;
      propertyTypeCheckedList.map((each, index) => {
        if (!each) nonSelectedCount++;
      })
      if (nonSelectedCount == propertyTypeCheckedList.length) {
        propertyTypeCheckedList[0] = 1;
        SearchBy.propertyType = PropertyTypeData[0].properties_category_id;
      }
    }    

    this.setState({
      propertyTypeCheckedList: propertyTypeCheckedList,
      refresh: !this.state.refresh
    });

    var isChanged = false;        
    propertyTypeCheckedList.forEach((each, index)=>{      
      if(each != this.state.oldCheckedList[index]) isChanged = true;              
    });    
    RouteParam.isChanged = isChanged;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ width: '100%' }}>
          <Header title='TYPE OF PROPERTY' titleColor={Colors.blackColor} onPressBack={() => this.props.navigation.goBack(null)} />
        </View>

        <View style={styles.body}>
          {
            this.state.propertyTypeCheckedList.map((eachChecked, index) => {
              return (
                <View key={index} style={styles.eachLineContainer}>
                  <View style={styles.nameContainer}>
                    <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(2.2), color: Colors.blackColor }}>{PropertyTypeData[index].properties_category_short_desc}</Text>
                  </View>
                  <View style={styles.switchContainer}>
                    <SwitchSelector
                      style={{ width: '53%', height: normalize(30) }}
                      height={normalize(30)}
                      backgroundColor={eachChecked ? Colors.blueColor : Colors.borderColor}
                      selectedColor='#00f'
                      buttonColor={Colors.whiteColor}
                      initial={this.state.propertyTypeCheckedList[index]}
                      value={eachChecked}
                      onPress={value => {
                        this.controlSwitch(index, value);
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