import { promises as fsPromises } from "fs";
import path from "path";

const usersFilePath = path.join(__dirname, "../data/users.json");

const getUsers = async () => {
  try {
    const fileData = await fsPromises.readFile(usersFilePath, "utf-8");
    return JSON.parse(fileData);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const saveUsers = async (users) => {
  try {
    await fsPromises.writeFile(usersFilePath, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error(error);
    throw error;
  }
};
