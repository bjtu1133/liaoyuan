"use strict"

let fs = require("fs");
let csv = require("csv-parser");
let PTaxTable = require("./PersonalTaxTable");
let InsuranceTable = require("./InsuranceTable");
let PubAccFund = require("./PubAccFundTable");
let BonusTable = require("./BonusTable");
let emitter = require("../emitter");
let CONST = require("../const");

class Calculator{

  constructor() {
    console.log("ctor");

    this.pTaxTable = new PTaxTable(CONST.pTaxTableFilePath);
    this.insuranceTable = new InsuranceTable(CONST.insuranceTableFilePath);
    this.pubAccFundTable = new PubAccFund(CONST.pubAccFundTableFilePath);
    this.bonusTable = new BonusTable(CONST.bonusTableFilePath);

    this.dataLoaded = false;
  }

  loadData(){

    emitter.on("Fileloaded", () => {
      if(this.pTaxTable.dataLoaded
        &&this.insuranceTable.dataLoaded
        &&this.pubAccFundTable.dataLoaded
        &&this.bonusTable.dataLoaded){
          this.dataLoaded = true;

          console.log("Calculator File Loaded complete");
          emitter.emit("CalculatorReady");
        }
    });

    this.pTaxTable.init();
    this.insuranceTable.init();
    this.pubAccFundTable.init();
    this.bonusTable.init();

  }

  calculate(configInfo){

    let result = {};

    let salary = configInfo.salary;
    let score = configInfo.score;
    let accFundRate = configInfo.accFundRate;
    let name = configInfo.name;

    let accFund = this.pubAccFundTable.getPubAccFund(salary,accFundRate);
    let bonus = this.bonusTable.getBonus(score);
    let cInsurance = this.insuranceTable.getCompanyInsurance(salary);
    let pInsurance = this.insuranceTable.getPersonalInsurance(salary);
    let pInsurancett = this.insuranceTable.getPersonalInsurancett(salary);
    let cInsurancett = this.insuranceTable.getCompanyInsurancett(salary);
    let pTax = this.pTaxTable.getPersonalTax(salary-accFund-pInsurancett+bonus);

    result.name = name;
    result.pInsurance = pInsurance;
    result.cInsurance = cInsurance;
    result.baseSalary = salary;
    result.bonus = bonus;
    result.pInsurancett = pInsurancett+accFund;
    result.cInsurancett = cInsurancett+accFund;
    result.beforeTax = salary - accFund - pInsurancett + bonus;
    result.afterTax = result.beforeTax - pTax;
    result.pTax = pTax;
    return result;
  }


}

module.exports = Calculator;
