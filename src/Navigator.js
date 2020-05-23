import React from 'react';
import { View, Image, Text, TouchableOpacity, Dimensions } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator, BottomTabView } from '@react-navigation/bottom-tabs';
import normalize from "react-native-normalize";

import { Images } from '@constants';

import SplashScreen from "./screens/Splash";
import WelcomeScreen from "./screens/Welcome";
import DashboardScreen from "./screens/Dashboard";
import FavoritesScreen from "./screens/Favorites";

import LoginScreen from "./screens/auth/Login";
import SocialLoginScreen from "./screens/auth/SocialLogin";
import SignupScreen from "./screens/auth/Signup";
import FormScreen from "./screens/auth/Form";
import SMSScreen from "./screens/auth/SMS";
import ForgotPwdScreen from './screens/auth/ForgotPwd';

import PropertyScreen from './screens/property/Property';

import VideoPropertyScreen from './screens/property/VideoProperty';
import VideoPlayScreen from './screens/property/VideoPlay';

import OpenVirtualHomeScreen from './screens/openVirtual/OpenVirtualHome';
import RealtorProfileScreen from "./screens/openVirtual/RealtorProfile";
import SignatureScreen from "./screens/openVirtual/Signature";
import MyListingScreen from "./screens/openVirtual/MyListing";

import SearchByScreen from './screens/search/SearchBy';
import LocationScreen from './screens/search/Location';
import PropertyTypeScreen from './screens/search/PropertyType';
import ResultListScreen from './screens/search/ResultList';
import ResultMapScreen from './screens/search/ResultMap';

import ChangePwdScreen from "./screens/setting/ChangePwd";
import SettingScreen from "./screens/setting/Setting";
import PreferenceScreen from "./screens/setting/Preference";


const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName='SocialLogin' //Login originally
      headerMode='none'
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'tomato' }
      }}
    >
      {/* <Stack.Screen
        name='Login'
        component={LoginScreen}
        options={{
          title: 'Login'
        }}
      /> */}
      <Stack.Screen
        name='SocailLogin'
        component={SocialLoginScreen}
        options={{
          title: 'SocialLogin'
        }}
      />
      <Stack.Screen
        name='ForgotPwd'
        component={ForgotPwdScreen}
        options={{
          title: 'ForgotPwd'
        }}
      />
      <Stack.Screen
        name='Signup'
        component={SignupScreen}
        options={{
          title: 'Signup'
        }}
      />
      <Stack.Screen
        name='Form'
        component={FormScreen}
        options={{
          title: 'Form'
        }}
      />
      <Stack.Screen
        name='SMS'
        component={SMSScreen}
        options={{
          title: 'SMS'
        }}
      />
    </Stack.Navigator>
  )
}

function PropertyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Property"
      headerMode="none"
    >
      <Stack.Screen
        name="Property"
        component={PropertyScreen}
      />            
      <Stack.Screen
        name="VideoProperty"
        component={VideoPropertyScreen}
      />
      <Stack.Screen
        name="VideoPlay"
        component={VideoPlayScreen}
      />
    </Stack.Navigator>
  );
}

function SearchStack() {
  return (
    <Stack.Navigator
      initialRouteName="ResultList"
      headerMode="none"
    >
      <Stack.Screen
        name="ResultList"
        component={ResultListScreen}
      />
      <Stack.Screen
        name="ResultMap"
        component={ResultMapScreen}
      />
      <Stack.Screen
        name="Location"
        component={LocationScreen}
      />
      <Stack.Screen
        name="SearchBy"
        component={SearchByScreen}
      />
      <Stack.Screen
        name="PropertyType"
        component={PropertyTypeScreen}
      />
    </Stack.Navigator>
  );
}

function SettingStack() {
  return (
    <Stack.Navigator
      initialRouteName="Setting"
      headerMode="none"
    >
      <Stack.Screen
        name="Setting"
        component={SettingScreen}
      />
      <Stack.Screen
        name="ChangePwd"
        component={ChangePwdScreen}
      />
      <Stack.Screen
        name="MyListing"
        component={MyListingScreen}
      />
      <Stack.Screen
        name="Preference"
        component={PreferenceScreen}
      />
    </Stack.Navigator>
  );
}

function OpenVirtualStack() {
  return (
    <Stack.Navigator
      initialRouteName="OpenVirtualHome"
      headerMode="none"
    >
      <Stack.Screen
        name="OpenVirtualHome"
        component={OpenVirtualHomeScreen}
      />
      <Stack.Screen
        name="RealtorProfile"
        component={RealtorProfileScreen}
      />
      <Stack.Screen
        name="Signature"
        component={SignatureScreen}
      />
      <Stack.Screen
        name="MyListing"
        component={MyListingScreen}
      />
    </Stack.Navigator>
  );
}

function MainStack() {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      headerMode="none"
    >
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
      />
      <Stack.Screen
        name="PropertyStack"
        component={PropertyStack}
      />
      <Stack.Screen
        name="SearchStack"
        component={SearchStack}
      />
      <Stack.Screen
        name="Favorites"
        component={FavoritesScreen}
      />
      <Stack.Screen
        name="Setting"
        component={SettingStack}
      />

    </Stack.Navigator>
  );
}
////////////////////////////

