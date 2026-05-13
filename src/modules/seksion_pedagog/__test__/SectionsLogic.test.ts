// Recreate the logic from useMemo to verify the math is correct
const calculateStats = (seksionet: any[]) => {
  const lende = new Set(seksionet.map(s => s.lenda.kod)).size;
  const studente = seksionet.reduce((acc, s) => acc + s.nr_studenteve, 0);
  
  const ore = seksionet.reduce((acc, s) => {
    const [hS, mS] = s.ore_fillimi.split(":").map(Number);
    const [hE, mE] = s.ore_mbarimi.split(":").map(Number);
    return acc + (hE * 60 + mE - (hS * 60 + mS)) / 60;
  }, 0);

  return { seksione: seksionet.length, lende, studente, ore: Math.round(ore) };
};

describe("SeksionetPage Calculation Logic", () => {
  const mockData = [
    {
      lenda: { kod: "MAT101" },
      nr_studenteve: 30,
      ore_fillimi: "08:00",
      ore_mbarimi: "10:30", 
    },
    {
      lenda: { kod: "MAT101" }, // e njejta lende
      nr_studenteve: 20,
      ore_fillimi: "11:00",
      ore_mbarimi: "12:00", 
    }
  ];

  test("calculates unique subjects correctly (Set logic)", () => {
    const stats = calculateStats(mockData);
    expect(stats.lende).toBe(1); 
  });

  test("sums total students correctly", () => {
    const stats = calculateStats(mockData);
    expect(stats.studente).toBe(50);
  });

  test("calculates and rounds weekly hours correctly", () => {
    const stats = calculateStats(mockData);
    expect(stats.ore).toBe(4);
  });

  test("handles empty data gracefully", () => {
    const stats = calculateStats([]);
    expect(stats).toEqual({ seksione: 0, lende: 0, studente: 0, ore: 0 });
  });
});