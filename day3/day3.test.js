
const testFileName = "./day3/test.txt"
const dataFileName = "./day3/data.txt"
const day = "3"
const { exceptions } = require('../util/logger.js')
const { run, splitString, findElement, scoreElement, findBadge } = require('./day3.js')

const testString = 'vJrwpWtwJgWrhcsFMMfFFhFp'
test('splitString', () => {
    let s = splitString(testString)
    expect(s[0]).toBe('vJrwpWtwJgWr')
    expect(s[1]).toBe('hcsFMMfFFhFp')
})

test('findElement', () => {
    let el = findElement(testString)
    expect(el).toBe('p')
})

test('scoreElement', () => {
    expect(scoreElement('p')).toBe(16)
    expect(scoreElement('L')).toBe(38)
    expect(scoreElement('P')).toBe(42)
    expect(scoreElement('t')).toBe(20)
    expect(scoreElement(false)).toBe(0)
})


const group1 = 
`vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg`
    .split("\n")

    const group2 = 
`wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`
    .split("\n")

test('findBadge', () => {

    expect(findBadge(group1)).toBe("r")
    expect(findBadge(group2)).toBe("Z")

})

test('Answers', () => {
    const answer = run(testFileName)
    expect (answer.prioritySum).toBe(157)
    expect (answer.badgeSum).toBe(70)

    const answerData = run(dataFileName)

    console.info('Answer: ', answerData)

})

