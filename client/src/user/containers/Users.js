import React, { Fragment, useState, useEffect } from "react";
import ErrorModal from "../../shared/components/UIElements/Modal/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/Spinner/LoadingSpinner";
import UserList from "../components/UserList";
import useHttpHooks from "../../shared/hooks/http-hooks";

const Users = () => {
  const [users, setUsers] = useState();
  const { loading, error, getRequest, clearError } = useHttpHooks();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getRequest(
          process.env.REACT_APP_SERVER_URL + "/users"
        );
        setUsers(data.users);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, [getRequest]);

  return (
    <Fragment>
      {loading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      <ErrorModal error={error} onClear={clearError} />
      {users && <UserList users={users} />}
    </Fragment>
  );
};

export default Users;
