import { createStore } from "@reduxjs/toolkit";

export const FETCH_ALL = "fetchAll";
export const NEW_QUOTE = "newQuote";
export const QUOTE_DETAILS = "quoteDetails";
export const GET_ALL_COMMENTS = "getAllComments";
export const ADD_COMMENT = "addComment";

const initialState = {
  [FETCH_ALL]: {
    data: null,
    error: null,
    status: null,
  },
  [NEW_QUOTE]: {
    data: null,
    error: null,
    status: null,
  },
  [QUOTE_DETAILS]: {
    data: null,
    error: null,
    status: null,
  },
  [GET_ALL_COMMENTS]: {
    data: null,
    error: null,
    status: null,
  },
  [ADD_COMMENT]: {
    data: null,
    error: null,
    status: null,
  },
};

const httpReducer = (state = initialState, action) => {
  if (action.type === "SEND") {
    return {
      ...state,
      [action.payload.origin]: {
        data: null,
        error: null,
        status: "pending",
      },
    };
  }
  if (action.type === "SUCCESS") {
    return {
      ...state,
      [action.payload.origin]: {
        data: action.payload.responseData,
        error: null,
        status: "completed",
      },
    };
  }
  if (action.type === "ERROR") {
    return {
      ...state,
      [action.payload.origin]: {
        data: null,
        error: action.payload.errorMessage,
        status: "error",
      },
    };
  }

  return state;
};

const store = createStore(httpReducer);
export default store;
