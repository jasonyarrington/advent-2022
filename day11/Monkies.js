const { Monkey } = require('./Monkey')

exports.Monkies = class Monkies {

    monkies = []

    constructor(str) {
        let _monkies = str.split("\n\n")
        _monkies.forEach((monkie, index) => {
            let m = new Monkey(monkie)
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