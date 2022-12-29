let numberOfPlayers = 6 // document.querySelector('#player-number-select')
//let form = document.querySelector('#player-select')
const playerNames = []
const playerData = []
const scoreChart = []
const playerIsComputer = []
let currentPlayer
const dice = []
const diceValues = [0,0,0,0,0,0]

/* form.addEventListener('submit', e => {
    e.preventDefault()
    console.log(numberOfPlayers.value)
} ) */

function SetupPlayerNameEntryFields() {
    // Create number of text boxes based on selected number of players
    for (let i = 0; i < numberOfPlayers; i++) {
        // Can we add the amount of input text boxes based on numberOfPlayers?
    }
}

function SetupPlayerData() {
    if (numberOfPlayers > 6) {
        return false
    } else if (numberOfPlayers == 0) {
        return false
    } else {
        for (let i = 0; i < numberOfPlayers; i++) {
            // Create an array of objects (playerName and totalScore) with player name and set score to 0 for each player. Array index = player (index 0 = player 1 etc.)
            // TODO: Get player names from text boxes
            playerData[i] = {playerName:playerNames[i], totalScore:0}
            // Create a score chart as an array of objects that is score cathegories. Array index = player (index 0 = player 1 etc.)
            scoreChart[i] = {aces:0, twos:0, threes:0, fours:0, fives:0, sixes:0, bonus:0, twoPairs:0, threeOfAKind:0, fourOfAKind:0, smallStraight:0, largeStraight:0, fullHouse:0, chance:0, yahtzee:0}
        }
    }
}

function SetPlayerAsComputer() {
    // Option for user to set one or more players to be controlled by computer
    // TODO: Change the following temporary code for actual code. Now every playerIsComputer is false
    for (let i = 0; i < numberOfPlayers; i++) {
        playerIsComputer[i] = false
    }
}

function SetStartingPlayer() {
    // Randomly decide which player starts by setting a random player as first currentPlayer
    currentPlayer = Math.floor(Math.random() * numberOfPlayers)
}

function ThrowDice() {
    // Generate six random integers between 1-6 (individual dice points) as an array of five values (number of die)
    for (let i = 0; i < 5; i++) {
        dice[i] = (Math.floor(Math.random() * 6)+1)
    }

    // Do we need to sort them in ascending order?
    // dice.sort(function(a, b){return a - b})
}

function DiceArrayToValueArray(a, b, c, d, e) {
    // Convert the array of dice to an array of dice values
    diceValues[a-1] = diceValues[a-1]+1
    diceValues[b-1] = diceValues[b-1]+1
    diceValues[c-1] = diceValues[c-1]+1
    diceValues[d-1] = diceValues[d-1]+1 
    diceValues[e-1] = diceValues[e-1]+1
}

function CheckDiceCategories() {
    let diceCombinationStacks = [0, 0, 0, 0, 0, 0]
    let stackCount = 0

    diceValues.forEach (checkDice)
    function checkDice (value, index, array) {
        switch(value) {
            case 2:
                diceCombinationStacks[index] = diceCombinationStacks[index]+2
                break
            case 3:
                diceCombinationStacks[index] = diceCombinationStacks[index]+3
                break
            case 4:
                
                break
            case 5:

                break
            default:
                console.log("He valt int ti na")
        }
    }

}

/* function CalculatePoints() {
    // Check dice values and calculate score
    let tempScore = 0
    let diceCombinationStacks = [0, 0, 0, 0, 0, 0]
    let stackCount = 0
    let stackValueCount = 0

    diceValues.forEach (checkDice)
    function checkDice (value, index, array) {
        
        if (value == 2) {
            diceCombinationStacks[index] = diceCombinationStacks[index]+2
        }
        if (value == 3) {
            diceCombinationStacks[index] = diceCombinationStacks[index]+3
        }
        if (value == 4) {
            console.log("FOUR OF A KIND")
            diceValues.forEach (checkForFourOfAKind)
            function checkForFourOfAKind (value, index, array) {
                if (value == 4) {
                    tempScore = tempScore + ((index+1)*value)
                    scoreChart[currentPlayer].fourOfAKind = tempScore
                }
            }
        }
        if (value == 5) {
            console.log("YAHTZEEEE!!!!")
            diceValues.forEach (checkForYahtzee)
            function checkForYahtzee (value, index, array) {
                if (value == 5) {
                    tempScore = tempScore + ((index+1)*value)
                    scoreChart[currentPlayer].yahtzee = tempScore
                }
            }
        }
      }

      diceCombinationStacks.forEach (countStacks)
      function countStacks (value, index, array) {
          if (value == 2) {
              stackCount = stackCount+1
              stackValueCount = stackValueCount+((index+1)*value)
          }
          if (value == 3) {
              stackCount = stackCount+3
              stackValueCount = stackValueCount+((index+1)*value)
          }
      }

    if (stackCount == 2) {
        console.log("Two Pairs!")
        tempScore = tempScore + stackValueCount
        scoreChart[currentPlayer].twoPairs = tempScore
    } else if (stackCount == 4) {
        console.log("FULL HOUSE!")
        tempScore = tempScore + stackValueCount
        scoreChart[currentPlayer].fullHouse = tempScore
    } else if (stackCount == 1) {
        console.log("Pair")
        diceValues.forEach (checkForPair)
        function checkForPair (value, index, array) {
            if (value == 2) {
                tempScore = tempScore + ((index+1)*value)
                scoreChart[currentPlayer].onePair = tempScore
            }
        }
    } else if (stackCount == 3) {
        console.log("Three of a kind")
        diceValues.forEach (checkForThreeOfAKind)
        function checkForThreeOfAKind (value, index, array) {
            if (value == 3) {
                tempScore = tempScore + ((index+1)*value)
                scoreChart[currentPlayer].threeOfAKind = tempScore
            }
        }
    }

    if (dice[4] == dice[3]+1 & dice[3] == dice[2]+1 & dice[2] == dice[1]+1 & dice[1] == dice[0]+1) {
        if (dice[4] == 5) {
            console.log("Small Straight")
            tempScore = 15
            scoreChart[currentPlayer].smallStraight = tempScore
        } else if (dice[4] == 6) {
            console.log("Large Straight")
            tempScore = 20
            scoreChart[currentPlayer].largeStraight = tempScore
        }
    }

    if (tempScore == 0) {
        console.log("Oh, that's a shame...")
    } else {
        players[currentPlayer].totalScore = players[currentPlayer].totalScore + tempScore
    }


     switch(scoreCategory) {
          case aces:
            // code block
            break;
          case twos:
            // code block
            break;
          default:
            // code block
        } 
} */

function ShowFinalScore() {

}



//Only for testing - remove the fillowing
playerNames.push("Josh", "Andrew", "Phil", "Steve", "Motown", "Funk")
SetupPlayerData()
SetStartingPlayer()
ThrowDice()
console.table(dice)
DiceArrayToValueArray(...dice)
console.table(diceValues)
//CalculatePoints()
console.table(scoreChart)