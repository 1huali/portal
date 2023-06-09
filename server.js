let express = require('express');
const mongoose = require("mongoose");
// const portNumber=5000;
const portNumber= process.env.PORT || 3000;
const app = express();
let httpServer = require('http').createServer(app);  // create a server (using the Express framework object)
require('dotenv').config(); // enables the node librairy dotenv, that is used to enbale the .env file to be read (which stores the connection string to mongo)

const thoughtModel = require("./models");
//const { disconnect } = require('process');

httpServer.listen(portNumber, function (){
    console.log("server running on port"+portNumber);
});

// directory that is made available to the public:
app.use(express.static(__dirname + '/public'));

app.use(express.json());
// the mongo connection string (to the db) from the .env file:
mongoose.connect(process.env.MONGODB_URI);
//the connection is stored in  variable "db" :
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));


db.once("open", function () {
  console.log("Connected successfully");
});

//request to the index.html :
app.get('/home',requestHandlerTest);
//callback function
function requestHandlerTest(request,response){
    response.sendFile(__dirname + '/public/index.html');
}

//request to retrieve the client data from testForm and client.js :
app.get('/thoughtSubmit',handleGetVars);
//
async function handleGetVars(request,response){
  console.log(request.url);
  console.log(request.query);
  // response.send("User inpus vars received! THANKS!");

  const thought = new thoughtModel(request.query);
  //prepare for the db:
  try {
  let user = await thought.save();
    response.send(user);
  } catch (error) {
    response.status(500).send(error);
  }

}

//Updates the Saved from false to true;
app.get('/thoughtUpdate',saveFavorite);
async function saveFavorite(request,response){

  console.log("test")
  console.log(request.query);
  // response.send("thought updated to favorite! THANKS!");

  //const thought = new thoughtModel();
  //await thoughtModel.create({ thought: request.query.thought});
  const filter = { thought : request.query.thought }

  // //prepare for the db:
  try {
    let user = await thoughtModel.findOneAndUpdate(filter,{
      $set: {
        "saved": request.query.saved,
      },
    },{ new: true });
    console.log(user.saved);
    response.send("thought updated to favorite! THANKS!");
    // response.send(user);
  } catch (error) {
    response.status(500).send(error);
  }

}
//Sockets has 2 parts : socket.io (a server) AND socket.io-client (librairy that loads on client side)
// declare io which mounts to our httpServer object (runs on top ... )
let io = require('socket.io')(httpServer);
let clientIdIncrementing =0;
let clientIds =[];

    //CLIENT SETUP:
    app.use(express.static(__dirname + '/node_modules'));



//SERVER SETUP (io listens for the connection event for incoming sockets, and if one is connected):
//will log it to the console....
//the clientIdIncrementing is incrementing at the opening of link:
io.on('connect', function(socket){
    console.log("original id:: "+ socket.id);
    socket.on('join', function (data) {
      clientIdIncrementing++;
     // callback funtion that sends back the id:
     socket.emit('joinedClientId', clientIdIncrementing);
     console.log('a new user with id ' + clientIdIncrementing + " has entered");
     //keep track of the ids
     clientIds.push({id:clientIdIncrementing,socketId:socket.id});
     //to broadcast emit the number of client (label(numClient), value)
     io.emit("numClients", clientIdIncrementing);

  });
//the clientIdIncrementing is diminishing at the break of link:
  socket.on('disconnect', function(data){
    console.log("disconnected");
    clientIdIncrementing--;
    //broadcast the upadte:
    io.emit("numClients", clientIdIncrementing);
  })

  });

  //create route /users to retrieve all users saved :
app.get("/thoughts", async (request, response) => {
    const thoughts = await thoughtModel.find({});
  
    try {
      console.log(thoughts)
      response.send(thoughts);
    } catch (error) {
      response.status(500).send(error);
    }
  });


