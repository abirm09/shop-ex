import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const Login = () => {
  const handlePassFieldFocus = event => {
    event.target.type = "text";
  };
  const handlePassFieldBlur = event => {
    event.target.type = "password";
  };
  return (
    <div className="ex-container mt-10">
      <Helmet>
        <title>Login | Shop-Ex</title>
      </Helmet>
      <div className="max-w-xl mx-auto ring-1 ring-slate-300 bg-slate-50 p-5 rounded-lg">
        <h2 className="font-inter text-2xl font-semibold">Login now</h2>
        <form className="space-y-4 mt-5">
          <input
            type="email"
            className="ex-form"
            placeholder="Enter your email"
          />
          <input
            type="password"
            className="ex-form"
            placeholder="Enter your password"
            onFocus={handlePassFieldFocus}
            onBlur={handlePassFieldBlur}
          />
          <input
            type="submit"
            value="Login"
            className="block btn w-full ring-1 ring-slate-300"
          />
        </form>
        <div className="font-inter text-center py-2">
          <span>New here ?</span>
          <Link to="/register"> Register</Link>
        </div>
        <div className="divider font-inter">OR</div>
        <span className="text-center block font-inter">Continue with </span>
        <div>
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;
