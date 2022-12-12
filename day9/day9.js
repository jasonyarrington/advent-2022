const fs = require("fs")
const logger = require("../util/logger")

exports.Rope = class Rope {
  knots = []

  trail = {}
  // Number of knots
  constructor(knotCount = 2) {
    for (let i = 0; i < knotCount; i++) {
        this.knots.push({x: 0, y:0})
    }
    this.setTrail(this.getTail())
  }

  move = (move) => {
    const ary = move.split(" ")
    let direction = ary[0]
    let steps = ary[1]
    let head = this.getHead()

    for (let i = 0; i < steps; i++) {
      switch (direction) {
        case "R":
            head.x++
          break
        case "L":
            head.x--
          break
        case "U":
            head.y--
          break
        case "D":
            head.y++
          break
      }
      this.setKnot(0, head)
      this.moveKnots()
    }
  }

  moveKnots = (index = 0) => {
    let knotCount = this.knots.length
    if (index < knotCount - 1) {
        const head = this.getKnot(index)
        const tail = this.getKnot(index + 1)
        this.setKnot(index+1, this.moveTail(head, tail))
        this.moveKnots(index + 1)
    } else {
        this.setTrail()
    }
  }
  // Moves the next knot
  moveTail = (head, tail) => {
    let moved = false


    let xD = head.x - tail.x
    let yD = head.y - tail.y

    
    // At least one value has to be 2 away
    if (Math.abs(xD) == 2) {
      tail.x += Math.sign(xD) * 1
      if (Math.abs(yD) >= 1) {
        tail.y += Math.sign(yD) * 1
      }
      moved = true
    }

    if (!moved && Math.abs(yD) == 2) {
      tail.y += Math.sign(yD) * 1
      if (Math.abs(xD) >= 1) {
        tail.x += Math.sign(xD) * 1
      }
    }

    return tail
  }

  setTrail = () => {

    let knot = this.getTail()
    let location = knot.x.toString() + knot.y.toString()
    if (this.trail[location] === undefined) {
      this.trail[location] = 1
    } else {
      //   this.trail[location]++;
    }
  }

  getTrail = () => {
    return this.trail
  }

  getTail = () => {
    return this.knots.at(-1)
  }

  getHead = () => {
    return this.knots.at(0)
  }

  getKnot = (index) => {
    return this.knots[index]
  }

  getKnots = () => {
    return this.knots()
  }

  setKnot = (index, knot) => {
    this.knots[index] = knot
  }

  getTailSpots = () => {
    return Object.keys(this.trail).length
  }
}

exports.run = filename => {
  let data = fs.readFileSync(filename, "utf8")
  data = data.toString().split("\n")

  let knots = 2
  let rope = new this.Rope()

  data.forEach(move => {
    rope.move(move)
  })

  let rope10 = new this.Rope(10)
  data.forEach(move => {
    rope10.move(move)
  })

  return {
    tailSpots: rope.getTailSpots(),
    tailSpots10: rope10.getTailSpots()
  }
}
