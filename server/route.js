"use strict"



let express = require ("express");
let bodyParser = require("body-parser");
let Calculator = require("./Calculator/Calculator");
let emitter = require("./emitter");

let jsonParser = bodyParser.json();
let route = express.Router();

let calculator = new Calculator();
calculator.loadData();

emitter.on("CalculatorReady", () => {
  console.log("CalculatorReady");

  route.post("/salary",jsonParser,(req,res) => {
    let result = [];
    if(!req.body || !req.body.data
      || !req.body.data.length){
        res.setStatus(400).send("Bad Request");
      }
    for(let i = 0 ; i< req.body.data.length ; i++){
      result.push(calculator.calculate(req.body.data[i]));
    }
    console.log(result);
    res.json(result);
  });
  console.log("Route Ready");
  emitter.emit("RouteReady");
});

module.exports = route;
