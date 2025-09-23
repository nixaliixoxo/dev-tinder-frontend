import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";

const Login = () => {
  const [error, setError] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginClick = async () => {
    try {
      const res = await axios.post("http://localhost:3000/login", {
        emailId,
        password,
      }, {withCredentials: true});
      dispatch(addUser(res.data));
      navigate("/feed");
    } catch (err) {
      navigate("/login");
      setError(err?.response?.data || "something went wrong");
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-200 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">LOGIN</h2>

          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Enter Email</legend>
              <input
                type="text"
                className="input"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </fieldset>
          </div>

          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Enter password</legend>
              <input
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLoginClick}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
