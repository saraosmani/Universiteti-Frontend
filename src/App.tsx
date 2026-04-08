import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector }              from "react-redux";
import { selectIsAuthenticated }    from "./store/authSlice";
import Dashboard                    from "./modules/dashboard/Dashboard";
import OAuthCallback                from "./modules/auth_pages/components/OauthCallback";
import AuthPage from "./modules/auth_pages/AuthPage";
import CompleteProfileForm from "./modules/auth_pages/components/CompleteProfile";

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
      <Route path="/auth/complete-profile" element={<CompleteProfileForm />} />

      <Route path="/auth" element={
        <GuestRoute><AuthPage /></GuestRoute>
      } />

      <Route path="/dashboard" element={
        <ProtectedRoute><Dashboard /></ProtectedRoute>
      } />

      <Route path="*" element={<Navigate to="/auth" replace />} />
    </Routes>
  );
}