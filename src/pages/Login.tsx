import axios from "axios";
import { ChangeEvent, useState } from "react";
import { useAppDispatch } from "@/appStore/hooks";
import { setUser } from "@/appStore/slices/authSlice";
import { api } from "@/services/api";
import { endpoints } from "@/utils/endpoints";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [emailId, setEmailId] = useState("saisrinivas@gmail.com");
  const [password, setPassword] = useState("Sai@1234");
  const appDispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmailId(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleLogin = async () => {
    try {
      const res = await api.post(endpoints.login, {
        emailId,
        password,
      });
      appDispatch(setUser(res.data?.data));
      navigate("/");
    } catch (error) {
      console.log("Error logging in:", error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Login</legend>

        <label className="label">Email</label>
        <input
          type="email"
          value={emailId}
          onChange={handleEmailChange}
          className="input"
          placeholder="Email"
        />

        <label className="label">Password</label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          className="input"
          placeholder="Password"
        />

        <button className="btn btn-neutral mt-4" onClick={handleLogin}>
          Login
        </button>
      </fieldset>
    </div>
  );
};

export default Login;
