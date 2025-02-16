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
     * @param {String} image link to the image
     * @param {String} name name of the pokemon
     * @param {Number} experience base experience
     * @param  {...String} abilities all abilities of the pokemon
     */
    renderPokemon(image, name, experience, ...abilities)
    {
        this.img.src = image
        this.nameElement.textContent = name
        this.experienceElement.textContent = experience
        const abilityElements = abilities.map((ability) => this.#createAbility(ability))
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