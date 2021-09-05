import * as React from 'react';
import { Auth, User } from 'firebase/auth';

type FirebaseContext = {
  auth?: Auth;
  user: User | null;
  signInGoogle?: () => Promise<never>;
  signOutGoogle?: () => Promise<void>;
};

export const FirebaseContext = React.createContext<FirebaseContext>(null);

const Enhancer: React.FC = ({ children }) => {
  const [firebase, setFirebase] = React.useState<FirebaseContext>(null);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const appModule = import('firebase/app');
      const authModule = import('firebase/auth');

      Promise.all([appModule, authModule]).then((values) => {
        const { initializeApp } = values[0];
        const {
          getAuth,
          onAuthStateChanged,
          signInWithRedirect,
          signOut,
          GoogleAuthProvider,
        } = values[1];
        const app = initializeApp({
          apiKey: process.env.GATSBY_FIREBASE_API_KEY,
          authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
          databaseURL: process.env.GATSBY_FIREBASE_DATABASE_URL,
          projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
          storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
          appId: process.env.GATSBY_FIREBASE_APP_ID,
        });
        const provider = new GoogleAuthProvider();
        const auth = getAuth(app);
        const signInGoogle = () => signInWithRedirect(auth, provider);
        const signOutGoogle = () => signOut(auth);

        onAuthStateChanged(auth, (user) => {
          if (user) {
            setFirebase((prevState) => ({
              ...prevState,
              user,
            }));
          } else {
            setFirebase((prevState) => ({
              ...prevState,
              user: null,
            }));
          }
        });

        setFirebase((prevState) => ({
          ...prevState,
          auth,
          signInGoogle,
          signOutGoogle,
        }));
      });
    }
  }, []);

  return (
    <FirebaseContext.Provider value={firebase}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default Enhancer;
