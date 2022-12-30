let numberOfPlayers = document.querySelector('#player-number-select')
let numberOfPlayerForm = document.querySelector('#player-select')
const playerData = []
const scoreChart = []
const playerIsComputer = []
let currentPlayer
const dice = []
const diceValues = [0,0,0,0,0,0]

numberOfPlayerForm.addEventListener('submit', e => {
    e.preventDefault()
    console.log(numberOfPlayers.value)

    // Funkar inte pga display: flex BUT WHY
    const siteTitleDiv = document.querySelector('#site-title')
    siteTitleDiv.classList.add('display-none')

    const playerNamesDiv = document.querySelector('#player-names')
    playerNamesDiv.classList.remove('display-none')

} )

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
            scoreChart[i] = {aces:0, twos:0, threes:0, fours:0, fives:0, sixes:0, bonus:0, onePair:0, twoPairs:0, threeOfAKind:0, fourOfAKind:0, smallStraight:0, largeStraight:0, fullHouse:0, chance:0, yahtzee:0}
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

function CalculatePoints() {

}

function ShowFinalScore() {

}

/* ThrowDice()
console.table(dice)
DiceArrayToValueArray(...dice)
console.table(diceValues) */