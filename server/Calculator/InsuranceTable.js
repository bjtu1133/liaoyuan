"use strict"

let fs = require("fs");
let csv = require("csv-parser");
let emitter = require("../emitter");

class InsuranceTable{
  constructor(filePath){
    this.filePath = filePath;
    this.dataLoaded = false;
  }
  init(){
    console.log("init Insurance Table");
    fs.createReadStream(this.filePath)
      .pipe(csv())
      .on('headers', (headers) => {
        this.keys = headers;
      })
      .on("data", (data) => {
        if(data["类型"] == "个人"){
          this.pData = data;
        }else if(data["类型"] == "公司"){
          this.cData = data;
        }
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
    if(!this.pData || !this.cData || !this.keys){
      return false;
    }else {
      return true;
    }
  }
  getPersonalInsurancett(salary){

    let total = 0;

    for(let i = 1 ; i < this.keys.length ; i++) {
      total += this.pData[this.keys[i]] * salary;
    }

    return total;
  }
  getCompanyInsurancett(salary){
    
    let total = 0;

    for(let i = 1 ; i < this.keys.length ; i++) {
      total += this.pData[this.keys[i]] * salary;
    }

    return total;
  }
  getPersonalInsurance(salary){
    let insurance = {};
    let total = 0;

    for(let i = 1 ; i < this.keys.length ; i++) {
      insurance[this.keys[i]] = this.pData[this.keys[i]] * salary;
      total += insurance[this.keys[i]];
    }

    insurance["总计"] = total;
    return insurance;
  }

  getCompanyInsurance(salary){
    let insurance = {};
    let total = 0;
    for(let i = 1 ; i < this.keys.length ; i++) {
      insurance[this.keys[i]] = this.cData[this.keys[i]] * salary;
      total += insurance[this.keys[i]];
    }
    insurance["总计"] = total;
    return insurance;
  }

}
module.exports = InsuranceTable;
