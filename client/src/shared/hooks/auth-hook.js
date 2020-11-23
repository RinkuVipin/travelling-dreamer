import { useCallback, useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth-context";

let logoutTimer;

const useAuthHook = () => {
  const authenticate = useContext(AuthContext);
  const [token, setToken] = useState();
  const [tokenExpiration, setTokenExpiration] = useState();
  const [loggedUser, setLoggedUser] = useState(authenticate.loggedUser);

  const userSignin = useCallback((userId, userToken, existingTokenExpire) => {
    setToken(userToken);
    setLoggedUser(userId);
    const tokenExpireTime =
      existingTokenExpire || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpiration(tokenExpireTime);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: userId,
        tokenExpire: tokenExpireTime.toISOString(),
        token: userToken,
      })
    );
  }, []);

  const userSignout = useCallback(() => {
    setToken(null);
    setTokenExpiration(null);
    setLoggedUser(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData && userData.token) {
      if (new Date(userData.tokenExpire) > new Date()) {
        userSignin(
          userData.userId,
          userData.token,
          new Date(userData.tokenExpire)
        );
      }
    }
  }, [userSignin]);

  useEffect(() => {
    if (token && tokenExpiration) {
      const remainingTime = tokenExpiration.getTime() - new Date().getTime();
      logoutTimer = setTimeout(userSignout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [userSignout, token, tokenExpiration]);
  return { userSignout, userSignin, loggedUser, token };
};

export default useAuthHook;
