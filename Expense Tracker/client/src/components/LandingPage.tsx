import { useState } from "react";
import { getAllExpenseItems } from "../services/expense-service";
import ExpenseHome from "./ExpenseHome";
import Login from "./Login";
import { Alert } from "react-bootstrap";

const LandingPage = () => {
  const [loginStatus, setLoginStatus] = useState("NOT LOGGED IN");
  const setLogin = (value: string) => {
    setLoginStatus(value);
  };

  return loginStatus === "VALID" ? (
    (getAllExpenseItems(), (<ExpenseHome></ExpenseHome>))
  ) : loginStatus === "INVALID" ? (
    <Alert key={"danger"} variant={"danger"}>
      <Alert.Heading>Login Error</Alert.Heading>
      <p>Kindly check your crediantials and try again!!</p>
    </Alert>
  ) : (
    <Login setLogin={setLogin}></Login>
  );
};

export default LandingPage;