import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token, username) => {},
  logout: () => {},
  username: "",
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState("");

  const userIsLoggedIn = !!token; // !! convents the truthy or falsey value to true or false boolean value

  const loginHandler = (token, username) => {
    setToken(token);
    setUsername(username);
  };

  const logoutHandler = () => {
    setToken(null);
    setUsername("");
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    username: username,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
