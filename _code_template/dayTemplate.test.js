
const testFileName = "./day<DAY>/test.txt"
const dataFileName = "./day<DAY>/data.txt"
const day = "<DAY>"
const run = require('./day<DAY>.js')


test('Day ' + day + ' should work with test data', () => {
    const answer = run(testFileName)
    expect (answer.hello).toBe("Hello world")
})

test('Day ' + day + ' should work with test data again', () => {
    const answer = run(testFileName)
    expect (answer.hello).toBe("Hello world")

    const answerData = run(dataFileName)
    expect (answerData.hello).toBe("Hello world")

})
