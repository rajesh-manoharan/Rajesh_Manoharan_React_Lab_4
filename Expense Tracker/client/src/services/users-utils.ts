import IUser from "../models/IUser";
import getAllusers from "./user-services";

const getAllUserData = async () => {
    return await getAllusers();
}

const validateUser = (userName: string, password: string, userDetails: IUser[]) => {
    let valid: string = 'INVALID';
    userDetails.forEach((user) => {
        if (user.userName === userName && user.password === password)
            valid = 'VALID'
    })
    return valid
};


export {
    getAllUserData,
    validateUser
}