import { useEffect, useState } from "react";
import { createContext } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import app from "../../Util/Firebase/Firebase.config";
export const ExProvider = createContext();
const ShopExProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);
  const emailPassCreation = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const emailPassLogin = (auth, email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

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
  };
  return <ExProvider.Provider value={data}>{children}</ExProvider.Provider>;
};

export default ShopExProvider;
