export const calculateRewards = (amount, transactionDate, threeMonthsAgo) => {
  if (transactionDate >= threeMonthsAgo) {
    if (amount >= 100) {
      return (amount - 100) * 2 + 50;
    } else if (amount > 50) {
      return amount - 50;
    }
  }

  return 0;
};

export const evaluateTransactions = (transactions) => {
  const customerRewards = {};

  transactions.forEach(({ customerId, amount, date }) => {
    const transactionDate = new Date(date);
    const currentDate = new Date();
    const threeMonthsAgo = new Date(
      currentDate.setMonth(currentDate.getMonth() - 3)
    );

    const rewards = calculateRewards(amount, transactionDate, threeMonthsAgo);

    if (!customerRewards[customerId]) {
      customerRewards[customerId] = {
        overallTransactionsCount: 0,
        last3MonthsTransactionsCount: 0,
        totalRewards: 0,
        transactions: [],
      };
    }

    customerRewards[customerId].overallTransactionsCount += 1;

    if (transactionDate >= threeMonthsAgo) {
      customerRewards[customerId].last3MonthsTransactionsCount += 1;
    }

    customerRewards[customerId].totalRewards += rewards;
    customerRewards[customerId].transactions.push({
      amount,
      date,
      rewards,
      period:
        transactionDate >= threeMonthsAgo
          ? "in last 3 months"
          : "before 3 months",
    });
  });

  return customerRewards;
};
