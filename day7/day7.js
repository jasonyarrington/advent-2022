const fs = require("fs")
const logger = require('../util/logger')
const objectPath = require("object-path");

exports.isNumeric = (value) => {
    return /^-?\d+$/.test(value);
}

// Return sum of children
exports.directorySize = (obj) => {
    if (typeof obj.size !== "undefined") {
        return obj.size
    }

    let directorySize = 0

    if (Object.keys(obj).length > 0) {
        Object.keys(obj).forEach((index) => {
            directorySize += this.directorySize(obj[index])
        })
    }

    return directorySize
}

exports.initializeObject = (obj, currentPath, data) => {
    if (typeof data == "undefined") {
        data = {}
    }
    if (typeof objectPath.get(obj, currentPath) == "undefined") {
        objectPath.set(obj, currentPath, data)
    }
}

exports.parseTerminal = (outputStr) => {

    const lines = outputStr.toString().split("\n")

    let obj = {}
    let currentPath = []
    lines.forEach((line) => {
        const outputAry = line.split(" ")
        const command = outputAry[0]
        
        // $ cd dir - move pointer
        if (command == '$' && outputAry[1] == 'cd') {
            let dirName = outputAry[2]
            // home
            if (dirName == '/') {
                currentPath = ['/']
                this.initializeObject(obj, currentPath)
                return
            }
            // up
            if (dirName == '..' && currentPath.length > 1) {
                currentPath.pop()
                return
            }
            // in
            currentPath.push(dirName)
            this.initializeObject(obj, currentPath)
            return
        }

        // $ ls - prepare to read data
        if (command == '$' && outputAry[1] == 'ls') {
            // Do nothing, we will create the dirs from the listing if they exist
            return
        }

        // dir filename - create dir if not exists but don't change path
        if (command == 'dir') {
            let dirName = outputAry[1]
            let dirPath = [...currentPath, ...[dirName]]
            this.initializeObject(obj, dirPath)
            return
        }

        // number filenname - file, store size
        if (this.isNumeric(command)) {
            let fileName = outputAry[1]
            let fileSize = Number(command)
            let filePath = [...currentPath, ...[fileName]]
            this.initializeObject(obj, filePath, { size: fileSize })
            return
        }
        
    })
    
    return obj
}

exports.getTopDirectories = (obj, dirs) => {
    // flatten directories
    if (typeof dirs == "undefined") {
        dirs = []
    }

    if (typeof obj.size !== "undefined") {
        return dirs
    }

    if (Object.keys(obj).length > 0) {
        Object.keys(obj).forEach((index) => {
            if (typeof obj[index].size !== "undefined") {
                return
            }
            dirs.push({
                index: index,
                size: this.directorySize(obj[index])
            })
            // file
            dirs = this.getTopDirectories(obj[index], dirs)
        })
    }

    return dirs
}

exports.run = (filename) => {

    let outputStr = fs.readFileSync(filename, 'utf8')
    let dataSorted = this.parseTerminal(outputStr)
    let dirsFlattened = this.getTopDirectories(dataSorted)

    let mark = 100000
    let sumBelowMark = 0
    dirsFlattened.forEach((dir) => {
        if (dir.size <= mark) {
            sumBelowMark += dir.size
        }
    })
    let answer = "Hello world"

    let smallest = this.smallestDelete(70000000, 30000000, dataSorted, dirsFlattened)


    return {
        dataSorted: dataSorted,
        dirsFlattened: dirsFlattened,
        sumBelowMark: sumBelowMark,
        smallest: smallest
    }
}

exports.freeSpaceNeeded = (fileSystem, updateSize, dataSorted) => {
    return updateSize - (fileSystem - this.directorySize(dataSorted))
}

exports.smallestDelete = (fileSystem, updateSize, dataSorted, dirsFlattened) => {
    const space = this.freeSpaceNeeded(fileSystem, updateSize, dataSorted)
    let smallestDelete = false

    dirsFlattened.forEach((dir) => {
        // too small
        if (dir.size < space) {
            return
        }
        // initialize smallest delete
        if (smallestDelete == false) {
            smallestDelete = dir.size
        }
        if (dir.size < smallestDelete) {
            smallestDelete = dir.size
        }
    })
    
    return smallestDelete
}