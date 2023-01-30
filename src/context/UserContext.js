import { createContext, useEffect, useReducer } from "react";
import {
  onAuthStateChangedListener,
  createUserProfileDocument,
} from "../utils/firebase/firebase";

export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
});

const SET_USER = "SET_USER";

const userReducer = (state, action) => {
  console.log("dispatch");
  console.log(action);
  const { type, payload } = action;

  switch (type) {
    case SET_USER:
      return {
        ...state,
        //in payload IS the value we want to be set on currentUser
        currentUser: payload,
      };
    default:
      throw new Error(`Unhandled type ${type}`);
  }
};

const INITIAL_STATE = {
  currentUser: null,
};

export const UserProvider = ({ children }) => {
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);

  //for our 'value' we need 'currentUser' which we can destructure from our state obj
  // {currentUser }= state
  // and we need 'setCurrentUser'
  const setCurrentUser = (user) => {
    dispatch({
      type: "SET_USER",
      payload: user,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserProfileDocument(user);
      }
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const value = { currentUser, setCurrentUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
