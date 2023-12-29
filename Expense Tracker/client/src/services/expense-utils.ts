import IExpenseitem from "../models/IExpenseitem";

const getAllPayeeNames = (expenseItems: IExpenseitem[]) => {
    let payeeNames:string[] = [];
    expenseItems.map(expenseItem => {
        if (!payeeNames.includes(expenseItem.payeeName))
            payeeNames.push(expenseItem.payeeName)
        return payeeNames;   
    }
    )
    return payeeNames;
}

const getTotalPaymentByPayee = (expenseItems: IExpenseitem[], payeeName: string) => {

    return (expenseItems.filter(
        expenseItem => expenseItem.payeeName === payeeName
    ).map(expenseItem => expenseItem.price).reduce((accumulator, currentValue) => accumulator + currentValue));
}

const getTotalContributionAmount = (expenseItems: IExpenseitem[]) => {
    let total:number = 0;
    expenseItems.map(expenseItem => {
        return total += expenseItem.price;
    })
    return total;
}

const getPendingContributionAmount = (expenseItems: IExpenseitem[],payeeName: string) => {
    const totalPaymentbyPayee:number = getTotalPaymentByPayee(expenseItems,payeeName);
    const totalContributionAmount:number = getTotalContributionAmount(expenseItems);
    let pendingAmount:number = 0

    if (totalPaymentbyPayee <= (totalContributionAmount/2))
        pendingAmount   = (totalContributionAmount/2) - totalPaymentbyPayee

    return pendingAmount
}

export {
    getAllPayeeNames,
    getTotalPaymentByPayee,
    getTotalContributionAmount,
    getPendingContributionAmount
}