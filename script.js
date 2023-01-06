let numberOfPlayers = document.querySelector('#player-number-select') - 1 // Subtract 1 to convert to indexes starting at 0
let form = document.querySelector('#player-select')
const playerNames = []
const playerData = []
const scoreChart = []
// const playerIsComputer = [] - moved to playerData
let currentPlayer
const dice = []
const diceValues = [0,0,0,0,0,0]
let throwCount = 0

// Setup dice object array to default starting values
for (let i = 0; i < 5; i++) {
    dice[i] = {value:0, locked:false}
}

form.addEventListener('submit', e => {
    e.preventDefault()
    console.log(numberOfPlayers.value)
} )

function SetupPlayerNameEntryFields() {
    // Create number of text boxes based on selected number of players
    for (let i = 0; i < numberOfPlayers; i++) {
        // Can we add the amount of input text boxes based on numberOfPlayers?
    }
}

function SetupPlayerData() {
    if (numberOfPlayers > 5) {
        return false
    } else {
        for (let i = 0; i <= numberOfPlayers; i++) {
            // Create an array of objects (playerName and totalScore) with player name and set score to 0 for each player. Array index = player (index 0 = player 1 etc.)
            // TODO: Get player names from text boxes, get playerIsComputer checkbox
            playerData[i] = {playerName:playerNames[i], totalScore:0, playerIsComputer:false}
            // Create a score chart as an array of objects that is score cathegories. Array index = player (index 0 = player 1 etc.)
            scoreChart[i] = {aces:0, twos:0, threes:0, fours:0, fives:0, sixes:0, bonus:0, twoPairs:0, threeOfAKind:0, fourOfAKind:0, smallStraight:0, largeStraight:0, fullHouse:0, yahtzee:0, chance:0}
        }
        SetStartingPlayer()
    }
}

/* function SetPlayerAsComputer() {             // moved to SetupPlayerData()
    // Option for user to set one or more players to be controlled by computer
    // TODO: Change the following temporary code for actual code. Now every playerIsComputer is false
    for (let i = 0; i < numberOfPlayers; i++) {
        playerIsComputer[i] = false
    }
} */

function SetStartingPlayer() {
    // Randomly decide which player starts by setting a random player as first currentPlayer
    currentPlayer = Math.floor(Math.random() * numberOfPlayers)
}

function ThrowDice() {
    throwCount++
    console.log("Current player is " + currentPlayer + playerData[currentPlayer].playerName + " - throwCount: " + throwCount)

    // Generate five random integers between 1-6 (individual dice points) as an array of five values (number of dice)
    for (let i = 0; i < 5; i++) {
        if (dice[i].locked == false) {
            dice[i].value = (Math.floor(Math.random() * 6)+1)
        }
    }
    console.table(dice)
    DiceArrayToValueArray(...dice.map(({ value }) => value))    // Convert dice to value array
    //console.table(diceValues)
    let resultArray = CheckThrowResults()                                         // Calculate results
    PresentScoringOptions(resultArray)                                         // Present score category options to player
}

function PresentScoringOptions(array) {
    // TODO: Get playerInput from UCI button
    console.table(array)
    let playerInput

    if (throwCount >= 3) {           // Each player gets three throws per turn. If throwCount == 3 go to next player

        // returns random key from Set or Map   ---   REMOVE ONCE USER INPUT IS COMPLETE - ONLY FOR TESTING
        function getRandomKey(collection) {
            let keys = Array.from(collection.keys());
            return keys[Math.floor(Math.random() * keys.length)];
        }
        playerInput = getRandomKey(array)
        //

        let selectedScore = array.get(playerInput)

        PlayerSelectScore(playerInput, selectedScore)
    }
}

function PlayerSelectScore(playerSelection, score) {
    // TODO: Needs fixing
    console.log("Player selected " + playerSelection)
    console.log("Score: " + score)
    scoreChart[currentPlayer][playerSelection] = score

    console.table(scoreChart)


    NewPlayerTurn()
}

function NewPlayerTurn() {
    throwCount = 0
    if (currentPlayer < numberOfPlayers) {
        currentPlayer++
    } else if (currentPlayer == numberOfPlayers) {
        currentPlayer = 0
    }
    UnlockAllDice()
}

function ToggleDieLocked(i) {
    if (dice[i].locked == false) {
        dice[i].locked = true
    } else {
        dice[i].locked = false
    }
}

function UnlockAllDice() {
    for (let i = 0; i < 5; i++) {
        dice[i].locked = false
    }
}

