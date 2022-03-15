import React, { useState, useEffect } from 'react';
import useLocalStorage from "./hooks/useLocalStorage";
import Navigation from "./nav/Navigation";
import NavRoutes from "./nav/NavRoutes";
import AuthUser from "./api/AuthUser";
import UserContext from "./UserContext";
import LoadingMessage from "./common/LoadingMessage";
import jwt_decode from "jwt-decode";
import './App.css';


export const TOKEN_STORAGE_ID = "reguru-token";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [infoLoaded, setInfoLoaded] = useState(false);

  useEffect(function loadUserInfo() {
    console.debug("App useEffect loadUserInfo", "token=", token);

    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt_decode(token);
          // put the token on the Api class so it can use it to call the API.
          AuthUser.token = token;
          let currentUser = await AuthUser.getCurrentUser(username);
          setCurrentUser(currentUser.username);
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }

    // set infoLoaded to false while async getCurrentUser runs; once the
    // data is fetched (or even if an error happens!), this will be set back
    // to false
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);



  async function login(loginData) {
    try {
      let token = await AuthUser.login(loginData); 
      setToken(token.token)
      return { success: true }
    } catch (errors) {
      console.error("Login failed", errors)
      return { success: false, errors}
    }
  }

  async function register(signupData) {
    try {
      let token = await AuthUser.register(signupData);
      setToken(token.token);
      return { success: true, token };
    } catch(errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  //handle logout
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  if (!infoLoaded) return <LoadingMessage />;

  return (
    <UserContext.Provider
      value={{
        currentUser, setCurrentUser,
      }}>
        <div className="App vh-200 ">
          <Navigation logout={logout} />
          <NavRoutes login={login} register={register} />
        </div>
    </UserContext.Provider>
  );
}

export default App;
