import { Button, Form, Select, Spin } from "antd";
import { useGetDepartaments } from "../../../hooks/departament/useGetDepartaments";
import { StepOneValues } from "../definitions";
import { inputStyle, NAVY, primaryBtnStyle } from "../../../styles/common";

const StepDepartament = ({
  onNext,
}: {
  onNext: (values: StepOneValues) => void;
}) => {
  const [form] = Form.useForm<StepOneValues>();
  const { data: departaments, isLoading } = useGetDepartaments();

  return (
    <Form form={form} layout="vertical" requiredMark={false} onFinish={onNext}>
      <p
        style={{
          fontSize: 13,
          color: NAVY,
          marginBottom: 20,
          lineHeight: 1.6,
        }}
      >
        Zgjidhni departamentin ku ju jeni i/e angazhuar. Ky informacion është i
        nevojshëm për organizimin e orareve dhe kurseve.
      </p>

      <Form.Item
        name="dep_id"
        label={
          <span style={{ fontSize: 13, color: NAVY, fontWeight: 600 }}>
            Departamenti
          </span>
        }
        rules={[{ required: true, message: "Zgjidhni departamentin" }]}
        style={{ marginBottom: 24 }}
      >
        <Select
          placeholder="Zgjidhni departamentin..."
          size="large"
          loading={isLoading}
          notFoundContent={
            isLoading ? <Spin size="small" /> : "Nuk u gjet asnjë departament"
          }
          style={{ height: 44 }}
          options={departaments?.map(
            (d: { dep_id: string; dep_em: string }) => ({
              value: d.dep_id,
              label: d.dep_em,
            }),
          )}
        />
      </Form.Item>

      <Form.Item style={{ marginBottom: 0 }}>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          block
          style={primaryBtnStyle}
        >
          VAZHDO
        </Button>
      </Form.Item>
    </Form>
  );
};

export default StepDepartament;
