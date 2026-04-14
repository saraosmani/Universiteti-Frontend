import { Form, Input, Button } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { useState } from "react";
import { inputStyle, primaryBtnStyle } from "../../../styles/common";
import type { AuthResponse } from "../../../api/authApi";
import { COUNTRIES } from "../utils/countries";
import { RegisterFormValues } from "../definitions";
import { useRegister } from "../../../hooks/auth/useRegister";
import ProfileFields from "../components/ProfileFields";

interface RegisterFormProps {
  onSuccess?: (data: AuthResponse) => void;
  onError?: (error: Error) => void;
}

const colStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "0 16px",
};

const RegisterForm = ({ onSuccess, onError }: RegisterFormProps) => {
  const [form] = Form.useForm<RegisterFormValues>();
  const [dialCode, setDialCode] = useState("355");
  const [role, setRole] = useState<string | null>(null);
  const { mutate: register, isPending } = useRegister({ onSuccess, onError });

  const handleCountryChange = (value: string) => {
    const found = COUNTRIES.find((c) => c.value === value);
    if (found?.dialCode) setDialCode(found.dialCode);
  };

  const handleFinish = ({
    name, surname, email, password, phone_number, country, role, gender, birth_date, ped_tit,
  }: RegisterFormValues) => {
    const fullPhone = `+${dialCode}${phone_number.replace(/\s/g, "")}`;
    register({ name, surname, email, password, phone_number: fullPhone, country, role, gender, birth_date, ped_tit });
  };

  return (
    <Form<RegisterFormValues>
      form={form}
      layout="vertical"
      requiredMark={false}
      onFinish={handleFinish}
    >
      {/* Row 1: Name + Surname */}
      <div style={colStyle}>
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Shkruani emrin" }]}
          style={{ marginBottom: 16 }}
        >
          <Input
            prefix={<UserOutlined style={{ color: "rgba(196,164,100,0.5)" }} />}
            placeholder="Emri"
            size="large"
            style={inputStyle}
          />
        </Form.Item>

        <Form.Item
          name="surname"
          rules={[{ required: true, message: "Shkruani mbiemrin" }]}
          style={{ marginBottom: 16 }}
        >
          <Input
            prefix={<UserOutlined style={{ color: "rgba(196,164,100,0.5)" }} />}
            placeholder="Mbiemri"
            size="large"
            style={inputStyle}
          />
        </Form.Item>
      </div>

      {/* Email — full width */}
      <Form.Item
        name="email"
        rules={[{ required: true, type: "email", message: "Shkruani email-in" }]}
        style={{ marginBottom: 16 }}
      >
        <Input
          prefix={<MailOutlined style={{ color: "rgba(196,164,100,0.5)" }} />}
          placeholder="Email Institucional"
          size="large"
          style={inputStyle}
        />
      </Form.Item>

      {/* Shared profile fields */}
      <ProfileFields
        form={form}
        dialCode={dialCode}
        setDialCode={setDialCode}
        role={role}
        setRole={setRole}
        onCountryChange={handleCountryChange}
      />

      {/* Password + Confirm */}
      <Form.Item
        name="password"
        rules={[{ required: true, min: 8, message: "Minimumi 8 karaktere" }]}
        style={{ marginBottom: 16 }}
      >
        <Input.Password
          prefix={<LockOutlined style={{ color: "rgba(196,164,100,0.5)" }} />}
          placeholder="Fjalëkalimi"
          size="large"
          style={inputStyle}
        />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        dependencies={["password"]}
        rules={[
          { required: true, message: "Konfirmoni fjalëkalimin" },
          ({ getFieldValue }) => ({
            validator(_, value: string) {
              if (!value || getFieldValue("password") === value)
                return Promise.resolve();
              return Promise.reject(new Error("Fjalëkalimet nuk përputhen"));
            },
          }),
        ]}
        style={{ marginBottom: 24 }}
      >
        <Input.Password
          prefix={<LockOutlined style={{ color: "rgba(196,164,100,0.5)" }} />}
          placeholder="Konfirmo Fjalëkalimin"
          size="large"
          style={inputStyle}
        />
      </Form.Item>

      <Form.Item style={{ marginBottom: 0 }}>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          block
          loading={isPending}
          style={primaryBtnStyle}
        >
          KRIJO LLOGARINË
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;