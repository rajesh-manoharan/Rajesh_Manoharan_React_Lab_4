import { useEffect, useState } from "react";
import { getAllExpenseItems } from "../services/expense-service";
import ExpenseItemListner from "./ExpenseItemLister";
import { Container } from "react-bootstrap";
import ExpensebyPayees from "./ExpensebyPayees";
import PendingExpensesByPayees from "./PendingExpensesByPayees";
import ExpenseCreator from "./ExpenseCreator";
import IExpenseitem from "../models/IExpenseitem";

const ExpenseHome = () => {
  const [expenseItems, setExpenseItems] = useState<IExpenseitem[]>([]);

  useEffect(() => {
    const getAllExpenseItemsInvoker = async () => {
      const data = await getAllExpenseItems();
      setExpenseItems(data);
    };
    getAllExpenseItemsInvoker();
  }, []);

  const refresh = (newExpenseItem: IExpenseitem) => {
    // 5 , 1
    setExpenseItems([newExpenseItem, ...expenseItems]);
  };
  return (
    <Container>
      <h1>Expense Tracker Application</h1>
      <ExpenseCreator
        expenseItems={expenseItems}
        refresh={refresh}
      ></ExpenseCreator>
      <h2>Expense List</h2>
      <ExpenseItemListner expenseItems={expenseItems}></ExpenseItemListner>

      <h2>Expense by Payee </h2>
      <ExpensebyPayees expenseItems={expenseItems}></ExpensebyPayees>

      <h2>Pending payment details</h2>
      <PendingExpensesByPayees
        expenseItems={expenseItems}
      ></PendingExpensesByPayees>
    </Container>
  );
};

export default ExpenseHome;