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

import SocialLoginScreen from "./screens/auth/SocialLogin";
import FormScreen from "./screens/auth/Form";
import SMSScreen from "./screens/auth/SMS";

import AgentScreen from "./screens/Agent";

import PropertyScreen from './screens/property/Property';

import OpenVirtualHomeScreen from './screens/openVirtual/OpenVirtualHome';
import RealtorProfileScreen from "./screens/openVirtual/RealtorProfile";
import SignatureScreen from "./screens/openVirtual/Signature";
import MyListingScreen from "./screens/openVirtual/MyListing";
import LiveCallScreen from './screens/openVirtual/LiveCall';

import SearchByScreen from './screens/search/SearchBy';
import PropertyTypeScreen from './screens/search/PropertyType';
import ResultListScreen from './screens/search/ResultList';
import ResultMapScreen from './screens/search/ResultMap';

import SettingScreen from "./screens/setting/Setting";
import PreferenceScreen from "./screens/setting/Preference";


const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName='SocialLogin' 
      headerMode='none'
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'tomato' }
      }}
    >      
      <Stack.Screen
        name='SocialLogin'
        component={SocialLoginScreen}
        options={{
          title: 'SocialLogin'
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
      <Stack.Screen
        name="LiveCall"
        component={LiveCallScreen}
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

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Agent" component={AgentScreen} />
        <Stack.Screen name="Main" component={MainStack} />
        <Stack.Screen name="OpenVirtual" component={OpenVirtualStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


