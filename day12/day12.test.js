
const testFileName = "./day12/test.txt"
const dataFileName = "./day12/data.txt"
const { Hiker } = require('./day12.js')


test('Test', () => {
    const hiker = new Hiker(testFileName)
    expect (hiker.start).toStrictEqual({x: 0, y: 0})
    expect (hiker.end).toStrictEqual({ x: 5, y: 2 })

    let start = hiker.findPath()
    expect(start).toBe(31)

    let shortest = hiker.findShortestPath()
    expect(shortest).toBe(29)
})

test('Answer', () => {
    
    const hiker = new Hiker(dataFileName)
    let start = hiker.findPath()
    console.log('path from set start::', start)

    let shortest = hiker.findShortestPath()
    console.log('shortest::', shortest)

    hiker.output()

})
