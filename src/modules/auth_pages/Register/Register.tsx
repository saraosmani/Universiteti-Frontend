import { Form, Input, Button, Select }      from "antd";
import {
  UserOutlined, MailOutlined, LockOutlined,
} from "@ant-design/icons";
import { useState }                         from "react";
import { inputStyle, primaryBtnStyle }      from "../../../styles/common";
import type { AuthResponse }                from "../../../api/authApi";
import { COUNTRIES }                        from "../utils/countries";
import { RegisterFormValues }               from "../definitions";
import { DIGITS_RE } from "../utils/validation";
import { useRegister } from "../../../hooks/auth/useRegister";

interface RegisterFormProps {
  onSuccess?: (data: AuthResponse) => void;
  onError?:   (error: Error)        => void;
}

const RegisterForm = ({ onSuccess, onError }: RegisterFormProps) => {
  const [form]     = Form.useForm<RegisterFormValues>();
  const [dialCode, setDialCode] = useState("355"); 
  const { mutate: register, isPending } = useRegister({ onSuccess, onError });

  const handleCountryChange = (value: string) => {
    const found = COUNTRIES.find((c) => c.value === value);
    if (found?.dialCode) setDialCode(found.dialCode);
  };

  const handleFinish = ({
    name, surname, email, password, phone_number, country, role,
  }: RegisterFormValues) => {
    const fullPhone = `+${dialCode}${phone_number.replace(/\s/g, "")}`;
    register({ name, surname, email, password, phone_number: fullPhone, country, role });
  };

  const dialSelector = (
    <Select
      value={dialCode}
      onChange={setDialCode}
      showSearch
      style={{ width: 105 }}
      popupMatchSelectWidth={240}
      filterOption={(input, option) =>
        (option?.searchLabel ?? "").toLowerCase().includes(input.toLowerCase())
      }
      options={COUNTRIES.map((c) => ({
        value:       c.dialCode,
        label:       `${c.flag} +${c.dialCode}`,
        searchLabel: `${c.label} +${c.dialCode}`,
      }))}
      optionRender={(option) => (
        <span style={{ fontSize: 13 }}>
          {option.data.label}&nbsp;
          <span style={{ opacity: 0.5, fontSize: 11 }}>
            {COUNTRIES.find((c) => c.dialCode === option.value)?.label}
          </span>
        </span>
      )}
    />
  );

  return (
    <Form<RegisterFormValues>
      form={form}
      layout="vertical"
      requiredMark={false}
      onFinish={handleFinish}
    >
      {/* Name */}
      <Form.Item
        name="name"
        rules={[{ required: true, message: "Ju lutem shkruani emrin tuaj" }]}
        style={{ marginBottom: 20 }}
      >
        <Input
          prefix={<UserOutlined style={{ color: "rgba(196,164,100,0.5)" }} />}
          placeholder="Emri"
          size="large"
          style={inputStyle}
        />
      </Form.Item>

      {/* Surname */}
      <Form.Item
        name="surname"
        rules={[{ required: true, message: "Ju lutem shkruani mbiemrin tuaj" }]}
        style={{ marginBottom: 20 }}
      >
        <Input
          prefix={<UserOutlined style={{ color: "rgba(196,164,100,0.5)" }} />}
          placeholder="Mbiemri"
          size="large"
          style={inputStyle}
        />
      </Form.Item>

      {/* Email */}
      <Form.Item
        name="email"
        rules={[{ required: true, type: "email", message: "Ju lutem shkruani email-in tuaj institucional" }]}
        style={{ marginBottom: 20 }}
      >
        <Input
          prefix={<MailOutlined style={{ color: "rgba(196,164,100,0.5)" }} />}
          placeholder="Email Institucional"
          size="large"
          style={inputStyle}
        />
      </Form.Item>

      {/* Country — also updates dial code */}
      <Form.Item
        name="country"
        rules={[{ required: true, message: "Ju lutem zgjidhni vendin tuaj" }]}
        style={{ marginBottom: 20 }}
      >
        <Select
          showSearch
          placeholder="Shteti"
          size="large"
          style={{ height: "auto" }}
          onChange={handleCountryChange}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={COUNTRIES.map((c) => ({
            value: c.value,
            label: `${c.flag}  ${c.label}`,
          }))}
        />
      </Form.Item>

      {/* Phone — addonBefore = dial code selector */}
      <Form.Item
        name="phone_number"
        rules={[
          { required: true, message: "Ju lutem shkruani numrin tuaj të telefonit" },
          {
            validator(_, value: string) {
              const digits = (value ?? "").replace(/\s/g, "");
              if (!digits || DIGITS_RE.test(digits)) return Promise.resolve();
              return Promise.reject(
                new Error("Shkruani vetëm shifrat e numrit (pa kodin e vendit)")
              );
            },
          },
        ]}
        style={{ marginBottom: 20 }}
      >
        <Input
          addonBefore={dialSelector}
          placeholder="681234567"
          size="large"
          // style={inputStyle}
          maxLength={14}
        />
      </Form.Item>

      {/* Role */}
      <Form.Item
        name="role"
        rules={[{ required: true, message: "Ju lutem zgjidhni rolin tuaj" }]}
        style={{ marginBottom: 20 }}
      >
        <Select
          placeholder="Zgjidhni Rolin"
          size="large"
          style={{ height: "auto" }}
          options={[
            { value: "student",       label: "Student"       },
            { value: "pedagog",       label: "Pedagog"       },
            { value: "administrator", label: "Administrator" },
          ]}
        />
      </Form.Item>

      {/* Password */}
      <Form.Item
        name="password"
        rules={[{ required: true, min: 8, message: "Minimumi 8 karaktere" }]}
        style={{ marginBottom: 20 }}
      >
        <Input.Password
          prefix={<LockOutlined style={{ color: "rgba(196,164,100,0.5)" }} />}
          placeholder="Fjalëkalimi"
          size="large"
          style={inputStyle}
        />
      </Form.Item>

      {/* Confirm password */}
      <Form.Item
        name="confirmPassword"
        dependencies={["password"]}
        rules={[
          { required: true, message: "Ju lutem konfirmoni fjalëkalimin tuaj" },
          ({ getFieldValue }) => ({
            validator(_, value: string) {
              if (!value || getFieldValue("password") === value)
                return Promise.resolve();
              return Promise.reject(new Error("Fjalëkalimet nuk përputhen"));
            },
          }),
        ]}
        style={{ marginBottom: 28 }}
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
}

export default RegisterForm;