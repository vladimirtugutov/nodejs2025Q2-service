# Home Library Service

# Important Notice
 
⚠️ **The tests are not working with Node.js version 25 or higher** ⚠️

Due to compatibility issues with the `jsonwebtoken` library and its dependencies, the e2e tests will fail with the error.

**Solution:** Please use **Node.js v24.11.1 LTS** or any stable version in the v22.x or v24.x range.

- ✅ **Recommended:** Node.js v24.11.1 LTS
- ✅ **Also works:** Node.js v22.x LTS

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Adding .env file
fill it with your data, use .env.example as an example 

## Running application

```
npm start
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
