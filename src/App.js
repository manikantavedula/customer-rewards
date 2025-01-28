import { useState, useEffect, useCallback } from "react";
import useFetch from "./hooks/useFetch";
import DisplayCustomers from "./components/displayCustomers";
import Modal from "./components/modal";
import { evaluateTransactions } from "./utils/utils";
import "./styles/app.css";

function App() {
  const [isModalOpen, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [evaluatedTransactions, setEvaluatedTransactions] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  const modalAction = useCallback(
    (bool, data) => {
      setOpenModal(bool);
      setModalData(data);
    },
    [setOpenModal, setModalData]
  );

  const {
    data: transactions,
    loading: loadingTransactions,
    error: errorTransactions,
  } = useFetch("/mockData/transactionsData.json");

  useEffect(() => {
    if (
      transactions &&
      Array.isArray(transactions) &&
      transactions.length > 0
    ) {
      const customerRewards = evaluateTransactions(transactions);

      if (customerRewards) setEvaluatedTransactions(customerRewards);
      else setEvaluatedTransactions({});
    } else {
      setEvaluatedTransactions({});
    }
  }, [transactions]);

  useEffect(() => {
    if (errorTransactions) {
      setErrorMessage(
        errorTransactions.message || "An unexpected error occurred."
      );
    }
  }, [errorTransactions]);

  if (loadingTransactions) return <div className="App">Loading...</div>;
  if (errorTransactions && errorMessage)
    return <div className="App">Error: {errorMessage}</div>;

  return (
    <div className="App">
      {transactions && evaluatedTransactions && (
        <DisplayCustomers
          componentHeading="Customer List"
          evaluatedTransactions={Object.entries(evaluatedTransactions || {})}
          modalAction={modalAction}
        />
      )}

      {isModalOpen && (
        <Modal
          modalHeading="Customer Transactions List"
          data={modalData}
          modalAction={modalAction}
        />
      )}
    </div>
  );
}

export default App;
