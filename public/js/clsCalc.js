"use strict"

export default class Calc {

  numText
  outputText
  err1
  out1
  out2
  ob = {};



  constructor(err1, out1, out2) {
    this.err1 = err1;
    this.out1 = out1;
    this.out2 = out2;
    this.clearAll()
  }


  stripEqualsSign() {
    if (this.outputText.slice(-1) == "=") {
      this.outputText = this.outputText.slice(0, -1);
    }
  }


  updateOp(op) {
    this.stripEqualsSign();
    this.err1.innerHTML = "";

    if (!this.ob.readyForOp) { // error
      this.err1.innerHTML = "Expecting a number before performing an op";
      return
    }

    this.ob.mandatoryOp = false;
    if (this.ob.num1 == undefined) { // basic case
      this.ob.num1 = this.ob.numText * 1;
      this.outputText += op;
      this.out1.innerHTML = this.outputText;
      this.ob.op = op;
      this.ob.numText = "";
      this.ob.readyForOp = false;
    }
    else { // chaining calcs
      this.ob.num2 = this.ob.numText * 1;
      this.ob.isChained = true;
      this.equals();

      this.ob.mandatoryOp = false;

      this.outputText += op;
      this.out1.innerHTML = this.outputText;
      this.ob.op = op;
      this.ob.numText = "";
      this.ob.readyForOp = false;


    }

  }

  equals() {

    this.err1.innerHTML = ""; // clear any error msg

    if (!this.ob.isChained) {
      if (this.ob.num1 == undefined || this.ob.numText == "") { // missing operand
        this.err1.innerHTML = "Need to enter some numbers first";
        return;
      }
    }


    this.ob.isChained = false;

    this.addParentheses();
    this.out1.innerHTML = this.outputText + ' =';
    this.ob.num2 = this.ob.numText * 1;
    this.ob.numText = "";
    let ans = this.getAnswer();
    this.ob.num1 = ans;
    this.ob.readyForOp = true;
    this.out2.innerHTML = ans;
    this.ob.mandatoryOp = true;

  }


  addParentheses() {
    let s = this.outputText;
    
    if (s.slice(0, 1) != "(" || s.slice(-1) != ")") {
      this.outputText = '(' + this.outputText + ')';
      console.log("added parens");
    }
  }


  updateNumber(nextChar) {
    this.stripEqualsSign();
    this.err1.innerHTML = "";

    if (this.ob.numText.includes('.') && nextChar == '.') { // flash error
      this.err1.innerHTML = "Too many decimal pts in one number"
    }
    else if (this.ob.mandatoryOp) {
      this.err1.innerHTML = "Expecting an op (not a number)"
    }
    else {
      this.ob.numText += nextChar;
      this.outputText += nextChar
      this.out1.innerHTML = this.outputText;
      this.ob.readyForOp = true
    }

  }


  clearAll() {
    this.err1.innerHTML = "";
    this.out1.innerHTML = "";
    this.out2.innerHTML = "";
    this.outputText = "";
    this.ob = {
      "numText": "", "num1": undefined, "num2": undefined, "op": undefined, "readyForOp": false, "mandatoryOp": false,
      "isChained": false
    }
  }


  back_1() {
    if (this.ob.numText == "") {
      this.err1.innerHTML = "Number is already deleted"
    }
    else {
      this.ob.numText = this.ob.numText.slice(0, -1);
      this.outputText = this.outputText.slice(0, -1);
      this.out1.innerHTML = this.outputText;
    }
  }





  getAnswer() {
    let x = this.ob.num1;
    let y = this.ob.num2;

    switch (this.ob.op) {
      case "+":
        return x + y;
        break;
      case "-":
        return x - y;
        break;
      case "*":
        return x * y;
        break;
      case "/":
        return x / y;
        break;
      case "^":
        return x ** y;
        break;
      default:
        this.err1.innerHTML = "Need to enter another number first";
        return undefined;
    }

  }






}