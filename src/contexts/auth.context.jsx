import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/config";

//firts is to create context
const AuthContext = createContext();
const AuthWrapper = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const nav = useNavigate();
  const authenticateUser = async () => {
    //first get the token
    const theToken = localStorage.getItem("authToken");
    if (theToken) {
      try {
        const responseToVerify = await axios.get(`${API_URL}/auth/verify`, {
          headers: { authorization: `Bearer ${theToken}` },
        });
        console.log("token is valid", responseToVerify);
        setUser(responseToVerify.data.currentUser);
        setIsLoading(false);
        setIsLoggedIn(true);
      } catch (error) {
        console.log("error validating thetoken", error);
        setIsLoading(false);
        setIsLoggedIn(false);
        console.log(error);
      }
    } else {
      setUser(null);
      setIsLoading(false);
      setIsLoggedIn(false);
      console.log("no token present");
    }
  };
  function handleLogout() {
    console.log("logging out");
    localStorage.removeItem("authToken");
    setUser(null);
    nav("/login");
  }
  //on every refresh, validate the token in the local storage
  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        isLoggedIn,
        authenticateUser,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthWrapper };
