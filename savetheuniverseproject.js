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
        if (this.hull > 0) {
        console.log(`${this.name} has ${this.hull} hull left`)
        } else if (this.isPlayer) {
            console.log(`${this.name} has been destroyed. Game Over.`)
        } else {
            console.log('Alien Ship destroyed.')
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
            console.log(`${opponent.name} has ${opponent.hull} hull remaining`)
        } else {
            console.log(`${this.name} missed`)
        }
    }
}

//Instantiate the player ship
const ussAssembly = new Ship('USS Assembly', 20, 5, .7, true)
//Instantiate alien ship.
const alienShip = new Ship('Alien Ship', Math.floor((Math.random() * 4) + 3), Math.floor((Math.random() * 3) + 2), ((Math.floor(Math.random() * 3)) + 6)/10)

console.log(`You're in a space battle!`)


ussAssembly.attack(alienShip)
alienShip.checkHull()
if (alienShip.hull > 0) {
    alienShip.attack(ussAssembly)
    return
}

