import { useNavigate } from "react-router-dom";
import styles from "../components/NotFound/NotFound.module.css";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={styles.code}>404</h1>
      <p className={styles.text}>Page not found</p>

      <button
        className={styles.button}
        onClick={() => navigate("/dashboard")}
      >
        Go to Dashboard
      </button>
    </div>
  );
}

export default NotFound;
