export type State = {
  transactions: TransactionType[];
};

export type TransactionType = {
  id: number;
  text: string;
  amount: number;
};

export type TransactionActions =
  | { type: "DELETE_TRANSACTION"; payload: number }
  | { type: "ADD_TRANSACTION"; payload: TransactionType };
