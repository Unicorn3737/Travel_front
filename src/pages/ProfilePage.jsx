import { useContext } from "react";
import { AuthContext } from "../contexts/auth.context";

export const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  console.log("here the name from the context", user);
  return <div>ProfilePage</div>;
};
