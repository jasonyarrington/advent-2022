const fs = require("fs")
const { builtinModules } = require("module")
const logger = require('../util/logger')

const map = {
    A: 'r',
    B: 'p',
    C: 's',
    X: 'r',
    Y: 'p',
    Z: 's'
}

const scoreKey = {
    r : 1,
    p : 2,
    s : 3,
    win : 6,
    draw : 3,
    loss : 0
}

const rules = {
    rr : 'draw',
    rp : 'win',
    rs : 'loss',
    pr : 'loss',
    pp : 'draw',
    ps : 'win',
    sr : 'win',
    sp : 'loss',
    ss : 'draw'
}

const outcomeMap = {
    X : 'loss',
    Y : 'draw',
    Z : 'win'
}

outcome = (round) => {
    return rules[ map[round[0]] + map[round[1]] ]
}
exports.outcome = outcome

getMyPlay = (round) => {
    const desiredOutcome = outcomeMap[round[1]]
    const opponentPlay = map[round[0]]

    let myPlay = false

    Object.entries(rules).forEach(rule => {
        const [key, outcome] = rule
        const opponentPlayKey = key.substring(0,1)
        const myPlayKey = key.substring(1,2)

        if (opponentPlay == opponentPlayKey && desiredOutcome == outcome) {
            myPlay = {
                myPlay : myPlayKey,
                outcome : outcome
            }
            return false // Break out of the loop
        }
        return true
    })

    return myPlay
}

exports.getMyPlay = getMyPlay

/**
 * Score round, version 1
 * 
 * rock - A, X, score - 1
 * paper - B, Y, score - 2
 * scissors - C, Z, score - 3
 * 
 * win - 6,
 * draw - 3,
 * lose - 0
 */
scoreRound = (round) => {
    let score = 0
    score += scoreKey[map[round[1]]]
    let win = outcome(round)
    score += scoreKey[win]
    return score
}

exports.scoreRound = scoreRound

scoreRoundVersion2 = (round) => {
    let score = 0
    let myPlay = getMyPlay(round)
    
    // Add play
    score += scoreKey[myPlay.myPlay]

    // add outcome
    score += scoreKey[myPlay.outcome]

    return score
}

exports.scoreRoundVersion2 = scoreRoundVersion2

exports.run = (filename, scoreRound) => {

    let data = fs.readFileSync(filename, 'utf8')
    data = data.toString().split("\n")

    let score = 0
    data.forEach((round, index) => {
        data[index] = {
            source: round,
            score: 0
        }

        let _r = round.split(" ")
        data[index].score = scoreRound(_r)
        score += data[index].score

    })

    return {
        score: score
    }
}
