const calculateTotal = (m: any, f: any, d: any): number => {
  return Number(m ?? 0) + Number(f ?? 0) + Number(d ?? 0);
};

const getStatusColor = (status: string): string => {
  if (status === "Kalon") return "green";
  if (status === "Mungon") return "orange";
  return "red";
};

describe("Professor Grading Logic", () => {
  
  test("Total calculation adds midterm, final and assignment correctly", () => {
    const result = calculateTotal(200, 150, 50);
    expect(result).toBe(400);
  });

  test("Total handles null values (like an empty input field)", () => {
    const result = calculateTotal(null, 100, null);
    expect(result).toBe(100);
  });

  test("Status colors match university requirements", () => {
    expect(getStatusColor("Kalon")).toBe("green");
    expect(getStatusColor("Mungon")).toBe("orange");
    expect(getStatusColor("Mbetet")).toBe("red");
  });
});