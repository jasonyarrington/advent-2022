
const testFileName = "./day11/test.txt"
const dataFileName = "./day11/data.txt"
const { run } = require('./day11.js')
const { Monkey } = require('./Monkey')
const { Monkies } = require('./Monkies')

const m = 
`Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3`

test('Test Monkey', () => {

  let monkey = new Monkey(m)

    expect(monkey.id).toBe(0)
    expect(monkey.items).toStrictEqual([79, 98])
    expect(monkey.operation).toBe('new = old * 19')
    expect(monkey.test).toBe('divisible by 23')
    expect(monkey.ifTrue).toBe(2)
    expect(monkey.ifFalse).toBe(3)

    
})

test('Monkies', () => {
    const monkies = new Monkies(m)

    monkey = monkies.getMonkey(0)

    expect(monkey.id).toBe(0)
    expect(monkey.items).toStrictEqual([79, 98])
    expect(monkey.operation).toBe('new = old * 19')
    expect(monkey.test).toBe('divisible by 23')
    expect(monkey.ifTrue).toBe(2)
    expect(monkey.ifFalse).toBe(3)
})
// test('Answer', () => {
    
//     const answerData = run(dataFileName)
//     expect (answerData.hello).toBe("Hello world")

// })
