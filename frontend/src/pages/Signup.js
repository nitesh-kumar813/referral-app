import React, { useState, useContext } from "react";
import { signup } from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/Refer.jpg";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    referralCode: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await signup(formData);
      setToken(data.token);
      localStorage.setItem("token", data.token);
      localStorage.setItem("referralCode", data.referralCode);
      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Error during signup. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#eda0c4]">
      <div
        className="w-full md:w-[70%] h-screen md:h-auto"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      <div className="flex items-center justify-center w-full md:w-1/2 bg-[#eda0c4] text-black p-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-8 bg-[#f8bedd] rounded-lg shadow-lg"
        >
          <h2 className="mb-4 text-3xl font-bold text-center text-[#5c54cd]">
            Sign Up
          </h2>
          <p className="mb-8 text-center text-[#626de7]">
            Create your account to get started!
          </p>

          {errorMessage && (
            <p className="mb-4 text-center text-red-600">{errorMessage}</p>
          )}

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full px-4 py-3 mb-4 bg-[#eeeeee] rounded focus:outline-none text-[#000000]"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full px-4 py-3 mb-4 bg-[#eeeeee] rounded focus:outline-none text-[#000000]"
            required
          />
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-3 bg-[#eeeeee] rounded focus:outline-none text-[#000000]"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-[#626de7] hover:text-[#5c54cd]"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <input
            type="text"
            name="referralCode"
            value={formData.referralCode}
            onChange={handleChange}
            placeholder="Referral Code (optional)"
            className="w-full px-4 py-3 mb-4 bg-[#eeeeee] rounded focus:outline-none text-[#ee3b3b]"
          />

          <button
            type="submit"
            className="w-full px-4 py-3 font-semibold text-white bg-[#5c54cd] rounded-lg hover:bg-[#857fd7] focus:outline-none focus:ring-4 focus:ring-[#FEFF9F] transition-all duration-200"
          >
            Sign Up
          </button>

          <div className="mt-4 text-center text-base text-[#626de7]">
            Already have an account?{" "}
            <span
              className="text-[#f35438] cursor-pointer hover:underline text-sm md:text-base" // Adjusted font size for smaller screens
              onClick={() => navigate("/login")}
            >
              Log In
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;

