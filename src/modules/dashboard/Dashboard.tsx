import React from "react";
import Layout from "./DashboardLayout";
import { useAppSelector } from "../../store/hooks";
import { useProfileStatus } from "../../hooks/complete_profile/useGetProfileStatus";
import { useQueryClient } from "@tanstack/react-query";
import { BORDER, NAVY, NAVY2, WHITE, LIGHT, MUTED } from "../../styles/common";
import CompletePedagogProfileStepper from "../complete_profile/CompletePedagogProfileStepper";
import CompleteStudentProfileStepper from "../complete_profile/CompleteStudentProfileStepper";
import { useSeksionetAktive } from "../../hooks/seksion/useSeksionetAktive";
import { useGetAllStudents } from "../../hooks/student/useGetAllStudents";
import { useGetLendet } from "../../hooks/vleresim/useGetLendet";
import { Spin } from "antd";
import { Card, CardTitle } from "./components/Card";
import { MiniCalendar } from "./components/MiniCalendar";
import { Seksion, UpcomingClasses } from "./components/UpcomingClasses";
import { SectionRow } from "./components/SectionRow";
import { SUBJECT_COLORS, SubjectRow } from "./components/SubjectRow";
import { WorkingHoursChart } from "./components/WorkingHoursChart";

const DAYS = [
  "E Diel",
  "E Hënë",
  "E Martë",
  "E Mërkurë",
  "E Enjte",
  "E Premte",
  "E Shtunë",
];
const MONTHS = [
  "Janar",
  "Shkurt",
  "Mars",
  "Prill",
  "Maj",
  "Qershor",
  "Korrik",
  "Gusht",
  "Shtator",
  "Tetor",
  "Nëntor",
  "Dhjetor",
];

// ─── Main Dashboard ───────────────────────────────────────────────────────────

// ─── Main Dashboard ───────────────────────────────────────────────────────────

