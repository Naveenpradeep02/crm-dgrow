import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", form);

      login(res.data.token, res.data.user);

      const role = res.data.user.role;

      if (role === "admin") {
        navigate("/admin/dashboard");
      }

      if (role === "employee") {
        navigate("/employee/dashboard");
      }

      if (role === "client") {
        navigate("/client/dashboard");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f3f3] ">
      <div className="w-full max-w-7xl h-screen grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Left Side */}
        <div className="w-full relative bg-gradient-to-br from-red-500 via-red-600 to-gray-800 rounded-br-[60px] overflow-hidden hidden lg:flex flex-col justify-center px-10">
          {/* Blur Glow */}
          <div className="absolute top-10 right-10 w-72 h-72 bg-pink-300 rounded-full blur-3xl opacity-40"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full blur-3xl opacity-20"></div>

          {/* Star */}
          <div className="absolute top-8 left-8 text-white text-8xl font-bold leading-none">
            *
          </div>

          {/* Content */}
          <div className="relative z-10">
            <h1 className="text-white font-extrabold text-8xl leading-none">
              D-GROW
            </h1>

            <h2 className="text-white text-5xl font-bold mt-2">
              MARKETING AGENCY
            </h2>

            <p className="text-white mt-4 max-w-lg text-sm">
              I designed a CRM system specifically for digital marketing
              agencies combining project management, employee tracking, and
              client workflows into one unified system.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full  bg-[#f3f3f3] flex items-center justify-center">
          <form onSubmit={handleSubmit} className="w-full max-w-md px-8">
            <h1 className="text-5xl font-extrabold text-center text-black">
              WELCOME BACK
            </h1>

            <p className="text-center text-gray-500 text-xs mt-2 mb-10">
              Simplify your workflow and boost your productivity
              <br />
              with Dgrow Dashboard get started for free
            </p>

            {/* Email */}
            <div className="mb-5">
              <label className="block text-sm mb-2">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                className="w-full h-12 px-5 rounded-xl border border-gray-400 bg-transparent outline-none"
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-sm mb-2">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your Password"
                onChange={handleChange}
                className="w-full h-12 px-5 rounded-xl border border-gray-400 bg-transparent outline-none"
              />
            </div>

            {/* Remember */}
            <div className="flex items-center gap-2 mb-8">
              <input type="checkbox" className="accent-black w-3 h-3" />
              <span className="text-sm text-gray-700">Remember login</span>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full h-12 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xl font-medium transition"
            >
              Login
            </button>

            {/* Footer */}
            <div className="text-center mt-10 text-sm text-gray-700">
              Don't have a account?{" "}
              <Link to="/forgot-password" className="text-red-500 font-medium">
                Request Now
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
