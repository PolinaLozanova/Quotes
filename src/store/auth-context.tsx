import React, { useState } from "react";

const AuthContext = React.createContext({
  token: null,
  isLoggedIn: false,
  login: (token: any, username: string) => {},
  logout: () => {},
  username: "",
});

type Props = {
  children: React.ReactNode;
};

export const AuthContextProvider: React.FC<Props> = (props) => {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState("");

  const userIsLoggedIn = !!token; // !! convents the truthy or falsey value to true or false boolean value

  const loginHandler = (token: any, username: string) => {
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
