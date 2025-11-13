// import React, { useEffect, useState } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
// import { auth } from '../firebase/firebase.config';

// const googleProvider = new GoogleAuthProvider();

// const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);


//     const createUser = (email, password) => {
//         setLoading(true);
//         createUserWithEmailAndPassword(auth, email, password);
//     }
//     const signInUser = (email, password) => {
//         setLoading(true);
//         signInWithEmailAndPassword(auth, email, password);
//     }

//     const signInWithGoogle = () => {
//         setLoading(true);
//         signInWithPopup(auth, googleProvider);
//     }

//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//             setUser(currentUser);
//             setLoading(false);
//         })

//         return () => {
//             unsubscribe()
//         }
//     }, [])

//     const authInfo = {
//         createUser,
//         signInUser,
//         signInWithGoogle,
//         user,
//         loading,

//     }
//     return (
//         <AuthContext value={authInfo}>
//             {children}
//         </AuthContext>
//     );
// };

// export default AuthProvider;
import React, { useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .finally(() => setLoading(false));
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .finally(() => setLoading(false));
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const googleUser = result.user;

      const providerPhoto =
        googleUser?.photoURL || googleUser?.providerData?.[0]?.photoURL || null;
      const providerName =
        googleUser?.displayName ||
        googleUser?.providerData?.[0]?.displayName ||
        null;

      if (auth.currentUser && (providerPhoto || providerName)) {
        await updateProfile(auth.currentUser, {
          displayName: providerName || auth.currentUser.displayName,
          photoURL: providerPhoto || auth.currentUser.photoURL,
        });
        if (typeof auth.currentUser.reload === "function") {
          await auth.currentUser.reload();
        }
      }

      setUser(auth.currentUser || googleUser);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (updatedData) => {
    if (!auth.currentUser) return Promise.reject(new Error("No current user"));
    setLoading(true);
    try {
      await updateProfile(auth.currentUser, updatedData);
      if (typeof auth.currentUser.reload === "function") {
        await auth.currentUser.reload();
      }
      setUser({ ...auth.currentUser });
      return auth.currentUser;
    } finally {
      setLoading(false);
    }
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth)
      .then(() => setUser(null))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const authInfo = {
    user,
    loading,
    setLoading,
    createUser,
    signInUser,
    signInWithGoogle,
    updateUser,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
