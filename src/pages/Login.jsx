import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import styles from '../components/login/Login.module.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = () => {
    if (!username || !password) {
      toast.error('All fields are required');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const validUser = users.find(
      (user) => user.username === username && user.password === password,
    );

    if (!validUser) {
      toast.error('Invalid username or password');
      return;
    }

    login({ username: validUser.username });
    toast.success('Login successful');
    navigate('/dashboard');
  };

  return (
    <div className={styles.loginContainer}>
      <form
        className={styles.loginCard}
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <h2 className={styles.loginTitle}>Login</h2>

        <input
          className={styles.loginInput}
          type='text'
          placeholder='Username'
          autoComplete='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className={styles.loginInput}
          type='password'
          placeholder='Password'
          autoComplete='current-password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type='submit' className={styles.loginButton}>
          Login
        </button>

        <p className={styles.loginFooter}>
          New user?{' '}
          <span
            className={styles.loginLink}
            onClick={() => navigate('/signup')}
          >
            Signup
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;



