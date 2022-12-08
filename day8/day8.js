const { count } = require("console")
const fs = require("fs")
const logger = require('../util/logger')

exports.visibleTreesFromPoint = (x, y, data) => {

    // x axis -
    const left = (x, y, data) => {
        const height = Number(data[y].charAt(x))
        let visible = 0
        for (let xD = x - 1; xD >= 0; xD--) {
            visible++
            if (height <= Number(data[y].charAt(xD))) {
                break
            }
        }
        return visible
    }

    // x axis +
    const right = (x, y, data) => {
        const height = Number(data[y].charAt(x))
        let visible = 0
        let xMax = data[y].length - 1
        for (let xD = x + 1; xD <= xMax; xD++) {
            visible++
            if (height <= Number(data[y].charAt(xD))) {
                break
            }
        }
        return visible
    }

    // y axis -
    const up = (x, y, data) => {
        const height = Number(data[y].charAt(x))
        let visible = 0
        for (let yD = y - 1; yD >= 0; yD--) {
            visible++
            if (height <= Number(data[yD].charAt(x))) {
                break
            } 
        }
        return visible
    }

    // y axis +
    const down = (x, y, data) => {
        const height = Number(data[y].charAt(x))
        visible = 0
        const yMax = data.length - 1
        for (let yD = y + 1; yD <= yMax; yD++) {
            visible++
            if (height <= Number(data[yD].charAt(x))) {
                break
            } 
        }
        return visible
    }

    // edge
    let visibleUp = up(x, y, data)
    let visibleDown = down(x, y, data) 
    let visibleLeft = left(x, y, data)
    let visibleRight = right(x, y, data)

    let counts = []
    // if (visibleUp) {
        counts.push(visibleUp)
    // }

    // if (visibleDown) {
        counts.push(visibleDown)
    // }

    // if (visibleLeft) {
        counts.push(visibleLeft)
    // }

    // if (visibleRight) {
        counts.push(visibleRight)
    // }

    let visibleTrees = 0
    if (counts.length > 0) {
        visibleTrees = 1
        counts.forEach((value) => {
            visibleTrees = visibleTrees * value
        })
    }

    return visibleTrees

}

exports.findBestSpot = (str) => {

    const data = str.toString().split("\n")

    let yMax = data.length - 1

    let bestSpot = {
        visibleTrees : 0,
        x: false,
        y: false
    }

    for (y = 0; y <= yMax; y++) {
        let xMax = data[y].length - 1
        for (x = 0; x <= xMax; x++) {
            
            let visibleTrees = this.visibleTreesFromPoint(x, y, data)

            if (visibleTrees > bestSpot.visibleTrees) {
                bestSpot = {
                    visibleTrees: visibleTrees,
                    x: x,
                    y: y
                }
                console.log(bestSpot)
            }
        }

    }
    return bestSpot
}

exports.findVisibleTrees = (str) => {
    const data = str.toString().split("\n")

    let count = 0
    let yMax = data.length - 1

    // x axis -
    const left = (x, y, data) => {
        const height = Number(data[y].charAt(x))
        visible = true
        for (let xD = x - 1; xD >= 0; xD--) {
            if (height <= Number(data[y].charAt(xD))) {
                visible = false
            }
        }
        return visible
    }

    // x axis +
    const right = (x, y, data) => {
        const height = Number(data[y].charAt(x))
        visible = true
        let xMax = data[y].length - 1
        for (let xD = x + 1; xD <= xMax; xD++) {
            if (height <= Number(data[y].charAt(xD))) {
                visible = false
            }
        }
        return visible
    }

    // y axis -
    const up = (x, y, data) => {
        const height = Number(data[y].charAt(x))
        let visible = true
        for (let yD = y - 1; yD >= 0; yD--) {
            if (height <= Number(data[yD].charAt(x))) {
                visible = false
            }
        }
        return visible
    }

    // y axis +
    const down = (x, y, data) => {
        const height = Number(data[y].charAt(x))
        visible = true
        const yMax = data.length - 1
        for (let yD = y + 1; yD <= yMax; yD++) {
            if (height <= Number(data[yD].charAt(x))) {
                visible = false
            }
        }
        return visible
    }

    for (y = 0; y <= yMax; y++) {
        let xMax = data[y].length - 1
        for (x = 0; x <= xMax; x++) {
            // edge
            if (y === 0 || 
                x === 0 || 
                y === yMax || 
                x === xMax || 
                up(x, y, data) || 
                down(x, y, data) || 
                left(x, y, data) || 
                right(x, y, data)) {
                count++
            } 
        }
    }
    return count
}


exports.run = (filename) => {

    let str = fs.readFileSync(filename, 'utf8')
    
    const visibleTrees = this.findVisibleTrees(str)
    const bestSpot = this.findBestSpot(str)

    return {
        visibleTrees: visibleTrees,
        bestSpot: bestSpot 
    }
}