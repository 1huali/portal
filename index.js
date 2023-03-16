let express = require('express');
const portNumber=4200;
const app = express();

app.listen(portNumber, function (){
    console.log("server running on port"+portNumber);
});