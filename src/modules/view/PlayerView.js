import { Pokemon } from "../model/Pokemon.js"
/**
 * Represents the Player card in the page
 */
export class PlayerView
{
    constructor(id)
    {
        this.playerContainer = document.querySelector(`#player${id}`)
        this.img = this.playerContainer.querySelector('img')
        this.scoreElement = this.playerContainer.querySelector('.score')
        this.nameElement = this.playerContainer.querySelector('.name')
        this.experienceElement = this.playerContainer.querySelector('.experience')
        this.abilitiesContainer = this.playerContainer.querySelector('.abilities')
    }
    /**
     * Renders a pokemon for the player
     * @param {Pokemon} pokemon Pokemon to render
     */
    renderPokemon(pokemon)
    {
        this.img.src = pokemon.img
        this.nameElement.textContent = pokemon.name
        this.experienceElement.textContent = pokemon.experience
        const abilityElements = pokemon.abilities.map((ability) => this.#createAbility(ability))
        this.abilitiesContainer.replaceChildren(...abilityElements)
    }
    /**
     * Creates an HTML element representing a pokemon ability
     * @param {String} ability name of the ability
     * @returns HTML element
     */
    #createAbility(ability)
    {
        const abilityElement = document.createElement('div')
        abilityElement.classList.add('ability')
        abilityElement.textContent = ability
        return abilityElement
    }
    updateScore(score)
    {
        this.scoreElement.textContent = `Score: ${score}`
    }
}