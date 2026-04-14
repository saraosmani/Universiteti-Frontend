import { Form, Input, Select, DatePicker } from "antd";
import type { FormInstance } from "antd";
import { COUNTRIES } from "../utils/countries";
import { DIGITS_RE } from "../utils/validation";

const PEDAGOG_TITLES = [
  { value: "Msc.",        label: "Msc."        },
  { value: "Dr.",         label: "Dr."         },
  { value: "Prof.Dr.",    label: "Prof.Dr."    },
  { value: "Prof.As.Dr.", label: "Prof.As.Dr." },
  { value: "Doc.",        label: "Doc."        },
];

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
  const colStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "0 16px",
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
      <div style={colStyle}>
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

        <Form.Item
          name="birth_date"
          rules={[{ required: true, message: "Zgjidhni datëlindjen" }]}
          style={{ marginBottom: 16 }}
        >
          <DatePicker
            size="large"
            style={{ width: "100%" }}
            placeholder="Datëlindja"
            format="DD/MM/YYYY"
          />
        </Form.Item>
      </div>

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

      {/* Row 2: Role + Gender */}
      <div style={colStyle}>
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

        <Form.Item
          name="gender"
          rules={[{ required: true, message: "Zgjidhni gjininë" }]}
          style={{ marginBottom: 16 }}
        >
          <Select
            placeholder="Gjinia"
            size="large"
            options={[
              { value: "M", label: "Mashkull" },
              { value: "F", label: "Femër"    },
            ]}
          />
        </Form.Item>
      </div>

      {/* Pedagog Title — full width, conditional */}
      {role === "pedagog" && (
        <Form.Item
          name="ped_tit"
          rules={[{ required: true, message: "Zgjidhni titullin" }]}
          style={{ marginBottom: 16 }}
        >
          <Select
            placeholder="Titulli Akademik"
            size="large"
            options={PEDAGOG_TITLES}
          />
        </Form.Item>
      )}
    </>
  );
};

export default ProfileFields;