import { Request, Response } from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  updateUser,
} from "../src/userController";
import { twoUsersStub } from "./users.stub";
import { IParams } from "../src/types/params";

// mocking out the userService module
jest.mock("../src/userService", () => ({
  getUsers: jest.fn(),
  saveUsers: jest.fn(),
}));

const createMockResponse = () => {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;
};

beforeEach(() => {
  jest.resetAllMocks();
  (getUsers as jest.Mock).mockResolvedValue(twoUsersStub);
  (saveUsers as jest.Mock).mockImplementation((users) =>
    Promise.resolve(users),
  );
});

import { getUsers, saveUsers } from "../src/userService";

describe("userController", () => {
  describe("createUser", () => {
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
      const res = createMockResponse();
      const expectedNewUser = { id: 3, ...newUser };

      await createUser(req, res);
      expect(saveUsers).toHaveBeenCalledWith([
        ...twoUsersStub,
        expectedNewUser,
      ]);
    });
  });

  describe("getUserById", () => {
    it("should return user by id", async () => {
      const req = {
        params: {
          id: "2",
        },
      } as Request<IParams>;
      const res = createMockResponse();
      await getUserById(req, res);
      expect(res.json).toHaveBeenCalledWith(twoUsersStub[1]);
    });
    it("should return 404 if user id does not exist", async () => {
      const req = {
        params: {
          id: "4",
        },
      } as Request<IParams>;
      const res = createMockResponse();

      await getUserById(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
    });
  });

  describe("updateUser", () => {
    it("should update a user", async () => {
      const updatedUser = {
        name: "Raymond Lee",
        email: "raymond.lee@example.com",
        address: {
          street: "789 Elm Ct",
          city: "Otherville",
          state: "TX",
          zipCode: "54321",
        },
      };
      const req = {
        params: {
          id: "2",
        },
        body: {
          ...updatedUser,
        },
      } as Request<IParams>;
      const res = createMockResponse();

      const newUserList = twoUsersStub.map((user) => {
        if (user.id === 2) {
          return { id: 2, ...updatedUser };
        }
        return user;
      });

      await updateUser(req, res);
      expect(saveUsers).toHaveBeenCalledWith(newUserList);
      expect(res.json).toHaveBeenCalledWith({ id: 2, ...updatedUser });
    });
    it("should return 404 if user id does not exist", async () => {
      const updatedUser = {
        name: "Raymond Lee",
        email: "raymond.lee@example.com",
        address: {
          street: "789 Elm Ct",
          city: "Otherville",
          state: "TX",
          zipCode: "54321",
        },
      };
      const req = {
        params: {
          id: "4",
        },
        body: {
          ...updatedUser,
        },
      } as Request<IParams>;
      const res = createMockResponse();

      await updateUser(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
    });
  });

  describe("deleteUser", () => {
    it("should delete a user", async () => {
      const req = {
        params: {
          id: "2",
        },
      } as Request<IParams>;
      const res = createMockResponse();

      await deleteUser(req, res);
      expect(saveUsers).toHaveBeenCalledWith([twoUsersStub[0]]);
    });
  });
});
