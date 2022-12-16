const { Monkey } = require('./Monkey')

exports.Monkies = class Monkies {

    monkies = []

    rounds 

    calmingFactor

    // least common multiple
    lcm = 1

    constructor(str, rounds = 20, calmingFactor = 3) {
        this.rounds = rounds
        this.calmingFactor = calmingFactor

        let _monkies = str.split("\n\n")
        _monkies.forEach((monkie, index) => {
            let m = new Monkey(monkie)
            this.monkies.push(m)
            this.lcm *= m.getTestValue()
        });

        this.monkies.forEach((monkie, index) => {
            monkie.setLcm(this.lcm)
        })

        this.rounds = rounds
    }
    
    doRounds = () => {
        for (let i = 0; i < this.rounds; i++) {
            this.monkies.forEach((monkey, index) => {
                monkey.throwItems(this.monkies, this.calmingFactor)
            })
        }
    }

    getAnswer = () => {
        function compare( b, a ) {
            if ( a.getItemsInspected() < b.getItemsInspected() ){
              return -1;
            }
            if ( a.getItemsInspected() > b.getItemsInspected() ){
              return 1;
            }
            return 0;
          }
          
        let sortedMonkies = this.monkies.sort( compare )

        return sortedMonkies[0].getItemsInspected() * sortedMonkies[1].getItemsInspected()
    }
    getMonkey = (index) => {
        return this.monkies[index]
    }

    getMonkies = () => {
        return this.monkies
    }
}