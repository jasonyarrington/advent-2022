
const testFileName = "./day5/test.txt"
const dataFileName = "./day5/data.txt"
const day = "5"
const { run, parseRow, getMove, transposeStacks } = require('./day5.js')

test('parseRow', () => {
    expect(parseRow('[A] [B] [C]')[0]).toBe('A')
    expect(parseRow('[A] [B] [C]')[1]).toBe('B')
    expect(parseRow('[A] [B] [C]')[2]).toBe('C')
    expect(parseRow('    [B] [C]')[0]).toBe(' ')
    expect(parseRow('[A]     [C]')[1]).toBe(' ')
    expect(parseRow('[A]     [C]')[2]).toBe('C')

})

test('getMove', () => {
    expect(getMove('move 1 from 3 to 2').move).toBe(1)
    expect(getMove('move 1 from 3 to 2').from).toBe(3 - 1)
    expect(getMove('move 12 from 5 to 1').to).toBe(1 - 1)
})

test('transposeStacks', () => {
    let rows = 
`[D]    
[N] [C]    
[Z] [M] [P]
 1   2   3`
    let stacks = transposeStacks(rows)

    console.log('STACKS:', stacks)
    expect(stacks[2][0]).toBe('P')
    expect(stacks[0][2]).toBe('D')
})

test('Answer with test data', () => {
    const answer = run(testFileName)
    expect (answer.mover9000).toBe("CMZ")

    expect (answer.mover9001).toBe("MCD")
})

test('Answer', () => {

    const answerData = run(dataFileName)
    console.log('ANSWER: ', answerData)

})
