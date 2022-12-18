const fs = require("fs")
const { readableFlowing } = require("../util/logger")
const logger = require("../util/logger")

exports.Hiker = class Hiker {
  // values in array
  maze = []

  // Shortest path values
  paths = []

  start

  position

  trails = []

  end

  direction = [
    { y: -1, x: 0 },
    { y: 0, x: 1 },
    { y: 1, x: 0 },
    { y: 0, x: -1 },
  ]

  constructor(filename) {
    let str = fs.readFileSync(filename, "utf8")
    str.split("\n").map((row, y) => {
      this.maze[y] = []
      this.paths[y] = []

      for (let x = 0; x < row.length; x++) {
        let cell = row.charAt(x)
        this.maze[y][x] = cell
        if (cell === "S") {
          this.start = { x: x, y :y }
          this.position = this.start
        }
        if (cell === "E") {
          this.end = { x: x, y :y }
        }
      }
    })
    this.paths[0][0] = 0

    this.setStart()
  }

  initPaths = (y0, x0) => {
    for (let y = 0; y < this.maze.length; y++) {
        for (let x = 0; x < this.maze[y].length; x++) {
            this.paths[y][x] = undefined
        }
    }
    this.paths[y0][x0] = 0
  }

  setStart = () => {
    let found = false
    // find start
    for (let y = 0; y < this.maze.length; y++) {
        for (let x = 0; x < this.maze[y].length; x++) {
        // start spot
          if (this.maze[y][x] == "S") {
            this.paths[y][x] = 0
            this.start = { y: y, x: x }
          }

            // end spot
            if (this.maze[y][x] == "E") {
                this.finish = { y: y, x: x }
            }
        }
    }
  }

  findPath = (y, x) => {
    if (typeof y === 'undefined' || typeof x === 'undefined') {
        y = this.start.y
        x = this.start.x
    }
    this.move(y, x)
    return this.paths[this.end.y][this.end.x] 
  }

  findShortestPath = () => {

    let shortest = false
    for (let y = 0; y < this.maze.length; y++) {
        for (let x = 0; x < this.maze[y].length; x++) {
            let char = this.maze[y][x]
            if (char === 'a') {
                this.initPaths(y, x)
                let distance = this.findPath(y, x)
                if (shortest == false || distance < shortest) {
                    shortest = distance
                }
            }
        }
    }

    return shortest
  }

  // from position
  move = (y0, x0) => {
    
    let moved = false

    this.direction.forEach(d => {
        let y1 = y0 + d.y
        let x1 = x0 + d.x

        let char0 = this.maze[y0][x0].charAt(0)

        // out of bounds
        if (
            typeof this.maze[y1] == "undefined" ||
            typeof this.maze[y1][x1] == "undefined"
        ) {
            return false
        } 

        let char1 = this.maze[y1][x1].charAt(0)

        let charCode0 = char0 === "S" ? "a".charCodeAt(0) : char0.charCodeAt(0)
        let charCode1 = char1 === "E" ? "z".charCodeAt(0) : char1.charCodeAt(0)

        // Is a possible move
        if (charCode1 - charCode0 <= 1) {
        let distance = this.paths[y0][x0] + 1

        // if not a shorter path, then take it
        if (
            typeof this.paths[y1][x1] == "undefined" ||
            distance < this.paths[y1][x1]
        ) {
            this.paths[y1][x1] = this.paths[y0][x0] + 1
            this.move(y1, x1)
        }
        }
    })

  }

  output = (index = 1) => {
    
    let str = ""
    let pathstr = ""

    for (let y = 0; y < this.maze.length; y++) {
      for (let x = 0; x < this.maze[y].length; x++) {
        str += typeof this.maze[y][x] !== "undefined" ? this.maze[y][x] : " "
        pathstr +=
          typeof this.paths[y][x] !== "undefined"
            ? this.paths[y][x].toString().padStart(4, " ")
            : "    "
      }
      str += "\n"
      pathstr += "\n"
    }

    fs.writeFileSync('./answer-' + String(index) + '.txt', pathstr)

  }
}
