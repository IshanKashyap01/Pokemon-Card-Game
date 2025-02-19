import { Player } from "../model/Player.js"
import { Pokemon } from "../model/Pokemon.js"
import { PlayerView } from "../view/PlayerView.js"
/**
 * Keeps track of the player and updates the GUI
 */
export class PlayerController
{
    /**
     * Player view to be controlled
     */
    #view
    /**
     * Player model for the view
     */
    #player
    /**
     * @param {Number} id ID of the player's view
     */
    constructor(id)
    {
        this.#player = new Player()
        this.#view = new PlayerView(id)
    }
    /**
     * Changes the current pokemon selected by the player
     * @param {Pokemon} pokemon Pokemon to be handed
     */
    changePokemon(pokemon)
    {
        this.#player.pokemon = pokemon
        this.#view.renderPokemon(pokemon.image, pokemon.name, pokemon.experience, ...pokemon.abilities)
    }
    /**
     * Updates the player's score and the GUI
     */
    incrementScore()
    {
        this.#player.incrementScore()
        this.#view.updateScore(this.#player.score)
    }
    get player()
    {
        return this.#player
    }
}