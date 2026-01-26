import { useState } from "react";
import styles from "./TicketDetails.module.css";

function TicketComments({ comments, onAddComment }) {
  const [commentText, setCommentText] = useState("");

  const handleAdd = () => {
    if (!commentText.trim()) return;
    onAddComment(commentText);
    setCommentText("");
  };

  return (
    <div className={styles.section}>
      <h4>Comments</h4>

      {comments.length === 0 && (
        <p className={styles.empty}>No comments yet</p>
      )}

      <div className={styles.commentsList}>
        {comments.map((c, i) => (
          <div key={i} className={styles.commentCard}>
            <p>{c.text}</p>
            <span>
              {new Date(c.createdAt).toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      <textarea
        className={styles.textarea}
        placeholder="Add a comment..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />

      <button className={styles.addBtn} onClick={handleAdd}>
        Add Comment
      </button>
    </div>
  );
}

export default TicketComments;
