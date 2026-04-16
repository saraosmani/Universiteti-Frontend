import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "./store/authSlice";
import Dashboard from "./modules/dashboard/Dashboard";
import OAuthCallback from "./modules/auth_pages/components/OauthCallback";
import AuthPage                     from "./modules/auth_pages/AuthPage";
import ProvimePage from "./modules/provime/ProvimePage";
import OrariPage from "./modules/orari/OrariPage";
import NotaPage from "./modules/vleresimi_studenteve/NotaPage";
import PrezencaPage from "./modules/prezenca/PrezencaPage";
import NjoftimePage from "./modules/njoftime/NjoftimePage";
import CileSimePage from "./modules/cilesime/CileSimePage";
import CompleteProfileForm from "./modules/auth_pages/components/CompleteGoogleRegistration";
import SectionsPage from "./modules/seksion_pedagog/SectionsPage";
import RegjistrimStudent from "./modules/regjistrim_student/RegjistrimStudent";
import LibrezaNotave from "./modules/Libreza_notave/LibrezaNotave";
import DokumentPage from "./modules/dokumenta/DokumentPage";
import ProfilePage from "./modules/profil/ProfilPage";

function ProtectedRoute() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />;
}

function GuestRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return isAuthenticated ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <>{children}</>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/auth/callback" element={<OAuthCallback />} />
      <Route path="/auth/complete-profile" element={<CompleteProfileForm />} />

      <Route
        path="/auth"
        element={
          <GuestRoute>
            <AuthPage />
          </GuestRoute>
        }
      />

      {/* All protected routes under one wrapper */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orari" element={<OrariPage />} />
        <Route path="/provime" element={<ProvimePage />} />
        <Route path="/vleresimi" element={<NotaPage />} />
        <Route path="/prezenca" element={<PrezencaPage />} />
        <Route path="/seksionet" element={<SectionsPage />} />
        <Route path="/njoftime" element={<NjoftimePage />} />
        <Route path="/cilesimet" element={<CileSimePage />} />
        <Route path="/regjistrim" element={<RegjistrimStudent />} />
        <Route path="/libreza-e-notave" element={<LibrezaNotave />} />
        <Route path="/dokumenta" element={<DokumentPage />} />
        <Route path="/profili" element={<ProfilePage />} />
      </Route>

      <Route path="*" element={<Navigate to="/auth" replace />} />
    </Routes>
  );
}
