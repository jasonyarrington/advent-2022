const fs = require("fs")
const { parse } = require("path")
const logger = require('../util/logger')

exports.parseAssignments = (str) => {
    let assignments = str.split(',')
    assignments.forEach((assignment, index) => {
        let ar = assignment.split('-')
        ar.forEach((value, index) => {
            ar[index] = Number(value)
        })
        assignments[index] = ar
    })
    return assignments
}

// b contained in a
exports.contained = (a, b) => {
    return (
        a[0] <= b[0] && b[0] <= a[1] 
        && a[0] <= b[1] && b[1] <= a[1])
}

// b is not overlapped with a (at least one end is inside the range of the other)
exports.overlap = (a, b) => {
    return (
        (a[0] <= b[0] && b[0] <= a[1]) // b[0] overlaps
        || (a[0] <= b[1] && b[1] <= a[1]) // b[1] overlaps
    )
}

exports.isFullyContained = (str) => {
    let contained = false
    const assignments = this.parseAssignments(str)
    // assignment 0 inside
    return (this.contained(assignments[0], assignments[1]) 
    || this.contained(assignments[1], assignments[0])
    )
}

exports.isOverlapped = (str) => {
    let contained = false
    const assignments = this.parseAssignments(str)
    // assignment 0 inside
    return (this.overlap(assignments[0], assignments[1]) 
    || this.overlap(assignments[1], assignments[0])
    )
}

exports.run = (filename) => {

    let data = fs.readFileSync(filename, 'utf8')
    data = data.toString().split("\n")
    let countContained = 0
    let overlapped = 0

    data.forEach((assignments) => {
        if (this.isFullyContained(assignments)) {
            countContained++
        }
        if (this.isOverlapped(assignments)) {
            overlapped++
        }
    })

    return {
        countContained: countContained,
        overlapped: overlapped
    }
}

