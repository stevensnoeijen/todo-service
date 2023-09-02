# Todo-service

## Prerequisites

- node (nvm)
- docker with docker-compose

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run dev

# production mode
$ npm run start:prod
```

_To apply all db migrations run `npm run db:up` after it started._
_This is required when starting the app for the first time, or when pulling changes and the db is reporting errors._

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Database

```bash
# Migrate db to latest
npm run db:up

# Reverse migration
npm run db:down

# Generate new migration accoding to entity changes, replace <name> with a descriptive name
NAME=<name> npm run db:generate-migration
```
