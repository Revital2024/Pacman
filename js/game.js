'use strict'

const WALL = '&#8251;'
const FOOD = '&middot;'
const EMPTY = ' '
var totalFood
const superFood = '🍪'
const CHERRY='🍒'
var gCherryInterval




const gGame = {
    score: 0,
    isOn: false
}
var gBoard

function init() {

    console.log('hello')

    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)

    renderBoard(gBoard, '.board-container')
    gGame.isOn = true
    gGame.score = 0
    updateScore(0)

    gCherryInterval = setInterval(addCherry, 15000)
}





function buildBoard() {
    const size = 10
    var countFood = 0


    const board = []

    for (var i = 0; i < size; i++) {
        board.push([]) // board[i] = []

        for (var j = 0; j < size; j++) {
            if (
                ((i === 1 && (j === 1 || j === size - 2))) ||
                (i === size - 2 && (j === 1 || j === size - 2))
            ) {
                board[i][j] = superFood
                countFood++
            } else if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL

            } else {
                board[i][j] = FOOD
                countFood++
            }

          
            totalFood = countFood - 1

        }
    }
    console.log(totalFood)
    return board
}

function updateScore(diff) {
    const elScore = document.querySelector('h2 span')

    // Model
    gGame.score += diff
    // DOM
    elScore.innerText = gGame.score
}



function gameOver() {
    console.log('Game Over')

    var elButton = document.querySelector('button')
    elButton.style.display = 'inline-block'
    clearInterval(gGhostsInterval)
    gGame.isOn = false
    clearInterval(gCherryInterval)
    gGhosts = []




    

}

function victory() {
    if (totalFood === 0) {
        alert('Mazal Tov!!!')
        var elImg = document.querySelector('img')
        elImg.style.display = 'block';
        var elBoardContainer = document.querySelector('.board-container')
        elBoardContainer.style.display = 'none';
        var elButton = document.querySelector('button')
        elButton.style.display = 'inline-block'
    }


}

function getEmptyPos() {
    var emptyPositions = []

    for(var i = 1; i < gBoard.length - 1; i++){
        for(var j = 1; j < gBoard[i].length - 1; j++){
            var currCell = gBoard[i][j]
            if(!currCell.gameElement) emptyPositions.push({ i, j })
        }
    }
    const idx = getRandomInt(0, emptyPositions.length)
    return emptyPositions[idx]
}

function addCherry() {
    const pos = getEmptyPos()
    if(!pos) return

    
    // gBoard[pos.i][pos.j].gameElement = CHERRY

    gBoard[pos.i][pos.j]= CHERRY

    renderCell(pos, CHERRY)
   
   

    }

 