
const testFileName = "./day9/test.txt"
const dataFileName = "./day9/data.txt"
const { run, getMove, Rope } = require('./day9.js')

test('move R 4', () => {
    let rope = new Rope()

    // Move right, start same spot
    rope.move("R 4")
    expect(rope.getTail()).toStrictEqual({x: 3, y: 0})
    expect(rope.getTrail()).toStrictEqual({'00': 1, '10': 1, '20': 1, '30': 1})
})

test('move L 4', () => {
    let rope = new Rope()

    // Move right, start same spot
    rope.move("L 4")
    expect(rope.getTail()).toStrictEqual({x: -3, y: 0})
    expect(rope.getTrail()).toStrictEqual({'00': 1, '-10': 1, '-20': 1, '-30': 1})
})

test('move U 4', () => {
    let rope = new Rope()

    // Move right, start same spot
    rope.move("U 4")
    expect(rope.getTail()).toStrictEqual({x: 0, y: -3})
    expect(rope.getTrail()).toStrictEqual({'00': 1, '0-1': 1, '0-2': 1, '0-3': 1})
})

test('move D 4', () => {
    let rope = new Rope()

    // Move right, start same spot
    rope.move("D 4")
    expect(rope.getTail()).toStrictEqual({x: 0, y: 3})
    expect(rope.getTrail()).toStrictEqual({'00': 1, '01': 1, '02': 1, '03': 1})
})

test('diagonal move', () => {
    let rope = new Rope()

    // Move right, move up
    rope.move("R 1")
    rope.move("U 2")
    expect(rope.getTail()).toStrictEqual({x: 1, y: -1})
    expect(rope.getTrail()).toStrictEqual({'00': 1, '1-1': 1})
})

test('Test', () => {
    const answer = run(testFileName)
    expect (answer.tailSpots).toBe(13)
})

test('moveTail', () => {

    const rope = new Rope()
    expect(rope.moveTail({x: 2, y: 0}, {x:0, y:0})).toStrictEqual({x: 1, y: 0})
    expect(rope.moveTail({x: -2, y: 0}, {x:0, y:0})).toStrictEqual({x: -1, y: 0})
    expect(rope.moveTail({x: 2, y: 1}, {x:0, y:0})).toStrictEqual({x: 1, y: 1})
    expect(rope.moveTail({x: 2, y: 2}, {x:0, y:0})).toStrictEqual({x: 1, y: 1})

})
test('10 knots, 2 moves', () => {

    let rope = new Rope(10)
    rope.move('R 5')
    rope.move('U 8')

    expect(rope.getTailSpots()).toBe(1)
})

test('10 knots', () => {
    const moveStr = 
`R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`

    const moves = moveStr.split("\n")

    let rope = new Rope(10)

    moves.forEach((move) => {
        rope.move(move)
    })
    const tailSpots = rope.getTailSpots()

    expect(tailSpots).toBe(36)

})
test('Answer', () => {
    
    const answerData = run(dataFileName)
    console.log(answerData)

})
