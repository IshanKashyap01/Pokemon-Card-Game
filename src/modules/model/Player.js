import { PlayerView } from '../view/PlayerView.js'
import { Pokemon } from './Pokemon.js'
/**
 * Model representation of a player
 */
export class Player
{
    /**
     * GUI view of the player
     */
    #view
    /**
     * Pokemon in hand
     * @type Pokemon
     */
    #pokemon
    /**
     * Creates a new player with a 0 score and attaches its view on the page to
     * it
     * @param {Number} id ID of the player on the page
     */
    constructor(id)
    {
        this.id = id
        this.score = 0
        this.#view = new PlayerView(id)
    }
    set pokemon(pokemon)
    {
        this.#pokemon = pokemon
        this.#view.renderPokemon(pokemon.image, pokemon.name, pokemon.experience, ...pokemon.abilities)
    }
    /**
     * Increases the score by 1 and updates the view
     */
    incrementScore()
    {
        this.#view.updateScore(++this.score)
    }
    get pokemon()
    {
        return this.#pokemon
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
     * @returns Winner
     */
    static getWinner(player1, player2)
    {
        return player1.isWinner(player2) ? player1 : player2
    }
}