import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import useExProvider from "../../hooks/useExProvider";

const Login = () => {
  const { emailPassLogin } = useExProvider();
  const [disabled, setDisabled] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginErr, setLoginErr] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);
  const handleCaptcha = event => {
    const captcha = event.target.value;
    if (validateCaptcha(captcha)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };
  const handleLogin = event => {
    event.preventDefault();
    setLoginLoading(true);
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    emailPassLogin(email, password)
      .then(() => {
        setLoginLoading(false);
        navigate("/");
      })
      .catch(err => {
        setLoginErr(err.message.split("/")[1].replace(")", ""));
        setLoginLoading(false);
        console.log(err);
      });
  };
  return (
    <div className="ex-container mt-10">
      <Helmet>
        <title>Login | Shop-Ex</title>
      </Helmet>
      <div className="max-w-xl mx-auto ring-1 ring-slate-300 bg-slate-50 p-5 rounded-lg">
        <h2 className="font-inter text-2xl font-semibold">Login now</h2>
        <form className="space-y-4 mt-5" onSubmit={handleLogin}>
          <input
            type="email"
            className="ex-form"
            placeholder="Enter your email"
            name="email"
          />
          <input
            type="password"
            className="ex-form"
            placeholder="Enter your password"
            name="password"
          />
          <LoadCanvasTemplate />
          <input
            type="text"
            className="ex-form"
            placeholder="Enter captcha"
            style={{ width: "200px" }}
            onBlur={handleCaptcha}
          />
          {loginErr && (
            <p className="form-validate-error">Error : {loginErr}</p>
          )}
          <input
            type="submit"
            value={loginLoading ? "Logging in..." : "Log in"}
            className="block btn w-full ring-1 ring-slate-300"
            // TODO: make the value dynamic
            disabled={loginLoading}
            // disabled={disabled}
          />
        </form>
        <div className="font-inter text-center py-2">
          <span>New here ?</span>
          <Link to="/register" className="text-cyan-700">
            {" "}
            Register
          </Link>
        </div>
        <div className="divider font-inter">OR</div>
        <span className="text-center block font-inter">Continue with </span>
        <div></div>
      </div>
    </div>
  );
};

export default Login;
