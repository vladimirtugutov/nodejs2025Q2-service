# Home Library Service - REST service: Logging & Error Handling and Authentication and Authorization

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

## Environment setup (Docker + local Node)

1.	Create `.env` file based on `.env.example` and set database URL to use `localhost` (because Prisma and tests will run on the host).
Note: host is `localhost`, not `postgres`, because `npx prisma migrate deploy` and tests are executed outside Docker.
2. Start PostgreSQL via Docker. Run only the Postgres service from `docker-compose.yml`:
    ```
    docker compose up postgres -d
    ```
    This will start PostgreSQL container, and expose it on `localhost:5432` (make sure your `docker-compose.yml` maps port `5432:5432`).

3. Apply database migrations. With Postgres container running and `.env` configured, apply Prisma migrations from the host:

    ```
    npx prisma migrate deploy
    ```
    Prisma will connect to `localhost:5432` using `DATABASE_URL` from `.env`.

## Running application

```
npm start
```

## Testing

Before running tests make sure PostgreSQL is running and accessible with the same `DATABASE_URL` as in `.env`. Apply the steps from *Environment setup*.

Then, in another terminal, run tests:

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