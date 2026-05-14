import React, { useMemo } from "react";
import { Alert, Empty, Spin } from "antd";
import Layout from "../dashboard/DashboardLayout";
import { useSeksionetAktive, Seksion } from "../../hooks/seksion/useSeksionetAktive";
import { DAYS } from "./components/orariConstants";
import OrariHeader from "./components/OrariHeader";
import OrariLegend from "./components/OrariLegend";
import OrariTimetable from "./components/OrariTimetable";

const OrariPage: React.FC = () => {
  const { data: seksionet = [], isLoading, error } = useSeksionetAktive();

  const semLabel =
    seksionet.length > 0
      ? `Semestri ${seksionet[0].semestri.nr} · ${seksionet[0].semestri.vit}`
      : "";

  const byDay = useMemo(() => {
    const map: Record<string, Seksion[]> = {};
    DAYS.forEach((d) => { map[d] = []; });
    seksionet.forEach((s) => {
      if (map[s.dita]) map[s.dita].push(s);
    });
    return map;
  }, [seksionet]);

  if (isLoading) {
    return (
      <Layout>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 80 }}>
          <Spin size="large" tip="Duke ngarkuar orarin..." />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Alert
          type="error"
          showIcon
          message="Gabim"
          description="Nuk u arrit të ngarkohej orari. Ju lutem provoni përsëri."
          style={{ marginTop: 40 }}
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <OrariHeader semLabel={semLabel} />
      <OrariLegend />
      <OrariTimetable byDay={byDay} />
      {seksionet.length === 0 && (
        <Empty description="Nuk ka orare për semestrin aktiv" style={{ marginTop: 48 }} />
      )}
    </Layout>
  );
};

export default OrariPage;