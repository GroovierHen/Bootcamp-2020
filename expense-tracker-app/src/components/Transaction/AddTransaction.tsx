import React, { useState, useContext } from "react";

import { GlobalContext } from "../../context/GlobalState";
import { TransactionType } from "../../types";

const AddTransaction: React.FC = () => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);
  const { dispatch } = useContext(GlobalContext);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTransaction: TransactionType = {
      id: Math.floor(Math.random() * 100000000),
      amount,
      text,
    };

    dispatch({ type: "ADD_TRANSACTION", payload: newTransaction });
  };

  return (
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input
            type="text"
            value={text}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setText(event.target.value)
            }
            placeholder="Enter text..."
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Amount <br />
            (negative - expense, positive - income)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setAmount(+event.target.value)
            }
            placeholder="Enter amount..."
          />
        </div>
        <button className="btn" type="submit">
          Add transaction
        </button>
      </form>
    </>
  );
};

export default AddTransaction;
