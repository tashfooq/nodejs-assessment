# Dependencies

- typescript
  - for use in build process to compile Javascript files to be used in productions
- ts-node
  - executing Typescript code directly without prior compilation into Javascript used in development for quick iteration and testing
- @types/node
- @types/express

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
