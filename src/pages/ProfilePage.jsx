import { useContext } from "react";
import { AuthContext } from "../contexts/auth.context";
import { Link } from "react-router-dom";

export const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  console.log("here the name from the context", user);
  return (
    <div>
      ProfilePage
      <Link to="/drive">
        <button>Create a trip</button>
      </Link>
    </div>
  );
};
