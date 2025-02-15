import * as Util from '../util.js'
import { Pokemon } from './Pokemon.js'

const API = 'https://pokeapi.co/api/v2/pokemon/'

export class PokemonLoader
{
    pokemons
    /**
     * Loads all pokemons from the server into the `pokemons` global variable
     * @param {String} url URL of the resource
     */
    async loadPokemons()
    {
        try
        {
            const data = await Util.getJSONFromServer(API)
            const results = data['results']
            this.pokemons = results.map((result) => {
                return {
                    url: result['url'], 
                    promise: this.loadPokemon(result['name'], result['url'])
                }
            })
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
}