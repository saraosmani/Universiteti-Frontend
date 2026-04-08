import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "./store/authSlice";
import Dashboard from "./modules/dashboard/Dashboard";
import OAuthCallback from "./modules/auth_pages/components/OauthCallback";
import AuthPage from "./modules/auth_pages/AuthPage";
import ProvimePage from "./modules/Provime/ProvimePage";
import OrariPage from "./modules/Orari/OrariPage";
import DetyratPage from "./modules/Detyrat/DetyratPage";
import NotaPage from "./modules/Nota/NotaPage";
import LendetPage from "./modules/Lendet/LendetPage";
import PrezencaPage from "./modules/Prezenca/PrezencaPage";
import FinancaPage from "./modules/Financa/FinancaPage";
import NjoftimePage from "./modules/Njoftime/NjoftimePage";
import CileSimePage from "./modules/Cilesimet/CileSimePage";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/auth" replace />;
}

function GuestRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <>{children}</>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/auth/callback" element={<OAuthCallback />} />

      <Route path="/auth" element={
        <GuestRoute><AuthPage /></GuestRoute>
      } />

      <Route path="/dashboard" element={
        <ProtectedRoute><Dashboard /></ProtectedRoute>
      } />

      <Route path="/orari" element={
        <ProtectedRoute><OrariPage /></ProtectedRoute>
      } />

      <Route path="/provime" element={
        <ProtectedRoute><ProvimePage /></ProtectedRoute>
      } />

      <Route path="/detyrat" element={
        <ProtectedRoute><DetyratPage /></ProtectedRoute>
      } />

      <Route path="/nota" element={
        <ProtectedRoute><NotaPage /></ProtectedRoute>
      } />

      <Route path="/lendet" element={
        <ProtectedRoute><LendetPage /></ProtectedRoute>
      } />

      <Route path="/prezenca" element={
        <ProtectedRoute><PrezencaPage /></ProtectedRoute>
      } />

      <Route path="/financa" element={
        <ProtectedRoute><FinancaPage /></ProtectedRoute>
      } />

      <Route path="/njoftime" element={
        <ProtectedRoute><NjoftimePage /></ProtectedRoute>
      } />

      <Route path="/cilesimet" element={
        <ProtectedRoute><CileSimePage /></ProtectedRoute>
      } />

      <Route path="*" element={<Navigate to="/auth" replace />} />
    </Routes>
  );
}