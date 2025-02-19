import { PlayerView } from '../view/PlayerView.js'
import { Pokemon } from './Pokemon.js'
/**
 * Model representation of a player
 */
export class Player
{
    #score
    /**
     * GUI view of the player
     */
    #pokemon
    /**
     * Creates a new player with a 0 score
     */
    constructor()
    {
        this.#score = 0
    }
    get score()
    {
        return this.#score
    }
    get pokemon()
    {
        return this.#pokemon
    }
    set pokemon(pokemon)
    {
        this.#pokemon = pokemon
    }
    /**
     * Increases the score by 1 and updates the view
     */
    incrementScore()
    {
        this.#score++
    }
    /**
     * Compares the pokemon in hand of the player with an opponent to see if the
     * player's the winner
     * @param {Player} player opponent
     * @returns `true` if the player wins, `false` if the opponent wins
     */
    isWinner(player)
    {
        return this.pokemon.experience > player.pokemon.experience
    }
    /**
     * Compares the pokemon in hand of two players and returns the winner
     * @param {Player} player1 first player
     * @param {Player} player2 second player
     * @returns Winner or null in case of draw
     */
    static getWinner(player1, player2)
    {
        if(player1.isWinner(player2))
        {
            return player1
        }
        if(player2.isWinner(player1))
        {
            return player2
        }
        return null
    }
}