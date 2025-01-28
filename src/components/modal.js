import usePagination from "../hooks/usePagination";
import TableHead from "./tableHead";
import NoDataTableRow from "./noDataTableRow";

function Modal({ modalHeading, data, modalAction }) {
  const { getCurrentData, PaginationButtons } = usePagination(data, 5);

  const tableHeadings = [
    { label: "Date", key: "date" },
    { label: "Transaction Period", key: "transactionPeriod" },
    {
      label: "Amount ($)",
      key: "amount",
    },
    { label: "Reward Points", key: "RewardPoints" },
  ];

  return (
    <div className="modal">
      <div className="modal-body">
        <button className="close" onClick={() => modalAction(false, [])}>
          Close
        </button>

        <h2>{modalHeading}</h2>

        <div className="table-container">
          <table className="styled-table">
            <TableHead tableHeadings={tableHeadings} />

            <tbody>
              {data && data.length > 0 ? (
                getCurrentData().map((t, index) => (
                  <tr key={index}>
                    <td>{new Date(t.date).toLocaleDateString("en-GB")}</td>
                    <td>{t.period}</td>
                    <td>{t.amount}</td>
                    <td>{t.rewards}</td>
                  </tr>
                ))
              ) : (
                <NoDataTableRow />
              )}
            </tbody>
          </table>
        </div>
        <PaginationButtons />
      </div>
    </div>
  );
}

export default Modal;
