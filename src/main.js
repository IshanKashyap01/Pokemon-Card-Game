import { GameEngine } from './modules/controller/GameEngine.js'

main()
async function main()
{
    const engine = new GameEngine()
    await engine.setUpGame()
    document.querySelector('#fight').addEventListener('click',() => engine.beginFight())
}