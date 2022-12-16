exports.Monkey = class Monkey {

    id

    // Value of each item == worry level
    items

    // new worry level
    operation

    // operation string
    operationString

    // test value
    testValue

    // monkey to throw to
    ifTrue

    // monkey to throw to
    ifFalse 

    calmingFactor = 3

    itemsInspected = 0

    lcm

    constructor(str) {
        let props = str.split("\n")
        props.forEach((prop, index) => {
            let keyValue = prop.trim().split(":")
            if (keyValue[0].match(/(?<=Monkey )\d+/g)) {
                this.id = Number(keyValue[0].match(/(?<=Monkey )\d+/g).pop())
            }
            keyValue[0] = keyValue[0].trim()
            keyValue[1] = keyValue[1].trim()

            switch (keyValue[0]) {                    
                case 'Starting items':
                    this.items = keyValue[1].split(", ")
                    this.items.forEach((item, index) => {
                        this.items[index] = Number(item)
                    })
                    break
                case 'Operation':
                    this.operationString = keyValue[1]
                    break
                case 'Test':
                    this.testValue = Number(keyValue[1].split(" ")[2])
                    this.lcm = this.testValue // temporarily set to this before added for a group
                    break
                case 'If true':
                    this.ifTrue = Number(keyValue[1].split(" ").pop())
                    break
                case 'If false':
                    this.ifFalse = Number(keyValue[1].split(" ").pop())
                    break
            }
        })
    }

    test = (worry) => {
        return Number(worry) % this.testValue == 0
    }

    throwItems = (monkies, calmingFactor = 3) => {
        this.calmingFactor = calmingFactor

        this.items.forEach((item, index) => {
            this.throwItem(item, monkies)
        })

        this.items = []
    }

    throwItem = (item, monkies) => {
        let oldWorry = item

        this.itemsInspected++

        // Do operation
        let newWorry = this.operation(oldWorry)

        let testResult = this.test(newWorry)
        // Test divisible
        let throwTo = testResult ? this.ifTrue : this.ifFalse

        monkies[throwTo].catchItem(newWorry % this.lcm)
    }

    catchItem = (worry) => {
        // Do we push or shift these
        this.items.push(worry)
    }

    operation = (worry) => {
        let temp = this.operationString.split(" = ")[1].split(" ")
        let term1 = Number(temp[0] === 'old' ? worry : temp[0])
        let operator = temp[1]
        let term2 = Number(temp[2] === 'old' ? worry : temp[2])
        let newWorry

        switch (operator) {
            case '*' :
                newWorry = Math.floor((term1 * term2) / this.calmingFactor)
                break
            case '+' :
                newWorry = Math.floor((term1 + term2) / this.calmingFactor)
                break
        }
                
        return newWorry

    }

    getItemsInspected = () => {
        return this.itemsInspected
    }

    getTestValue = () => {
        return this.testValue
    }

    setLcm = (lcm) => {
        this.lcm = Number(lcm)
    }
}