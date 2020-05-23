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
  Platform
} from "react-native";
import normalize from 'react-native-normalize';

import Icon from 'react-native-vector-icons/FontAwesome';
Platform.OS === 'ios' ? Icon.loadFont() : '';

import PropTypes from 'prop-types';
import { Colors, Images, SearchWordData } from "../constants";

export default class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    }
  }

  filterData = (query) => {
    var filtered = SearchWordData.filter(each => {
      var eachStr = each.toLowerCase();
      return eachStr.includes(query)
    });
    return filtered;
  }

  render() {
    const { query } = this.state;
    const data = this.filterData(query.toLowerCase());
    //console.log('data',data);
    return (
      <View>
        <View style={{
          backgroundColor: this.props.boxStyle.backgroundColor,
          width: this.props.boxStyle.width,
          height: this.props.boxStyle.height,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          alignSelf: 'center',
          borderRadius: normalize(10),
          borderColor: this.props.boxStyle.borderColor,
          borderWidth: 1,
        }}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.txtInput}
              value={this.state.query}
              placeholder='Search'
              placeholderTextColor={Colors.weakBlackColor}
              onChangeText={(text) => this.setState({ query: text })}
            />            
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity onPress={this.props.onSearch(this.state.query)}>
              <Icon
                name='search'
                size={20}
                color={this.props.boxStyle.btnColor}
              />
            </TouchableOpacity>
          </View>
        </View>
        {
          query != '' && data.length > 0 &&
          <ScrollView style={[styles.autoCompleteContainer,
           { height: data.length * 15 > 150 ? 150 + 5 : data.length * 15 }
          ]}>
            {
              data.map((each, index) => {
                return (
                  <View key={index}>
                    <TouchableOpacity onPress={() => this.setState({ query: each })}>
                      <Text style={{marginLeft: normalize(5)}}>{each}</Text>
                    </TouchableOpacity>
                  </View>
                )
              })
            }
          </ScrollView>
        }
      </View>
    );
  }
}

SearchBox.propTypes = {
  boxStyle: PropTypes.object.isRequired,
  onSearch: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  searchContainer: {
    width: '90%',
    height: normalize(30, 'height'),
    justifyContent: 'center',
    // borderColor: '#00ff00',
    // borderWidth: 2
  },
  txtInput: {
    paddingLeft: normalize(10),
    color: Colors.blackColor,
  },
  btnContainer: {
    width: '20%',
    justifyContent: 'center',
  },
  autoCompleteContainer: {
    backgroundColor: '#ffffff',
    width: '95%',
    height: normalize(200, 'height'),
    alignSelf: 'center',    
    // borderColor: '#ff0000',
    // borderWidth: 1
  }
})