import { useState, useEffect } from "react";
import useFetch from "./hooks/useFetch";
import DisplayCustomers from "./components/DisplayCustomers";
import Modal from "./components/Modal";
import { evaluateTransactions } from "./utils";
import "./App.css";

function App() {
  const [isModalOpen, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [evaluatedTransactions, setEvaluatedTransactions] = useState();

  const {
    data: transactions,
    loading: loadingTransactions,
    error: errorTransactions,
  } = useFetch("/mockData/transactionsData.json");

  useEffect(() => {
    if (transactions) {
      const customerRewards = evaluateTransactions(transactions);
      setEvaluatedTransactions(customerRewards);
    }
  }, [transactions]);

  if (loadingTransactions) return <div>Loading...</div>;
  if (errorTransactions) return <div>Error: {errorTransactions}</div>;

  return (
    <div className="App">
      {transactions && evaluatedTransactions && (
        <DisplayCustomers
          evaluatedTransactions={evaluatedTransactions}
          setOpenModal={setOpenModal}
          setModalData={setModalData}
        />
      )}

      {isModalOpen && (
        <Modal
          data={modalData}
          setOpenModal={setOpenModal}
          setModalData={setModalData}
        />
      )}
    </div>
  );
}

export default App;
