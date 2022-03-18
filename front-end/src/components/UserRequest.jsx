import useRequest from "../hooks/useRequest";

const UserRequest = () => {

  const url = process.env.REACT_APP_BACKEND_URL + "/users";

  const {data, loading} = useRequest(url);
  return (
    <div>
      <h2>"GET" REQUEST TO RETRIEVE DATA FROM DATABASE "FINALPROJECT"</h2>

      { loading && <p>Loading...</p> }
      { data && <p>Data retrieved from DB USERS table: {JSON.stringify(data)}</p> }
    </div>
  );
};

export default UserRequest;
