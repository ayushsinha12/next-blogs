import { auth, firestore } from '../lib/firebase';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

/**
 * Custom Hook: useUserData
 * 
 * Reads the Firebase authentication record and the corresponding user profile document in Firestore.
 * Subscribes to real-time updates for the user document.
 * 
 * @returns {Object} - Contains `user` (auth record) and `username` (from Firestore profile).
 */
export function useUserData() {
  const [user] = useAuthState(auth); // Tracks the authenticated user
  const [username, setUsername] = useState(null); // Stores the user's username

  useEffect(() => {
    // turn off realtime subscription
    let unsubscribe;

    if (user) {
      const ref = firestore.collection('users').doc(user.uid);
      unsubscribe = ref.onSnapshot((doc) => {
        setUsername(doc.data()?.username);
      });
    } else {
      setUsername(null);
    }

    // Cleanup subscription on component unmount or user change
    return unsubscribe;
  }, [user]);

  return { user, username };
}