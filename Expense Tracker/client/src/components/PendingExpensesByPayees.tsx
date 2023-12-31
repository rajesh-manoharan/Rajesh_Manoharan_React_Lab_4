import { Table } from "react-bootstrap";
import IExpenseitem from "../models/IExpenseitem";
import {
  getAllPayeeNames,
  getPendingContributionAmount,
} from "../services/expense-utils";

type PendingExpenseModel = {
  expenseItems: IExpenseitem[];
};

const PendingExpensesByPayees = ({ expenseItems }: PendingExpenseModel) => {
  return (
    <Table striped bordered hover size="sm" variant="dark">
      <thead>
        <tr>
          <th>S.No</th>
          <th>Name</th>
          <th>Pending Amount</th>
        </tr>
      </thead>
      <tbody>
        {getAllPayeeNames(expenseItems).map((payeeName, index) => {
          return (
            <tr>
              <td>{index + 1}</td>
              <td>{payeeName}</td>
              <td>{getPendingContributionAmount(expenseItems, payeeName)}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default PendingExpensesByPayees;