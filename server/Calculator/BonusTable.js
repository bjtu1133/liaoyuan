"use strict"

let fs = require("fs");
let csv = require("csv-parser");
let emitter = require("../emitter");

class BonusTable{

  constructor(filePath){
    this.filePath = filePath;
    this.dataLoaded = false;
  }

  init(){
    console.log("init bonus table");

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
  getBonus(score){
    return this.data[score]*1;
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

module.exports = BonusTable;
