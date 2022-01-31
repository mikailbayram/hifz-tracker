import React from "react";
import { useNavigate } from "react-router-dom";

let AuthContext = React.createContext(null);

export function AuthProvider({ children }) {
  let [user, setUser] = React.useState(null);
  let navigate = useNavigate();

  const signin = (token, user) => {
    localStorage.setItem("token", token);
    setUser(user);
    navigate("/");
  };

  let value = { user, signin };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}
