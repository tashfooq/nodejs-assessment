import { Request, Response } from "express";
import { createUser, getUserById } from "../src/userController";
import { twoUsersStub } from "./users.stub";

// mocking out the userService module
jest.mock("../src/userService", () => ({
  getUsers: jest.fn(),
  saveUsers: jest.fn(),
}));

beforeEach(() => {
  jest.resetAllMocks();
  (getUsers as jest.Mock).mockResolvedValue(twoUsersStub);
  (saveUsers as jest.Mock).mockImplementation((users) =>
    Promise.resolve(users),
  );
});

import { getUsers, saveUsers } from "../src/userService";
import { IParams } from "../src/types/params";

describe("userController", () => {
  it("should create a new user", async () => {
    const newUser = {
      name: "Alice Doe",
      email: "alice.doe@example.com",
      address: {
        street: "789 Elm Ct",
        city: "Otherville",
        state: "TX",
        zipCode: "54321",
      },
    };
    const req = {
      body: {
        ...newUser,
      },
    } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const expectedNewUser = { id: 3, ...newUser };
    const twoUserStubClone = JSON.parse(JSON.stringify(twoUsersStub));

    await createUser(req, res);

    expect(saveUsers).toHaveBeenCalledWith([
      ...twoUserStubClone,
      expectedNewUser,
    ]);
  });
  it("should return user by id", async () => {
    const req = {
      params: {
        id: "2",
      },
    } as Request<IParams>;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    await getUserById(req, res);
    expect(res.json).toHaveBeenCalledWith(twoUsersStub[1]);
  });
  it("should return 404 if user id does not exist", async () => {
    const req = {
      params: {
        id: "4",
      },
    } as Request<IParams>;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    await getUserById(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
  });
});
