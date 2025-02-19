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
     * @param {boolean} canRename `true` if the player can be renamed, `false`
     * otherwise
     */
    constructor(id, canRename)
    {
        this.#player = new Player()
        this.#view = new PlayerView(id)
        if(canRename)
        {
            this.#addRenameListeners()
        }
    }
    get player()
    {
        return this.#player
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
    /**
     * Adds event listeners to enable renaming
     */
    #addRenameListeners()
    {
        this.#view.playerContainer
            .querySelector('#rename')
            .addEventListener('click',() => this.#makePlayerNameEditable())
        this.#view.playerName.addEventListener('keydown', (event) => this.#enterHandler(event))
        this.#view.playerName.addEventListener('blur', () => this.#saveName())
    }
    /**
     * Allows renaming the player
     */
    #makePlayerNameEditable()
    {
        this.#view.playerName.setAttribute('contenteditable', true)
        this.#view.playerName.textContent = ''
        this.#view.playerName.focus()
    }
    /**
     * Sets the name at the press of the enter key
     * @param {Event} event event
     */
    #enterHandler(event)
    {
        if(event.key == 'Enter')
        {
            event.preventDefault()
            this.#view.playerName.blur()
        }
    }
    /**
     * Saves the new name
     */
    #saveName()
    {
        this.#view.playerName.setAttribute('contenteditable', false)
    }
}