function DiceArrayToValueArray(a, b, c, d, e) {
    // Reset old values
    for (let i = 0; i < 6; i++) {
        diceValues[i] = 0
    }
    // Convert the array of dice to an array of dice values
    diceValues[a-1] = diceValues[a-1]+1
    diceValues[b-1] = diceValues[b-1]+1
    diceValues[c-1] = diceValues[c-1]+1
    diceValues[d-1] = diceValues[d-1]+1 
    diceValues[e-1] = diceValues[e-1]+1
}

function CheckThrowResults() {
    const diceCategoriesAndPoints = [["aces",0], ["twos",0], ["threes",0], ["fours",0], ["fives",0], ["sixes",0], ["bonus",0], ["twoPairs",0], ["threeOfAKind",0], ["fourOfAKind",0], ["smallStraight",0], ["largeStraight",0], ["fullHouse",0], ["yahtzee",0], ["chance",0]]
    let diceSum = dice.map(({ value }) => value).reduce((partialSum, a) => partialSum + a, 0)
    let pairCount = 0
    const diceThrowResults = new Map()
    //let diceCategoriesReceived = {aces:0, twos:0, threes:0, fours:0, fives:0, sixes:0, bonus:0, twoPairs:0, threeOfAKind:0, fourOfAKind:0, smallStraight:0, largeStraight:0, fullHouse:0, chance:0, yahtzee:0}

    diceValues.forEach (checkValues)
    function checkValues (value, index, array) {
        diceCategoriesAndPoints[14][1] = diceSum                // Set points for Chance
        diceCategoriesAndPoints[index][1] = (index + 1) * value // Set values for upper section (aces, twos, threes, fours, fives and sixes)
        switch(value) {
            case 2:
                diceCategoriesAndPoints[7][1] = diceCategoriesAndPoints[7][1] + diceSum         // Add points to twoPairs, will check later if pairCount is 2.
                pairCount = pairCount + 1
                if (diceCategoriesAndPoints[8][1] > 0) {
                    diceCategoriesAndPoints[12][1] = 25         // Set points for fullHouse
                }
                break
            case 3:
                diceCategoriesAndPoints[8][1] = diceSum         // Set points for threeOfAKind
                if (diceCategoriesAndPoints[7][1] > 0) {
                    diceCategoriesAndPoints[12][1] = 25         // Set points for fullHouse
                }
                break
            case 4:
                diceCategoriesAndPoints[9][1] = diceSum         // Set points for fourOfAKind
                break
            case 5:
                diceCategoriesAndPoints[13][1] = 50             // Set points for Yahtzee
                break
        }
    }

    if (pairCount < 2) {                            // Check if we have twoPairs, of not - no points
        diceCategoriesAndPoints[7][1] = 0
    }

    CheckForStraight(...dice.map(({ value }) => value).sort(function(a, b){return a - b}))    // Get dice.values and sort them in ascending order and check for straight
    function CheckForStraight(a, b, c, d, e) {
        if (e == d+1 & d == c+1 & c == b+1 || d == c+1 & c == b+1 & b == a+1) {
            diceCategoriesAndPoints[10][1] = 30         // Set points for smallStraight
        }
        if (e == d+1 & d == c+1 & c == b+1 & b == a+1) {
            diceCategoriesAndPoints[11][1] = 40         // Set points for largeStraight
        }
    }

    CompileResult()                                     // Gather category options for return
    // TODO: Finish the following:
    function CompileResult() {
        diceCategoriesAndPoints.forEach(CheckCategoryScore)
        function CheckCategoryScore(value, index, array) {
 /*            var tempObject = {}
            tempObject[value[0]] = value[1]
            if (value[1] > 0) {
                diceThrowResults.push(tempObject)
            } */
            if (value[1] > 0) {
                diceThrowResults.set(value[0], value[1])
            }
        }
    }
    return(diceThrowResults)
}

function CheckForBonus() {
    if ((diceCategoriesAndPoints[0][1] +            // Set bonus to 35 if sum of upper section > 63
    diceCategoriesAndPoints[1][1] +
    diceCategoriesAndPoints[2][1] +
    diceCategoriesAndPoints[3][1] +
    diceCategoriesAndPoints[4][1] +
    diceCategoriesAndPoints[5][1]) > 63) {
        scoreChart.bonus = 35
    }
}

function ShowFinalScore() {

}



//Only for testing - remove following:
/* numberOfPlayers = 6-1
playerNames.push("Josh", "Andrew", "Phil", "Steve", "Motown", "Funk")
SetupPlayerData()
let tryXThrows = 3
for (let i = 0; i < tryXThrows; i++) {
    ThrowDice()
} */
//console.table(dice)

//console.table(scoreChart)
//console.log(throwCount)
