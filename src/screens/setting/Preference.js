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

import Overlay from 'react-native-modal-overlay';

import { Colors, Images, PreferencesData } from '@constants';
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

export default class PreferenceScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: false,
      selectedPreferenceIndex: 0,
      visibleModal: false,
      inputValue: ''
    }
  }

  componentDidMount() {

  }

  onClickQuestion = (index) => {
    this.setState({
      selectedPreferenceIndex: index,
      visibleModal: true
    })
  }

  updatePreference = (index) => {
    PreferencesData[this.state.selectedPreferenceIndex].answerIndex = index;
    this.setState({
      refresh: !this.state.refresh,
      visibleModal: false
    });

    let postData = {
      question: PreferencesData[this.state.selectedPreferenceIndex].question,
      answer: PreferencesData[this.state.selectedPreferenceIndex].options[index]
    }

    console.log(postData);
  }

  //////////////////////// format //////////////
  formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  getFormatValue = (value) => {
    value = value.replace(".", "");
    var partArr = value.split(",");
    var valueNoComma = '';
    partArr.forEach(each => {
      valueNoComma += each;
    })

    var realValue = valueNoComma.replace("$", "");
    if (realValue == '') return realValue;
    else return this.formatter.format(realValue).split(".")[0];
  }

  getRealValue = (value) => {
    var partArr = value.split(",");
    var valueNoComma = '';
    partArr.forEach(each => {
      valueNoComma += each;
    })

    var realValue = valueNoComma.replace("$", "");
    return realValue;
  }
  ///////////////////////////////////////////////

  render() {
    const isOptionOverFlow = PreferencesData[this.state.selectedPreferenceIndex].options.length > 8 ? true : false;
    return (
      <View style={styles.container}>
        <View style={{ width: '100%' }}>
          <Header title='MY PREFERENCE' titleColor={Colors.blackColor} onPressBack={() => this.props.navigation.goBack(null)} />
        </View>

        <View style={styles.guideContainer}>
          <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(1.8), color: Colors.blackColor, textAlign: 'center' }}>
            Tell us a bit about you what you are looking for? 
          </Text>
          <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(1.8), color: Colors.blackColor, textAlign: 'center', marginTop: normalize(7, 'height') }}>
            This will better help us match you to the perfect home
          </Text>
        </View>
        <ScrollView style={{ marginTop: normalize(10, 'height') }}>
          {
            PreferencesData.map((each, index) => {
              return (
                <TouchableOpacity key={index} style={styles.eachContainer} onPress={() => this.onClickQuestion(index)}>
                  <View style={styles.questionContainer}>
                    <Text style={{ fontFamily: 'SFProText-Semibold', fontSize: RFPercentage(2), color: Colors.blackColor }}>{each.question}</Text>
                  </View>
                  <View style={styles.subqueryContainer}>
                    <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(2), color: Colors.passiveTxtColor }}>{each.subquery}</Text>
                  </View>
                  <View style={styles.answerContainer}>
                    <Text style={{ fontFamily: 'SFProText-Bold', fontSize: RFPercentage(2), color: Colors.passiveTxtColor }}>Answer:</Text>
                    <Text style={{ fontFamily: 'SFProText-Regular', fontSize: RFPercentage(2), color: Colors.passiveTxtColor }}> {each.options[each.answerIndex]}</Text>
                  </View>
                </TouchableOpacity>
              )
            })
          }
        </ScrollView>


        <Overlay
          visible={this.state.visibleModal}
          // onClose={this.onClose}
          // closeOnTouchOutside
          containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          childrenWrapperStyle={styles.modal}
        >
          <View style={styles.modalHeader}>            
            <View style={{ width: '7%', height: '100%', justifyContent: 'center', alignItems: 'center' }}></View>
            <View style={{ width: '86%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
              {/* <Text style={{ fontFamily: 'SFProText-Semibold', fontSize: RFPercentage(2.2), color: Colors.whiteColor }}>ANSWER</Text> */}
              <Text style={{ fontFamily: 'SFProText-Semibold', fontSize: RFPercentage(2), color: Colors.whiteColor }}>
                {PreferencesData[this.state.selectedPreferenceIndex].question}
              </Text>
            </View>
            <TouchableOpacity
              style={{ width: '7%', height: '100%', justifyContent: 'center', alignItems: 'flex-end' }}
              onPress={() => this.setState({ visibleModal: false })}
            >
              <Image style={{ width: '50%', height: '50%' }} source={Images.iconWhiteClose} resizeMode='contain' />
            </TouchableOpacity>
          </View>

          <KeyboardAvoidingView style={styles.modalBodyBack} behavior={Platform.OS == "ios" ? "padding" : "height"}>
            <View style={styles.modalQuery}>
              <Text style={{ fontFamily: 'SFProText-Semibold', fontSize: RFPercentage(2.2), color: Colors.whiteColor }}>
                {PreferencesData[this.state.selectedPreferenceIndex].subquery}
              </Text>
            </View>
            <View style={styles.modalBody}>
              <ScrollView
                style={isOptionOverFlow ? { height: normalize(400, 'height') } : {}}
                scrollEnabled={isOptionOverFlow ? true : false}
                showsVerticalScrollIndicator={isOptionOverFlow ? true : false}
              >
                {
                  PreferencesData[this.state.selectedPreferenceIndex].answerType === 'radio' &&
                  PreferencesData[this.state.selectedPreferenceIndex].options.map((each, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.eachLine,
                          index == PreferencesData[this.state.selectedPreferenceIndex].options.length - 1 ||
                            (isOptionOverFlow && index == 7) ? { borderBottomWidth: 0 } : null,
                        ]}
                        onPress={() => this.updatePreference(index)}
                      >
                        <Text style={
                          index == PreferencesData[this.state.selectedPreferenceIndex].answerIndex ?
                            { color: Colors.blueButtonBackColor, fontFamily: 'SFProText-Semibold', fontSize: RFPercentage(2.2), textAlign: 'center' } :
                            { color: Colors.blackColor, fontFamily: 'SFProText-Regular', fontSize: RFPercentage(2.2), textAlign: 'center' }
                        }>
                          {each}
                        </Text>
                      </TouchableOpacity>
                    )
                  })
                }
                {
                  PreferencesData[this.state.selectedPreferenceIndex].answerType === 'input' &&
                  <View style={[styles.eachLine, { borderBottomWidth: 0 }]}>
                    <TextInput
                      style={{ width: '100%', height: '100%', paddingLeft: normalize(10), color: Colors.blackColor }}
                      //placeholder={PreferencesData[this.state.selectedPreferenceIndex].options[PreferencesData[this.state.selectedPreferenceIndex].answerIndex]}
                      value={PreferencesData[this.state.selectedPreferenceIndex].id == 9 ? this.getFormatValue(this.state.inputValue) : this.state.inputValue}
                      keyboardType={PreferencesData[this.state.selectedPreferenceIndex].id == 9 ? 'numeric' : 'default'}
                      onChangeText={(text) => this.setState({ inputValue: text })}
                    />
                  </View>
                }
              </ScrollView>
            </View>

            <View style={styles.modalBtnContainer}>
              {
                PreferencesData[this.state.selectedPreferenceIndex].answerType === 'radio' &&
                <Button btnTxt='Cancel' btnStyle={{ width: '100%', height: normalize(50, 'height'), color: 'blue' }}
                  onPress={() => {
                    this.setState({ visibleModal: false });
                  }}
                />
              }
              {PreferencesData[this.state.selectedPreferenceIndex].answerType === 'input' &&
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Button btnTxt='Cancel' btnStyle={{ width: width * 0.42, height: normalize(50, 'height'), color: 'blue' }}
                    onPress={() => {
                      this.setState({
                        inputValue: '',
                        visibleModal: false
                      })
                    }}
                  />

                  <Button btnTxt='OK' btnStyle={{ width: width * 0.42, height: normalize(50, 'height'), color: 'blue' }}
                    onPress={() => {
                      if (this.state.inputValue != '') {
                        PreferencesData[this.state.selectedPreferenceIndex].options[1] = this.state.inputValue;                        
                        this.updatePreference(1);
                      }
                      this.setState({
                        inputValue: '',
                        visibleModal: false
                      });
                    }}
                  />
                </View>
              }
            </View>

          </KeyboardAvoidingView>
        </Overlay>

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
  guideContainer: {
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.borderColor,
    borderTopWidth: normalize(0.5, 'height'),
    borderBottomWidth: normalize(0.5, 'height'),
    marginTop: normalize(20, 'height'),    
  },
  eachContainer: {
    width: '95%',
    height: normalize(120, 'height'),
    justifyContent: 'center',
    alignSelf: 'center',
    borderColor: Colors.borderColor,
    borderWidth: normalize(0.5, 'height'),
    marginBottom: normalize(10, 'height'),
    borderWidth: 2
  },
  questionContainer: {
    width: '90%',
    height: '27%',
    justifyContent: 'center',
    alignSelf: 'center',
    //borderWidth: 1
  },
  subqueryContainer: {
    width: '90%',
    height: '27%',
    flex: 0.8,
    justifyContent: 'center',
    alignSelf: 'center',
    //borderWidth: 1
  },
  answerContainer: {
    width: '90%',
    height: '27%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    //borderWidth: 1
  },

  modal: {
    backgroundColor: '#323643',
    width: width,
    height: height,
    justifyContent: 'center',
    alignSelf: 'center',
    opacity: 0.5
  },
  modalHeader: {
    width: '100%',
    height: normalize(30, 'height'),
    flexDirection: 'row',
    marginTop: normalize(30, 'height'),
    alignSelf: 'center',
    //borderWidth: 1
  },
  modalQuery: {
    width: '100%',
    height: normalize(60, 'height'),
    justifyContent: 'center',
    //alignItems: 'center',
    alignSelf: 'center',
    marginBottom: normalize(10, 'height'),
    //borderWidth: 1
  },
  modalBodyBack: {
    width: '100%',
    height: '90%',
    justifyContent: 'center',
    alignSelf: 'center',
    //borderWidth: 1
  },
  modalBody: {
    backgroundColor: '#eeeeee',
    width: '100%',
    //height: '50%',
    borderRadius: 10,
    opacity: 0.7
    // borderColor: '#fff',
    // borderWidth: 1
  },
  eachLine: {
    width: '100%',
    height: normalize(50, 'height'),
    borderColor: Colors.borderColor,
    borderBottomWidth: normalize(0.5, 'height'),
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalBtnContainer: {
    width: '100%',
    height: normalize(60, 'height'),
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: normalize(20, 'height'),
    //borderWidth: 1
  },
});