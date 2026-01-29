import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import styles from "./Signup.module.css";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignup = () => {
    if (!username || !password) {
      toast.error("All fields are required");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.find((user) => user.username === username);

    if (userExists) {
      toast.error("Username already exists");
      return;
    }

    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));

    login({ username });
    toast.success("Account created successfully");
    navigate("/dashboard");
  };

  return (
    <div className={styles.signupContainer}>
      <form
        className={styles.signupCard}
        onSubmit={(e) => {
          e.preventDefault();
          handleSignup();
        }}
      >
        <h2 className={styles.signupTitle}>Create Account</h2>

        <div className={styles.field}>
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
             autoComplete='username'
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            autoComplete='current-password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className={styles.signupButton}>
          Signup
        </button>

        <p className={styles.signupFooter}>
          Already have an account?
          <span
            className={styles.signupLink}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default Signup;
