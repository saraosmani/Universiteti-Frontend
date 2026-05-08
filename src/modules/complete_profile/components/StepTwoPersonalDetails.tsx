import { useEffect } from "react";
import { Button, DatePicker, Form, Select } from "antd";
import { GENDERS, StepTwoValues, TITLES } from "../definitions";
import { BORDER, NAVY, primaryBtnStyle } from "../../../styles/common";

const StepPersonalDetails = ({
  onBack,
  onFinish,
  isLoading,
  serverErrors,
}: {
  onBack: () => void;
  onFinish: (values: StepTwoValues) => void;
  isLoading: boolean;
  serverErrors: Record<string, string[]>;
}) => {
  const [form] = Form.useForm<StepTwoValues>();

  // Sa herë që vijnë errors të reja nga serveri, seto ato në fushat e formit
  useEffect(() => {
    if (!serverErrors || Object.keys(serverErrors).length === 0) return;

   const fields = Object.entries(serverErrors).map(([name, messages]) => ({
  name: name as keyof StepTwoValues,
  errors: messages,
}));

    form.setFields(fields);
  }, [serverErrors, form]);

  return (
    <Form form={form} layout="vertical" requiredMark={false} onFinish={onFinish}>
      <p style={{ fontSize: 13, color: "#888", marginBottom: 20, lineHeight: 1.6 }}>
        Plotësoni të dhënat tuaja personale për të finalizuar profilin akademik.
      </p>

      <Form.Item
        name="ped_tit"
        label={<span style={{ fontSize: 13, color: NAVY, fontWeight: 600 }}>Titulli Akademik</span>}
        rules={[{ required: true, message: "Zgjidhni titullin" }]}
        style={{ marginBottom: 16 }}
      >
        <Select
          placeholder="Zgjidhni titullin..."
          size="large"
          style={{ height: 44 }}
          options={TITLES}
        />
      </Form.Item>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
        <Form.Item
          name="ped_gjin"
          label={<span style={{ fontSize: 13, color: NAVY, fontWeight: 600 }}>Gjinia</span>}
          rules={[{ required: true, message: "Zgjidhni gjininë" }]}
          style={{ marginBottom: 16 }}
        >
          <Select
            placeholder="Gjinia..."
            size="large"
            style={{ height: 44 }}
            options={GENDERS}
          />
        </Form.Item>

        <Form.Item
          name="ped_dl"
          label={<span style={{ fontSize: 13, color: NAVY, fontWeight: 600 }}>Data e Lindjes</span>}
          rules={[{ required: true, message: "Zgjidhni datën e lindjes" }]}
          style={{ marginBottom: 24 }}
        >
          <DatePicker
            size="large"
            style={{ width: "100%", height: 44 }}
            placeholder="DD/MM/YYYY"
            format="DD/MM/YYYY"
            disabledDate={(d) => d && d.isAfter(new Date())}
          />
        </Form.Item>
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        <Button
          size="large"
          onClick={onBack}
          style={{ flex: 1, height: 46, borderColor: BORDER, color: NAVY, fontWeight: 600, letterSpacing: "0.06em" }}
        >
          PRAPA
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          loading={isLoading}
          style={{ ...primaryBtnStyle, flex: 2 }}
        >
          PËRFUNDO
        </Button>
      </div>
    </Form>
  );
};

export default StepPersonalDetails;