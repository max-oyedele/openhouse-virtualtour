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
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  ImageBackground
} from "react-native";
import normalize from 'react-native-normalize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import { activateKeepAwake, deactivateKeepAwake } from "@sayem314/react-native-keep-awake";
import {
  TwilioVideoLocalView,
  TwilioVideoParticipantView,
  TwilioVideo
} from "react-native-twilio-video-webrtc";

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
import { Colors, Images, LoginInfo, RouteParam } from '@constants';

export default class LiveCallScreen extends Component {
  state = {
    isAudioEnabled: true,
    status: "disconnected",
    participants: new Map(),
    videoTracks: new Map(),
    roomName: "",
    token: ""
  };

  componentDidMount() {
    activateKeepAwake();
    this._onConnectButtonPress();
  }

  componentWillUnmount() {
    deactivateKeepAwake();
  }

  _onConnectButtonPress = () => {
    try {
      this.twilioRef.connect({
        roomName: RouteParam.liveInfo.roomname,
        accessToken: RouteParam.liveInfo.token
      });
    } catch (error) {
      //console.log('live connect error', error);
    }
    this.setState({ status: "connecting" });

    var alertTitle = 'Contacting Host';
    var alertBody = 'Welcome to ' + RouteParam.propertyAddress + ' Live Stream Open House. \n Please wait while we contact the host.';
    Alert.alert(alertTitle, alertBody);
  };

  _onEndButtonPress = () => {
    this.twilioRef.disconnect();
    this.props.navigation.navigate('Property');
  };

  _onMuteButtonPress = () => {
    this.twilioRef
      .setLocalAudioEnabled(!this.state.isAudioEnabled)
      .then(isEnabled => this.setState({ isAudioEnabled: isEnabled }));
  };

  _onFlipButtonPress = () => {
    this.twilioRef.flipCamera();
  };

  _onRoomDidConnect = () => {
    //console.log("LiveCall :: connected")
    this.setState({ status: "connected" });
  };

  _onRoomDidDisconnect = ({ roomName, error }) => {
    //console.log("_onRoomDidDisconnect: ", error);
    this.setState({ status: "disconnected" });
  };

  _onRoomDidFailToConnect = error => {
    //console.log("_onRoomDidFailToConnect: ", error);
    this.setState({ status: "disconnected" });
  };

  _onParticipantAddedVideoTrack = ({ participant, track }) => {
    //console.log("onParticipantAddedVideoTrack: ", participant, track);

    this.setState({
      videoTracks: new Map([
        ...this.state.videoTracks,
        [
          track.trackSid,
          { participantSid: participant.sid, videoTrackSid: track.trackSid }
        ]
      ])
    });
  };

  _onParticipantRemovedVideoTrack = ({ participant, track }) => {
    //console.log("onParticipantRemovedVideoTrack: ", participant, track);

    const videoTracks = this.state.videoTracks;
    videoTracks.delete(track.trackSid);

    this.setState({ videoTracks: new Map([...videoTracks]) });
  };

  setTwilioRef = ref => {
    this.twilioRef = ref;
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground style={styles.container} source={{ uri: RouteParam.openHouseIntro.page_background_photo }}>
          <View style={{ width: '100%' }}>
            {/* <Header title={RouteParam.openHouseIntro.property_mlsnumber} titleColor={Colors.whiteColor} onPressBack={() => this.props.navigation.navigate('Property')} /> */}
          </View>
          {this.state.status === "connected" && (
            <View style={styles.remoteGrid}>
              {Array.from(
                this.state.videoTracks,
                ([trackSid, trackIdentifier]) => {
                  return (
                    <TwilioVideoParticipantView
                      style={styles.remoteVideo}
                      key={trackSid}
                      trackIdentifier={trackIdentifier}
                    />
                  );
                }
              )}
            </View>
          )}
          <View style={styles.smallVideoContainer}>
            <TwilioVideoLocalView enabled={true} style={styles.localVideo} />
          </View>
          <View style={styles.btnsContainer}>
            <TouchableOpacity onPress={() => {
              this._onMuteButtonPress();
            }}>
              <Image style={styles.btnImg} source={this.state.isAudioEnabled ? Images.btnMute : Images.btnUnmute} resizeMode='cover' />
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => this._onFlipButtonPress()}>
              <Image style={styles.btnImg} source={Images.btnFlipCam} resizeMode='cover' />
            </TouchableOpacity> */}
            <TouchableOpacity onPress={() => this._onEndButtonPress()}>
              <Image style={styles.btnImg} source={Images.btnCallOff} resizeMode='cover' />
            </TouchableOpacity>
          </View>
        </ImageBackground>

        <TwilioVideo
          ref={this.setTwilioRef}
          onRoomDidConnect={this._onRoomDidConnect}
          onRoomDidDisconnect={this._onRoomDidDisconnect}
          onRoomDidFailToConnect={this._onRoomDidFailToConnect}
          onParticipantAddedVideoTrack={this._onParticipantAddedVideoTrack}
          onParticipantRemovedVideoTrack={this._onParticipantRemovedVideoTrack}
        />
      </View>
    );
  }
};

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
  remoteGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  remoteVideo: {
    width: '100%',
    height: '100%'
  },
  smallVideoContainer: {
    position: 'absolute',
    top: normalize(40, 'height'),
    width: '100%',
    height: normalize(100),
    flexDirection: 'row',
  },
  localVideo: {
    width: normalize(100),
    height: normalize(100),
    marginLeft: normalize(18),
    borderRadius: normalize(5),
    // borderWidth: normalize(2),
    // borderColor: '#4e4e4e'
  },
  btnsContainer: {
    position: 'absolute',
    bottom: normalize(15, 'height'),
    width: '75%',
    height: '17%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    //borderWidth: 2
  },
  btnImg: {
    width: normalize(60),
    height: normalize(60),
  },
});

