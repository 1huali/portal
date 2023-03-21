let express = require('express');
const portNumber=4200;
const app = express();
let httpServer = require('http').createServer(app);  // create a server (using the Express framework object)

httpServer.listen(portNumber, function (){
    console.log("server running on port"+portNumber);
});

// directory that is made available to the public:
app.use(express.static(__dirname + '/public'));

//request to the index.html :
app.get('/home',requestHandlerTest);
//callback function
function requestHandlerTest(request,response){
    response.sendFile(__dirname + '/public/index.html');
}

//request to retrieve the client data from testForm and client.js :
app.get('/thoughtSubmit',handleGetVars);

function handleGetVars(request,response){
  console.log(request.url);
  console.log(request.query);
  response.send("GOT IT! THANKS!");
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
io.on('connect', function(socket){
    console.log("original id:: "+ socket.id);
    socket.on('join', function (data) {
      clientIdIncrementing++;
     // callback funtion that sends back the id:
     socket.emit('joinedClientId', clientIdIncrementing);
     console.log('a new user with id ' + clientIdIncrementing + " has entered");
     //keep track of the ids
     clientIds.push({id:clientIdIncrementing,socketId:socket.id});
  });

  });
