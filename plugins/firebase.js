import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'

if (!firebase.apps.length) {
  const config = {
    apiKey: 'AIzaSyCaz5bgRphl_vfp_6gCAtMu8lMSN8ey-Qs',
    authDomain: 'tikkoun-sofrim.firebaseapp.com',
    databaseURL: 'https://tikkoun-sofrim.firebaseio.com',
    projectId: 'tikkoun-sofrim',
    storageBucket: 'tikkoun-sofrim.appspot.com',
    messagingSenderId: '124038584312'
  }

  firebase.initializeApp(config)
}

export const GoogleProvider = new firebase.auth.GoogleAuthProvider()
export const auth = firebase.auth()
export const DB = firebase.database()
export const StoreDB = firebase.firestore()
export const ServerTimestamp = firebase.firestore.FieldValue.serverTimestamp
export const Timestamp = firebase.firestore.Timestamp
export default firebase
