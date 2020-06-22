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
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import Icon from 'react-native-vector-icons/FontAwesome';
Platform.OS === 'ios' ? Icon.loadFont() : '';

import PropTypes from 'prop-types';
import { Colors, Images, SearchWordData, SearchBy } from "../constants";

export default class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      isPicked: true
    }
  }

  componentDidMount() {
    this.setState({ query: SearchBy.query });
  }

  filterData = (query) => {        
    var filtered = SearchWordData.filter(each => {
      if(each == undefined){        
        return false;
      }

      var eachStr = each.toLowerCase();
      var lowerQuery = query.toLowerCase();
      return eachStr.includes(lowerQuery);
    });
    return filtered;
  }

  render() {
    const { query } = this.state;
    const data = this.filterData(query);

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
              value={query}
              placeholder='Search'
              placeholderTextColor={Colors.weakBlackColor}
              onChangeText={(text) => this.setState({ query: text, isPicked: false })}
            />
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity onPress={() => { SearchBy.query = this.state.query; this.props.onSearch(this.state.query); }}>
              <Icon
                name='search'
                size={20}
                color={this.props.boxStyle.btnColor}
              />
            </TouchableOpacity>
          </View>
        </View>
        {
          query != '' && data.length > 0 && this.state.isPicked == false &&
          <View
            style={[
              styles.autoCompleteContainer,
              { height: data.length > 5 ? normalize(150, 'height') : data.length > 1 ? normalize((data.length) * 30, 'height') : normalize((data.length + 1) * 30, 'height') }
            ]}
          >
            <View style={{ width: '100%', height: '100%', backgroundColor: '#ffffff' }}>
              <ScrollView>
                {
                  data.map((each, index) => {
                    return (
                      <View key={index}>
                        <TouchableOpacity onPress={() => this.setState({ query: each, isPicked: true })}>
                          <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(2.8), color: Colors.blackColor, marginTop: normalize(5, 'height') }}>{each}</Text>
                        </TouchableOpacity>
                      </View>
                    )
                  })
                }
              </ScrollView>
            </View>
          </View>
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
    fontSize: RFPercentage(2),
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
    alignSelf: 'center',
    padding: normalize(7),
    // borderColor: '#ff0000',
    // borderWidth: 1
  }
})