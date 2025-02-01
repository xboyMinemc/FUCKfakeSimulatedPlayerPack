import type { SimulatedPlayer, Test } from '@minecraft/server-gametest'
import type {
    initializedEvent,
    initializedEventSignal,
    spawnedEvent,
    spawnedEventSignal,
} from '../@types/globalThis'
import {Dimension, LocationOutOfWorldBoundariesError, system, Vector3} from '@minecraft/server'

import { register } from '@minecraft/server-gametest'

import verify from '../lib/xboyPackage/scoreBase/verifyDataBase'
import EventSignal from '../lib/xboyEvents/EventSignal'

import { SIGN } from '../lib/xboyPackage/YumeSignEnum'
import { world } from '@minecraft/server'

// import './plugins/noFlashDoor' // pig



import './plugins/help'

import './plugins/chatSpawn'
import './plugins/command'
import './plugins/breakBlock'
import './plugins/youAreMine'
import './plugins/task'
import './plugins/gui'
import './plugins/autoFishing'
import './plugins/killedBySimPlayer'
import './plugins/setting'
import './plugins/showCommandsList'
import {playerMove} from "../lib/xboyEvents/move";
import { cannotHandledExceptionWaringText, CommandError, commandManager, getLocationFromEntityLike } from '../lib/yumeCommand/CommandRegistry';
import '../lib/yumeCommand/scriptEventHandler'

const overworld = world.getDimension('overworld')
const tickWaitTimes = 20*60*60*24*365

// all of SimulatedPlayer List
export const simulatedPlayers  = {}

export let initSucceed = false


let randomTickSpeed = 1
let doDayLightCycle = true
let doMobSpawning = true

{

    randomTickSpeed = world.gameRules.randomTickSpeed
    doDayLightCycle = world.gameRules.doDayLightCycle
    doMobSpawning   = world.gameRules.doMobSpawning

    world.sendMessage('[模拟玩家] 随机刻->'+randomTickSpeed+'时间->'+doDayLightCycle+'生物生成->'+doMobSpawning)
}
//  ?

let spawnSimulatedPlayer : (location:Vector3, dimension:Dimension, pid: number  )=>SimulatedPlayer
let spawnSimulatedPlayerByNameTag : (location:Vector3, dimension:Dimension, nameTag: string  )=>SimulatedPlayer
let testWorldLocation : Vector3


if(!world.structureManager.get('xboyMinemcSIM:void'))
    world.structureManager.createEmpty('xboyMinemcSIM:void', { x:1, y:1, z:1 }).saveToWorld()

const GetPID = ()=> world.scoreboard.getObjective('##FlashPlayer##').addScore('##currentPID',1)


export const initialized : initializedEventSignal = new EventSignal<initializedEvent>()
export const spawned : spawnedEventSignal = new EventSignal<spawnedEvent>()

register('我是云梦', '假人', (test:Test) => {
    testWorldLocation = test.worldBlockLocation({ x:0, y:0, z:0 })
    testWorldLocation["worldBlockLocation"] = (v3:Vector3)=> test.worldBlockLocation(v3)


    world.gameRules.randomTickSpeed = randomTickSpeed
    world.gameRules.doDayLightCycle = doDayLightCycle
    world.gameRules.doMobSpawning = doMobSpawning

    spawnSimulatedPlayer = (location:Vector3, dimension:Dimension, pid: number ):SimulatedPlayer=>{
        return spawnSimulatedPlayerByNameTag(location, dimension, `工具人-${pid}`)
    }
    spawnSimulatedPlayerByNameTag = (location:Vector3, dimension:Dimension, nameTag: string ):SimulatedPlayer=>{

        const simulatedPlayer = test.spawnSimulatedPlayer({ x:0, y:8, z:0 }, nameTag)
        simulatedPlayer.addTag('init')
        simulatedPlayer.addTag(SIGN.YUME_SIM_SIGN)
        simulatedPlayer.addTag(SIGN.AUTO_RESPAWN_SIGN)
        try {
            simulatedPlayer.setSpawnPoint({...location, dimension})
            simulatedPlayer.teleport(location, {dimension})
        } catch (e) {
            if (e instanceof LocationOutOfWorldBoundariesError) {
                console.warn('[模拟玩家] 有东西尝试在非法位置生成假人，已阻止');
                simulatedPlayer.disconnect();
            } else {
                throw e;
            }
        }

        return simulatedPlayer
    }

    initialized.trigger(null)
    initSucceed = true
    console.log('[模拟玩家] 初始化完成，输入“假人创建”或“ffpp”')
})
.maxTicks(tickWaitTimes)
.structureName('xboyMinemcSIM:void');
// .maxTicks(2)
// .maxAttempts(tickWaitTimes)
// .requiredSuccessfulAttempts(tickWaitTimes)
// .padding(0)

    (world.afterEvents.worldInitialize ?? world.afterEvents['worldLoad']).subscribe(()=>{

    // 记分板PID初始化 写的烂 执行两次
    verify()
    verify()

    const z = 11451400 +  Math.floor(Math.random() * 114514 * 19 )
    system.run(()=>{
        overworld.runCommandAsync('execute positioned 15000000 256 '+z+' run gametest run 我是云梦:假人')
            .catch((e) => world.sendMessage('[模拟玩家] 报错了，我也不知道为什么'+e))
            .finally(()=> {
                // world.sendMessage('[模拟玩家] 完成一次命令执行尝试')

            })
    })
})

let say = false
playerMove.subscribe(()=>{
    if (say) return
    say = true
    world.sendMessage('[模拟玩家] 初始化完成，输入“假人创建”或“ffpp”')
})

    // initialized.subscribe(()=> console.error('[模拟玩家]初始化完毕，加载内置插件') )
    // initialized.subscribe(()=>
    // {
    // }
    //     // 'test',
    //     // 'chatSpawn',
    //     // 'command',
    //     // 'breakBlock',
    //     // 'youAreMine',
    //     // 'help',
    //     // 'task',
    //     // 'gui',
    //     // 'autoFishing',
    //     // 'killedBySimPlayer',
    //     // 'setting',
    //     // 'Deja Vu Yan Returns',
    //     // '鱼肉 ‭‭‭⁧⁧⁧~咕噜咕噜',
    //
    // )

world.beforeEvents.chatSend.subscribe(({message, sender}) => {
    system.run(() => {
        try {
            commandManager.execute(message, {
                entity: sender,
                isEntity: true,
                location: getLocationFromEntityLike(sender)
            });
        } catch (e) {
            if (!(e instanceof CommandError)) {
                console.error(e);
                world.sendMessage(cannotHandledExceptionWaringText);
            }
        }
    });
});

export { spawnSimulatedPlayer,spawnSimulatedPlayerByNameTag,testWorldLocation,GetPID }

