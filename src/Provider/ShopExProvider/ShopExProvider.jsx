import { useEffect, useState } from "react";
import { createContext } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import app from "../../Util/Firebase/Firebase.config";
export const ExContext = createContext();
const ShopExProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);

  //create user will email and password
  const emailPassCreation = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //login user with email and password
  const emailPassLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  //log out user
  const logOutUser = () => {
    return signOut(auth)
      .then()
      .catch(err => console.log(err));
  };
  //observe user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      return unsubscribe;
    };
  }, [auth]);
  const data = {
    name: "Md. Abir mahmud",
    user,
    setUser,
    emailPassLogin,
    emailPassCreation,
    loading,
    logOutUser,
  };
  return <ExContext.Provider value={data}>{children}</ExContext.Provider>;
};

export default ShopExProvider;
