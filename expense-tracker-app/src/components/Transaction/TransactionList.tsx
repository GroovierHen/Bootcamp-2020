import React, { useContext } from "react";

import Transaction from "./Transaction";
import { GlobalContext } from "../../context/GlobalState";

const TransactionList: React.FC = () => {
  const {
    state: { transactions },
  } = useContext(GlobalContext);

  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {transactions.map((transaction) => (
          <Transaction {...transaction} key={transaction.id} />
        ))}
      </ul>
    </>
  );
};

export default TransactionList;
