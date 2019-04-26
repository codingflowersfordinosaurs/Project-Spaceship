// including application routes and socket events, and set up of the application configuration
// DEPENDENCIES
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const bodyParser = require("body-parser");

const socketEvents = require("./config/socket");
const routes = require("./config/routes");
const config = require("./config/config");

class Server{
  constructor() {
    this.port = process.env.PORT || 3000;
    this.host = `localhost`;

    this.app = express();
    this.http = http.Server(this.app);
    this.socket = socketio(this.http);
  }

  appConfig() {
    this.app.use(
      bodyParser.json()
    );
    new config(this.app);
  }

  // INCLUDING APP ROUTES STARTS
  includeRoutes() {
    new routes(this.app).routesConfig();
    new socketEvents(this.socket).socketConfig();
  }
  // INCLUDING APP ROUTES ENDS
  appExecute() {
    this.appConfig();
    this.includeRoutes();

    this.http.listen(this.port, this.host, () => {
      console.log(`Server listening on http:${this.host}:${this.port}`);
    });
  }
}

const app = new Server();
app.appExecute();
