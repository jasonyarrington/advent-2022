
const testFileName = "./day6/test.txt"
const dataFileName = "./day6/data.txt"
const day = "6"
const { run, startMarker, bufferUnique } = require('./day6.js')

const packets = [
    'mjqjpqmgbljsphdztnvjfqwrcgsmlb',
    'bvwbjplbgvbhsrlpgdmjqwftvncz',
    'nppdvjthqldpwncqszvftbrmjlhg',
    'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg',
    'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw'
]

test('checkBuffer', () => {
    expect(bufferUnique('hghg')).toBe(false)
    expect(bufferUnique('abcd')).toBe(true)
    expect(bufferUnique('ghTe')).toBe(true)

})

test('startPacketMarker', () => {
    let markerLength = 4
    expect(startMarker(packets[0], markerLength)).toBe(7)
    expect(startMarker(packets[1], markerLength)).toBe(5)
    expect(startMarker(packets[2], markerLength)).toBe(6)
    expect(startMarker(packets[3], markerLength)).toBe(10)
    expect(startMarker(packets[4], markerLength)).toBe(11)
})

test('startMessageMarker', () => {
    let markerLength = 14
    expect(startMarker(packets[0], markerLength)).toBe(19)
    expect(startMarker(packets[1], markerLength)).toBe(23)
    expect(startMarker(packets[2], markerLength)).toBe(23)
    expect(startMarker(packets[3], markerLength)).toBe(29)
    expect(startMarker(packets[4], markerLength)).toBe(26)
})

test('Answer', () => {
    const answer = run(dataFileName)

    console.log('ANSWER:::', answer)
})
