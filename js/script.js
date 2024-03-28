const playerNumSpan = document.getElementById("player-num")
const playerOneScoreSpan = document.getElementById("player-1-score")
const playerTwoScoreSpan = document.getElementById("player-2-score")
const playerOneButton = document.getElementById("player-1-btn")
const playerTwoButton = document.getElementById("player-2-btn")
const resetButton = document.getElementById("reset-btn")
const diceImg = document.getElementById("dice-img")
const result = document.getElementById("result")

const data = 
{
    currentPlayer: 1,
    playerOneScore: 0,
    playerTwoScore:0,
}

const startGame = () =>
{
    setCurrentPlayer(Math.ceil(Math.random() * 2))
    data.playerOneScore = 0
    data.playerTwoScore = 0
    playerOneScoreSpan.innerText = data.playerOneScore;
    playerTwoScoreSpan.innerText = data.playerTwoScore;

}

const setCurrentPlayer = (playerNum) =>
{
    data.currentPlayer = playerNum
    playerNumSpan.innerText = data.currentPlayer
    if (data.currentPlayer == 1) {
        playerOneButton.removeAttribute("disabled");
        playerTwoButton.setAttribute("disabled", "disabled");
    } else {
        playerOneButton.setAttribute("disabled", "disabled");
        playerTwoButton.removeAttribute("disabled");
    }
}

playerOneButton.addEventListener("click", () =>
{
    rollTheDice()
    playerOneButton.setAttribute("disabled", "disabled")
    setTimeout(() =>
    {

        if (data.playerOneScore >= 30)
        {
            setTimeout(() =>
            {
                result.innerHTML =
                  `<h1>Congratulations!!! <mark style= "color: green">Player-1</mark> Won The Game. Click <mark style="color:red">RESET</mark> to Start New Game</h1>`;
            }, 0)
            resetButton.removeAttribute("disabled")
        }
        else
        {
            setCurrentPlayer(2)
        }
    },1000)
})

playerTwoButton.addEventListener("click", () =>
{
    rollTheDice()
    playerTwoButton.setAttribute("disabled", "disabled")
    setTimeout(() =>
    {

        if (data.playerTwoScore >= 30)
        {
            setTimeout(() =>
            {
                result.innerHTML = `<h1>Congratulations!!! <mark style = "color:green">Player-2</mark> Won The Game. Click <mark style= "color:red">RESET</mark> to Start New Game</h1>`;
            }, 0);
            resetButton.removeAttribute("disabled")
        }
        else
        {
            setCurrentPlayer(1)
        }
    },1000)
    
})

const rollTheDice = () =>
{
    const intervalID = setInterval(() =>
    {
        const randomNum = Math.ceil(Math.random() * 6)
        diceImg.src = `./public/${randomNum}.PNG`
    }, 100)
    
    setTimeout(() =>
    {
        clearInterval(intervalID)
        const randomNum = Math.ceil(Math.random() * 6)
        diceImg.src = `./public/${randomNum}.PNG`
        if (data.currentPlayer == 1)
        {
            data.playerOneScore += randomNum
            playerOneScoreSpan.innerText = data.playerOneScore
        }
        else
        {
            data.playerTwoScore += randomNum
            playerTwoScoreSpan.innerText = data.playerTwoScore
        }
    },1000)
    }

resetButton.addEventListener("click", () =>
{
    startGame()
    resetButton.setAttribute("disabled", "disabled ")
    result.innerHTML = ""
    result.background = ""
})

window.onload = () =>
{
    startGame()
}