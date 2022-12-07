const fs = require("fs")
const logger = require('../util/logger')

exports.bufferUnique = (buffer) => {
    for (let i = 0; i < buffer.length; i++) {
        for (let j = i+1; j < buffer.length; j++) {
            if (buffer.charAt(i) == buffer.charAt(j)) {
                return false
            }
        }
    }
    return true
}

exports.startMarker = (packetStr, markerLength) => {

    for (let i = markerLength; i <= packetStr.length; i++) {
        let buffer = packetStr.slice(i - markerLength, i)
        if (this.bufferUnique(buffer)) {
            return i
        }
    }
    return false
}



exports.run = (filename) => {

    let packetStr = fs.readFileSync(filename, 'utf8')

    let startPackerMarker = this.startMarker(packetStr, 4)
    let startMessageMarker = this.startMarker(packetStr, 14)

    return {
        startPackerMarker: startPackerMarker,
        startMessageMarker: startMessageMarker
    }
}