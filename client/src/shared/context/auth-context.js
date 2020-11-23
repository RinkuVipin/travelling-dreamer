import { createContext } from "react";

export const AuthContext = createContext({
  isSignedIn: false,
  loggedUser: null,
  token: null,
  userSignin: () => {},
  userSignout: () => {},
});
