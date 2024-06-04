# Dependencies

- typescript
  - for use in build process to compile Javascript files to be used in productions
- ts-node
  - executing Typescript code directly without prior compilation into Javascript used in development for quick iteration and testing
- dotenv
  - for loading environment variables from a .env file for sensitive information like port number, database credentials, etc
- ts-jest
  - for testing Typescript code with Jest
- @types/node
- @types/express
- @types/jest

# Scripts

```json
{
  "build": "tsc",
  "prestart": "npm run build",
  "start": "node dist/index.js",
  "start:dev": "nodemon -e ts -w ./src -x npm run serve",
  "serve": "ts-node src/index.ts",
  "test": "jest",
  "test:watch": "jest --watch",
  "prepare": "husky"
}
```

Decided to use **nodemon** instead of something like **ts-node-dev** for hot reloading because of it was already installed in the project

# Refactoring Decisions

### Using promises from fs module instead of callbacks

So that we can use async/await syntax and avoid callback hell. Also, it makes the code easier to read and understand with cleaner error handling

### Moving file reading logic to userService.ts

Didn't want all the logic to be in the controller

### Moving users.json to data folder

Treating it as a database file and not part of the source code

### Taking Test Driven Development approach

Decided to write tests first with expected outcomes to see if existing logic even works. Even if the existing logic is correct it may still be written better. Need to ensure that the outcomes are the same after refactoring in this case as well.
