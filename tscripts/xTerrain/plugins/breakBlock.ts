import type { World } from '../../@types/globalThis'
import type { SimulatedPlayer } from '@minecraft/server-gametest'

import {spawnSimulatedPlayer, SimulatedPlayerList, spawned as spawnedEvent, GetPID, testWorldLocation} from '../main'
import { CommandRegistry } from '../../lib/yumeCommand/CommandRegistry'
import { getSimPlayer } from '../../lib/xboyPackage/Util'
import {Vector} from "@minecraft/server";

declare const world: World

const commandName = '假人挖掘'

const commandRegistry: CommandRegistry = new CommandRegistry()
commandRegistry.registerCommand(commandName)

//
const noArgs = ({args,entity,location,isEntity})=>{
    if(args.length!==1)return

    if(!isEntity)return

    const SimPlayer = getSimPlayer.formView(entity)
    if(!SimPlayer)return

    // Gets the relative coordinates of the square in front of the dummy entity
    const getCoordinatesFromView = (sim:SimulatedPlayer)=> testWorldLocation(sim.getBlockFromViewDirection({maxDistance:4}).faceLocation)





}
commandRegistry.registerCommand(commandName,noArgs)


world.afterEvents.chatSend.subscribe(({message, sender})=>{
    if(message!==commandName)return;
    commandRegistry.executeCommand(commandName,{commandName:commandName,entity:sender,isEntity:true,args:CommandRegistry.parse(message)})
})

console.error('[假人]内置插件'+commandName+'加载成功')