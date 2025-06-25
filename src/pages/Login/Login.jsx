import React, { useContext, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaGithub, FaGoogle } from "react-icons/fa";
import PageTitle from "../../components/PageTitle/PageTitle";
import { AuthContent } from "../../contexts/Authcontext";

const Login = () => {
  const { handelLogin, handelGoogleLogin, passwordReset } = useContext(AuthContent);
  const [error, setError] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const emailRef = useRef();

  //  extract redirect target
  const redirectPath = location?.state || "/";

  // email password login
  const handelUserLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      setError(true);
      toast.error("Email and password are required");
      return;
    }

    handelLogin(email, password)
      .then(() => {
        navigate(redirectPath, { replace: true });
      })
      .catch(() => {
        setError(true);
      });
  };

  // google login
  const handelUserGoogleLogin = () => {
    handelGoogleLogin()
      .then((user) => {
        // send data to server
        fetch("https://garden-hub-three.vercel.app/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            profileImage: user?.photoURL,
            name: user?.displayName,
            email: user?.email,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log("afte save ", data);
          });

        navigate(redirectPath, { replace: true });
      })
      .catch(() => {});
  };

  // password reset
  const handelUserResetPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    passwordReset(email)
      .then(() => {
        toast.success("Password reset email sent!");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to send password reset email");
      });
  };

  return (
    <section>
      <PageTitle title={"Login Page"}></PageTitle>
      <div className="h-[calc(100vh-160px)] dark:bg-gray-900  bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white  dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center dark:text-white">Sign In</h2>

          <form className="space-y-4" onSubmit={handelUserLogin}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1  dark:text-gray-100">Email</label>
              <input
                type="email"
                name="email"
                ref={emailRef}
                className={`dark:text-white text-black placeholder:text-gray-700 dark:placeholder:text-gray-300 w-full px-4 py-2 border rounded-lg focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none transition-all ${
                  error ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="your@email.com"
                onChange={() => setError(false)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1  dark:text-gray-100">Password</label>
              <input
                type="password"
                name="password"
                className={`dark:text-white text-black placeholder:text-gray-700 dark:placeholder:text-gray-300 w-full px-4 py-2 border rounded-lg focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none transition-all ${
                  error ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="••••••••"
                onChange={() => setError(false)}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center ">
                <input type="checkbox" className="rounded border-gray-300 " />
                <span className="ml-2 text-sm text-gray-600  dark:text-gray-100">Remember me</span>
              </label>
              <div onClick={handelUserResetPassword} className=" cursor-pointer hover:underline text-sm text-green-600">
                Forgot password?
              </div>
            </div>

            <button type="submit" className="cursor-pointer w-full bg-green-600 text-white font-medium py-2.5 rounded-lg transition-colors">
              Sign In
            </button>
          </form>

          {/* Social login */}
          <div className="flex items-center justify-between mt-4">
            <hr className="w-full border-gray-300" />
            <span className="text-gray-500 text-sm px-2">or</span>
            <hr className="w-full border-gray-300" />
          </div>

          <div className="flex items-center justify-center space-x-4 mt-4">
            <button
              onClick={handelUserGoogleLogin}
              className="w-full bg-[#db4437] cursor-pointer hover:bg-[#c1351d] text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <FaGoogle /> <span>Google</span>
            </button>
          </div>

          <div className="mt-6 text-center text-sm  dark:text-gray-100 text-gray-600">
            Don&apos;t have an account?
            <Link to="/register" className="text-green-500 hover:text-green-500 font-medium ml-1">
              Register
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
