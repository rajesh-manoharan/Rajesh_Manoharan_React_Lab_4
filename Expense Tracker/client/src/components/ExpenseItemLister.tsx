import Table from 'react-bootstrap/Table';
import IExpenseitem from "../models/IExpenseitem";

type ExpenseItemListerModel = {
    expenseItems: IExpenseitem[];
}

const formatDate = (dateValue: Date ) => {
    const dateObj = new Date(dateValue);
    return (dateObj.getDate()).toString().padStart(2,"0") + '/' + ((dateObj.getMonth() + 1 ).toString()).padStart(2,"0") + '/' + dateObj.getFullYear();
}

const ExpenseItemListner = ({expenseItems}: ExpenseItemListerModel) => {
    return (
        <Table striped bordered hover size='lg' variant='dark'>
            <thead>
                <tr>
                    <th>S.No</th>
                    <th>Expense Description</th>
                    <th>Paid by</th>
                    <th>Expense date</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {
                    expenseItems.map((expense, index) => {
                        return (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{expense.expenseDescription}</td>
                                <td>{expense.payeeName}</td>
                                <td>{formatDate(expense.date)}</td>
                                <td>{expense.price}</td>
                            </tr>
                        )
                    }
                    )
                }
            </tbody>
        </Table>
    );
}

export default ExpenseItemListner;