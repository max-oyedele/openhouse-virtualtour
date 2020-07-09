/**
 * @format
 */
import React from 'react';
import { AppRegistry, Platform } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

import messaging from '@react-native-firebase/messaging';
var PushNotification = require('react-native-push-notification');
import PushNotificationIOS from '@react-native-community/push-notification-ios';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  if (Platform.OS === 'android') {
    PushNotification.localNotifications({
      title: remoteMessage.data.title,
      message: remoteMessage.data.body,
      actions: '["Yes", "No"]',
      invokeApp: true,
    });
  }
  else {
    PushNotificationIOS.presentLocalNotification({
      alertTitle: remoteMessage.data.title,
      alertBody: remoteMessage.data.body
    });
  }
});

// AppRegistry.registerComponent(appName, () => App);

function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  return <App />;
}
AppRegistry.registerComponent(appName, () => HeadlessCheck);