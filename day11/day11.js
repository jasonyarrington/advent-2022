const fs = require("fs")
const logger = require('../util/logger')

exports.Monkey = class Monkey {

    id

    items

    operation

    test

    ifTrue

    ifFalse 

    constructor(str) {
        let props = str.split("\n")
        props.forEach((prop, index) => {
            let keyValue = prop.trim().split(":")
            if (keyValue[0].match(/(?<=Monkey )\d+/g)) {
                this.id = Number(keyValue[0].match(/(?<=Monkey )\d+/g).pop())
            }
            keyValue[0] = keyValue[0].trim()
            keyValue[1] = keyValue[1].trim()

            switch (keyValue[0]) {                    
                case 'Starting items':
                    this.items = keyValue[1].split(", ")
                    this.items.forEach((item, index) => {
                        this.items[index] = Number(item)
                    })
                    break
                case 'Operation':
                    this.operation = keyValue[1]
                    break
                case 'Test':
                    this.test = keyValue[1]
                    break
                case 'If true':
                    this.ifTrue = Number(keyValue[1].split(" ").pop())
                    break
                case 'If false':
                    this.ifFalse = Number(keyValue[1].split(" ").pop())
                    break
            }
        })
    }
}

exports.Monkies = class Monkies {

    monkies = []

    constructor(str) {
        let _monkies = str.split("\n\n")
        _monkies.forEach((monkie, index) => {
            let m = new this.Monkey(monkie)
            this.monkies.push(m)
        });
    }

    getMonkey = (index) => {
        return this.monkies[index]
    }

    getMonkies = () => {
        return this.monkies
    }
}

exports.run = (filename) => {

    let str = fs.readFileSync(filename, 'utf8')

    let monkies = str.split("\n\n")

    monkies.forEach(monkey, )

    console.log(data)

    let answer = "Hello world"

    return {
        hello: answer
    }
}