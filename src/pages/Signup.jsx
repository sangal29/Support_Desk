// Signup page: allows a user to create an account once (no duplicate usernames).
// After successful signup, the user is automatically logged in.

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignup = () => {
    // validation the user input

    if (!username || !password) {
      toast.error("All fields are required");
      return;
    }

    //   geting the esisting user from local storage

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // 3. Prevent duplicate usernames
    const userExists = users.find((user) => user.username === username);

    if (userExists) {
      toast.error("Username already exists");
      return;
    }

    //  Create and store new user in local storage
    const newUser = { username, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    login({ username });

    //    success message and redirect to dashboard
    toast.success("Account created successfully");
    navigate("/dashboard");
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Create Account</h2>

        <input
          className="input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary" onClick={handleSignup}>
          Signup
        </button>
      </div>
    </div>
  );
}

export default Signup;
