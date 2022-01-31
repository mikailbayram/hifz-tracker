import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Login } from "./app/login/Login";
import { Register } from "./app/register/Register";
import { HomeRoutes } from "./app/HomeRoutes";

import { RequireAuth } from "./components/RequireAuth";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/*"
            element={
              <RequireAuth>
                <HomeRoutes />
              </RequireAuth>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
