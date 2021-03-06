// set up basic express server
let express = require("express");
let app = express();
let path = require("path");
let server = require("http").createServer(app);
let io = require("socket.io")(server);
let port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log("Server listening at port http://localhost:" + port);
});

// Routing
app.use(express.static(path.join(__dirname, "public")));

// Chatroom

let numUsers = 0;

io.on("connection", socket => {
  let addedUser = false;

  // when the client emits 'new message', this listen and executes
  socket.on("new message", data => {
    // we tell the client to execute 'new message'
    socket.broadcast.emit("new message", {
      username: socket.username,
      message: data
    });
  });

  // whtn the clitn emits 'add user', this listens and executes
  socket.on("add user", username => {
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
    ++numUsers;
    addedUser = true;
    socket.emit("login", {
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit("user joined", {
      username: socket.username,
      numUsers: numUsers
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on("typing", () => {
    socket.broadcast.emit("typing", {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on("stop typing", () => {
    socket.broadcast.emit("stop typing", {
      username: socket.username
    });
  });

  //when the user disconnects.. perform this

  socket.on("disconnect", () => {
    if (addedUser) {
      --numUsers;

      //echo globally that this client has left
      socket.broadcast.emit("user left", {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});
