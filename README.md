# Dependencies

- typescript
  - for use in build process to compile Javascript files to be used in productions
- ts-node
  - executing Typescript code directly without prior compilation into Javascript used in development for quick iteration and testing
- @types/node
- @types/express
- dotenv
  - for loading environment variables from a .env file for sensitive information like port number, database credentials, etc

# Scripts

```json
{
  "build": "tsc",
  "prestart": "npm run build",
  "start": "node dist/index.js",
  "start:dev": "nodemon -e ts -w ./src -x npm run serve",
  "serve": "ts-node src/index.ts"
}
```

Decided to use **nodemon** instead of something like **ts-node-dev** for hot reloading because of it was already installed in the project

# Refactoring Decisions

### Using promises from fs module instead of callbacks

So that we can use async/await syntax and avoid callback hell. Also, it makes the code easier to read and understand with cleaner error handling.

### Moving file reading logic to userService.ts

This way it's much cleaner than having everything in the controller
