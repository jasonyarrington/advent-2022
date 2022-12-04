const fs = require("fs")
const logger = require('../util/logger')

exports.splitString = (str) => {
    let len = Math.round(str.length / 2)
    return [
        str.slice(0, len), str.slice(len)   
    ]
}

exports.findElement = (str) => {
    let missplacedItem = false
    let ruckSack = this.splitString(str)
    let ruckSackSorted = {} // { 'p' => count }
    ruckSack.forEach((items, compartment) => {
        ruckSackSorted[compartment] = {}
        for (let item of items) {
            if (typeof ruckSackSorted[compartment][item] == 'undefined') {
                ruckSackSorted[compartment][item] = 0
            }
            ruckSackSorted[compartment][item]++

            if (compartment === 1 && typeof ruckSackSorted[0][item] !== 'undefined' && 
            typeof ruckSackSorted[1][item] !== 'undefined') {
                missplacedItem = item
                break
            }
        }
    })
    return missplacedItem
}

exports.findBadge = (group) => {

    let badge
    let ruckSackSorted = {}
    
    group.forEach((items, index) => {
        ruckSackSorted[index] = {}
        for (let item of items) {
            if (typeof ruckSackSorted[index][item] == 'undefined') {
                ruckSackSorted[index][item] = 0
            }
            ruckSackSorted[index][item]++

            if (index === 2 && typeof ruckSackSorted[0][item] !== 'undefined' && 
            typeof ruckSackSorted[1][item] !== 'undefined') {
                badge = item
                break
            }
        }
    })

    return badge
}

exports.scoreElement = (el) => {

    // Return 0 if element is false
    if (!el) {
        return 0
    }
    const aScore = 'a'.charCodeAt(0) // 97
    const AScore = 'A'.charCodeAt(0) // 65

    let score = el.charCodeAt(0)
    
    return score > aScore 
        ? (score - aScore) + 1
        : (score - AScore) + 27

}

exports.run = (filename) => {

    let data = fs.readFileSync(filename, 'utf8')
    data = data.toString().split("\n")


    let prioritySum = 0
    data.forEach((ruckSack) => {
        let score = this.scoreElement(this.findElement(ruckSack))
        prioritySum += score
    })

    let badgeSum = 0
    for (let i = 0; i < data.length; i += 3) {
        let group = data.slice(i, i + 3)
        let element = this.findBadge(group)
        let score = this.scoreElement(element)
        badgeSum += score
    }

    return {
        prioritySum: prioritySum,
        badgeSum: badgeSum
    }
}