function SearchTab() {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      headerMode="none"
    >
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
      />
      <Stack.Screen
        name="PropertyStack"
        component={PropertyStack}
      />
      <Stack.Screen
        name="SearchStack"
        component={SearchStack}
      />
    </Stack.Navigator>
  );
}

//////////////////////////////
const Tab = createBottomTabNavigator();
function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="SearchTab"
      tabBar={props => <TabBar {...props} />}
    >
      <Tab.Screen
        name="SearchTab"
        component={SearchTab}
        options={{
          tabBarLabel: "Search"
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarLabel: "Favorites"
        }}
      />
      <Tab.Screen
        name="Preference"
        component={PreferenceScreen}
        options={{
          tabBarLabel: "User"          
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingStack}
        options={{
          tabBarLabel: "Setting",          
        }}
      />
    </Tab.Navigator>
  );
}

function TabBar({ state, descriptors, navigation }) {  
  return (
    <View style={{
      backgroundColor: '#eeeeee',
      flexDirection: 'row',
      position: 'absolute',
      width: '95%',
      height: normalize(55, 'height'),
      bottom: normalize(20, 'height'),
      paddingTop: normalize(5, 'height'),
      alignSelf: 'center',
      justifyContent: 'space-around',
      alignItems: 'center',
      borderColor: '#cccccc',
      borderWidth: normalize(1),
      borderRadius: normalize(15),    
      opacity: 0.8      
    }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            testID={options.tabBarTestID}
            onPress={onPress}
          >
            <View>
              {
                route.name === 'SearchTab' ?
                  isFocused ?
                    (
                      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                          style={{ width: normalize(18), height: normalize(18, 'height'), marginBottom: normalize(5, 'height') }}
                          source={require("./assets/images/iconSearchTint.png")}
                          resizeMode="contain"
                        />
                        <Text style={{ fontFamily: 'SFProText-Semibold', color: '#00DEB7' }}>
                          {label}
                        </Text>
                      </View>
                    )
                    :
                    (
                      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                          style={{ width: normalize(18), height: normalize(18, 'height'), marginBottom: normalize(5, 'height') }}
                          source={require("./assets/images/iconSearch.png")}
                          resizeMode="contain"
                        />
                        <Text style={{ fontFamily: 'SFProText-Semibold', color: '#222' }}>
                          {label}
                        </Text>
                      </View>
                    )
                  :
                  route.name === 'Favorites' ?
                    isFocused ?
                      (
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                          <Image
                            style={{ width: normalize(18), height: normalize(18, 'height'), marginBottom: normalize(5, 'height') }}
                            source={require("./assets/images/iconBookmarkTint.png")}
                            resizeMode="contain"
                          />
                          <Text style={{ fontFamily: 'SFProText-Semibold', color: '#00DEB7' }}>
                            {label}
                          </Text>
                        </View>
                      )
                      :
                      (
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                          <Image
                            style={{ width: normalize(18), height: normalize(18, 'height'), marginBottom: normalize(5, 'height') }}
                            source={require("./assets/images/iconBookmark.png")}
                            resizeMode="contain"
                          />
                          <Text style={{ fontFamily: 'SFProText-Semibold', color: '#222' }}>
                            {label}
                          </Text>
                        </View>
                      )
                    :
                    route.name === 'Preference' ?
                      isFocused ?
                        (
                          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                              style={{ width: normalize(18), height: normalize(18, 'height'), marginBottom: normalize(5, 'height') }}
                              source={require("./assets/images/iconProfileTint.png")}
                              resizeMode="contain"
                            />
                            <Text style={{ fontFamily: 'SFProText-Semibold', color: '#00DEB7' }}>
                              {label}
                            </Text>
                          </View>
                        )
                        :
                        (
                          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                              style={{ width: normalize(18), height: normalize(18, 'height'), marginBottom: normalize(5, 'height') }}
                              source={require("./assets/images/iconProfile.png")}
                              resizeMode="contain"
                            />
                            <Text style={{ fontFamily: 'SFProText-Semibold', color: '#222' }}>
                              {label}
                            </Text>
                          </View>
                        )
                      :
                      isFocused ?
                        (
                          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                              style={{ width: normalize(18), height: normalize(18, 'height'), marginBottom: normalize(5, 'height') }}
                              source={require("./assets/images/iconSettingTint.png")}
                              resizeMode="contain"
                            />
                            <Text style={{ fontFamily: 'SFProText-Semibold', color: '#00DEB7' }}>
                              {label}
                            </Text>
                          </View>
                        )
                        :
                        (
                          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                              style={{ width: normalize(18), height: normalize(18, 'height'), marginBottom: normalize(5, 'height') }}
                              source={require("./assets/images/iconSetting.png")}
                              resizeMode="contain"
                            />
                            <Text style={{ fontFamily: 'SFProText-Semibold', color: '#222' }}>
                              {label}
                            </Text>
                          </View>
                        )
              }
            </View>
          </TouchableOpacity>
        )
      })}
    </View>
  );
}
////////////////////////////////////

function App() {
  return (
    <NavigationContainer
      //onStateChange={state => console.log('New state is', state)}
    >
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        {/* <Stack.Screen name="Main" component={MainTabs} /> */}
        <Stack.Screen name="Main" component={MainStack} />
        <Stack.Screen name="OpenVirtual" component={OpenVirtualStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


