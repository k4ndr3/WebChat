# Backend

## Installation

1. Change into this directory `./backend`

1. Run `npm install`

1. To Setup the Backend for the WebChat you must have a MySQL Database running on localhost:3306 or change the Database config in [the Database config](./src/config/database.ts).

1. Create the Database in your favorite SQL Editor with `CREATE DATABASE IF NOT EXISTS 'web_chat';`

## Startup

1. Start the Database like in Installation #3

1. Start the backend via npm `npm run start`

## General Structure

The backend is built out of 3 parts.

1. Express Server for Http Requests to get and change users and chats.

1. A WebSocket Server for the Message handling and the immediate delivery of the Message to all the Users in the Chat.

1. A MySQL Database Adapter to save the Data in the Database.

The complete backend is strongly typed with Typescript.

### Entry Point

The Application starts in [index.ts](./src/index.ts).

From there all other parts will be loaded. First the Database and after that the Server will be created and the Functions loaded into the application.

### Database Connection

The Database will be loaded with the [initialize Database Function in database/inizializeDatabase.ts](./src/database/inizializeDatabase.ts)

From there the Models in [models/database](./src/models/database) will be loaded and initialized.

### Express Server for HTTP Requests

The Express Rots are initialized in the main Entry Point with `app.use("/basePath", PathRouter)`.

From there the Routers distribute the Requests further and handle the Request in the Controller.

In the Controller all the Logic takes place.

### WebSocket Server

A WebSocket Connection is a bidirectional data socket, where both the client and the server can send messages.

All the different possible ws-messages are typed in [models/WebSocket/Message.ts](./src/models/WebSocket/Message.ts)

The WebSocket Server is in the Folder [sockets](./src/sockets)

The WebSocket starts with accepting the connection if the user is already logged in and the JSASSON cookie is present.

If the connection is established both sides can send Messages. The received messages are sorted by their types and then calculated. If the Message is relevant for other logged in users the Message will be send with the WebSocket to this client.
