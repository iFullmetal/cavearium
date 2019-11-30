import * as PIXI from 'pixi.js'
import System from './System';
import EntityContainer from './EntityContainer';
//components
import Collision from './components/Collision';
import Sprite from './components/Sprite';
import Position from './components/Position';
import Movement from './components/Movement'
import Velocity from './components/Velocity'
import Acceleration from './components/Acceleration'
import PlayerControlled from './components/PlayerControlled'
//systems
import RenderSystem from './systems/RenderSystem';
import TilemapRenderSystem from './systems/TilemapRenderSystem';
import MovementSystem from './systems/MovementSystem';
import PlayerInputSystem from './systems/PlayerInputSystem';
//assemblers
import BlockAssembler from './assemblers/BlockAssembler';

export default class ECS {
    //for generating unique id
    private static iter: number = 0;
    private static entityIDs: number[] = [];

    //system object references
    public static readonly systems: System[] = [new PlayerInputSystem(), new MovementSystem(), new TilemapRenderSystem(), new RenderSystem()];

    //component contructor references
    public static readonly components = {
        Position,
        Collision,
        Sprite,
        Movement,
        Velocity,
        Acceleration,
        PlayerControlled  
    };

    //current bunch of EntitieContainers that are being updating
    public static visibleConteiners: EntityContainer[] = [];

    //bindings to fastly create specific entities
    public static readonly assemblers = {
        BlockAssembler
    }

    private constructor(){}

    public static genareteEntityId(): number {
        let id;
        ECS.iter++;
        return ECS.iter;
        do{
            id = (Math.random()*10000 + Date.now()/100000)^0;
        }
        while(ECS.entityIDs.indexOf(id) != -1)
        
        ECS.entityIDs.push(id);

        return id;
    }
    public static updateSystems(container: EntityContainer, delta: number){
        for(let i = 0; i < this.systems.length; i++){
            this.systems[i].update(container, delta);
        }
    }
    
}

//export default ECS;
