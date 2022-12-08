
const testFileName = "./day8/test.txt"
const dataFileName = "./day8/data.txt"
const fs = require("fs")
const { run, visibleTreesFromPoint } = require('./day8.js')

test('visibleTreesFromPoint', () => {

    let str = fs.readFileSync(testFileName, 'utf8')
    const data = str.toString().split("\n")

    expect(visibleTreesFromPoint(2, 1, data)).toBe(4)
    expect(visibleTreesFromPoint(2, 3, data)).toBe(8)
    expect(visibleTreesFromPoint(0, 0, data)).toBe(0)
    expect(visibleTreesFromPoint(4, 4, data)).toBe(0)

})

test('Test', () => {
    const answer = run(testFileName)
    expect (answer.visibleTrees).toBe(21)
    expect (answer.bestSpot.visibleTrees).toBe(8)

})

test('Answer', () => {
    
    const answerData = run(dataFileName)
    console.log('Part 1:', answerData.visibleTrees)
    console.log('Part 2:', answerData.bestSpot.visibleTrees)

})
