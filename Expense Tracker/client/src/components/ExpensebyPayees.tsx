import { Table } from "react-bootstrap";
import IExpenseitem from "../models/IExpenseitem";
import {
  getAllPayeeNames,
  getTotalContributionAmount,
  getTotalPaymentByPayee,
} from "../services/expense-utils";


type ExpensebyPayeeModel = {
  expenseItems: IExpenseitem[];
};

const ExpensebyPayees = ({ expenseItems }: ExpensebyPayeeModel) => {
  return (
    <Table striped bordered hover size="sm" variant="dark">
      <thead>
        <tr>
          <th>S.No</th>
          <th>Name</th>
          <th>Expense Amount</th>
        </tr>
      </thead>
      <tbody>
        {getAllPayeeNames(expenseItems).map((payeeName, index) => {
          return (
            <tr>
              <td>{index + 1}</td>
              <td>{payeeName}</td>
              <td>{getTotalPaymentByPayee(expenseItems, payeeName)}</td>
            </tr>
          );
        })}
        <tr>
          <td></td>
          <td>Grand Total</td>
          <td>{getTotalContributionAmount(expenseItems)}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default ExpensebyPayees;