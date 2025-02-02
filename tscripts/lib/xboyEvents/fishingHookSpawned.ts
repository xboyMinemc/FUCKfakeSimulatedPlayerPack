import { world, Entity, ItemUseAfterEvent, system} from '@minecraft/server'
import EventSignal from './EventSignal'
import type { FishingHookDespawnedEvent, FishingHookDespawnedEventSignal, FishingHookSpawnedEvent, FishingHookSpawnedEventSignal } from '../../@types/globalThis'



const fishingHookSpawned: FishingHookSpawnedEventSignal = new EventSignal<FishingHookSpawnedEvent>();
const fishingHookDespawned: FishingHookDespawnedEventSignal = new EventSignal<FishingHookDespawnedEvent>();

const queue = {
  fishingHookDespawned_HookArray: new Map<Entity['id'], Entity>(),
  fishingHookDespawned_TickArray: new Array<Function>(),
  playerFishingArray: new Array<Entity>(),
};

world.afterEvents.itemUse.subscribe((event: ItemUseAfterEvent) =>
  
    event.itemStack.typeId === 'minecraft:fishing_rod' && queue.playerFishingArray.push(event.source)
    // (
    //   // world.getDimension("overworld").runCommandAsync("tell @a[tag=xboy] queue.playerFishingArray.push(event.source)=>"+queue.playerFishingArray.push(event.source)),
    //   // world.getDimension("overworld").runCommandAsync("tell @a[tag=xboy] queue.fishingHookDespawned_HookArray=>"+queue.fishingHookDespawned_HookArray.size)
    //   // queue.playerFishingArray.push(event.source)
    // )
)

const around = (v:number, r:number) => v > -r && v < r;
world.afterEvents.entitySpawn.subscribe(({entity: entity}) => {
  // world.getDimension("overworld").runCommandAsync("tell @a[tag=xboy] size fishingHookDespawned_HookArray=>"+queue.fishingHookDespawned_HookArray.size)

  // entity.runCommandAsync("me "+entity.typeId)
  // entity.runCommandAsync("tell @a[tag=xboy] length playerFishingArray "+queue.playerFishingArray.length)
  let Fisher: Entity
  // try {
      
  entity?.typeId === 'minecraft:fishing_hook'
    &&
    (
      (
        Fisher = queue.playerFishingArray.find(
          playerFishing =>
              // debug msg
  //         (
  // entity.runCommandAsync("tell @a[tag=xboy] length x "+(entity.location.x - playerFishing.location.x - playerFishing.getVelocity().x)),
  // entity.runCommandAsync("tell @a[tag=xboy] length y "+(entity.location.y - playerFishing.location.y - playerFishing.getVelocity().y)),
  // entity.runCommandAsync("tell @a[tag=xboy] length z "+(entity.location.z - playerFishing.location.z - playerFishing.getVelocity().z)),
  // entity.runCommandAsync("tell @a[tag=xboy] ==========================================")
  //       ) &&
          
               around(entity.location.x - playerFishing.location.x - playerFishing.getVelocity().x, 6)// @ts-ignore
            && around(entity.location.y - playerFishing.location.y - playerFishing.getVelocity().y, ("免你一死", 7))
            && around(entity.location.z - playerFishing.location.z - playerFishing.getVelocity().z, 6),
        )
      )
        &&
        (
          queue.fishingHookDespawned_HookArray.set(entity.id, Fisher),
          fishingHookSpawned.trigger({ HookId: entity.id, Fisher: Fisher })
        )
    )
  // } catch (error) {
  // world.getDimension("overworld").runCommandAsync("tell @a[tag=xboy] error"+error)
  // world.getDimension("overworld").runCommandAsync("tell @a[tag=xboy] lifetimeState"+entity.location)
  // world.getDimension("overworld").runCommandAsync("tell @a[tag=xboy] error"+entity.dimension.id)
  // }
})


system.runInterval(() => {
  //这里清空干嘛的
  // queue.playerFishingArray = [];
  queue.fishingHookDespawned_TickArray.length && queue.fishingHookDespawned_TickArray.pop()();
  const fishingHookArray = Array.from(world.getDimension("overworld").getEntities({ type: "minecraft:fishing_hook" }))
  const HookIdArray = fishingHookArray.map(Hook => Hook.id)
  // queue.fishingHookDespawned_HookArray.forEach((Fisher,HookId)=>console.error(Fisher,HookId))  //TEST
  queue.fishingHookDespawned_HookArray.forEach((Fisher, HookId) => HookIdArray.includes(HookId) || (fishingHookDespawned.trigger({ HookId: HookId, Fisher: Fisher, fishingHookDespawned_TickArray: queue.fishingHookDespawned_TickArray }), queue.fishingHookDespawned_HookArray.delete(HookId)))
  //写完感觉效率逆天，但想了想，能够有几个钩子，这又不是海鲜市场，满池子钩子里没有一 滴水
})

/*
*/
// console.error(("######### fishingHookSpawned"))
// fishingHookSpawned.subscribe(event=>{
//     console.error("fishingHookSpawned")
//     world.getDimension("overworld").runCommandAsync("me ##鱼钩生成\u000a鱼钩id=>"+event.HookId+"\u000a发起者id=>"+event.Fisher.id);
// })
//
// console.error(("#########"))
// fishingHookDespawned.subscribe(event=>{
//   console.error("fishingHookDespawned")
//   world.getDimension("overworld").runCommandAsync("me ##鱼钩销毁\u000a鱼钩id=>"+event.HookId+"\u000a发起者id=>"+event.Fisher.id);
//   // 工具人们.forEach(_=> _==undefined?0:_.id===event.Fisher.id?event.fishingHookDespawned_TickArray.push(()=>(_.useItemInSlot(0)?_.stopUsingItem():0)):0)
// })
export { fishingHookSpawned, fishingHookDespawned }