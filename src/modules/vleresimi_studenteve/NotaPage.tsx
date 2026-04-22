import { useState } from "react";
import {
  Typography,
  Select,
  Table,
  InputNumber,
  Button,
  Tag,
  Card,
  Row,
  Col,
  Spin,
  message,
} from "antd";
import { SaveOutlined } from "@ant-design/icons";
import Layout from "../dashboard/DashboardLayout";
import { useGetLendet } from "../../hooks/vleresim/useGetLendet";
import { useGetSemestre } from "../../hooks/vleresim/useGetSemestre";
import { useGetStudents } from "../../hooks/vleresim/useGetStudents";
import { useUpdateVleresim } from "../../hooks/vleresim/useUpdateVleresim";
import { NAVY, MUTED } from "../../styles/common";

const { Title, Text } = Typography;

type Vleresim = {
  pik_midterm: number | null;
  pik_final: number | null;
  pik_detyra: number | null;
};

type Student = {
  regj_id: number;
  stu_id: string;
  stu_mb: string;
  stu_em: string;
  sek_grupi: string;
  regj_status: string;
  pik_midterm: number | null;
  pik_final: number | null;
  pik_detyra: number | null;
};

const NotaPage = () => {
  const [selectedLend, setSelectedLend] = useState<number | null>(null);
  const [selectedSem, setSelectedSem] = useState<number | null>(null);
  const [editedValues, setEditedValues] = useState<Record<number, Vleresim>>({});

  const { data: lendet, isLoading: loadingLendet } = useGetLendet();
  const { data: semestre, isLoading: loadingSemestre } = useGetSemestre(selectedLend);
  const { data: students, isLoading: loadingStudents } = useGetStudents(selectedLend, selectedSem);
  const { mutate: updateVleresim, isPending } = useUpdateVleresim();

  const handlePikChange = (
    regjId: number,
    field: "pik_midterm" | "pik_final" | "pik_detyra",
    value: number | null
  ) => {
    setEditedValues((prev: Record<number, Vleresim>) => ({
      ...prev,
      [regjId]: {
        ...prev[regjId],
        [field]: value,
      },
    }));
  };

  const handleSaveAll = () => {
    const entries = Object.entries(editedValues);
    if (entries.length === 0) return;
    entries.forEach(([regjId, data]) => {
      updateVleresim(
        { regjId: Number(regjId), data },
        {
          onSuccess: () => message.success("Notat u ruajtën me sukses!"),
          onError: () => message.error("Gabim gjatë ruajtjes!"),
        }
      );
    });
  };

  const statusColor = (status: string) => {
    if (status === "Kalon") return "green";
    if (status === "Mungon") return "orange";
    return "red";
  };

  const columns = [
    {
      title: "Studenti",
      key: "emri",
      render: (_: unknown, r: Student) => (
        <Text style={{ color: NAVY, fontWeight: 600 }}>
          {r.stu_mb} {r.stu_em}
        </Text>
      ),
    },
    {
      title: "ID",
      dataIndex: "stu_id",
      key: "stu_id",
      render: (val: string) => <Text style={{ color: MUTED }}>{val}</Text>,
    },
    {
      title: "Grup",
      dataIndex: "sek_grupi",
      key: "sek_grupi",
      render: (val: string) => <Tag color="blue">{val}</Tag>,
    },
    {
      title: "Midterm /500",
      key: "pik_midterm",
      render: (_: unknown, r: Student) => (
        <InputNumber
          min={0}
          max={500}
          value={editedValues[r.regj_id]?.pik_midterm ?? r.pik_midterm}
          onChange={(val) => handlePikChange(r.regj_id, "pik_midterm", val)}
          style={{ width: 90 }}
        />
      ),
    },
    {
      title: "Final /500",
      key: "pik_final",
      render: (_: unknown, r: Student) => (
        <InputNumber
          min={0}
          max={500}
          value={editedValues[r.regj_id]?.pik_final ?? r.pik_final}
          onChange={(val) => handlePikChange(r.regj_id, "pik_final", val)}
          style={{ width: 90 }}
        />
      ),
    },
    {
      title: "Detyrë /100",
      key: "pik_detyra",
      render: (_: unknown, r: Student) => (
        <InputNumber
          min={0}
          max={100}
          value={editedValues[r.regj_id]?.pik_detyra ?? r.pik_detyra}
          onChange={(val) => handlePikChange(r.regj_id, "pik_detyra", val)}
          style={{ width: 90 }}
        />
      ),
    },
    {
      title: "Total",
      key: "total",
      render: (_: unknown, r: Student) => {
        const m = editedValues[r.regj_id]?.pik_midterm ?? r.pik_midterm ?? 0;
        const f = editedValues[r.regj_id]?.pik_final ?? r.pik_final ?? 0;
        const d = editedValues[r.regj_id]?.pik_detyra ?? r.pik_detyra ?? 0;
        return <Text strong>{Number(m) + Number(f) + Number(d)}</Text>;
      },
    },
    {
      title: "Statusi",
      dataIndex: "regj_status",
      key: "regj_status",
      render: (val: string) => (
        <Tag color={statusColor(val)} style={{ borderRadius: 20, padding: "2px 12px" }}>
          {val}
        </Tag>
      ),
    },
  ];

  return (
    <Layout>
      <div style={{ padding: "32px" }}>
        <Title level={4} style={{ color: NAVY, marginBottom: 24 }}>
          Vlerësimi i Studentëve
        </Title>

        <Card
          bordered={false}
          style={{ borderRadius: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", marginBottom: 24 }}
        >
          <Row gutter={16} align="bottom">
            <Col>
              <Text style={{ display: "block", marginBottom: 6, color: NAVY, fontWeight: 600 }}>
                Lënda
              </Text>
              <Select
                placeholder="Zgjedh Lëndën"
                loading={loadingLendet}
                style={{ width: 260 }}
                onChange={(val) => {
                  setSelectedLend(val);
                  setSelectedSem(null);
                }}
                value={selectedLend}
                allowClear
              >
                {lendet?.map((l) => (
                  <Select.Option key={l.lend_id} value={l.lend_id}>
                    {l.lend_emer} ({l.lend_kod})
                  </Select.Option>
                ))}
              </Select>
            </Col>

            <Col>
              <Text style={{ display: "block", marginBottom: 6, color: NAVY, fontWeight: 600 }}>
                Semestri
              </Text>
              <Select
                placeholder="Zgjedh Semestrin"
                loading={loadingSemestre}
                style={{ width: 260 }}
                onChange={(val) => setSelectedSem(val)}
                value={selectedSem}
                disabled={!selectedLend}
                allowClear
              >
                {semestre?.map((s) => (
                  <Select.Option key={s.sem_id} value={s.sem_id}>
                    {s.vit_emer} — Semestri {s.sem_nr}
                  </Select.Option>
                ))}
              </Select>
            </Col>
          </Row>
        </Card>

        {loadingStudents ? (
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <Spin size="large" />
          </div>
        ) : (
          <>
            <Table<Student>
              dataSource={students ?? []}
              columns={columns}
              rowKey="regj_id"
              bordered
              pagination={false}
              style={{ borderRadius: 12, overflow: "hidden" }}
              locale={{
                emptyText:
                  selectedLend && selectedSem
                    ? "Nuk u gjetën studentë."
                    : "Zgjedh lëndën dhe semestrin.",
              }}
            />

            {students && students.length > 0 && (
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
                <Button
                  type="primary"
                  icon={<SaveOutlined />}
                  onClick={handleSaveAll}
                  loading={isPending}
                  disabled={Object.keys(editedValues).length === 0}
                 style={{
                    background:
                      Object.keys(editedValues).length === 0 ? "#b0b8c9" : NAVY,
                    border: "none",
                    borderRadius: 8,
                    height: 40,
                    paddingInline: 24,
                    opacity: Object.keys(editedValues).length === 0 ? 0.6 : 1,
                    cursor:
                      Object.keys(editedValues).length === 0
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  Ruaj të gjitha notat
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default NotaPage;
