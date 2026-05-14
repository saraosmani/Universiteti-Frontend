import { Form, Input, Button } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { inputStyle, primaryBtnStyle } from  "../../../styles/common";
import type { AuthResponse }   from "../../../api/authApi";
import { useLogin } from "../../../hooks/auth/useLogin";
import { LoginFormValues } from "../definitions";

interface LoginFormProps {
  onSuccess?: (data: AuthResponse) => void;
  onError?:   (error: Error)        => void;
}

const LoginForm = ({ onSuccess, onError }: LoginFormProps) => {
  const [form] = Form.useForm<LoginFormValues>();
  const { mutate: login, isPending } = useLogin({ onSuccess, onError });

  return (
    <Form<LoginFormValues>
      form={form}
      layout="vertical"
      requiredMark={false}
      onFinish={login}
    >
      <Form.Item
        name="email"
        rules={[{ required: true, type: "email", message: "Valid institutional email required" }]}
        style={{ marginBottom: 20 }}
      >
        <Input
          prefix={<MailOutlined style={{ color: "rgba(196,164,100,0.5)" }} />}
          placeholder="Institutional Email"
          size="large"
          style={inputStyle}
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, min: 6, message: "Minimum 6 characters" }]}
        style={{ marginBottom: 8 }}
      >
        <Input.Password
          prefix={<LockOutlined style={{ color: "rgba(196,164,100,0.5)" }} />}
          placeholder="Password"
          size="large"
          style={inputStyle}
        />
      </Form.Item>

      <div style={{ textAlign: "right", marginBottom: 24 }}>
        <span style={{ color: "rgba(196,164,100,0.6)", fontSize: 13, cursor: "pointer" }}>
          Forgot password?
        </span>
      </div>

      <Form.Item style={{ marginBottom: 0 }}>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          block
          loading={isPending}
          style={primaryBtnStyle}
        >
          SIGN IN
        </Button>
      </Form.Item>
    </Form>
  );
}

export default LoginForm;