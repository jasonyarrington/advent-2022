const fs = require("fs")
const { Monkey } = require('./Monkey')
const { Monkies } = require('./Monkies')

exports.run = (filename) => {

    let str = fs.readFileSync(filename, 'utf8')

    let monkies = new Monkies(str, 20, 3, true)

    monkies.doRounds()

    let answer = monkies.getAnswer()

    let monkies2 = new Monkies(str, 10000, 1, true)

    monkies2.doRounds()

    monkies2.getMonkies().forEach((monkey) => {
        console.log('inspected', monkey.itemsInspected)
    })

    let answer2 = monkies2.getAnswer()

    return {
        answer1: answer,
        answer2: answer2
    }
}