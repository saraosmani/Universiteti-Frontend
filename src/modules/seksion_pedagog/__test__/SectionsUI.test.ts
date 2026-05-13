const getSemLabel = (seksionet: any[]) => {
  return seksionet.length > 0
    ? `Semestri ${seksionet[0].semestri.nr} · ${seksionet[0].semestri.vit}`
    : "";
};

describe("SeksionetPage Label Logic", () => {
  test("returns empty string when no sections exist", () => {
    expect(getSemLabel([])).toBe("");
  });

  test("formats the semester label correctly from the first section", () => {
    const mock = [{ semestri: { nr: 1, vit: "2024-2025" } }];
    expect(getSemLabel(mock)).toBe("Semestri 1 · 2024-2025");
  });
});