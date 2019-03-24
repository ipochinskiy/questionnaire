# Questionnaire

A tiny client-server application for gathering users' answers to the given questions.

## Design notes

In this project the client and the server parts are strictly separated and communicate with each other via REST API.

The client is **mobile-only** and was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). It uses [Redux](https://redux.js.org/) for state management and [Redux-Saga](https://redux-saga.js.org/) for communication with the server.

The server is built using [Fastify](https://www.fastify.io/) framework and utilizing [MongoDB](https://www.mongodb.com/) as a database.

As a virtualization tool [Docker](https://www.docker.com/) is used and it's the only tool required to run the application.
The ```docker-compose.yml``` file creates a bind mount directory that allows to test anything live, every code change for the server or client will immediately become available.

## How to run application

To bring the project up first [install Docker](https://www.docker.com/), then run:

```
docker-compose up
```

The ```docker-compose.yml``` file routes port 80 on the host machine to the client running on 3000 in the Docker container, so once the system is up the client is available at http://localhost.

To bring it down:

```
docker-compose down
```

If you change one of the ```Dockerfile```s and must rebuild the Node.js or React images, run:

```
docker-compose up --build
```

## How to test application

For running tests for both client and server, Node.js >= v10 is required.

To run (and watch) tests for the client:
```
cd web-client
npm test
```

To run (single run) tests for the server:
```
cd server
npm test
```

To run (and watch) tests for the server:
```
cd server
npm run test:watch
```
