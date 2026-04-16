import { Button, DatePicker, Form, Select } from "antd";
import { GENDERS, StepTwoValues, TITLES } from "../definitions";
import { BORDER, inputStyle, NAVY, primaryBtnStyle } from "../../../styles/common";

const StepPersonalDetails = ({
  onBack,
  onFinish,
  isLoading,
}: {
  onBack: () => void;
  onFinish: (values: StepTwoValues) => void;
  isLoading: boolean;
}) => {
  const [form] = Form.useForm<StepTwoValues>();

  return (
    <Form form={form} layout="vertical" requiredMark={false} onFinish={onFinish}>
      <p
        style={{
          fontSize: 13,
          color: "#888",
          marginBottom: 20,
          lineHeight: 1.6,
        }}
      >
        Plotësoni të dhënat tuaja personale për të finalizuar profilin akademik.
      </p>

      {/* Title */}
      <Form.Item
        name="ped_tit"
        label={
          <span style={{ fontSize: 13, color: NAVY, fontWeight: 600 }}>
            Titulli Akademik
          </span>
        }
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

      {/* Gender + Birth date in a row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0 16px",
        }}
      >
        <Form.Item
          name="ped_gjin"
          label={
            <span style={{ fontSize: 13, color: NAVY, fontWeight: 600 }}>
              Gjinia
            </span>
          }
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
          label={
            <span style={{ fontSize: 13, color: NAVY, fontWeight: 600 }}>
              Data e Lindjes
            </span>
          }
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

      {/* Actions */}
      <div style={{ display: "flex", gap: 12 }}>
        <Button
          size="large"
          onClick={onBack}
          style={{
            flex: 1,
            height: 46,
            borderColor: BORDER,
            color: NAVY,
            fontWeight: 600,
            letterSpacing: "0.06em",
          }}
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