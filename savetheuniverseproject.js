/* 
I need ships. Ships are objects. Classes can be used to make objects.

Ships will need different properties. Ships will need a method to interact with one another, likely attacking.

Attacking will require a loop. 

I need an array of objects, the six alien ships. The array will pop out a ship if the previous one is defeated.

If the player is defeat I need to generate a game over message. If the alien ship is defeat I need to give the player the option to retreat or attack. (For the current moment retreating will result in a game over.)


*/
// Make the Ship Class that will make the actors/objects
class Ship {
    constructor(name, hull, firepower, accuracy, isPlayer = false) {
        this.name = name
        this.hull = hull
        this.firepower = firepower
        this.accuracy = accuracy
        this.isPlayer = isPlayer
    }
    //build methods
    checkHull() {
        if (this.hull > 0) { // Checks if ship alive and displays hull value
        console.log(`${this.name} has ${this.hull} hull left`)
        } else if (this.isPlayer) { //if the player is dead, display message and end the game
            console.log(`${this.name} has been destroyed. Game Over.`)
            gameover = true
            return
        } else {
            console.log('Alien Ship destroyed.') // Displays that the alien ship was destroyed
            if (alienShipHolder.length) { // checks the value of alienShipHolder array
            console.log('Will you continue or retreat?') // If it's not 0 then you get the option to continue fighting
            } else {
                depopulateAlienShip() //Runs depopulateAlienShip for winning message
            }
            return
            
        }
    }    
    checkAccuracy() {
        if (this.accuracy > Math.random()) { //checks accuracy and returns true value if greater than Math.random
            return true
        } else {
            return false
        }
    }
    attack(opponent) {
        if (this.checkAccuracy()) { //Check to see if the opponent is destroyed
            console.log(`${this.name} attacked the ${opponent.name} for ${this.firepower}`)
            opponent.hull -= this.firepower
        } else {
            console.log(`${this.name} missed`)
        }
        opponent.checkHull() //Checks the hull value of the target after the attack
        return
    }
}

//Instantiate the player ship
const ussAssembly = new Ship('USS Assembly', 20, 5, .7, true)
let alienShip = {} // Empty object for alien ship data to be populated from the Alien Ship Holder
const alienShipHolder = [] //Empty Array for Alien Ships

//game over variable
let gameover = false


//Functions for gameplay
function populateAlienShips() { //function for populating the alien ship array
    for (let i = 0; alienShipHolder.length < 6; i++) {
        alienShipHolder.push(new Ship('Alien Ship', Math.floor((Math.random() * 4) + 3), Math.floor((Math.random() * 3) + 2), ((Math.floor(Math.random() * 3)) + 6)/10))
    }
}
function depopulateAlienShip() {
    console.log("There are", alienShipHolder.length, "ships left")
    if (alienShipHolder.length > 0) {
        alienShip = alienShipHolder.pop()
    } else {
        console.log("...Actually, you've beaten all the Aliens!")
        gameover = true
        alert("You've won!")
    }
}

function shipBattle() {
    while (ussAssembly.hull > 0 && alienShip.hull > 0) {
    ussAssembly.attack(alienShip)
    if (alienShip.hull > 0) {
        alienShip.attack(ussAssembly)
        }
    }
}

//DOM Elements
const motherShip = document.getElementById('alien-ship-holder')
const alienFighter = document.getElementById('alien-fighter')
const playerShip = document.getElementById('player')
const attackBtn = document.getElementById('attack')
const retreatBtn = document.getElementById('retreat')
const reloadBtn = document.getElementById('reset') 

//Event listeners

attackBtn.addEventListener('click', (evt) => {
    evt.preventDefault()
    if (gameover) { //Checks if any of the game over conditions have been met
        return alert(`Restart first, then attack again.`)
    }
    if (alienShip.hull > 0) { //Checks to make sure if the alien ship is alive.
    shipBattle()
    } else {
        depopulateAlienShip()
    }
})

retreatBtn.addEventListener('click', (evt) => {
    evt.preventDefault()
    if(!gameover) { //Checks for false game over status
    console.log(`You've fled like a coward and were shot down.`)
    gameover = true //Sets game over status to true.
    alert('Game Over!')
    } else {
    alert('Game Over!')
    }
})

//Game
populateAlienShips()
depopulateAlienShip()




