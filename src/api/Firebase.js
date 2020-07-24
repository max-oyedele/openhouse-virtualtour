import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

import { GoogleSignin } from '@react-native-community/google-signin';
import appleAuth, {
  AppleAuthRequestScope,
  AppleAuthRequestOperation,
} from '@invertase/react-native-apple-authentication';

// export const firebaseInit = () => {  
//   firebase.initializeApp({
//     apiKey: "AIzaSyBrMHAsTeASvIYb6077oIlasIrT1N0J-Co",       // Auth / General Use
//     appId: "1:1006237194994:ios:e45673ac04425952450e6b",      // General Use
//     projectId: "open-6eecb",                               // General Use
//     // authDomain: "YOUR_APP.firebaseapp.com",               // Auth with popup/redirect
//     databaseURL: "https://open-6eecb.firebaseio.com",      // Realtime Database
//     storageBucket: "open-6eecb.appspot.com",               // Storage
//     messagingSenderId: "1006237194994"                        // Cloud Messaging
//   });
// }

export const appleSignin = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: AppleAuthRequestOperation.LOGIN,
        requestedScopes: [AppleAuthRequestScope.EMAIL, AppleAuthRequestScope.FULL_NAME],
      });

      if (!appleAuthRequestResponse.identityToken) {
        throw 'Apple Sign-In failed - no identify token returned';
      }

      const { identityToken, nonce } = appleAuthRequestResponse;
      const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);

      resolve(auth().signInWithCredential(appleCredential));
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

      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      resolve(auth().signInWithCredential(googleCredential));
    }
    catch (err) {
      reject(err);
    }
  })
}

export const signOut = () => {
  return new Promise(async (resolve, reject) => {
    await auth().currentUser.unlink('phone')
      .then(() => {
        //console.log('unlink');
      })
      .catch((err) => {
        //console.log('unlink error', err.code);
      })

    await auth().signOut()
      .then(() => {
        //console.log('signOut');
        resolve()
      })
  })
}

export const verifyPhoneNumber = (phoneNumber) => {
  return new Promise(async (resolve, reject) => {
    await auth()
      .verifyPhoneNumber(phoneNumber)
      .on('state_changed', (phoneAuthSnapshot) => {
        if (phoneAuthSnapshot.state === auth.PhoneAuthState.CODE_SENT) {
          resolve(phoneAuthSnapshot);
        }
      })
      .catch((err) => {
        reject(err.code);
      })
  })
}

export const linkWithCredential = (verificationId, verificationCode) => {
  return new Promise(async (resolve, reject) => {
    let cred = auth.PhoneAuthProvider.credential(verificationId, verificationCode)
    //console.log('phoneAuth cred', cred);
    if (cred) {
      await auth().currentUser.linkWithCredential(cred)
        .then((cred) => {
          resolve(cred);
        })
        .catch(err => {
          reject(err.code);
        })
    }
    else {
      reject('no credential');
    }
  })
}