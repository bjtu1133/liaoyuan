"use strict"

let fs = require("fs");
let csv = require("csv-parser");
let emitter = require("../emitter");

class PersonalTaxTable{

  constructor(filePath){
    this.filePath = filePath;
    this.dataLoaded = false;
  }

  init(){
    console.log("init personal rate table");

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

  getPersonalTax(salary){
    if(salary < 3500){
      return 0;
    }else{
      salary = salary - 3500;
    }
    let tax = 0;
    for (let i =this.keys.length-1 ; i >= 0 ; i--){
      if (salary > this.keys[i]){
        tax += this.getRateByKeyNumber(i) * (salary - this.keys[i]);
        salary = this.keys[i];
      }
    }
    return tax;
  }

  getRateByKeyNumber(num){
    return this.data[this.keys[num]];
  }
}

module.exports = PersonalTaxTable;
