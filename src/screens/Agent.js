import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Animated,
  ScrollView,
  KeyboardAvoidingView,
  Text,
  Image,
  ImageBackground,
  TextInput,
  Alert,
  TouchableOpacity,
  Dimensions,
  FlatList
} from "react-native";
import normalize from 'react-native-normalize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import {
  BrowseCard,
  Button,
  CallCard,
  AgentCard,
  Header,
  LabelTag,
  PropertyCard,
  SearchBox,
  SideMenu,
  SignModal
} from '@components';
import { Colors, Images, LoginInfo, AgentsData } from '@constants';
import { getContentByAction, postData } from '../api/rest';

export default class AgentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: false,
      selectedIndex: -1,
      agentsData: [
        {
          realtor_account: "39413",
          realtor_photo_url: "http://photos.v3.mlsstratus.com/Live/Photos/agents/124724.jpg", realtor_full_name: "Michael Costa",
          realtor_title: "Sales Associate",
          realtor_company: "Coldwell Banker Residential"
        },
        {
          realtor_account: "39225",
          realtor_photo_url: "http://photos.v3.mlsstratus.com/Live/Photos/agents/111539.jpg", realtor_full_name: "Maria Lindh",
          realtor_title: "Broker Owner",
          realtor_company: "Next Level Real Estate Ny"
        },
        {
          realtor_account: "39413",
          realtor_photo_url: "http://photos.v3.mlsstratus.com/Live/Photos/agents/124724.jpg", realtor_full_name: "Michael Costa",
          realtor_title: "Sales Associate",
          realtor_company: "Coldwell Banker Residential"
        },
        {
          realtor_account: "39225",
          realtor_photo_url: "http://photos.v3.mlsstratus.com/Live/Photos/agents/111539.jpg", realtor_full_name: "Maria Lindh",
          realtor_title: "Broker Owner",
          realtor_company: "Next Level Real Estate Ny"
        },
        {
          realtor_account: "39413",
          realtor_photo_url: "http://photos.v3.mlsstratus.com/Live/Photos/agents/124724.jpg", realtor_full_name: "Michael Costa",
          realtor_title: "Sales Associate",
          realtor_company: "Coldwell Banker Residential"
        },
        {
          realtor_account: "39225",
          realtor_photo_url: "http://photos.v3.mlsstratus.com/Live/Photos/agents/111539.jpg", realtor_full_name: "Maria Lindh",
          realtor_title: "Broker Owner",
          realtor_company: "Next Level Real Estate Ny"
        },
        {
          realtor_account: "39413",
          realtor_photo_url: "http://photos.v3.mlsstratus.com/Live/Photos/agents/124724.jpg", realtor_full_name: "Michael Costa",
          realtor_title: "Sales Associate",
          realtor_company: "Coldwell Banker Residential"
        },
        {
          realtor_account: "39225",
          realtor_photo_url: "http://photos.v3.mlsstratus.com/Live/Photos/agents/111539.jpg", realtor_full_name: "Maria Lindh",
          realtor_title: "Broker Owner",
          realtor_company: "Next Level Real Estate Ny"
        },
        {
          realtor_account: "39413",
          realtor_photo_url: "http://photos.v3.mlsstratus.com/Live/Photos/agents/124724.jpg", realtor_full_name: "Michael Costa",
          realtor_title: "Sales Associate",
          realtor_company: "Coldwell Banker Residential"
        },
        {
          realtor_account: "39225",
          realtor_photo_url: "http://photos.v3.mlsstratus.com/Live/Photos/agents/111539.jpg", realtor_full_name: "Maria Lindh",
          realtor_title: "Broker Owner",
          realtor_company: "Next Level Real Estate Ny"
        },
      ]
    }
  }

  componentDidMount() {
    //this.getAgent();
  }

  getAgent = () => {
    var agentParam = {
      action: 'pick_partner_agent',
      user_latitude: LoginInfo.latitude,
      user_longitude: LoginInfo.longitude,
      user_id: LoginInfo.uniqueid,
      user_email: LoginInfo.email // ?
    };
    console.log('agent Param', agentParam);
    getContentByAction(agentParam)
      .then((res) => {
        console.log('agent data', res);
        this.setState({
          agentsData: res,
        });
      })
      .catch((err) => {
        console.log('get agent error', err);
      })
  }

  onClickAgent = (index) => {
    this.setState({ selectedIndex: index });
    Alert.alert(
      'Pick the preferred agent',
      'Are you sure this agent?',
      [
        {text: 'Yes', onPress: () => this.onYes()},
        {text: 'No', onPress: () => {}},
      ],
      { 
        cancelable: true 
      }
    );
  }

  onYes = () => {
    LoginInfo.user_assigned_agent = this.state.agentsData[this.state.selectedIndex].realtor_account;
    this.props.navigation.navigate('Main');
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={{ fontFamily: 'SFProText-Bold', fontSize: RFPercentage(2.2), color: Colors.blackColor, textAlign: 'center' }}>
            SELECT YOUR PREFERRED AGENT
          </Text>
        </View>
        <View style={styles.guideContainer}>
          <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(2.2), color: Colors.blackColor, textAlign: 'center' }}>
            Welcome to Open™
          </Text>
          <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(2), color: Colors.blackColor, textAlign: 'center', marginTop: normalize(10, 'height') }}>
            To enhance your user's experience,
            {"\n"}please select your preferred agents
            {"\n"}from the list below.
          </Text>
        </View>
        <ScrollView style={{ marginTop: normalize(10, 'height') }}>
          {
            this.state.agentsData.map((each, index) => {
              return (
                <TouchableOpacity key={index} style={styles.eachContainer}
                  onPress={() => this.onClickAgent(index)}>
                  <AgentCard
                    agentName={each.realtor_full_name}
                    agentTitle={each.realtor_title}
                    agentCompany={each.realtor_company}
                    agentImg={{ uri: each.realtor_photo_url }}
                    isSelected={index == this.state.selectedIndex}
                  />
                </TouchableOpacity>
              )
            })
          }
        </ScrollView>
        <View style={{ width: '100%', height: normalize(10, 'height') }}></View>
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
  headerContainer: {
    width: '100%',
    height: '8%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.borderColor,
    borderBottomWidth: normalize(0.5, 'height'),
    marginTop: normalize(20, 'height'),
  },
  guideContainer: {
    width: '100%',
    height: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.borderColor,
    borderBottomWidth: normalize(0.5, 'height'),
  },
  eachContainer: {
    width: '95%',
    height: normalize(100, 'height'),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: normalize(5, 'height'),
    // borderColor: Colors.borderColor,
    // borderWidth: normalize(0.5, 'height'),        
  },
});