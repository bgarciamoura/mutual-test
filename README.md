# Account Management API [![Generic badge](https://img.shields.io/badge/Version-1.0.0-<COLOR>.svg)](https://shields.io/)

:star: Star us on GitHub — it motivates us a lot!

This is a generic API for managing accounts. This API is designed to be used by third-party applications.

### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

-   [NodeJS](https://nodejs.org/en/)
-   [Typescript](https://www.typescriptlang.org/)
-   [Express](https://expressjs.com/pt-br/)
-   [Swagger](https://swagger.io/)
-   [Jest](https://jestjs.io/pt-BR/)
-   [MongoDB](https://www.mongodb.com/pt-br)
-   [Mongoose](https://mongoosejs.com/)
-   [Docker](https://www.docker.com/)

## Table of contents

-   [Getting Started](#getting-started)
-   [Installation](#installation)
-   [routes](#routes)
    -   [Account](#account-main)
        -   [Create Account](#create-account)
        -   [Update Account](#update-account)
        -   [Delete Account](#delete-account)
        -   [Get All Accounts](#get-all-accounts)
        -   [Get Account By UUID](#get-account-by-uuid)
        -   [Get Balance Account](#get-balance-account)
    -   [Movement](#movement-main)
        -   [Credit Account](#credit-account)
        -   [Debit Account](#debit-account)
        -   [Transfer Between Accounts](#transfer-between-accounts)
-   [Documentation](#documentation)
-   [Testing](#testing)
-   [Trello Board](#trello-board)

## Getting Started

The first thing you'll need is NodeJS installed on your machine. You can download it from [here](https://nodejs.org/en/download/). After install NodeJS, i strongly recommend you to install Yarn using the command below.

```bash
npm install -g yarn
```

After that, you'll need to install Docker. You can download it from [here](https://www.docker.com/community-edition).

Then clone the repository.

```bash
git clone https://github.com/bgarciamoura/mutual-test.git
```

After that, you'll need to install the dependencies. Follow the instructions below.

## Installation

To run this project on your machine, you have to install the dependencies. You can do this by running the following command:

```bash
yarn install
```

Or if you prefer to use NPM, you can do this by running the following command:

```bash
npm install
```

Now you have to run the command `docker-compose up`. This will start the server and the database. All the dependencies will be installed and the server will be running.

_To stop the server and the database, you can run the command `docker-compose down`._

The default port is 3333.

## Routes

The routes are the main API endpoints. You can find the list of routes below.

### Account

#### Create Account

    POST api/v1/accounts

    {
    	"name": "John Doe",
    	"cpf": "12345678901"
    }

#### Update Account

    PUT api/v1/accounts

    {
    	"name": "John Doe"
    }

#### Delete Account

    DELETE api/v1/accounts/:uuid

#### Get All Accounts

    GET api/v1/accounts

#### Get Account By UUID

    GET api/v1/accounts/:uuid

#### Get Balance Account

    GET api/v1/accounts/:uuid/balance

### Movement

#### Credit Account

    POST api/v1/movement/credit

    {
    	"uuid": "12345678901",
    	"value": 100,
    	"type": "credit"
    }

#### Debit Account

    POST api/v1/movement/debit

    {
    	"uuid": "12345678901",
    	"value": 100,
    	"type": "debit"
    }

#### Transfer Between Accounts

    POST api/v1/movement/transfer

    {
    	"accountId": "12345678901",
    	"targetAccountId": "12345678902",
    	"value": 100
    }

## Documentation

With the project running, you can access the documentation by accessing the following URL:

```bash
/api/v1/api-docs/
```

## Testing

To test the routes, you can use Postman. You can find the documentation [here](https://www.getpostman.com/docs/). In the root folder of the project, you can find the collection file for testing the routes in Postman.

Besides that, you also can test the API by using JEST. You can find the documentation [here](https://jestjs.io/docs/en/getting-started). In the root folder of the project, you can find the configuration file for testing the routes in JEST. For run all tests, you can run the command `yarn test`.

## Trello Board

The following links is for Trello board with all tasks to finish the project. You can find the board [here](https://trello.com/invite/b/CQRtcfPO/043d374712c57d2e70d988fac33b9a47/kanban-mutual).
