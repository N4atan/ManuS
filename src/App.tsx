import { Navigate, Route, Routes } from "react-router";
import { Header } from "./components/Header/Header";
import { useAuth } from "./contexts/AuthContext";
import PageLogin from "./pages/PageLogin";
import PageServices from "./pages/PageServices";
import { Toaster } from "react-hot-toast";
import PageAdmin from "./pages/PageAdmin";

export default function App() {
  const { isAuthenticated, user } = useAuth();

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to={isAuthenticated ? "/services" : "/login"} replace />} />
        <Route path="/services" element={isAuthenticated ? <PageServices /> : <Navigate to="/login" replace />} />
        <Route path="/login" element={!isAuthenticated ? <PageLogin /> : <Navigate to="/services" replace />} />
        <Route path="/admin" element={isAuthenticated && user?.role === "TI" ? <PageAdmin /> : <Navigate to="/services" replace />} />
      </Routes>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
    </>
  );
}