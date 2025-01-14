import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

// Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyBmz8DkMQ2cxbECd4htoOE_2LE1lpEbJsw",
    authDomain: "nextfire-d673b.firebaseapp.com",
    projectId: "nextfire-d673b",
    storageBucket: "nextfire-d673b.firebasestorage.app",
    messagingSenderId: "983204476168",
    appId: "1:983204476168:web:99be6537302cd75d0da8bd",
    measurementId: "G-E7KPR8Z6ZT"
};

// Initialize Firebase if not already initialized
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

// Firebase services and utilities
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;
export const increment = firebase.firestore.FieldValue.increment;


export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
export async function getUserWithUsername(username) {
    const usersRef = firestore.collection('users');
    const query = usersRef.where('username', '==', username).limit(1);
    const userDoc = (await query.get()).docs[0];
    return userDoc;
  }
  
  /**`
   * Converts a firestore document to JSON
   * @param  {DocumentSnapshot} doc
   */
  export function postToJSON(doc) {
    const data = doc.data();
    return {
      ...data,
      //Since firestore timestamp is not serializable to JSON, it must be converted to milliseconds
      createdAt: data.createdAt.toMillis(),
      updatedAt: data.updatedAt.toMillis(),
    };
  }

