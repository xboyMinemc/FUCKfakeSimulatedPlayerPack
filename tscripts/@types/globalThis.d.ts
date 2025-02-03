import {
    EntityEventOptions,
    Entity,
    Vector3,
    type EntityDieAfterEvent,
} from "@minecraft/server";


//逆码的，乱起来了
import { SimulatedPlayer,
} from "@minecraft/server-gametest";

import {
    Location,
    BlockLocation
} from "../lib/xboyPackage/The law of the ancestors is immutable";




/**
 * Manages callbacks that are connected to a reloadFromCmd event.
 */
export class reloadFromCmdEventSignal {
    /**
     * @remarks
     * Adds a callback that will be called on every reload from command.
     * @param callback
     */
    subscribe(callback: (arg: reloadFromCmdEvent) => void): void;
    /**
     * @remarks
     * Removes a callback from being called every reload from command.
     * @param callback
     * @throws This function can throw errors.
     */
    unsubscribe(callback: (arg: reloadFromCmdEvent) => void): void;
    /**
     * @remarks
     * Trigger a callback from being called every reload from command.
     * @throws This function can throw errors.
     */
    trigger(TickEvent): void;
    protected constructor();
}

/**
 * An event for reloadFromCmd, that fires when reload from command.
 */
export class reloadFromCmdEvent {
}





/**
 * xBoyMinemc
 * Manages callbacks that are connected to when an entity dead by hurt.
 */
export class EntityDeadByHurtEventSignal {
    /**
     * @remarks
     * Adds a callback that will be called when an entity is  dead by hurt.
     * @param callback
     * @param options
     */
    subscribe(callback: (arg: EntityDeadByHurtEvent) => void, options?: EntityEventOptions): (arg: EntityDeadByHurtEvent) => void;
    /**
     * @remarks
     * Removes a callback from being called when an entity is dead by hurt.
     * @param callback
     * @throws This function can throw errors.
     */
    unsubscribe(callback: (arg: EntityDeadByHurtEvent) => void): void;
    trigger(EntityDeadByHurt: EntityDeadByHurtEvent): void;
    protected constructor();
}
/**
 * Contains information related to an entity getting dead by
 * another entity.
 */
// @ts-ignore
export class EntityDeadByHurtEvent extends EntityDieAfterEvent {
    // /**
    //  * A summary of the reason that damage was caused.
    //  */
    // readonly cause: EntityDamageCause;
    // /**
    //  * Describes the amount of damage caused.
    //  */
    // readonly damage: number;
    // /**
    //  * Optional entity that caused the damaging attack, or
    //  * undefined if the hurt reason was not because of another
    //  * entity.
    //  */
    // readonly damagingEntity: Entity;
    // /**
    //  * Entity that was Dead.
    //  */
    // readonly hurtEntity: Entity;
    // /**
    //  * Optional entity for a projectile that potentially hurt an
    //  * entity.
    //  */
    // readonly projectile: Entity;
    // protected constructor();
}

export class FishingHookSpawnedEventSignal {
    /**
     * @remarks
     * Adds a callback that will be called when a FishingHook spawned.
     * @param callback
     * @param options
     */
    subscribe(callback: (arg: FishingHookSpawnedEvent) => void, options?: EntityEventOptions): (arg: FishingHookSpawnedEvent) => void;
    /**
     * @remarks
     * Removes a callback from being called when a FishingHook spawned.
     * @param callback
     * @throws This function can throw errors.
     */
    unsubscribe(callback: (arg: FishingHookSpawnedEvent) => void): void;
    trigger(FishingHookDespawned: FishingHookSpawnedEvent): void;
    protected constructor();
}
export class FishingHookSpawnedEvent {
    /**
     * fishing who
     */
    Fisher: Entity;
    /**
     * id of Hook.
     */
    HookId: Entity["id"];
    protected constructor();
}
export class FishingHookDespawnedEvent {
    /**
     * fishing who
     */
    Fisher: Entity;
    /**
     * id of Hook.
     */
    HookId: Entity["id"];
    /**
     * array of callback be fired once.
     */
    fishingHookDespawned_TickArray: Array<Function>;
    protected constructor();
}

