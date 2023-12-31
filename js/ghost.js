'use strict'

const GHOST = '&#9781'
var gGhosts = []

var gGhostsInterval


function createGhosts(board) {
    // TODO: 3 ghosts and an interval
    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }
    gGhostsInterval = setInterval(moveGhosts, 1000)
}

function createGhost(board) {
    // TODO: Create a ghost with arbitrary start pos & currCellContent
    const ghost = {
        location: { i: 3, j: 3 },
        currCellContent: FOOD,
        color: getRandomColor()
    }
    // TODO: Add the ghost to the ghosts array
    gGhosts.push(ghost)

    // TODO: Update the board
    board[ghost.location.i][ghost.location.j] = GHOST
}

function moveGhosts() {
    // TODO: loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        moveGhost(gGhosts[i])
    }
}

function moveGhost(ghost) {
    // TODO: figure out moveDiff, nextLocation, nextCell
    const moveDiff = getMoveDiff()
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j,
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // TODO: return if cannot move
    if(nextCell === WALL || nextCell === GHOST) return
    
    // TODO: hitting a pacman? call gameOver
    if(nextCell === PACMAN) {
        gameOver()
        return
    }

    // TODO: moving from current location:
    // TODO: update the model (restore prev cell contents)
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    
    // TODO: update the DOM
    renderCell(ghost.location, ghost.currCellContent)

    // TODO: Move the ghost to new location:
    // TODO: update the model (save cell contents so we can restore later)
    ghost.location = nextLocation
    ghost.currCellContent = nextCell
    gBoard[nextLocation.i][nextLocation.j] = GHOST

    // TODO: update the DOM
    renderCell(ghost.location, getGhostHTML(ghost))
}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    var color = ghost.color

    if (gPacman.isSuper) {
        color = 'blue'
    }

    return `<span style="background-color:${color}">${GHOST}</span>`;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'
    var color = '#'
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    if (color === '#0000FF') {
        color = getRandomColor()
    }
    return color
}

function eatsSuperFood() {
    gPacman.isSuper = true
    changeGhostsColor()
    setTimeout(() => {
        // todo: call a function that will revive the ghosts back 
        gPacman.isSuper = false
    }, 5000)
    

}

function changeGhostsColor() {
    for (let i = 0; i < gGhosts.length; i++) {

        var currGhost = gGhosts[i]
        renderCell(currGhost.location, getGhostHTML(currGhost))
    }

}

function removeGhost(location){
   var index=null
for (let i = 0; i < gGhosts.length; i++) {
 var currGhost=  gGhosts[i]
    if(currGhost.location.i===location.i && currGhost.location.j===location.j){
        index=i
    }
}
if(index===null)return
var removedGhost = gGhosts.splice(index, 1)[0]

setTimeout(function () {
    returnGhosts(removedGhost)
}, 5000)
}


function returnGhosts(gGhost) {
gGhosts.push(gGhost)
}
