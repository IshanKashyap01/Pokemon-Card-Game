import { PlayerView } from '../view/PlayerView.js'
/**
 * Model representation of a player
 */
export class Player
{
    #view
    #pokemon
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
    incrementScore()
    {
        this.#view.updateScore(++this.score)
    }
    get pokemon()
    {
        return this.#pokemon
    }
    isWinner(player)
    {
        return this.pokemon.experience > player.pokemon.experience
    }
    static getWinner(player1, player2)
    {
        return player1.isWinner(player2) ? player1 : player2
    }
}