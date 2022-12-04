
const testFileName = "./day4/test.txt"
const dataFileName = "./day4/data.txt"
const day = "4"
const { run , isFullyContained, isOverlapped } = require('./day4.js')

test('isFullyContained', () => {
    expect(isFullyContained('6-6,4-6')).toBe(true)
    expect(isFullyContained('1-2,4-5')).toBe(false)
    expect(isFullyContained('1-2,2-5')).toBe(false)
    expect(isFullyContained('2-8,3-7')).toBe(true)
})

test('isOverlapped', () => {
    expect(isOverlapped('2-3,4-5')).toBe(false)
    expect(isOverlapped('2-4,6-8')).toBe(false)
    expect(isOverlapped('5-7,7-9')).toBe(true)
    expect(isOverlapped('2-8,3-7')).toBe(true)
})

test('Answer', () => {
    const answer = run(testFileName)
    expect (answer.countContained).toBe(2)
    expect (answer.overlapped).toBe(4)
    // With final data
    const answerData = run(dataFileName)

    console.log(answerData)
})
