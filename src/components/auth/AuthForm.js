import { useState, useRef } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";

import classes from "./AuthForm.module.css";

let FIREBASE_AUTH_URL;

const AuthForm = (props) => {
  const emailInput = useRef();
  const passwordInput = useRef();
  const [isLogin, setIsLogin] = useState(true);

  const { onAuthentication, status, error } = props;

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInput.current.value;
    const enteredPassword = passwordInput.current.value;

    if (isLogin) {
      FIREBASE_AUTH_URL =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBIWpubKQujovRt_tuaGclXXzt84bZJiD8";
    } else {
      FIREBASE_AUTH_URL =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBIWpubKQujovRt_tuaGclXXzt84bZJiD8";
    }

    onAuthentication({
      url: FIREBASE_AUTH_URL,
      email: enteredEmail,
      password: enteredPassword,
    });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInput} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordInput} />
        </div>
        <div className={classes.actions}>
          {status !== "pending" && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {status === "pending" && <LoadingSpinner />}
          {status !== "pending" && status === "error" && (
            <p style={{ color: "orange" }}>{error}</p>
          )}
          {status !== "pending" && status === "completed" && !isLogin && (
            <p>The account has been created!</p>
          )}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
