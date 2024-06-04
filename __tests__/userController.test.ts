import { Request, Response } from "express";
import { createUser } from "../src/userController";
import { twoUsersStub } from "./users.stub";
import { getUsers } from "../src/userService";

// mocking out the userService module
jest.mock("../src/userService", () => ({
  // getUsers: jest.fn().mockResolvedValue(twoUsersStub),
  getUsers: jest.fn(),
  saveUsers: jest.fn((users) => Promise.resolve(users)),
}));

beforeEach(() => {
  jest.resetAllMocks();
  (getUsers as jest.Mock).mockResolvedValue(twoUsersStub);
  (saveUsers as jest.Mock).mockImplementation((users) =>
    Promise.resolve(users),
  );
});

import { saveUsers } from "../src/userService";
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
});
