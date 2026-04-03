import React, { useState } from "react";
import { useLogout } from "../../hooks/auth/useLogout";
import { useCurrentUser } from "../../hooks/auth/useGetCurrentUser";
import { ACCENT, BORDER, LIGHT, MUTED, NAVY, WHITE } from "../../styles/colors";

const Dashboard = () => {
  const { data: userData } = useCurrentUser(); 
  const user = userData as any;
  const logout = useLogout();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const SIDEBAR_DARK = "#0B1120"; 

  const menuSections = [
    { title: "ACADEMIC", items: ["Schedule", "Exam Board", "Homeworks", "Grade Report", "Enrolled Courses", "Attendance"] },
    { title: "ADMINISTRATIVE", items: ["Finance", "Announcements"] },
    { title: "SETTINGS", items: ["Account Settings"] }
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F8FAFC", fontFamily: "'Inter', sans-serif" }}>
      
      <div style={{
        width: "240px",
        background: SIDEBAR_DARK,
        color: "#94A3B8",
        display: "flex",
        flexDirection: "column",
        padding: "20px 0"
      }}>
        <div style={{ padding: "0 24px 30px", color: WHITE, fontWeight: "bold", fontSize: "18px" }}>
          Aleksander Moisiu
        </div>

        <div style={{ 
          background: "rgba(255,255,255,0.1)", 
          color: WHITE, 
          margin: "0 12px 20px", 
          padding: "10px 12px", 
          borderRadius: "8px",
          fontSize: "14px"
        }}>
          Dashboard
        </div>

        {menuSections.map((section, idx) => (
          <div key={idx} style={{ marginBottom: "20px" }}>
            <div style={{ padding: "0 24px 8px", fontSize: "11px", fontWeight: "600", color: "#475569" }}>
              {section.title}
            </div>
            {section.items.map((item, i) => (
              <div key={i} style={{ padding: "8px 24px", fontSize: "13px", cursor: "pointer" }}>
                {item}
              </div>
            ))}
          </div>
        ))}
        
        <div onClick={logout} style={{ marginTop: "auto", padding: "20px 24px", cursor: "pointer", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          Logout
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        
        <div style={{
          height: "64px",
          background: WHITE,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 32px",
          borderBottom: `1px solid ${BORDER}`,
          position: "relative"
        }}>
          <div style={{ color: MUTED, fontSize: "14px" }}>Search...</div>
          
          <div 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            style={{ display: "flex", alignItems: "center", cursor: "pointer", gap: "12px" }}
          >
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "14px", fontWeight: "600", color: NAVY }}>
                {user?.name} {user?.surname || ""}
              </div>
              <div style={{ fontSize: "12px", color: MUTED }}>ID: 2026-UAMD</div>
            </div>
            
            <div style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "#E2E8F0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              color: NAVY
            }}>
              {user?.name?.[0]?.toUpperCase() || "A"}
            </div>
          </div>

          {isProfileOpen && (
            <div style={{
              position: "absolute",
              top: "60px",
              right: "32px",
              background: WHITE,
              border: `1px solid ${BORDER}`,
              borderRadius: "12px",
              width: "240px",
              boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
              zIndex: 100,
              padding: "16px"
            }}>
              <div style={{ marginBottom: "12px", paddingBottom: "12px", borderBottom: `1px solid ${BORDER}` }}>
                <p style={{ margin: 0, fontWeight: "bold", color: NAVY }}>{user?.name} {user?.surname || ""}</p>
                <p style={{ margin: 0, fontSize: "12px", color: MUTED }}>{user?.email}</p>
              </div>
              <button onClick={logout} style={{ 
                width: "100%", padding: "8px", borderRadius: "6px", border: "none", 
                background: "#F1F5F9", color: "#EF4444", fontWeight: "600", cursor: "pointer" 
              }}>
                Log Out
              </button>
            </div>
          )}
        </div>

        <div style={{ padding: "32px", flex: 1 }}>
          <h2 style={{ fontSize: "22px", fontWeight: "700", color: NAVY }}>Mirëserdhe, {user?.name}! 👋</h2>
          <div style={{ marginTop: "24px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
             {[1,2,3].map(i => (
               <div key={i} style={{ background: WHITE, height: "150px", borderRadius: "16px", border: `1px solid ${BORDER}` }}></div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;