import { useEffect }         from "react";
import { useNavigate }       from "react-router-dom";
import { useAppDispatch }    from "../../../store/hooks";
import { setUser }           from "../../../store/authSlice";
import type { User }         from "../../../store/authSlice";

const OAuthCallback = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

 useEffect(() => {
    const params    = new URLSearchParams(window.location.search);
    const error     = params.get("error");
    const token     = params.get("token");
    const raw       = params.get("user");
    const isNew     = params.get("is_new") === "1";
    const tempToken = params.get("temp_token");


    if (error) {
      navigate("/auth?error=oauth_failed", { replace: true });
      return;
    }

    if (isNew && tempToken) {
      sessionStorage.setItem("oauth_temp_token", tempToken);
      navigate("/auth/complete-profile", { replace: true });
      return;
    }

    if (token && raw) {
      try {
        const user: User = JSON.parse(raw);
        dispatch(setUser({ user, token }));
        navigate("/dashboard", { replace: true });
      } catch {
        navigate("/auth?error=oauth_failed", { replace: true });
      }
      return;
    }

}, [dispatch, navigate]);

  return (
    <div style={{
      minHeight:      "100vh",
      background:     "#f0f4ff",
      display:        "flex",
      alignItems:     "center",
      justifyContent: "center",
      fontFamily:     "'Inter', sans-serif",
      color:          "#6b7fa8",
      fontSize:       14,
    }}>
      Duke u kyçur…
    </div>
  );
}

export default OAuthCallback;