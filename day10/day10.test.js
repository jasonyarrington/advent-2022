
const testFileName = "./day10/test.txt"
const dataFileName = "./day10/data.txt"
const { run, ClockCircuit } = require('./day10.js')

const answer = run(testFileName)
const clock = answer.clock

test('Signal Strength', () => {
    expect(clock.getSignalStrength(20)).toBe(420)
    expect(clock.getSignalStrength(60)).toBe(1140)
    expect(clock.getSignalStrength(100)).toBe(1800)
    expect(clock.getSignalStrength(140)).toBe(2940)
    expect(clock.getSignalStrength(180)).toBe(2880)
    expect(clock.getSignalStrength(220)).toBe(3960)
})

test('Total', () => {
    expect(clock.getTotalStrength(221)).toBe(13140)
})

test('Answer', () => {
    
    const answerData = run(dataFileName)
    console.log('Answer 1::', answerData.clock.getTotalStrength(221))

})
