"use strict"
import Calc from "/public/js/clsCalc.js"


const calculator = new Calc(document.getElementById("err1"), document.getElementById("output-1"),
document.getElementById("output-2"));

const numberKeys = document.querySelectorAll('[numKey]')
const ops = document.querySelectorAll('[op]')


numberKeys.forEach(button=>{ // numbers
  button.addEventListener('click',()=>{
    calculator.updateNumber(button.innerText)
  })

})

ops.forEach(op=>{ // numbers
  op.addEventListener('click',()=>{
    calculator.updateOp(op.innerText)
  })

})


document.getElementById("clear").addEventListener('click', ()=> { // clear
  calculator.clearAll();
})

document.getElementById("back").addEventListener('click', ()=> { // clear
  calculator.back_1();
})

document.getElementById("equals").addEventListener('click', ()=> { // clear
  calculator.equals();
})