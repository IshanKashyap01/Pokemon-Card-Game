/**
 * Represents a Pokemon
 */
export class Pokemon
{
    /**
     * Link to the image
     * @type String
     */
    #image
    /**
     * Name of the pokemon
     * @type String
     */
    #name
    /**
     * Base experience
     * @type Number
     */
    #experience
    /**
     * List of the pokemon's abilities
     * @type String[]
     */
    #abilities
    /**
     * Takes the pokemon object from API and extracts only the needed values
     * 
     * @param {Object} pokemon Pokemon object from API
     * 
     * @description 
     * Following are the attributes and the way to access them for a pokemon in the current API:
     * - image: pokemon.sprites.other.dream_world.front_default
     * - name: pokemon.name
     * - experience: pokemon.base_experience
     * - abilities: pokemon.abilities[index].ability.name
     */
    constructor(pokemon)
    {
        this.#image = pokemon['sprites']['other']['dream_world']['front_default']
        this.#name = pokemon['name']
        this.#experience = pokemon['base_experience']
        this.#abilities = pokemon['abilities'].map(obj => obj['ability']['name'])
    }
    get image()
    {
        return this.#image
    }
    get name()
    {
        return this.#name
    }
    get experience()
    {
        return this.#experience
    }
    get abilities()
    {
        return this.#abilities
    }
}