const {shuffleArray} = require('./utils')

describe('shuffleArray should', () => {
    // CODE HERE
    let sampleArr = ["Hello", "World"]
    test("Be an array", () => { 
        expect(shuffleArray(sampleArr) instanceof Array).toEqual(true)   
      });

    test("Be same length as input", () => { 
    expect(shuffleArray(sampleArr).length).toEqual(sampleArr.length)   
    });
    
})