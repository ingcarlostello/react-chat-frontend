// @React
import React, { useCallback, useContext, useState } from "react";
import { createContext } from "react";

// @Context
import { ChatContext } from "../context/chat/ChatContext";

// @Helpers
import { fetchConToken, fetchSinToken } from "../helpers/fetch";

// @Types
import { types } from "../types/types";

export const AuthContext = createContext();

const initialState = {
  uid: null,
  checking: true,
  logged: false,
  name: null,
  email: null,
};

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialState);
  const { dispatch } = useContext(ChatContext);

  const login = async (email, password) => {
    const resp = await fetchSinToken("login", { email, password }, "POST");
    console.log(resp);
    // validate if we have a successfully login
    if (resp.ok) {
      localStorage.setItem("token", resp.token);
      const { user } = resp;
      setAuth({
        uid: user.uid,
        checking: false,
        logged: true,
        name: user.name,
        email: user.email,
      });
    }
    return resp.ok;
  };

  const register = async (name, email, password) => {
    const resp = await fetchSinToken(
      "login/new",
      { name, email, password },
      "POST"
    );
   
    // validate if we have a successfully login
    if (resp.ok) {
      localStorage.setItem("token", resp.token);
      const { userChat } = resp;
      setAuth({
        uid: userChat.uid,
        checking: false,
        logged: true,
        name: userChat.name,
        email: userChat.email,
      });
    }
    return resp.ok;
  };

  const verifyToken = useCallback(async () => {
    const token = localStorage.getItem("token");

    // if token does no exist
    if (!token) {
      setAuth({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        email: null,
      });
      return false;
    }

    // if token exist
    const resp = await fetchConToken("login/renew"); // is a GET method
    if (resp.ok) {
      localStorage.setItem("token", resp.token);
      const { user } = resp;
      setAuth({
        uid: user.uid,
        checking: false,
        logged: true,
        name: user.name,
        email: user.email,
      });
      console.log("Successfully authenticated ");
      return true;
    } else {
      setAuth({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        email: null,
      });
      return false;
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    dispatch({
      type: types.cleanChat,
    });
    setAuth({
      // uid: null,
      checking: false,
      logged: false,
      // name: null,
      // email: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        login,
        logout,
        register,
        verifyToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
