import { describe, it, expect } from "vitest";
import { leadsToCsv } from "@/lib/exportLeads";
import { Lead } from "@/data/mockLeads";

const lead: Lead = {
  id: "1",
  name: "Rahul Sharma",
  email: "rahul@email.com",
  phone: "+91 98765 43210",
  source: "website",
  status: "new",
  interestedIn: "Honda City 2024",
  budget: "₹15-18 Lakhs",
  createdAt: "2024-01-24T10:30:00",
  assignedTo: "Priya Singh",
  notes: [],
  priority: "high",
};

describe("leadsToCsv", () => {
  it("includes a header row and one row per lead", () => {
    const csv = leadsToCsv([lead]);
    const lines = csv.split("\n");
    expect(lines).toHaveLength(2);
    expect(lines[0]).toContain("Name");
    expect(lines[1]).toContain("Rahul Sharma");
  });

  it("maps source and status to their human labels", () => {
    const csv = leadsToCsv([lead]);
    expect(csv).toContain("Website");
    expect(csv).toContain("New");
  });

  it("escapes cells containing commas or quotes", () => {
    const tricky: Lead = {
      ...lead,
      interestedIn: 'Honda City, "Premium" Edition',
    };
    const csv = leadsToCsv([tricky]);
    expect(csv).toContain('"Honda City, ""Premium"" Edition"');
  });
});
