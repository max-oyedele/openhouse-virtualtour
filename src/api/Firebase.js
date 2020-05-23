import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';

import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { NativeModules } from 'react-native';
const { RNTwitterSignIn } = NativeModules;
import { GoogleSignin } from '@react-native-community/google-signin';
import appleAuth, {
  AppleAuthRequestScope,
  AppleAuthRequestOperation,
} from '@invertase/react-native-apple-authentication';

// firebase.initializeApp({
//   apiKey: "AIzaSyBrMHAsTeASvIYb6077oIlasIrT1N0J-Co",       // Auth / General Use
//   appId: "1:1006237194994:ios:e45673ac04425952450e6b",      // General Use
//   projectId: "open-6eecb",                               // General Use
//   // authDomain: "YOUR_APP.firebaseapp.com",               // Auth with popup/redirect
//   databaseURL: "https://open-6eecb.firebaseio.com",      // Realtime Database
//   storageBucket: "open-6eecb.appspot.com",               // Storage
//   messagingSenderId: "1006237194994"                        // Cloud Messaging
// });

export const appleSignin = () => {
  return new Promise(async (resolve, reject) => {
    try {
      // Start the sign-in request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: AppleAuthRequestOperation.LOGIN,
        requestedScopes: [AppleAuthRequestScope.EMAIL, AppleAuthRequestScope.FULL_NAME],
      });
      
      // Ensure Apple returned a user identityToken
      if (!appleAuthRequestResponse.identityToken) {
        throw 'Apple Sign-In failed - no identify token returned';
      }

      // Create a Firebase credential from the response
      const { identityToken, nonce } = appleAuthRequestResponse;
      const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);

      // Sign the user in with the credential
      resolve(auth().signInWithCredential(appleCredential));
    }
    catch (err) {
      reject(err);
    }
  })
}

export const fbSignin = () => {
  return new Promise(async (resolve, reject) => {
    try {
      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }

      // Once signed in, get the users AccesToken
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw 'Something went wrong obtaining access token';
      }

      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

      // Sign-in the user with the credential
      resolve(auth().signInWithCredential(facebookCredential));
    }
    catch (err) {
      reject(err);
    }
  })
}



export const googleSignin = () => {
  return new Promise(async (resolve, reject) => {
    try {
      GoogleSignin.configure({
        webClientId: '1006237194994-6l0vqo9al9d1jhjbonh6hsgbsnv0f9pn.apps.googleusercontent.com',
        offlineAccess: false
      })

      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();

      // // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // // Sign-in the user with the credential
      resolve(auth().signInWithCredential(googleCredential));
    }
    catch (err) {
      reject(err);
    }
  })
}

const Constants = {
  TWITTER_CONSUMER_KEY: 'ZcFxAmxQ6iEwQ2oLDyTu4It9X',
  TWITTER_CONSUMER_SECRET: '8NU3xjFexNrahOwP4kqXXvLu63DxoIdxqQOFydjOXW5MSGQ2XT',
};
RNTwitterSignIn.init(Constants.TWITTER_CONSUMER_KEY, Constants.TWITTER_CONSUMER_SECRET);
export const twitterSignin = () => {
  return new Promise(async (resolve, reject) => {
    try {
      // Perform the login request
      const { authToken, authTokenSecret } = await RNTwitterSignIn.logIn();

      // Create a Twitter credential with the tokens
      const twitterCredential = auth.TwitterAuthProvider.credential(authToken, authTokenSecret);

      // Sign-in the user with the credential
      resolve(auth().signInWithCredential(twitterCredential));
    }
    catch (err) {
      reject(err);
    }
  })

}

export const signInWithPhoneNumber = (phoneNumber) => {
  return new Promise(async (resolve, reject)=>{
    try{
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);      
      resolve(confirmation);
    }
    catch (err){
      reject(err);
    }
  })
}
