const fs = require("fs")
const { runInThisContext } = require("vm")
const logger = require('../util/logger')

exports.ClockCircuit = class ClockCircuit {

    cycles = []
    currentCycle = 0
    commandStack = []

    litChar = '#'
    darkChar = '.'

    constructor() {

    }

    // Grid of screen
    screen = []

    isLit = (x, register) => {
        return Math.abs(register - x) <= 1
    }
    drawPixel = (x, y, register) => {
        this.screen[y] = this.screen[y] || []
        this.screen[y][x] = this.isLit(x, register) ? this.litChar : this.darkChar
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
        let screenMaxColumn = 39
        let screenMaxRow = 6
        let screenRow = 0
        let screenColumn = 0

        for (let i = 0; i < this.commandStack.length; i++) {

            // Draw
            this.drawPixel(screenColumn, screenRow, register)

            // Move cursor
            if (screenColumn == screenMaxColumn) {
                screenRow++
                screenColumn = 0
            } else {
                screenColumn++
            }

            // Record cycle
            this.cycles.push(register)

            // push cycle
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

    outputScreen = () => {
        let output = ''
        for (let y = 0; y < this.screen.length; y++) {
            for (let x = 0; x < this.screen[y].length; x++) {
                output += this.screen[y][x]
            }
            output += "\n"
        }
        console.log(output)
    }

}

exports.run = (filename) => {
    let data = fs.readFileSync(filename, 'utf8')
    // data = data.toString().split("\n")

    let clock = new this.ClockCircuit()

    clock.processCommands(data)
    clock.processStack()
    clock.outputScreen()
    return {
        clock: clock
    }
}