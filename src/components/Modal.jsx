import React from "react";
import usePagination from "../hooks/usePagination";

function Modal({ data, setOpenModal, setModalData }) {
  const { getCurrentData, PaginationButtons } = usePagination(data, 5);

  const modalAction = () => {
    setOpenModal(false);
    setModalData([]);
  };

  return (
    <div className="modal">
      <div className="modal-body">
        <button className="close" onClick={modalAction}>
          Close
        </button>

        <h2>Customer Transactions</h2>

        <div className="table-container">
          <table className="styled-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Transaction Period</th>
                <th>Rewards</th>
              </tr>
            </thead>

            <tbody>
              {getCurrentData(data).map((t, index) => (
                <tr key={index}>
                  <td>{t.date.split("T")[0]}</td>
                  <td>{t.amount}</td>
                  <td>{t.period}</td>
                  <td>{t.rewards}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <PaginationButtons />
      </div>
    </div>
  );
}

export default Modal;
