import { UserI } from "../../interfaces/interfaces";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getUserByID, updateUserQuery } from "../dal/users-DAL";
import { generateUserPassword } from "../helpers/passwordBcrypt";

const updatedUserService = async (token: string, userData: UserI) => {
  try {
    const { user_id } = jwt.decode(token) as JwtPayload;
    const existingUser = await getUserByID(user_id)
    console.log('request user:', userData);
    
    const password = userData.password ? generateUserPassword(userData.password) : existingUser[0].password
    const combined = { email: userData.email, isAdmin: userData.isAdmin, username: userData.username, password }
    console.log('combined user:',  combined);
    const updatedUser = await updateUserQuery(user_id, combined);
    return updatedUser;
  } catch (error) {
    return Promise.reject(error);
  }
};
export default updatedUserService;
