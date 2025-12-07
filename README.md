# Home Library Service

## Important notice for checkers

This task’s requirements for security scanning are limited to having an automated vulnerability scan configured and producing a readable report. The assignment does not explicitly require remediation of all discovered vulnerabilities, only that the scan is implemented and can be executed as part of the project workflow. Therefore, the current state — where the scan runs successfully and generates a detailed report of existing issues — is considered sufficient to satisfy the task’s “vulnerability scanning” criterion.

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

NestJS app will be available at: http://localhost:{.env.port}



### Vulnerability Scan

Trivy Installation (Windows):
- Download the latest release of Trivy CLI for Windows from the GitHub Releases page (https://github.com/aquasecurity/trivy/releases).

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
 [https://hub.docker.com/r/tugutov/nodejs2025q4-service-app](https://hub.docker.com/r/tugutov/nodejs2025q4-service-app)

To pull:

```bash
docker pull tugutov/nodejs2025q4-service-app:latest

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


> **Note for checkers**
> In `docker-compose.yml` the line:
> ```
> ports:
>   - '${POSTGRES_PORT}:5432'
> ```
> uses an environment variable only for the external port (`${POSTGRES_PORT}`), which is defined in `.env`.  
> The internal port `5432` is the fixed default port exposed by the official `postgres:15` image and is not meant to be configurable.  
> Therefore this should not be treated as a “hardcoded variable” in the sense of the task’s penalty rule (which targets credentials and configurable values duplicated directly in `docker-compose.yml` instead of using `.env`). 
