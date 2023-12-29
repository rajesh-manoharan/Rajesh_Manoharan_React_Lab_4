interface IExpenseitem {
    expenseDescription: string,
    payeeName: string,
    price: number,
    date: Date,
    id: number
};

export type IExpenseCreateItem = Omit<IExpenseitem, "id">
export default IExpenseitem;