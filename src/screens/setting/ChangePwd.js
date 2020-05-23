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
  SignModal
} from '@components';

export default class ChangePwdScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    
  }
 
  render() {
    return (
      <View style={styles.container}>

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
});