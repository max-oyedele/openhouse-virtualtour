/**
 * @format
 */

import {AppRegistry, Alert} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage.data));
});

AppRegistry.registerComponent(appName, () => App);
