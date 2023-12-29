import axios from 'axios';
import { IExpenseCreateItem } from '../models/IExpenseitem';

const getAllExpenseItems = async () => {
    const response = await axios.get("http://localhost:4000/expenses");
    return response.data;
};

const createNewExpense = async (newExpenseObj:IExpenseCreateItem) => {
    const response = await axios.post("http://localhost:4000/expenses",newExpenseObj,{
        headers:{
            "Content-Type": 'application/json'
        }
    })

    return response.data;
};

export {
         getAllExpenseItems
        ,createNewExpense
    }