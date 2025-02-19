import { PokemonLoader } from '../model/PokemonLoader.js'
import {Player} from '../model/Player.js'
import { logError } from '../util.js'
import { PlayerController } from './PlayerController.js'

/**
 * Sets up and manages the game
 */
export class GameEngine
{
    /**
     * Pokemon loader to get pokemons from the API
     */
    #loader
    /**
     * Controller for the first player
     */
    #player1
    /**
     * Controller for the second player
     */
    #player2
    constructor()
    {
        this.#loader = new PokemonLoader()
        this.#player1 = new PlayerController(1)
        this.#player2 = new PlayerController(2)
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
                this.#player1.changePokemon(values[0])
                this.#player2.changePokemon(values[1])
                const winner = Player.getWinner(this.#player1.player, this.#player2.player)
                if(winner !== null)
                {
                    if(winner == this.#player1.player)
                    {
                        this.#player1.incrementScore()
                    }
                    else
                    {
                        this.#player2.incrementScore()
                    }
                }
                return [this.#player1.player.pokemon.name, this.#player2.player.pokemon.name]
            })
            .then((pokemonNames) => console.log(`${pokemonNames}`))
            .catch(logError)
    }
}