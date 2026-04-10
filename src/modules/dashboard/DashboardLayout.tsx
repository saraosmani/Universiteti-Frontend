import React from "react";
import { useLogout } from "../../hooks/auth/useLogout";
import { useCurrentUser } from "../../hooks/auth/useGetCurrentUser";
import { BORDER, MUTED, NAVY, WHITE } from "../../styles/colors";
import { useNavigate, useLocation } from "react-router-dom";
import {
Layout as AntLayout,
Menu,
Avatar,
Dropdown,
} from "antd";
import type { MenuProps } from "antd";
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
SearchOutlined,
} from "@ant-design/icons";

const { Sider, Header, Content } = AntLayout;
const SIDEBAR_DARK = "#0B1120";

const Layout = ({ children }: { children: React.ReactNode }) => {
const { data: userData } = useCurrentUser();
const user = userData as any;
const logout = useLogout();
const navigate = useNavigate();
const location = useLocation();

const selectedKey = location.pathname;

const menuItems: MenuProps["items"] = [
{
key: "/dashboard",
icon: <DashboardOutlined />,
label: "Paneli Kryesor",
onClick: () => navigate("/dashboard"),
style: { marginBottom: 8 },
},
{
type: "group",
label: "AKADEMIKE",
children: [
{
key: "/orari",
icon: <CalendarOutlined />,
label: "Orari",
onClick: () => navigate("/orari"),
},
{
key: "/provime",
icon: <FileTextOutlined />,
label: "Provime",
onClick: () => navigate("/provime"),
},
{
key: "/detyrat",
icon: <BookOutlined />,
label: "Detyrat",
onClick: () => navigate("/detyrat"),
},
{
key: "/nota",
icon: <BarChartOutlined />,
label: "Raporti i Notave",
onClick: () => navigate("/nota"),
},
{
key: "/lendet",
icon: <ReadOutlined />,
label: "Lëndët e Regjistruara",
onClick: () => navigate("/lendet"),
},
{
key: "/prezenca",
icon: <CheckSquareOutlined />,
label: "Prezenca",
onClick: () => navigate("/prezenca"),
},
],
},
{
type: "group",
label: "ADMINISTRATIVE",
children: [
{
key: "/financa",
icon: <DollarOutlined />,
label: "Financat",
onClick: () => navigate("/financa"),
},
{
key: "/njoftime",
icon: <NotificationOutlined />,
label: "Njoftimet",
onClick: () => navigate("/njoftime"),
},
],
},
{
type: "group",
label: "CILËSIMET",
children: [
{
key: "/cilesimet",
icon: <SettingOutlined />,
label: "Cilësimet e Llogarisë",
onClick: () => navigate("/cilesimet"),
},
],
},
];

const profileDropdownItems: MenuProps["items"] = [
{
key: "info",
label: (
<div style={{ padding: "4px 0" }}>
<div style={{ fontWeight: 600, color: NAVY }}>
{user?.name} {user?.surname || ""}
</div>
<div style={{ fontSize: 12, color: MUTED }}>{user?.email}</div>
</div>
),
disabled: true,
},
{ type: "divider" },
{
key: "logout",
icon: <LogoutOutlined style={{ color: "#EF4444" }} />,
label: <span style={{ color: "#EF4444", fontWeight: 600 }}>Dil</span>,
onClick: logout,
},
];

return (
<AntLayout style={{ minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
{/* ── Sidebar ── */}
<Sider
width={240}
style={{
background: SIDEBAR_DARK,
position: "sticky",
top: 0,
height: "100vh",
overflow: "auto",
display: "flex",
flexDirection: "column",
}}
>
{/* Logo / University name */}
<div
style={{
padding: "20px 24px 28px",
color: WHITE,
fontWeight: 700,
fontSize: 17,
letterSpacing: "-0.2px",
lineHeight: 1.3,
}}
>
Aleksander Moisiu
</div>

{/* Navigation menu */}
<Menu
mode="inline"
selectedKeys={[selectedKey]}
items={menuItems}
style={{
background: "transparent",
border: "none",
flex: 1,
}}
theme="dark"
/>

{/* Logout at bottom */}
<div
onClick={logout}
style={{
padding: "16px 24px",
borderTop: "1px solid rgba(255,255,255,0.06)",
color: "#94A3B8",
fontSize: 13,
cursor: "pointer",
display: "flex",
alignItems: "center",
gap: 10,
transition: "color 0.2s",
}}
onMouseEnter={(e) =>
(e.currentTarget.style.color = WHITE)
}
onMouseLeave={(e) =>
(e.currentTarget.style.color = "#94A3B8")
}
>
<LogoutOutlined />
Dil
</div>
</Sider>

{/* ── Main area ── */}
<AntLayout>
{/* Header */}
<Header
style={{
background: WHITE,
padding: "0 32px",
height: 64,
lineHeight: "64px",
borderBottom: `1px solid ${BORDER}`,
display: "flex",
alignItems: "center",
justifyContent: "space-between",
position: "sticky",
top: 0,
zIndex: 10,
}}
>
{/* Search hint */}
<div
style={{
display: "flex",
alignItems: "center",
gap: 8,
color: MUTED,
fontSize: 14,
cursor: "text",
}}
>
<SearchOutlined />
Kërko...
</div>

{/* Profile dropdown */}
<Dropdown
menu={{ items: profileDropdownItems }}
trigger={["click"]}
placement="bottomRight"
overlayStyle={{ minWidth: 220 }}
>
<div
style={{
display: "flex",
flexDirection: "row",
alignItems: "center",
gap: 12,
cursor: "pointer",
lineHeight: 1,
}}
>
<div style={{ textAlign: "right", display: "flex", flexDirection: "column", gap: 2 }}>
<span style={{ fontSize: 14, fontWeight: 600, color: NAVY, whiteSpace: "nowrap" }}>
{user?.name} {user?.surname || ""}
</span>
<span style={{ fontSize: 12, color: MUTED, whiteSpace: "nowrap" }}>
ID: 2026-UAMD
</span>
</div>
<Avatar
style={{
background: "#E2E8F0",
color: NAVY,
fontWeight: 700,
flexShrink: 0,
}}
size={36}
>
{user?.name?.[0]?.toUpperCase() || "A"}
</Avatar>
</div>
</Dropdown>
</Header>

{/* Page content */}
<Content
style={{
padding: 32,
background: "#F8FAFC",
minHeight: "calc(100vh - 64px)",
}}
>
{children}
</Content>
</AntLayout>
</AntLayout>
);
};

export default Layout;