const day1 = require("./day1.js")

test('Day 1 should work', () => {
    const answer = day1('./day1/test.txt')
    expect(answer.index).toBe(3)
    expect(answer.calories).toBe(24000)
})

test('Day 1b sorted array', () => {
    const answer = day1('./day1/test.txt')
    
    expect(answer.elves[0].index).toBe(3)
    expect(answer.elves[0].calories).toBe(24000)
    expect(answer.elves[1].index).toBe(2)
    expect(answer.elves[1].calories).toBe(11000)
    expect(answer.elves[2].index).toBe(4)
    expect(answer.elves[2].calories).toBe(10000)
    expect(answer.top3).toBe(45000)

    const answerData = day1('./day1/data.txt')

    console.log("Answer::", answerData)

})