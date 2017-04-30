const path = require('path');//we have no need to install path we can directly use it to define paths in node js//
const express = require('express');
const port = process.env.PORT||3000;//used for deploying in heroku//
const publicpath=path.join(__dirname,'../public');//path.join () includes the file from other folders//
var app = express();

app.use(express.static(publicpath));

app.listen(3000,()=>{
    console.log(`Server running at ${port}`);//value of port is transferred to `${port}`///
});