let express = require('express');
const portNumber=4200;
const app = express();

app.listen(portNumber, function (){
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

