import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

//import Users from "./user/containers/Users";
// import NewPlace from "./places/containers/NewPlace";
// import UserPlaces from "./places/containers/UserPlaces";
// import UpdatePlace from "./places/containers/UpdatePlace";
// import Auth from "./user/containers/Auth";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";
import useAuthHook from "./shared/hooks/auth-hook";
import LoadingSpinner from "./shared/components/UIElements/Spinner/LoadingSpinner";

const Users = React.lazy(() => import("./user/containers/Users"));
const NewPlace = React.lazy(() => import("./places/containers/NewPlace"));
const UserPlaces = React.lazy(() => import("./places/containers/UserPlaces"));
const UpdatePlace = React.lazy(() => import("./places/containers/UpdatePlace"));
const Auth = React.lazy(() => import("./user/containers/Auth"));

const App = () => {
  const { userSignout, userSignin, loggedUser, token } = useAuthHook();
  return (
    <AuthContext.Provider
      value={{
        isSignedIn: !!token,
        token,
        loggedUser,
        userSignout,
        userSignin,
      }}
    >
      <Router>
        <MainNavigation />
        <main>
          <Suspense
            fallback={
              <div className="center">
                <LoadingSpinner />
              </div>
            }
          >
            <Switch>
              <Route path="/" exact>
                <Users />
              </Route>

              <Route path="/places/new" exact>
                <NewPlace />
              </Route>

              <Route path="/places/user/:userId/" exact>
                <UserPlaces />
              </Route>

              <Route path="/places/:placeId" exact>
                <UpdatePlace />
              </Route>

              <Route path="/auth" exact>
                <Auth />
              </Route>

              <Redirect to="/" />
            </Switch>
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
