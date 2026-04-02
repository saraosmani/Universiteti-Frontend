import { Button, Divider }    from "antd";
import { GoogleOutlined }     from "@ant-design/icons";
import { redirectToGoogle, type AuthResponse }  from "../../../api/authApi";
import type { CSSProperties } from "react";

interface GoogleButtonProps {
  onSuccess?: (data: AuthResponse) => void;
  onError?:   (error: Error)        => void;
  mode?:      "login" | "register";
}

const googleBtnStyle: CSSProperties = {
  borderColor: "rgba(196,164,100,0.2)",
  transition: "all 0.3s ease",
};

const googleBtnHoverStyle = `
  .google-auth-btn:hover {
    border-color: rgba(196,164,100,0.5) !important;
  }
`;

export default function GoogleButton({ onSuccess, onError, mode = "login" }: GoogleButtonProps) {
  return (
    <>
      <style>{googleBtnHoverStyle}</style>

      <Divider style={{ borderColor: "rgba(196,164,100,0.15)", color: "rgba(240,232,208,0.3)", fontSize: 11 }}>
        OSE VAZHDO ME
      </Divider>

      <Button
        size="large"
        block
        icon={<GoogleOutlined />}
        onClick={redirectToGoogle}
        className="google-auth-btn"
        style={googleBtnStyle}
      >
        {mode === "register" ? "Sign up with Google" : "Sign in with Google"}
      </Button>
    </>
  );
}