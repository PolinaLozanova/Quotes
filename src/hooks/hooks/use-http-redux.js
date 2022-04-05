import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";

const useHttp = (requestFunction, origin) => {
  const httpState = useSelector((state) => state);
  const dispatch = useDispatch();

  const sendRequest = useCallback(
    async (requestData) => {
      dispatch({ type: "SEND", payload: { origin } });
      try {
        const responseData = await requestFunction(requestData);

        dispatch({ type: "SUCCESS", payload: { responseData, origin } });
      } catch (error) {
        dispatch({
          type: "ERROR",
          payload: {
            errorMessage: error.message || "Something went wrong!",
            origin,
          },
        });
      }
    },
    [requestFunction, dispatch, origin]
  );

  return {
    sendRequest,
    status: httpState[origin].status,
    data: httpState[origin].data,
    error: httpState[origin].error,
  };
};

export default useHttp;
