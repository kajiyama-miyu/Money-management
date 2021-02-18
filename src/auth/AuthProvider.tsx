import React, { createContext, useEffect, useState } from "react";
import firebase from "../firebase";

type AuthContextProps = {
  currentUser: firebase.User | null | undefined;
  login: () => void;
  logout: () => void;
  uid: string | null;
};

export const AuthContext = createContext<AuthContextProps>({
  currentUser: undefined,
  login: () => {},
  logout: () => {},
  uid: "",
});

export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const [uid, setUid] = useState<string | null>(null);

  const login = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  };

  const logout = () => {
    firebase.auth().signOut();
  };

  useEffect(
    () =>
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setCurrentUser(user);
          setUid(user.uid);
        } else {
          setCurrentUser(null);
          setUid(null);
        }
      }),
    []
  );

  return (
    <AuthContext.Provider
      value={{
        login: login,
        logout: logout,
        currentUser,
        uid,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
