import AuthForm from "../components/auth/AuthForm";
import useHttp from "../hooks/hooks/use-http-redux";
import { fetchAuth } from "../lib/lib/api";
import { FETCH_AUTH } from "../store";

const AuthPage = () => {
  const { sendRequest, status, error } = useHttp(fetchAuth, FETCH_AUTH);

  const authenticationHandler = (authData) => {
    sendRequest(authData);
  };

  return (
    <AuthForm
      onAuthentication={authenticationHandler}
      status={status}
      error={error}
    />
  );
};

export default AuthPage;
