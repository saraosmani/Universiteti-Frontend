import { useLogout } from "../../hooks/auth/useLogout";
import { useCurrentUser } from "../../hooks/auth/useGetCurrentUser";
import { ACCENT, BORDER, LIGHT, MUTED, NAVY, NAVY2, WHITE } from "../../styles/colors";
import { signOutBtnBase } from "./Dashboard.styles";

const Dashboard = () => {
  const { data: user } = useCurrentUser();
  const logout = useLogout();

  return (
    <div style={{
      minHeight:      "100vh",
      background:     LIGHT,
      display:        "flex",
      alignItems:     "center",
      justifyContent: "center",
      fontFamily:     "'Inter', 'Segoe UI', sans-serif",
    }}>
      <div style={{
        background:   WHITE,
        border:       `1px solid ${BORDER}`,
        borderRadius: 12,
        padding:      "60px 80px",
        textAlign:    "center",
        maxWidth:     500,
        width:        "100%",
        boxShadow:    "0 4px 24px rgba(15,37,87,0.08)",
      }}>

        {/* Avatar */}
        <div style={{
          width:          72,
          height:         72,
          borderRadius:   "50%",
          background:     `linear-gradient(135deg, ${NAVY} 0%, ${NAVY2} 100%)`,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          margin:         "0 auto 28px",
          fontSize:       28,
          color:          WHITE,
          fontWeight:     600,
        }}>
          {user?.name?.[0]?.toUpperCase() ?? "U"}
        </div>

        {/* Welcome label */}
        <div style={{
          color:        ACCENT,
          fontSize:     11,
          letterSpacing:3,
          marginBottom: 12,
          fontWeight:   500,
          textTransform:"uppercase",
        }}>
          Mirëserdhët!
        </div>

        {/* Name */}
        <h2 style={{
          color:      NAVY,
          fontSize:   28,
          margin:     "0 0 8px",
          fontWeight: 600,
          fontFamily: "'Playfair Display', Georgia, serif",
        }}>
          {user?.name}
        </h2>

        {/* Email */}
        <p style={{
          color:    MUTED,
          fontSize: 14,
          margin:   "0 0 24px",
        }}>
          {user?.email}
        </p>

        {/* Role badge */}
        <div style={{
          display:      "inline-block",
          background:   LIGHT,
          border:       `1px solid ${BORDER}`,
          padding:      "4px 16px",
          borderRadius: 20,
          color:        NAVY,
          fontSize:     11,
          letterSpacing:2,
          marginBottom: 40,
          fontWeight:   500,
        }}>
          {user?.role?.toUpperCase()}
        </div>

        <br />

        {/* Sign out button */}
        <button
          onClick={logout}
          style={signOutBtnBase}
          onMouseEnter={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.background    = LIGHT;
            btn.style.borderColor   = NAVY;
            btn.style.color         = NAVY;
          }}
          onMouseLeave={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.background    = "transparent";
            btn.style.borderColor   = BORDER;
            btn.style.color         = MUTED;
          }}
        >
          DIL
        </button>
      </div>
    </div>
  );
}

export default Dashboard;