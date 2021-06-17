import React from "react";
import { ToastContainer, toast } from "react-toastify";

import {
  requestFirebaseNotificationPermission,
  tokenIdsRef,
  onMessageListener,
} from "./firebaseInit";
import { GlobalProvider } from "./context/GlobalState";
import {
  Header,
  Balance,
  IncomeExpenses,
  TransactionList,
  AddTransaction,
} from "./components";

const App = () => {
  const addTokenToDB = React.useCallback(async () => {
    try {
      const firebaseToken = await requestFirebaseNotificationPermission();
      const snapshot = await tokenIdsRef.get();

      if (snapshot.exists()) {
        const data = snapshot.val();
        if (!Object.values(data).some((token) => token === firebaseToken)) {
          tokenIdsRef.push(firebaseToken);
        }
      } else {
        tokenIdsRef.push(firebaseToken);
      }

      localStorage.setItem("firebaseToken", firebaseToken);
    } catch (error) {
      console.error(error);
    }
  }, []);

  React.useEffect(() => {
    addTokenToDB();

    onMessageListener()
      .then((payload) => {
        const { title, body } = payload.data;
        toast.info(`${title}: ${body}`);
      })
      .catch((err) => {
        console.log(JSON.stringify(err));
      });
  }, [addTokenToDB]);

  return (
    <GlobalProvider>
      <Header />
      <div className="container">
        <Balance />
        <IncomeExpenses />
        <TransactionList />
        <AddTransaction />
      </div>
      <ToastContainer />
    </GlobalProvider>
  );
};

export default App;
