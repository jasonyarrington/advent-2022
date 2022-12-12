const fs = require("fs")

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