
const testFileName = "./day7/test.txt"
const dataFileName = "./day7/data.txt"
const day = "7"
const { run, parseTerminal, directorySize, freeSpaceNeeded, smallestDelete } = require('./day7.js')

let sortedTest = 
`- / (dir)
  - a (dir)
    - e (dir)
      - i (file, size=584)
    - f (file, size=29116)
    - g (file, size=2557)
    - h.lst (file, size=62596)
  - b.txt (file, size=14848514)
  - c.dat (file, size=8504156)
  - d (dir)
    - j (file, size=4060174)
    - d.log (file, size=8033020)
    - d.ext (file, size=5626152)
    - k (file, size=7214296)`


test('parseTerminal', () => {
    const answer = run(testFileName)

    const data = answer.dataSorted
    
    expect(data['/']['c.dat']['size']).toBe(8504156)
    expect(data['/']['d']['d.log']['size']).toBe(8033020)

    expect(directorySize(data['/']['a']['e'])).toBe(584)
    expect(directorySize(data['/']['a'])).toBe(94853)
    expect(directorySize(data['/']['d'])).toBe(24933642)
    expect(directorySize(data['/'])).toBe(48381165)

    expect(answer.sumBelowMark).toBe(95437)

    expect(freeSpaceNeeded(70000000, 30000000, answer.dataSorted)).toBe(8381165)
    expect(smallestDelete(70000000, 30000000, answer.dataSorted, answer.dirsFlattened)).toBe(24933642)
})



test('Answer', () => {
    const answerData = run(dataFileName)

    console.log('Answer 1 ::', answerData.sumBelowMark)
    console.log('Answer 2 ::', answerData.smallest)

})
