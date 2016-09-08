"use strict"

let express = require("express");
let route = require("./route");
let emitter = require("./emitter");
let app = express();

emitter.on("RouteReady", () =>{
  app.use( express.static(__dirname + "/../client" ));
  app.use("/" , route);
  app.listen(8282, () => console.log("Listen on 8282"));
});
