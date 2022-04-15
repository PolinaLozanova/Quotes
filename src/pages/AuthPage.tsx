import AuthForm from "../components/auth/AuthForm";
import useHttp from "../hooks/hooks/use-http-redux";
import { fetchAuth } from "../lib/lib/api";
import { FETCH_AUTH } from "../store";

const AuthPage: React.FC = () => {
  const { sendRequest, status, error } = useHttp(fetchAuth, FETCH_AUTH);

  const authenticationHandler = (authData: {
    url: string;
    email: string;
    password: string;
  }) => {
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
