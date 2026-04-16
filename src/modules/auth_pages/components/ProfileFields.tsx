import { Form, Input, Select } from "antd";
import type { FormInstance } from "antd";
import { COUNTRIES } from "../utils/countries";
import { DIGITS_RE } from "../utils/validation";

interface ProfileFieldsProps {
  form: FormInstance;
  dialCode: string;
  setDialCode: (v: string) => void;
  role: string | null;
  setRole: (v: string | null) => void;
  onCountryChange: (v: string) => void;
}

const ProfileFields = ({
  form,
  dialCode,
  setDialCode,
  role,
  setRole,
  onCountryChange,
}: ProfileFieldsProps) => {

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
        value: c.dialCode,
        label: `${c.flag} +${c.dialCode}`,
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
    <>
      {/* Row 1: Country + Birth Date */}
     
        <Form.Item
          name="country"
          rules={[{ required: true, message: "Zgjidhni vendin" }]}
          style={{ marginBottom: 16 }}
        >
          <Select
            showSearch
            placeholder="Shteti"
            size="large"
            onChange={onCountryChange}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={COUNTRIES.map((c) => ({
              value: c.value,
              label: `${c.flag}  ${c.label}`,
            }))}
          />
        </Form.Item>

    

      {/* Phone — full width */}
      <Form.Item
        name="phone_number"
        rules={[
          { required: true, message: "Shkruani numrin tuaj të telefonit" },
          {
            validator(_, value: string) {
              const digits = (value ?? "").replace(/\s/g, "");
              if (!digits || DIGITS_RE.test(digits)) return Promise.resolve();
              return Promise.reject(
                new Error("Vetëm shifra (pa kodin e vendit)")
              );
            },
          },
        ]}
        style={{ marginBottom: 16 }}
      >
        <Input
          addonBefore={dialSelector}
          placeholder="681234567"
          size="large"
          maxLength={14}
        />
      </Form.Item>

    
        <Form.Item
          name="role"
          rules={[{ required: true, message: "Zgjidhni rolin" }]}
          style={{ marginBottom: 16 }}
        >
          <Select
            placeholder="Zgjidhni Rolin"
            size="large"
            onChange={(value) => {
              setRole(value);
              form.resetFields(["ped_tit"]);
            }}
            options={[
              { value: "student",       label: "Student"       },
              { value: "pedagog",       label: "Pedagog"       },
              { value: "administrator", label: "Administrator" },
            ]}
          />
        </Form.Item>

    </>
  );
};

export default ProfileFields;