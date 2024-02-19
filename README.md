# Todo-service

![coverage badge](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/wiki/stevensnoeijen/todo-service/coverage-diff-badge.json)

## Prerequisites

- node (nvm)
- docker with docker-compose

## Installation

```bash
$ npm install
```

Run `cp .env.example .env` and fill in the empty variables.

Follow https://developers.google.com/identity/openid-connect/openid-connect#appsetup for setting up google's integration, after that enable google's Tasks API and add fill in the env-vars in `.env`.

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
# unit tests and acceptance tests
$ npm run test

# unit tests
$ npm run test:unit

# acceptance tests
$ npm run test:acceptance

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
