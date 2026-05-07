import React, { useState } from "react";
import Layout from "../dashboard/DashboardLayout";
import { useGetLendet } from "../../hooks/vleresim/useGetLendet";
import { useGetSemestre } from "../../hooks/vleresim/useGetSemestre";
import { useGetStudents } from "../../hooks/vleresim/useGetStudents";
import { useUpdateVleresim } from "../../hooks/vleresim/useUpdateVleresim";

const LibrezaNotave = () => {
  const [selectedLend, setSelectedLend] = useState<number | null>(null);
  const [selectedSem, setSelectedSem] = useState<number | null>(null);
  const [editedValues, setEditedValues] = useState<Record<number, {
    pik_midterm: number | null;
    pik_final: number | null;
    pik_detyra: number | null;
  }>>({});

  const { data: lendet, isLoading: loadingLendet } = useGetLendet();
  const { data: semestre, isLoading: loadingSemestre } = useGetSemestre(selectedLend);
  const { data: students, isLoading: loadingStudents } = useGetStudents(selectedLend, selectedSem);
  const { mutate: updateVleresim, isPending } = useUpdateVleresim();

  const handleLendChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLend(Number(e.target.value) || null);
    setSelectedSem(null);
  };

  const handleSemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSem(Number(e.target.value) || null);
  };

  const handlePikChange = (
    regjId: number,
    field: "pik_midterm" | "pik_final" | "pik_detyra",
    value: string
  ) => {
    setEditedValues((prev) => ({
      ...prev,
      [regjId]: {
        ...prev[regjId],
        [field]: value === "" ? null : Number(value),
      },
    }));
  };

  const handleSaveAll = () => {
    Object.entries(editedValues).forEach(([regjId, data]) => {
      updateVleresim({ regjId: Number(regjId), data });
    });
  };

  return (
    <Layout>
      <div style={{ padding: "32px" }}>
        <h2 style={{ color: "#140857", fontSize: "24px", fontWeight: "700", marginBottom: "24px" }}>
          Vlerësimi i Studentëve
        </h2>

        {/* FILTRAT */}
        <div style={{ display: "flex", gap: "16px", marginBottom: "24px", flexWrap: "wrap" }}>
          {/* Lënda */}
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label style={{ fontSize: "13px", color: "#140857", fontWeight: "600" }}>Lënda</label>
            <select
              onChange={handleLendChange}
              value={selectedLend ?? ""}
              style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid #E2E8F0", minWidth: "200px" }}
            >
              <option value="">-- Zgjedh Lëndën --</option>
              {loadingLendet ? (
                <option disabled>Duke ngarkuar...</option>
              ) : (
                lendet?.map((l) => (
                  <option key={l.lend_id} value={l.lend_id}>
                    {l.lend_emer} ({l.lend_kod})
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Semestri + Viti Akademik */}
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label style={{ fontSize: "13px", color: "#140857", fontWeight: "600" }}>Semestri</label>
            <select
              onChange={handleSemChange}
              value={selectedSem ?? ""}
              disabled={!selectedLend}
              style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid #E2E8F0", minWidth: "200px" }}
            >
              <option value="">-- Zgjedh Semestrin --</option>
              {loadingSemestre ? (
                <option disabled>Duke ngarkuar...</option>
              ) : (
                semestre?.map((s) => (
                  <option key={s.sem_id} value={s.sem_id}>
                    {s.vit_emer} — Semestri {s.sem_nr}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>

        {/* TABELA */}
        {loadingStudents ? (
          <p>Duke ngarkuar studentët...</p>
        ) : students && students.length > 0 ? (
          <>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <thead>
                <tr style={{ background: "#140857", color: "white" }}>
                  <th style={th}>Studenti</th>
                  <th style={th}>ID</th>
                  <th style={th}>Grup</th>
                  <th style={th}>Midterm /500</th>
                  <th style={th}>Final /500</th>
                  <th style={th}>Detyrë /100</th>
                  <th style={th}>Total</th>
                  <th style={th}>Statusi</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => {
                  const edited = editedValues[s.regj_id];
                  const midterm = edited?.pik_midterm ?? s.pik_midterm ?? 0;
                  const final = edited?.pik_final ?? s.pik_final ?? 0;
                  const detyra = edited?.pik_detyra ?? s.pik_detyra ?? 0;
                  const total = Number(midterm) + Number(final) + Number(detyra);

                  return (
                    <tr key={s.regj_id} style={{ borderBottom: "1px solid #E2E8F0" }}>
                      <td style={td}>{s.stu_mb} {s.stu_em}</td>
                      <td style={td}>{s.stu_id}</td>
                      <td style={td}>{s.sek_grupi}</td>
                      <td style={td}>
                        <input
                          type="number"
                          value={edited?.pik_midterm ?? s.pik_midterm ?? ""}
                          onChange={(e) => handlePikChange(s.regj_id, "pik_midterm", e.target.value)}
                          style={input}
                          min={0} max={500}
                        />
                      </td>
                      <td style={td}>
                        <input
                          type="number"
                          value={edited?.pik_final ?? s.pik_final ?? ""}
                          onChange={(e) => handlePikChange(s.regj_id, "pik_final", e.target.value)}
                          style={input}
                          min={0} max={500}
                        />
                      </td>
                      <td style={td}>
                        <input
                          type="number"
                          value={edited?.pik_detyra ?? s.pik_detyra ?? ""}
                          onChange={(e) => handlePikChange(s.regj_id, "pik_detyra", e.target.value)}
                          style={input}
                          min={0} max={100}
                        />
                      </td>
                      <td style={td}>{total}</td>
                      <td style={td}>
                        <span style={{
                          padding: "4px 10px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: "600",
                          background: s.regj_status === "Kalon" ? "#D1FAE5" : s.regj_status === "Mungon" ? "#FEF3C7" : "#FEE2E2",
                          color: s.regj_status === "Kalon" ? "#065F46" : s.regj_status === "Mungon" ? "#92400E" : "#991B1B",
                        }}>
                          {s.regj_status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* BUTONI RUAJ */}
            <div style={{ marginTop: "16px", display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={handleSaveAll}
                disabled={isPending || Object.keys(editedValues).length === 0}
                style={{
                  background: "#140857",
                  color: "white",
                  padding: "10px 24px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "14px",
                  opacity: isPending || Object.keys(editedValues).length === 0 ? 0.6 : 1,
                }}
              >
                {isPending ? "Duke ruajtur..." : "Ruaj të gjitha notat"}
              </button>
            </div>
          </>
        ) : selectedLend && selectedSem ? (
          <p style={{ color: "#64748B" }}>Nuk u gjetën studentë për këtë seksion.</p>
        ) : (
          <p style={{ color: "#64748B" }}>Zgjedh lëndën dhe semestrin për të parë studentët.</p>
        )}
      </div>
    </Layout>
  );
};

const th: React.CSSProperties = {
  padding: "12px 16px",
  textAlign: "left",
  fontWeight: "600",
  fontSize: "13px",
};

const td: React.CSSProperties = {
  padding: "10px 16px",
  color: "#1E293B",
};

const input: React.CSSProperties = {
  width: "80px",
  padding: "6px 8px",
  borderRadius: "6px",
  border: "1px solid #CBD5E1",
  fontSize: "13px",
};

export default LibrezaNotave;