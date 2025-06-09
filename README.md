# Home Library Service

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

### Containerization 

Build and run all containers (NestJS app + PostgreSQL):

```
docker-compose up --build

```

NestJS app will be available at: http://localhost:4000



### Vulnerability Scan

Trivy Installation (Windows):
- Download the latest release of Trivy CLI for Windows from the GitHub Releases page.

- Extract the trivy.exe file.

- Add the folder with trivy.exe to your system PATH:

- Press Win + R, type sysdm.cpl, go to Advanced > Environment Variables.

- Under System variables, select Path and click Edit.

- Click New, add the folder path with trivy.exe, click OK.

Now you can run Trivy from any terminal like so:

```bash
trivy image nodejs2025q2-service-app

```

To scan the Docker image for known vulnerabilities:

```bash
npm run scan

```


## Docker Hub

This project is also available as Docker image:  
 https://hub.docker.com/r/tugutov/home-library

To pull:

```bash
docker pull tugutov/home-library

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
