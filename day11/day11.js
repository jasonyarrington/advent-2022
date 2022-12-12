const fs = require("fs")
const logger = require('../util/logger')

module.exports = (filename) => {

    let data = fs.readFileSync(filename, 'utf8')
    data = data.toString().split("\n")

    let answer = "Hello world"

    return {
        hello: answer
    }
}