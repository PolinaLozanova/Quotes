import { useSelector, useDispatch } from "react-redux";
import { useCallback, useContext } from "react";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";
import { RootState } from "../../store";

const useHttp = (requestFunction: (data: any) => Promise<any>, origin: any) => {
  const httpState = useSelector((state: RootState[]) => state);
  const dispatch = useDispatch();

  const history = useHistory();
  const authContext = useContext(AuthContext);

  const sendRequest = useCallback(
    async (requestData: any) => {
      dispatch({ type: "SEND", payload: { origin } });
      try {
        const responseData = await requestFunction(requestData);
        if (responseData.idToken) {
          authContext.login(responseData.idToken, responseData.email);
          history.replace("/");
        }
        dispatch({ type: "SUCCESS", payload: { responseData, origin } });
      } catch (error: any) {
        dispatch({
          type: "ERROR",
          payload: {
            errorMessage: error.message || "Something went wrong!",
            origin,
          },
        });
      }
    },
    [requestFunction, dispatch, origin, authContext, history]
  );

  return {
    sendRequest,
    status: httpState[origin].status,
    data: httpState[origin].data,
    error: httpState[origin].error,
  };
};

export default useHttp;
