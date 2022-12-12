
const testFileName = "./day11/test.txt"
const dataFileName = "./day11/data.txt"
const run = require('./day11.js')


test('Test', () => {
    const answer = run(testFileName)
    expect (answer.hello).toBe("Hello world")
})

test('Answer', () => {
    
    const answerData = run(dataFileName)
    expect (answerData.hello).toBe("Hello world")

})
