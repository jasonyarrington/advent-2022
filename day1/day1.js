
const fs = require("fs")
const logger = require("../util/logger")

module.exports = (filename) => {

    let data = fs.readFileSync(filename, 'utf8')

    data = data.toString().split("\n")

    const elves = []

    let elfIndex = 0
    let maxCalories = 0
    let maxElfIndex = 0
    
    data.forEach((value, index) => {
        if (typeof elves[elfIndex] !== "object") { elves[elfIndex] = {count: 0, calories: 0} }
        if (value !== "") {
            elves[elfIndex].count++
            elves[elfIndex].calories += Number(value)
            elves[elfIndex].index = elfIndex
            if (elves[elfIndex].calories > maxCalories) {
                maxCalories = elves[elfIndex].calories
                maxElfIndex = elfIndex
            }
        } else {
            elfIndex++
        }
    })

    logger.info("cals: " + maxCalories)
    logger.info("elf:" + maxElfIndex)

    // Reverse
    function compare(b, a) {
        if ( a.calories < b.calories ){
            return -1;
          }
          if ( a.calories > b.calories ){
            return 1;
          }
          return 0;
    }

    // console.log(elves.slice(0, 3))
    elves.sort(compare)

    console.log(elves.slice(0, 3))

    let top3 = 0

    elves.slice(0, 3).forEach((elf) => {
        top3 += elf.calories
    })
    
    console.log(top3)

    return {
        index: maxElfIndex,
        calories: maxCalories,
        elves: elves.slice(0, 3),
        top3: top3
    }
}

