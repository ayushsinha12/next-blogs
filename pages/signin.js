import { UserContext } from '../lib/context';
import { useEffect, useState, useCallback, useContext } from 'react';
import debounce from 'lodash.debounce';
import { auth, firestore, googleAuthProvider } from '../lib/firebase';

/**
 * Enter Page Component
 * 
 * Displays different UI based on user authentication and username state:
 * 1. SignInButton if the user is signed out.
 * 2. UsernameForm if the user is signed in but missing a username.
 * 3. SignOutButton if the user is signed in and has a username.
 */
export default function Enter(props) {
    const { user, username } = useContext(UserContext)
  return (
    <main>
      {user ? 
        !username ? <UsernameForm /> : <SignOutButton /> 
        : 
        <SignInButton />
      }
    </main>
  );
}

/**
 * SignInButton Component
 * 
 * Provides a button for users to sign in with Google.
 */
function SignInButton() {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };

  return (
    <button className="btn-google" onClick={signInWithGoogle}>
      <img src={'/google-logo.png'} /> Sign in with Google
    </button>
  );
}

/**
 * SignOutButton Component
 * 
 * Provides a button for users to sign out.
 */
function SignOutButton() {
  return <button onClick={() => auth.signOut()}>Sign Out</button>;
}

/**
 * UsernameForm Component
 * 
 * Allows users to set their username and validates it against Firestore.
 */
function UsernameForm() {
    const [formValue, setFormValue] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [loading, setLoading] = useState(false);
  
    const { user, username } = useContext(UserContext);
  
    // Submit the username to Firestore
    const onSubmit = async (e) => {
      e.preventDefault();
  
      // Create refs for both documents
      const userDoc = firestore.doc(`users/${user.uid}`);
      const usernameDoc = firestore.doc(`usernames/${formValue}`);
  
      // Commit both docs together as a batch write.
      const batch = firestore.batch();
      batch.set(userDoc, { username: formValue, photoURL: user.photoURL, displayName: user.displayName });
      batch.set(usernameDoc, { uid: user.uid });
  
      await batch.commit();
    };
    // Validate the username as it is typed
    const onChange = (e) => {
      // Force form value typed in form to match correct format
      const val = e.target.value.toLowerCase();
      const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
  
      if (val.length < 3) {
        setFormValue(val);
        setLoading(false);
        setIsValid(false);
      }
  
      if (re.test(val)) {
        setFormValue(val);
        setLoading(true);
        setIsValid(false);
      }
    };
  
    //
  
    useEffect(() => {
      checkUsername(formValue);
    }, [formValue]);
  
    // Hit the database for username match after each debounced change
    // useCallback is required for debounce to work
    const checkUsername = useCallback(
      debounce(async (username) => {
        if (username.length >= 3) {
          const ref = firestore.doc(`usernames/${username}`);
          const { exists } = await ref.get();
          console.log('Firestore read executed!');
          setIsValid(!exists);
          setLoading(false);
        }
      }, 500),
      []
    );
  
    return (
      !username && (
        <section>
          <h3>Choose Username</h3>
          <form onSubmit={onSubmit}>
            <input name="username" placeholder="myname" value={formValue} onChange={onChange} />
            <UsernameMessage username={formValue} isValid={isValid} loading={loading} />
            <button type="submit" className="btn-green" disabled={!isValid}>
              Choose
            </button>
  
            <h3>Debug State</h3>
            <div>
              Username: {formValue}
              <br />
              Loading: {loading.toString()}
              <br />
              Username Valid: {isValid.toString()}
            </div>
          </form>
        </section>
      )
    );
  }
  
  function UsernameMessage({ username, isValid, loading }) {
    if (loading) {
      return <p>Checking...</p>;
    } else if (isValid) {
      return <p className="text-success">{username} is available!</p>;
    } else if (username && !isValid) {
      return <p className="text-danger">That username is taken!</p>;
    } else {
      return <p></p>;
    }
  }