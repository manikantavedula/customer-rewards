import usePagination from "../hooks/usePagination";
import TableHead from "./tableHead";
import NoDataTableRow from "./noDataTableRow";
import "../styles/styles.css";

const DisplayCustomers = ({
  componentHeading,
  evaluatedTransactions,
  modalAction,
}) => {
  const { getCurrentData, PaginationButtons } = usePagination(
    evaluatedTransactions,
    5
  );

  const tableHeadings = [
    { label: "Customer ID", key: "id" },
    { label: "Name", key: "name" },
    { label: "Overall Transactions", key: "overallTransactionsCount" },
    {
      label: "Last 3 Months Transactions",
      key: "last3MonthsTransactionsCount",
    },
    { label: "Total Reward Points", key: "totalRewardPoints" },
    { label: "Transactions List", key: "transactions" },
  ];

  return (
    <div>
      <h1>{componentHeading}</h1>

      <div className="table-container">
        <table className="styled-table">
          <TableHead tableHeadings={tableHeadings} />

          <tbody>
            {evaluatedTransactions &&
            Object.entries(evaluatedTransactions).length > 0 ? (
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
                    <td>{`Customer ${id}`}</td>
                    <td>{overallTransactionsCount}</td>
                    <td>{last3MonthsTransactionsCount}</td>
                    <td>{totalRewards}</td>
                    <td>
                      <button
                        className="view-transactions"
                        onClick={() => modalAction(true, transactions)}
                      >
                        View Transactions
                      </button>
                    </td>
                  </tr>
                )
              )
            ) : (
              <NoDataTableRow />
            )}
          </tbody>
        </table>
      </div>
      <PaginationButtons />
    </div>
  );
};

export default DisplayCustomers;
