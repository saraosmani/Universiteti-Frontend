import React, { useState } from "react";
import { useLogout } from "../../hooks/auth/useLogout";
import { useCurrentUser } from "../../hooks/auth/useGetCurrentUser";
import { BORDER, MUTED, NAVY, WHITE } from "../../styles/colors";
import { useNavigate } from "react-router-dom";
import {
  DashboardOutlined,
  CalendarOutlined,
  FileTextOutlined,
  BookOutlined,
  BarChartOutlined,
  ReadOutlined,
  CheckSquareOutlined,
  DollarOutlined,
  NotificationOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

const SIDEBAR_DARK = "#0B1120";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { data: userData } = useCurrentUser();
  const user = userData as any;
  const logout = useLogout();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const menuSections = [
    { title: "AKADEMIKE", items: [
      { label: "Orari", icon: <CalendarOutlined />, path: "/orari" },
      { label: "Provime", icon: <FileTextOutlined />, path: "/provime" },
      { label: "Detyrat", icon: <BookOutlined />, path: "/detyrat" },
      { label: "Raporti i Notave", icon: <BarChartOutlined />, path: "/nota" },
      { label: "Lëndët e Regjistruara", icon: <ReadOutlined />, path: "/lendet" },
      { label: "Prezenca", icon: <CheckSquareOutlined />, path: "/prezenca" },
    ]},
    { title: "ADMINISTRATIVE", items: [
      { label: "Financat", icon: <DollarOutlined />, path: "/financa" },
      { label: "Njoftimet", icon: <NotificationOutlined />, path: "/njoftime" },
    ]},
    { title: "CILËSIMET", items: [
      { label: "Cilësimet e Llogarisë", icon: <SettingOutlined />, path: "/cilesimet" },
    ]},
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

        <div onClick={() => navigate("/dashboard")} style={{
          background: "rgba(255,255,255,0.1)",
          color: WHITE,
          margin: "0 12px 20px",
          padding: "10px 12px",
          borderRadius: "8px",
          fontSize: "14px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          cursor: "pointer"
        }}>
          <DashboardOutlined />
          Paneli Kryesor
        </div>

        {menuSections.map((section, idx) => (
          <div key={idx} style={{ marginBottom: "20px" }}>
            <div style={{ padding: "0 24px 8px", fontSize: "11px", fontWeight: "600", color: "#475569" }}>
              {section.title}
            </div>
            {section.items.map((item, i) => (
              <div key={i} onClick={() => navigate(item.path)} style={{
                padding: "8px 24px",
                fontSize: "13px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "10px"
              }}>
                {item.icon}
                {item.label}
              </div>
            ))}
          </div>
        ))}

        <div onClick={logout} style={{
          marginTop: "auto",
          padding: "20px 24px",
          cursor: "pointer",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          alignItems: "center",
          gap: "10px"
        }}>
          <LogoutOutlined />
          Dil
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
          <div style={{ color: MUTED, fontSize: "14px" }}>Kërko...</div>

          <div onClick={() => setIsProfileOpen(!isProfileOpen)}
            style={{ display: "flex", alignItems: "center", cursor: "pointer", gap: "12px" }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "14px", fontWeight: "600", color: NAVY }}>
                {user?.name} {user?.surname || ""}
              </div>
              <div style={{ fontSize: "12px", color: MUTED }}>ID: 2026-UAMD</div>
            </div>
            <div style={{
              width: "36px", height: "36px", borderRadius: "50%",
              background: "#E2E8F0", display: "flex", alignItems: "center",
              justifyContent: "center", fontWeight: "bold", color: NAVY
            }}>
              {user?.name?.[0]?.toUpperCase() || "A"}
            </div>
          </div>

          {isProfileOpen && (
            <div style={{
              position: "absolute", top: "60px", right: "32px",
              background: WHITE, border: `1px solid ${BORDER}`,
              borderRadius: "12px", width: "240px",
              boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
              zIndex: 100, padding: "16px"
            }}>
              <div style={{ marginBottom: "12px", paddingBottom: "12px", borderBottom: `1px solid ${BORDER}` }}>
                <p style={{ margin: 0, fontWeight: "bold", color: NAVY }}>{user?.name} {user?.surname || ""}</p>
                <p style={{ margin: 0, fontSize: "12px", color: MUTED }}>{user?.email}</p>
              </div>
              <button onClick={logout} style={{
                width: "100%", padding: "8px", borderRadius: "6px",
                border: "none", background: "#F1F5F9", color: "#EF4444",
                fontWeight: "600", cursor: "pointer"
              }}>
                Dalo
              </button>
            </div>
          )}
        </div>

        <div style={{ padding: "32px", flex: 1 }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;