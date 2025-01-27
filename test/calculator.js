const assert = require('assert')
const calculator = require('../app/calculator')

describe("Validating Arithmetic functions", ()=>{


    it("add(5, 2) should return 7", ()=>{
        assert.equal(calculator.add(5, 2), 7)
    })

    it("add(5, 2) should return 8", ()=>{
        assert.equal(calculator.add(5, 2), 8)
    })

  
    it("sub(5, 2) should return 3", ()=>{
        assert.equal(calculator.sub(5, 2), 3)
    })


    it("sub(5, 2) should return 5", ()=>{
        assert.equal(calculator.sub(5, 2), 5)
    })


    it("mul(5, 2) should return 10", ()=>{
        assert.equal(calculator.mul(5, 2), 10)
    })


    it("mul(5, 2) should return 12", ()=>{
        assert.equal(calculator.mul(5, 2), 12)
    })


    it("div(10, 2) should return 5", ()=>{
        assert.equal(calculator.div(10, 2), 5)
    })
    

    it("div(10, 2) should return 2", ()=>{
        assert.equal(calculator.div(10, 2), 2)
    })



})