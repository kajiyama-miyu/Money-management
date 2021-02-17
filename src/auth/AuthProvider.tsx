import React, { ContextType, createContext, useEffect, useState } from "react";
import firebase from "firebase/app";

type AuthContextProps = {
  currentUser: firebase.User | null | undefined;
  login: () => void;
};

export const AuthContext = createContext<AuthContextProps>({
  currentUser: undefined,
  login: () => {},
});

const SignIn: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);

  const login = async () => {
    const privider = new firebase.auth.GithubAuthProvider();
    try {
      await firebase.auth().signInWithPopup(privider);
      history.pushState(null, "", "/");
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => setCurrentUser(user));
  }, []);

  return (
    <AuthContext.Provider value={{ login: login, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default SignIn;