/**
 * xBoyMinemc
 * Manage callback that are triggered to when FishingHook Despawned.
 */
export class FishingHookDespawnedEventSignal {
    /**
     * @remarks
     * Adds a callback that will be called when a FishingHook Despawned.
     * @param callback
     * @param options?: EntityEventOptions
     */
    subscribe(callback: (arg: FishingHookDespawnedEvent) => void, options?: EntityEventOptions): (arg: FishingHookDespawnedEvent) => void;
    /**
     * @remarks
     * Removes a callback from being called when a FishingHook Despawned.
     * @param callback
     */
    unsubscribe(callback: (arg: FishingHookDespawnedEvent) => void): void;
    trigger(FishingHookDespawnedEvent: FishingHookDespawnedEvent): void;
    protected constructor();
}
export { BlockLocation };

export class initializedEvent {}
export  class initializedEventSignal {
    /**
     * @remarks
     * Adds a callback that will be called when this initialized.
     * @param callback
     * @param options?: initializedEvent
     */
    subscribe(callback: (arg: initializedEvent) => void): (arg: initializedEvent) => void;
    /**
     * @remarks
     * Removes a callback from being called when this initialized.
     * @param callback
     */
    unsubscribe(callback: (arg: initializedEvent) => void): void;
    trigger(initializedEvent: initializedEvent): void;
    // protected constructor();
}
export class spawnedEvent {
    // a spawned SimulatedPlayer Entity
    spawnedSimulatedPlayer : SimulatedPlayer;
    // PID
    PID : number;
}
export  class spawnedEventSignal {
    /**
     * @remarks
     * Adds a callback that will be called when a spawned SimulatedPlayer Entity.
     * @param callback
     * @param options?: spawnedEvent
     */
    subscribe(callback: (arg: spawnedEvent) => void): (arg: spawnedEvent) => void;
    /**
     * @remarks
     * Removes a callback from being called when a spawned SimulatedPlayer Entity.
     * @param callback
     */
    unsubscribe(callback: (arg: spawnedEvent) => void): void;
    trigger(initializedEvent: spawnedEvent): void;
    // protected constructor();
}
export class projectileFiredEvent {
    /**
     * who Fired projectile.
     */
    Fisher: Entity;
    /**
     * id of projectile entity.
     */
    HookId: Entity["id"];
    protected constructor();
}
export class projectileFiredEventSignal {
    /**
     * @remarks
     * Adds a callback that will be called when a projectile Fired.
     * @param callback
     */
    subscribe(callback: (arg: projectileFiredEvent) => void): (arg: projectileFiredEvent) => void;
    /**
     * @remarks
     * Removes a callback from being called when a projectile Fired.
     * @param callback
     * @throws This function can throw errors.
     */
    unsubscribe(callback: (arg: projectileFiredEvent) => void): void;
    trigger(projectileFired: projectileFiredEvent): void;
    protected constructor();
}
export class playerMoveAfterEvent {
    /**
     * @remarks
     * Describes the location after move.
     *
     */
    readonly location: Vector3;
    /**
     * @remarks
     * Describes the viewDirection after move.
     *
     */
    readonly viewDirection: Vector3;
    /**
     * @remarks
     * Describes the location before move.
     *
     */
    readonly locationBefore: Vector3;
    /**
     * @remarks
     * Describes the viewDirection before move.
     *
     */
    readonly viewDirectionBefore: Vector3;
}



export class playerMoveAfterEventSignal {
    subscribe(callback: (arg: playerMoveAfterEvent) => void): (arg: playerMoveAfterEvent) => void;
    unsubscribe(callback: (arg: playerMoveAfterEvent) => void): void;
    trigger(playerMoveAfterEvent: playerMoveAfterEvent): void;
}