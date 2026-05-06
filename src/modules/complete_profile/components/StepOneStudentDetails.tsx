import { Button, DatePicker, Form, Input, Select } from "antd";
import { GENDERS, StepTwoStudentValues } from "../definitions";
import { BORDER, NAVY, primaryBtnStyle } from "../../../styles/common";

const StepOneStudentDetails = ({
  onBack,
  onFinish,
  isLoading,
}: {
  onBack: () => void;
  onFinish: (values: StepTwoStudentValues) => void;
  isLoading: boolean;
}) => {
  const [form] = Form.useForm<StepTwoStudentValues>();

  return (
    <Form
      form={form}
      layout="vertical"
      requiredMark={false}
      onFinish={onFinish}
    >
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

      {/* Atesia */}
      <Form.Item
        name="stu_atesi"
        rules={[{ required: true, message: "Shkruani atesinë" }]}
        style={{ marginBottom: 16 }}
      >
        <Input placeholder="Atësia" size="large" />
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
          name="stu_gjini"
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
          name="stu_dl"
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

export default StepOneStudentDetails;
