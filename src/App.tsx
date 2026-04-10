import { Routes, Route, Navigate, Outlet } from "react-router-dom";
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
import CompleteProfileForm from "./modules/auth_pages/components/CompleteProfile";

function ProtectedRoute() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />;
}

function GuestRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <>{children}</>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/auth/callback" element={<OAuthCallback />} />
      <Route path="/auth/complete-profile" element={<CompleteProfileForm />} />

      <Route path="/auth" element={
        <GuestRoute><AuthPage /></GuestRoute>
      } />

      {/* All protected routes under one wrapper */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard"  element={<Dashboard />} />
        <Route path="/orari"      element={<OrariPage />} />
        <Route path="/provime"    element={<ProvimePage />} />
        <Route path="/detyrat"    element={<DetyratPage />} />
        <Route path="/nota"       element={<NotaPage />} />
        <Route path="/lendet"     element={<LendetPage />} />
        <Route path="/prezenca"   element={<PrezencaPage />} />
        <Route path="/financa"    element={<FinancaPage />} />
        <Route path="/njoftime"   element={<NjoftimePage />} />
        <Route path="/cilesimet"  element={<CileSimePage />} />
      </Route>

      <Route path="*" element={<Navigate to="/auth" replace />} />
    </Routes>
  );
}