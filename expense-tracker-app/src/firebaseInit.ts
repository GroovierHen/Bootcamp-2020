import firebase from "firebase/app";
import "firebase/messaging";
import "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
export const tokenIdsRef = firebase.database().ref("tokenIds");

export const requestFirebaseNotificationPermission = (): Promise<string> =>
  new Promise(async (resolve, reject) => {
    try {
      await Notification.requestPermission();
      const firebaseToken = await messaging.getToken();
      resolve(firebaseToken);
    } catch (error) {
      reject(error);
    }
  });

export const onMessageListener = (): Promise<any> =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });
