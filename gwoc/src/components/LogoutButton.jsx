import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);

  return (
    <button onClick={logout} className="p-2 bg-red-500 text-white rounded">Logout</button>
  );
};

export default LogoutButton;
