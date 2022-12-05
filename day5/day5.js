const fs = require("fs")
const { moveMessagePortToContext } = require("worker_threads")
const logger = require('../util/logger')

exports.getMove = (str) => {
    let parsed = str.split(" ")
   
    return {
        move: Number(parsed[1]),
        from: Number(parsed[3]) - 1,
        to: Number(parsed[5]) - 1
    }
}

exports.parseRow = (str) => {
    let row = []
    // values are at 2, 6, 10 ...
    for (i = 1; i <= str.length; i += 4 ) {
        row.push(str.slice(i, i+1))
    }
    return row
}

exports.transposeStacks = (str) => {
    let stacks = []

    let rows = str.split("\n")

    // Labels are on the last line
    let stackLabels = rows.pop().trim().split(/\s+/)

    // Stacks are labeled starting at 1
    let stackCount = stackLabels.length

    // For each row, if there is an element in the stack, put it in the stack
    // from the bottom up
    for (let rowIndex = rows.length - 1; rowIndex >= 0; rowIndex--) {
        let row = this.parseRow(rows[rowIndex])
        // for each stack (starting at 1)
        for (let stackIndex = 0; stackIndex < stackCount; stackIndex++) {
            if (typeof stacks[stackIndex] == 'undefined') { stacks[stackIndex] = [] }
            let container = row[stackIndex]
            if (typeof container !== "undefined" && container !== " ") {
                stacks[stackIndex].push(container)
            }
        }
    }

    return stacks

}

exports.moveStacks = (rowsStr, movesAry) => {
    let stacks = this.transposeStacks(rowsStr)

    movesAry.forEach((moveStr, index) => {
        // console.log('STACKS MOVE ', index, stacks)
        let move = this.getMove(moveStr)
        for (let i = 0; i < move.move; i++) {
            if (stacks[move.from].length > 0) {
                stacks[move.to].push(stacks[move.from].pop())
            }
        }
    })
    return stacks
}

exports.moveStacks9001 = (rowsStr, movesAry) => {
    let stacks = this.transposeStacks(rowsStr)

    movesAry.forEach((moveStr, index) => {
        // console.log('STACKS MOVE ', index, stacks)
        let move = this.getMove(moveStr)
        if (stacks[move.from].length > 0) {
            let splicePoint = stacks[move.from].length - move.move
            let itemsToMove = stacks[move.from].splice(splicePoint)
            stacks[move.to] = stacks[move.to].concat(itemsToMove)
        }
    })
    return stacks
}

exports.run = (filename) => {

    let data = fs.readFileSync(filename, 'utf8')
    data = data.toString().split("\n\n")

    let rows = data[0]

    let moves = data[1].split("\n")

    let stacks = this.moveStacks(rows, moves)

    let mover9000 = ""
    stacks.forEach((stack) => {
        mover9000 += stack.slice(-1).pop()
    })

    stacks = this.moveStacks9001(rows, moves)

    let mover9001 = ""
    stacks.forEach((stack) => {
        mover9001 += stack.slice(-1).pop()
    })

    return {
        mover9000: mover9000,
        mover9001: mover9001
    }
}