const Dashboard: React.FC = () => {
  const queryClient = useQueryClient();
  const { user } = useAppSelector((state) => state.auth);
  const isPedag = user?.role === "pedagog";
  const isStudent = user?.role === "student";

  const { data: statusData, refetch } = useProfileStatus(isPedag || isStudent);
  const needsCompletion =
    (isPedag || isStudent) && statusData?.is_complete === false;

  const { data: seksionet = [], isLoading: seksLoading } = useSeksionetAktive();
  const { data: studenteData = [] } = useGetAllStudents();
  const { data: lendetData = [], isLoading: lendetLoading } = useGetLendet();

  const handleProfileComplete = () => {
    queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    queryClient.invalidateQueries({ queryKey: ["profileStatus"] });
    refetch();
  };

  const now = new Date();
  const totalStudents = studenteData.length;
  const activeSections = seksionet.length;
  const totalStudentsInSections = seksionet.reduce(
    (acc, s) => acc + (s.nr_studenteve ?? 0),
    0,
  );
  const totalSubjects = lendetData.length;

  return (
    <Layout>
      {needsCompletion &&
        (isPedag ? (
          <CompletePedagogProfileStepper onComplete={handleProfileComplete} />
        ) : isStudent ? (
          <CompleteStudentProfileStepper onComplete={handleProfileComplete} />
        ) : null)}

      {/* ── Page header ── */}
      <div style={{ marginBottom: 24 }}>
        <h2
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: NAVY,
            margin: "0 0 4px",
          }}
        >
          Mirëserdhe, {user?.name?.split(" ")[0]}! 👋
        </h2>
        <p style={{ fontSize: 13, color: MUTED, margin: 0 }}>
          {DAYS[now.getDay()]}, {now.getDate()} {MONTHS[now.getMonth()]}{" "}
          {now.getFullYear()}
        </p>
      </div>

      {/* ── MAIN GRID ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 260px",
          gap: 16,
          alignItems: "start",
        }}
      >
        {/* ── HERO BANNER (spans col 1–2) ── */}
        <div
          style={{
            gridColumn: "1 / 3",
            background: `linear-gradient(130deg, ${NAVY} 0%, ${NAVY2} 45%, #2346a0 100%)`,
            borderRadius: 14,
            padding: "22px 28px",
            color: WHITE,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 4px 14px rgba(15,37,87,0.18)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.05)",
              right: -40,
              top: -60,
            }}
          />
          <div
            style={{
              position: "absolute",
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.04)",
              right: 120,
              bottom: -50,
            }}
          />
          <div style={{ position: "relative", zIndex: 1 }}>
            <p
              style={{
                fontSize: 11,
                opacity: 0.7,
                margin: "0 0 4px",
                textTransform: "uppercase",
                letterSpacing: 1.2,
              }}
            >
              {isPedag ? "Pasqyra e Mësimdhënies" : "Pasqyra e Studimeve"}
            </p>
            <h2
              style={{
                fontSize: 22,
                fontWeight: 700,
                margin: "0 0 4px",
                color: WHITE,
              }}
            >
              {isPedag
                ? `${activeSections} seksione aktive`
                : `${totalSubjects} lëndë të regjistruara`}
            </h2>
            <p style={{ fontSize: 12, opacity: 0.7, margin: 0 }}>
              {isPedag
                ? `${totalStudentsInSections} studentë gjithsej`
                : `Semestri ${now.getMonth() < 6 ? "i dytë" : "i parë"} · ${now.getFullYear()}`}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              gap: 32,
              position: "relative",
              zIndex: 1,
            }}
          >
            {(isPedag
              ? [
                  [activeSections, "Seksione"],
                  [totalStudents, "Studentë"],
                ]
              : [
                  [totalSubjects, "Lëndë"],
                  [
                    user?.student?.stu_status === "active"
                      ? "Aktiv"
                      : (user?.student?.stu_status ?? "—"),
                    "Statusi",
                  ],
                  [user?.student?.stu_nuid ?? "—", "NUID"],
                ]
            ).map(([v, l]) => (
              <div key={String(l)} style={{ textAlign: "center" }}>
                <p
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    margin: 0,
                    color: WHITE,
                  }}
                >
                  {v}
                </p>
                <p
                  style={{
                    fontSize: 11,
                    opacity: 0.7,
                    margin: "2px 0 0",
                    color: WHITE,
                  }}
                >
                  {l}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT SIDEBAR (col 3, spans all content rows) ── */}
        <div
          style={{
            gridColumn: 3,
            gridRow: "1 / 10",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <MiniCalendar />
          <UpcomingClasses
            seksionet={seksionet as Seksion[]}
            loading={seksLoading}
          />
        </div>

        {/* ── COL 1: sections / subjects quick list ── */}
        <Card style={{ gridColumn: 1 }}>
          <CardTitle
            title={isPedag ? "Seksionet Aktive" : "Lëndët e Regjistruara"}
            right={
              <span
                style={{
                  fontSize: 12,
                  color: MUTED,
                  background: LIGHT,
                  padding: "3px 10px",
                  borderRadius: 8,
                  border: `1px solid ${BORDER}`,
                }}
              >
                {isPedag ? activeSections : totalSubjects} total
              </span>
            }
          />
          {isPedag ? (
            seksLoading ? (
              <div style={{ textAlign: "center", padding: 16 }}>
                <Spin size="small" />
              </div>
            ) : seksionet.length === 0 ? (
              <p style={{ fontSize: 13, color: MUTED }}>
                Nuk ka seksione aktive.
              </p>
            ) : (
              (seksionet as Seksion[])
                .slice(0, 5)
                .map((s) => (
                  <SectionRow
                    key={s.sek_id}
                    name={s.lenda.emer}
                    day={s.dita}
                    time={`${s.ore_fillimi.slice(0, 5)}–${s.ore_mbarimi.slice(0, 5)}`}
                    room={`${s.salla.nr} ${s.salla.godin}`}
                    type={s.lloji}
                    students={s.nr_studenteve}
                  />
                ))
            )
          ) : lendetLoading ? (
            <div style={{ textAlign: "center", padding: 16 }}>
              <Spin size="small" />
            </div>
          ) : lendetData.length === 0 ? (
            <p style={{ fontSize: 13, color: MUTED }}>Nuk ka lëndë.</p>
          ) : (
            lendetData
              .slice(0, 6)
              .map((l, i) => (
                <SubjectRow
                  key={l.lend_id}
                  name={l.lend_emer}
                  code={l.lend_kod}
                  index={i}
                />
              ))
          )}
        </Card>

        {/* ── Working Hours (col 2) ── */}
        <div style={{ gridColumn: 2 }}>
          <WorkingHoursChart seksionet={seksionet} />
        </div>

        {/* ── Subject cards – student (spans col 1–2) ── */}
        {isStudent && (
          <Card style={{ gridColumn: "1 / 3" }}>
            <CardTitle
              title="Lëndët e Disponueshme"
              right={
                <span style={{ fontSize: 12, color: MUTED }}>
                  {totalSubjects} lëndë
                </span>
              }
            />
            {lendetLoading ? (
              <div style={{ textAlign: "center", padding: 16 }}>
                <Spin size="small" />
              </div>
            ) : lendetData.length === 0 ? (
              <p style={{ fontSize: 13, color: MUTED }}>Nuk ka lëndë.</p>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                  gap: 10,
                }}
              >
                {lendetData.map((l, i) => {
                  const c = SUBJECT_COLORS[i % SUBJECT_COLORS.length];
                  return (
                    <div
                      key={l.lend_id}
                      style={{
                        background: `${c}0d`,
                        border: `1px solid ${c}28`,
                        borderRadius: 10,
                        padding: "12px 14px",
                      }}
                    >
                      <p
                        style={{
                          fontWeight: 700,
                          fontSize: 13,
                          color: NAVY,
                          margin: "0 0 4px",
                        }}
                      >
                        {l.lend_emer}
                      </p>
                      <p
                        style={{
                          fontSize: 11,
                          color: c,
                          fontWeight: 600,
                          margin: 0,
                        }}
                      >
                        {l.lend_kod}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
