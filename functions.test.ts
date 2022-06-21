const {shuffleArray} = require('./utils')

describe('shuffleArray should', () => {
    // CODE HERE
    test('return an array',() => {
        let arr = [1,2,3,4,5]
        let result = shuffleArray
        expect(result).toHaveProperty('length')
    })


    test('returns an array of the same length',() => {
        let arr = [1,2,3,4,5]
        let result = shuffleArray(arr)
        expect(result.length).toEqual(arr.length)
    })

    test('returns an array with all the same items',() => {
        let arr = [1,2,3,4,5]
        let result = shuffleArray(arr)
        expect(result).toEqual(expect.arrayContaining(arr))
    })

    test('returns an array with shuffled items',() => {
        let arr = [1,2,3,4,5]
        let result = shuffleArray(arr)
        // console.log('result--------------',result.join())
        // console.log('arr-----------------',arr.join())
        expect(result.join()).not.toEqual(arr.join())
    })
})