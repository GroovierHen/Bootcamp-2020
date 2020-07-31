import React, { useContext } from "react";

import { GlobalContext } from "../../context/GlobalState";
import { TransactionType } from "../../types";

const TransactionC: React.FC<TransactionType> = ({ id, text, amount }) => {
  const { dispatch } = useContext(GlobalContext);

  const sign: string = amount < 0 ? "-" : "+";

  return (
    <li className={amount < 0 ? "minus" : "plus"}>
      {text}
      <span>
        {sign}${Math.abs(amount)}
      </span>
      <button
        className="delete-btn"
        onClick={() => dispatch({ type: "DELETE_TRANSACTION", payload: id })}
      >
        x
      </button>
    </li>
  );
};

export default TransactionC;
