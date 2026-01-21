// // protect user from unwanted login


// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// function ProtectedRoute({ children }) {
//   const { user } = useAuth();

//   // If NOT logged in → redirect to login
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   // If logged in → show the page
//   return children;
// }

// export default ProtectedRoute;



import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // ⏳ wait until auth check finishes
  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
