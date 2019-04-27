<<<<<<< HEAD
// including application routes and socket events, and set up of the application configuration
// DEPENDENCIES
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const bodyParser = require("body-parser");

const socketEvents = require("./config/socket");
const routes = require("./config/routes");
const config = require("./config/config");

class Server {
  constructor() {
    this.port = process.env.PORT || 3000;
    this.host = `localhost`;

    this.app = express();
    this.http = http.Server(this.app);
    this.socket = socketio(this.http);
  }

  appConfig() {
    this.app.use(bodyParser.json());
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

// Filbert Code Below

// const express = require("express");
// const app = express();
// const port = process.env.PORT || 3000;
// require("dotenv").config();
// app.get("/", (req, res) => {
//   res.send(process.env.SECRET_KEY);
// });
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}.`);
// });
=======
<<<<<<< HEAD
var express = require("express");
var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// Use the express.static middleware to serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up Express Handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// require routes
// var routes = require("./controllers/spaceship_controller.js");
// app.use(routes);
// app.use("/", routes);

// Routes
// =============================================================
require("./routes/api-routes.js")(app);

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log(`Server listening on: http://localhost:${PORT}`);
});

/**
 * Sequelize
 *
 * npx sequelize init - add sequelize magic to your project
 * npx sequelize db:create - create database based on config/config.json
 * npx sequelize model:generate --name <MODEL_NAME> --atributes attr1:string,attr2:text,attr3:<TYPE>
 * npx sequelize db:migrate - going to create a new table based off of the model creatred from the previous command
 */
=======
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
require("dotenv").config();
app.get("/", (req, res) => {
  res.send(process.env.SECRET_KEY);
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
>>>>>>> master
>>>>>>> 81c37add5fbaaeb13081afe17d76c5de0e877913
