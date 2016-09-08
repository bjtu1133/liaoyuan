"use strict"

let fs = require("fs");
let csv = require("csv-parser");
let emitter = require("../emitter");

class PubAccFund{

  constructor(filePath){
    this.filePath = filePath;
    this.dataLoaded = false;
  }

  init(){
    console.log("init Acc fund table");

    fs.createReadStream(this.filePath)
      .pipe(csv())
      .on('headers', (headers) => {
        this.keys = headers;
      })
      .on("data", (data) => {
        this.data = data;
      })
      .on("end",()=>{
        if(this.test()){
          this.dataLoaded = true;
          emitter.emit("Fileloaded");
        }else{
          emitter.emit("error");
        }
      });
  }
  getPubAccFund(salary,rate){
    let baseSalary = this.data[this.keys[0]];
    if(salary > baseSalary*3){
      return baseSalary*3*rate;
    }else if(salary <= baseSalary*0.60){
      return baseSalary*0.60*rate;
    }else{
      return salary * rate;
    }
  }

  test(){
    /*
    * TO DO More test here
    */
    if(!this.data || !this.keys){
      return false;
    }else {
      return true;
    }
  }
}

module.exports = PubAccFund;
