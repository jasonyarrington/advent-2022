
const testFileName = "./day<DAY>/test.txt"
const dataFileName = "./day<DAY>/data.txt"
const run = require('./day<DAY>.js')


test('Test', () => {
    const answer = run(testFileName)
    expect (answer.hello).toBe("Hello world")
})

test('Answer', () => {
    
    const answerData = run(dataFileName)
    expect (answerData.hello).toBe("Hello world")

})
