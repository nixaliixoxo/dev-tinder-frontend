import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";

const Login = () => {
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!emailId || !password || (!isLogin && (!firstName || !lastName))) {
      setError("All fields are required");
      return;
    }

    try {
      const url = isLogin
        ? "http://localhost:3000/login"
        : "http://localhost:3000/signup";

      const payload = isLogin
        ? { emailId, password }
        : { firstName, lastName, emailId, password };
      const res = await axios.post(url, payload, { withCredentials: true });
      dispatch(addUser(res.data));
      navigate(isLogin? "/feed": "/profile");
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-200 w-96 shadow-md">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLogin ? "LOGIN" : "SIGNUP"}
          </h2>

          {/* Only show these fields when signing up */}
          {!isLogin && (
            <>
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    className="input"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
              </div>
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="text"
                    className="input"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
              </div>
            </>
          )}

          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email</legend>
              <input
                type="email"
                className="input"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </fieldset>
          </div>

          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="card-actions justify-center mt-4">
            <button className="btn btn-primary w-full" onClick={handleSubmit}>
              {isLogin ? "Login" : "Signup"}
            </button>
          </div>

          {/* Toggle Login/Signup */}
          <p
            className="cursor-pointer text-center mt-3 text-blue-600"
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
          >
            {isLogin ? "New User? Signup Here" : "Existing User? Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

