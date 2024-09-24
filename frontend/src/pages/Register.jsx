import { useState } from "react";
import axios from "../utils/axios";
import { NavLink, useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        "auth/register",
          { email, password, name },
        );
              const { token, user } = response.data;
      // Save token to local storage or state management (e.g., Context API, Redux)
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      // Redirect to homepage or another page after successful Register
      navigate("/");
    } catch (err) {
      setError(err.response.data.msg);
      console.error("Register error", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="bg-light-background dark:bg-dark-background  p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-yellow-50 mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border rounded focus:outline-none text-light-text dark:text-dark-text  bg-light-secondary/80 dark:bg-dark-secondary/80"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block "
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-2 border rounded focus:outline-none text-light-text dark:text-dark-text  bg-light-secondary/80 dark:bg-dark-secondary/80"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-yellow-50 mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border rounded focus:outline-none text-light-text dark:text-dark-text  bg-light-secondary/80 dark:bg-dark-secondary/80"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center">
          Don&apos;t have an account?{" "}
          <NavLink to="/login" className="text-blue-500 hover:underline">
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Register;
