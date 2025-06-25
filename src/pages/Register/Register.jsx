import React, { useContext, useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import { AuthContent } from "../../contexts/Authcontext";
import { toast } from "react-toastify";
import { emailRegex, strongPasswordRegex } from "../../utils/utils";
import PageTitle from "../../components/PageTitle/PageTitle";
import { useLocation } from "react-router";

const Register = () => {
  const { handelRegister, handelGoogleLogin } = useContext(AuthContent);
  const [errors, setErrors] = useState({});
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  // 🔥 extract redirect target
  const redirectPath = location?.state || "/";

  const handelUserRegister = (e) => {
    e.preventDefault();
    const profileImage = e.target.profileImage.value;
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    // error related code
    let newErrors = {};
    if (!profileImage) newErrors.profileImage = "Profile image is required";
    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    else if (!emailRegex.test(email)) newErrors.email = "Invalid email address";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 8) newErrors.password = "At least 8 characters";
    else if (!strongPasswordRegex.test(password)) {
      newErrors.password = "Weak password";
      setPasswordError(true);
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error(Object.values(newErrors)[0]);
      return;
    }

    setErrors({});
    handelRegister(email, password, name)
      .then(() => {
        // send data to server
        fetch("https://garden-hub-three.vercel.app/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ profileImage, name, email }),
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log("afte save ", data);
          });

        navigate(redirectPath, { replace: true });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Registration failed. Please try again.");
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
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section>
      <PageTitle title={"Register Page"}></PageTitle>

      <div className="h-[calc(100vh-160px)] dark:bg-gray-900 bg-green-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold dark:text-white text-gray-900 mb-2 text-center">Register Account</h2>
          <p className="text-sm dark:text-gray-200 text-gray-600 mb-4 text-center">Create your account to get started.</p>

          <hr className="w-[50px] mx-auto border-gray-300 mb-5" />
          <form className="space-y-4" onSubmit={handelUserRegister}>
            {/* image  input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-100 mb-1">Profile image</label>
              <input
                type="text"
                name="profileImage"
                className={`dark:text-white text-black placeholder:text-gray-700 dark:placeholder:text-gray-300 w-full px-4 py-2 border ${
                  errors.profileImage ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none transition-all`}
                placeholder="profile-image.jpg"
              />
            </div>

            {/* Name input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-100 mb-1">Name</label>
              <input
                type="text"
                name="name"
                className={`dark:text-white text-black placeholder:text-gray-700 dark:placeholder:text-gray-300 w-full px-4 py-2 border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none transition-all`}
                placeholder="John Doe"
              />
            </div>

            {/* Email input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-100 mb-1">Email</label>
              <input
                type="text"
                name="email"
                className={`dark:text-white text-black placeholder:text-gray-700 dark:placeholder:text-gray-300 w-full px-4 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none transition-all`}
                placeholder="your@email.com"
              />
            </div>

            {/* Password input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-100 mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className={`dark:text-white text-black placeholder:text-gray-700 dark:placeholder:text-gray-300 w-full px-4 py-2 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none transition-all`}
                placeholder={showPassword ? "Password" : "*********"}
              />
              {passwordError && (
                <p className="text-red-700 text-sm mt-1">
                  Password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character (e.g.,
                  !@#$%^&*).
                </p>
              )}
            </div>
            <label htmlFor="showPassword" className="text-black dark:text-gray-100 mt-2 mb-3 block">
              <input type="checkbox" id="showPassword" className="mr-2" onChange={(e) => setShowPassword(e.target.checked)} />
              Show Password
            </label>
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg transition-colors cursor-pointer"
            >
              Register
            </button>
          </form>
          {/* social login */}
          <div className="flex items-center justify-between mt-4">
            <hr className="w-full border-gray-300" />
            <span className="text-gray-500 dark:text-gray-100 text-sm px-2">or</span>
            <hr className="w-full border-gray-300" />
          </div>
          <div className="flex items-center justify-center space-x-4 mt-4">
            <button
              onClick={handelUserGoogleLogin}
              className="cursor-pointer w-full bg-[#db4437] hover:bg-[#c1351d] text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <FaGoogle /> <span>Register With Google</span>
            </button>
          </div>
          <div className="mt-6 text-center text-sm dark:text-gray-100 text-gray-600">
            Already have an account?
            <Link to="/login" className="text-green-600 hover:text-green-500 font-medium ml-1">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
