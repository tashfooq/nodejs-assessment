import { Request, Response } from "express";
import { getUsers, saveUsers } from "./userService";
import { IParams } from "./types/params";
import { User, UserWithId } from "./types/user";

export const getAllUsers = async (res: Response) => {
  const users = await getUsers();
  // maybe some error handling here
  res.json(users);
};

export const createUser = async (req: Request<{}, {}, User>, res: Response) => {
  const { name, email, address } = req.body;
  const users = await getUsers();
  const newUser = { id: users.length + 1, name, email, address };
  users.push(newUser);
  await saveUsers(users);
  res.status(201).json(newUser);
};

export const getUserById = async (req: Request<IParams>, res: Response) => {
  const users = await getUsers();
  const userId = parseInt(req.params.id);

  const user = users.find((u: UserWithId) => u.id === userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
};

export const updateUser = async (
  req: Request<IParams, {}, User>,
  res: Response,
) => {
  const users = await getUsers();
  const userId = parseInt(req.params.id);
  const { name, email, address } = req.body;

  const userIndex = users.findIndex((u: UserWithId) => u.id === userId);

  if (userIndex !== -1) {
    // if -1 user not found
    const updatedUser = { id: userId, name, email, address };
    const updatedUsers = [
      ...users.slice(0, userIndex),
      updatedUser,
      ...users.slice(userIndex + 1),
    ];
    saveUsers(updatedUsers);
    res.json(updatedUser);
  } else {
    res.status(404).json({ error: "User not found" });
  }
};
//
// const deleteUser = (req, res) => {
//   const users = getUsers();
//   const userId = parseInt(req.params.id);
//   let user;
//
//   for (let i = 0; i < users.length; i++) {
//     if (users[i].id === userId) {
//       user = users[i];
//       break;
//     }
//   }
//
//   if (user) {
//     const updatedUsers = users.filter((u) => u.id !== userId);
//     saveUsers(updatedUsers);
//     res.json({ message: "User deleted successfully" });
//   } else {
//     res.status(404).json({ error: "User not found" });
//   }
// };
