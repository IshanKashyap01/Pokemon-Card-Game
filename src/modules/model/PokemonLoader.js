import * as Util from '../util.js'
import { Pokemon } from './Pokemon.js'
/**
 * link to the Pokemon API
 */
const API = 'https://pokeapi.co/api/v2/pokemon/'
/**
 * Fetches the Pokemons from the API
 */
export class PokemonLoader
{
    /**
     * Link to the previous batch of pokemons
     */
    #prev
    /**
     * Link to the current batch of pokemons
     */
    #curr
    /**
     * Link to the next batch of pokemons
     */
    #next
    /**
     * Array containing objects with a Pokemon's name, API URL and a promise
     * that resolves to a `Pokemon` object.
     * 
     * @type {Array<{name: string, url: string, promise: Promise<Pokemon>}>}
     */
    #pokemons
    constructor()
    {
        this.#pokemons = []
        this.#curr = API
    }
    get pokemons()
    {
        return this.#pokemons
    }
    /**
     * Loads all pokemons from the current API
     */
    async loadPokemons()
    {
        try
        {
            const data = await Util.getJSONFromServer(this.#curr)
            this.#prev = data['previous']
            this.#next = data['next']
            const results = data['results']
            this.#pokemons = results.map((result) => {
                return {
                    name: result['name'],
                    url: result['url'], 
                    promise: this.loadPokemon(result['name'], result['url'])
                }
            })
            return this.#pokemons
        }
        catch(error)
        {
            Util.logError(error)
        }
    }
    /**
     * Loads a pokemon from the API
     * @param {String} url URL of the pokemon's API
     * @returns `Promise` that fulfills into a `Pokemon`
     * @throws `Error` with the name and url of the pokemon in the message
     */
    async loadPokemon(name, url)
    {
        try 
        {
            const data = await Util.getJSONFromServer(url)
            return new Pokemon(data)
        }
        catch (error)
        {
            throw new Error(`Couldn't load ${name} from ${url}`)
        }
    }
    /**
     * Updates the API link to the next batch if there is on
     * @returns `0` if there is a next batch, `-1` if not
     */
    setNextBatch()
    {
        if(this.#next)
        {
            this.#curr = this.#next
            return 0
        }
        return -1
    }
    /**
     * Updates the API link to the previous batch if there is one
     * @returns `0` if there is a previous batch, `-1` if not
     */
    setPreviousBatch()
    {
        if(this.#prev)
        {
            this.#curr = this.#prev
            return 0
        }
        return -1
    }
}