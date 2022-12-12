const fs = require("fs")
const { runInThisContext } = require("vm")
const logger = require('../util/logger')

exports.ClockCircuit = class ClockCircuit {

    register = 1
    cycles = []
    currentCycle = 0
    commandStack = []

    constructor() {

    }

    processCommands = (commandStr) => {
        const commands = commandStr.split("\n")

        commands.forEach((command) => {
            this.processCommand(command)
        })
    }

    processCommand = (str) => {
        const input = str.split(" ")
        const instruction = input[0]
        const value = input[0] == "addx" ? Number(input[1]) : 0

        // add two cycles onto the command stack
        if (instruction == "addx") {
            this.commandStack.push(0)
            this.commandStack.push(value)
        }

        if (instruction == "noop") {
            this.commandStack.push(0)
        }
    }

    processStack = () => {
        let register = 1
        for (let i = 0; i < this.commandStack.length; i++) {
            this.cycles.push(register)
            register += this.commandStack[i]
        }
    }

    getSignalStrength = (cycle) => {
        return cycle * this.cycles[cycle - 1]
    }

    getTotalStrength = (maxCycle) => {
        let strength = 0
        // let cycleCount = maxCycle || this.cycles.length

        for (let i = 20; i <= maxCycle; i += 40) {
            strength += this.getSignalStrength(i)
        }
        return strength
    }

}

exports.run = (filename) => {
    let data = fs.readFileSync(filename, 'utf8')
    // data = data.toString().split("\n")

    let clock = new this.ClockCircuit()

    clock.processCommands(data)
    clock.processStack()

    return {
        clock: clock
    }
}