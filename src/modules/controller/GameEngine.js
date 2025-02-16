import { PokemonLoader } from '../model/PokemonLoader.js'
import {Player} from '../model/Player.js'
import { logError } from '../util.js'

/**
 * Sets up and manages the game
 */
export class GameEngine
{
    #loader
    #player1
    #player2
    constructor()
    {
        this.#loader = new PokemonLoader()
        this.#player1 = new Player(1)
        this.#player2 = new Player(2)
    }
    /**
     * Fetches the pokemons from the API
     */
    async setUpGame()
    {
        await this.#loader.loadPokemons()
    }
    /**
     * Assigns a random pokemon to both players, then finds the winner
     */
    beginFight()
    {
        const pokemons = this.#loader.pokemons
        let p1 = pokemons[Math.floor(Math.random() * (pokemons.length - 1))]
        let p2 = pokemons[Math.floor(Math.random() * (pokemons.length - 1))]
        Promise.all([p1.promise, p2.promise])
            .then((values) => {
                this.#player1.pokemon = values[0]
                this.#player2.pokemon = values[1]
                const winner = Player.getWinner(this.#player1, this.#player2)
                if(winner !== null)
                {
                    winner.incrementScore()
                }
                return [this.#player1.pokemon.name, this.#player2.pokemon.name]
            })
            .then((pokemonNames) => console.log(`${pokemonNames}`))
            .catch(logError)
    }
}