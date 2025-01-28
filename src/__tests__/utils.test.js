import { calculateRewards, evaluateTransactions } from "../utils";

describe("calculateRewards", () => {
  it("should calculate rewards correctly for amount >= 100 in the last 3 months", () => {
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    const result = calculateRewards(150, new Date(), threeMonthsAgo);
    expect(result).toBe(150);
  });

  it("should calculate rewards correctly for 50 < amount < 100 in the last 3 months", () => {
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    const result = calculateRewards(75, new Date(), threeMonthsAgo);
    expect(result).toBe(25);
  });

  it("should return 0 if amount is less than 50", () => {
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    const result = calculateRewards(30, new Date(), threeMonthsAgo);
    expect(result).toBe(0);
  });

  it("should return 0 if transaction is before 3 months", () => {
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    const result = calculateRewards(
      100,
      new Date("2022-01-01"),
      threeMonthsAgo
    );
    expect(result).toBe(0);
  });
});

describe("evaluateTransactions", () => {
  it("should correctly evaluate rewards for a single customer", () => {
    const transactions = [{ customerId: "123", amount: 150, date: new Date() }];

    const result = evaluateTransactions(transactions);

    expect(result["123"].overallTransactionsCount).toBe(1);
    expect(result["123"].last3MonthsTransactionsCount).toBe(1);
    expect(result["123"].totalRewards).toBe(150);
  });

  it("should correctly aggregate multiple transactions for the same customer", () => {
    const currentDate = new Date();
    const fourMonthsAgo = new Date(
      currentDate.setMonth(currentDate.getMonth() - 4)
    );

    const transactions = [
      { customerId: "123", amount: 300, date: fourMonthsAgo },
      { customerId: "123", amount: 200, date: new Date() },
      { customerId: "123", amount: 50, date: new Date() },
    ];

    const result = evaluateTransactions(transactions);

    expect(result["123"].overallTransactionsCount).toBe(3);
    expect(result["123"].last3MonthsTransactionsCount).toBe(2);
    expect(result["123"].totalRewards).toBe(250);
  });

  it("should handle multiple customers correctly", () => {
    const transactions = [
      { customerId: "123", amount: 150, date: new Date() },
      { customerId: "456", amount: 200, date: new Date() },
    ];

    const result = evaluateTransactions(transactions);

    expect(result["123"].totalRewards).toBe(150);
    expect(result["456"].totalRewards).toBe(250);
  });

  it("should evaluate correct transaction period (last 3 months or before) for rewards", () => {
    const transactions = [
      { customerId: "123", amount: 150, date: new Date() },
      { customerId: "123", amount: 100, date: "2022-01-01" },
    ];

    const result = evaluateTransactions(transactions);

    expect(result["123"].transactions[0].period).toBe("in last 3 months");
    expect(result["123"].transactions[1].period).toBe("before 3 months");
  });
});
