import usePagination from "./../hooks/usePagination";
import "../styles.css";

const DisplayCustomers = ({
  evaluatedTransactions,
  setOpenModal,
  setModalData,
}) => {
  const { getCurrentData, PaginationButtons } = usePagination(
    Object.entries(evaluatedTransactions),
    5
  );

  const modalAction = (data) => {
    setOpenModal(true);
    setModalData(data);
  };

  return (
    <div>
      <h1>Customer List</h1>

      <div className="table-container">
        <table className="styled-table">
          <thead>
            <tr>
              <th rowSpan={2}>Customer ID</th>
              <th rowSpan={2}>Name</th>
              <th colSpan={2}>Transactions Count</th>
              <th rowSpan={2}>Transactions List</th>
              <th rowSpan={2}>Total Rewards</th>
            </tr>

            <tr>
              <th>Overall</th>
              <th>Last 3 Months</th>
            </tr>
          </thead>

          <tbody>
            {evaluatedTransactions &&
              getCurrentData().map(
                ([
                  id,
                  {
                    overallTransactionsCount,
                    last3MonthsTransactionsCount,
                    totalRewards,
                    transactions,
                  },
                ]) => (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>name {id}</td>
                    <td>{overallTransactionsCount}</td>
                    <td>{last3MonthsTransactionsCount}</td>
                    <td>
                      <button
                        className="view-transactions"
                        onClick={() => modalAction(transactions)}
                      >
                        View Transactions
                      </button>
                    </td>
                    <td>{totalRewards}</td>

                    {/*  */}
                  </tr>
                )
              )}
          </tbody>
        </table>
      </div>

      <PaginationButtons />
    </div>
  );
};

export default DisplayCustomers;
