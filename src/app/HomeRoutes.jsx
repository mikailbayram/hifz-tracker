import { Routes, Route } from "react-router-dom";

export function HomeRoutes() {
  return (
    <Routes>
      <Route path="/" element={<p>Home</p>} />
      <Route path="/settings" element={<p>Settings</p>} />
    </Routes>
  );
}
