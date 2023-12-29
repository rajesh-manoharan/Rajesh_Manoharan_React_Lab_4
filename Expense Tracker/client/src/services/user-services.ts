import axios from 'axios';
import IUser from '../models/IUser';

const getAllusers = async () => {
    const response = await axios.get("http://localhost:4001/userDetails");
    return response.data as IUser[];
};

export default getAllusers;