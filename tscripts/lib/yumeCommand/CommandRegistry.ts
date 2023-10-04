import {Dimension, type Entity, Player, Vector3} from "@minecraft/server";

// Parse command
export function commandParse(command:string):string[] {
    const tokens = [];
    let currentToken = '';
    let insideQuotes = false;

    for (let i = 0; i < command.length; i++) {
        const char = command[i];

        if (char === ' ' && !insideQuotes) {
            if (currentToken !== '') {
                tokens.push(currentToken);
                currentToken = '';
            }
        } else if (char === '"') {
            if (insideQuotes) {
                tokens.push(currentToken);
                currentToken = '';
                insideQuotes = false;
            } else {
                insideQuotes = true;
            }
        } else {
            currentToken += char;
        }
    }

    if (currentToken !== '') {
        tokens.push(currentToken);
    }

    return tokens;
}

// const command = 'cmdHead arg1  "arg2" "arg3" \"_arg4\" 7 8 ~-5 ';
// const tokens = commandParse(command);
// console.log(tokens);
// tokens => [ 'cmdHead', 'arg1', 'arg2', 'arg3', '_arg4', '7', '8', '~-5' ]

export class CommandRegistry {
    private commandsRegistryMap :Map<string,Set<Function>> = new Map();
    public commandsList = new Set<string>()
    public commandRegistrySign :string;
    static parse = commandParse;
    private  alias = new Map<string,string>();


    constructor(commandRegistrySign:string='funny') {
        this.commandRegistrySign  = commandRegistrySign;
        this.commandsRegistryMap  = new Map();
    }

    // registerAlias
    registerAlias( alias:string ,commandName:string) {
        this.alias.set(alias,commandName)
        this.commandsList.add(alias)
    }

    // registerCommand
    registerCommand(commandName:string, callback?:Function) {
        if(!callback)
            return this.commandsRegistryMap.set(commandName,new Set());
        if(this.alias.has(commandName))
            this.alias.delete(commandName)
        if (!this.commandsRegistryMap.has(commandName))
            this.commandsRegistryMap.set(commandName,new Set());

        this.commandsList.add(commandName)
        return this.commandsRegistryMap.get(commandName).add(callback);
    }
    // executeCommand
    executeCommand(commandName:string, commandInfo:{args:string[],entity:Entity|Player|Dimension,location?:Vector3,isEntity:boolean}) {
        this.commandsRegistryMap.get(
            this.alias.get(commandName)??commandName
        )?.forEach((callback:Function) => callback(commandInfo) )

        // if (this.commands.has(commandName)){
        //     const callbacks = this.commands.get(commandName);
        //     callbacks.forEach((callback:Function) => callback(...args) );
        // }
        // else
        //     console.error(`Command "${commandName}" not found.`);
    }

    // removeCommand
    removeCommand(commandName:string, callback:Function) {
        if(callback)
            this.commandsRegistryMap.get(commandName)?.delete(callback)
        else
            this.commandsRegistryMap.delete(commandName)
        // if (this.commands.has(commandName)){
        //     if(this.commands.get(commandName).delete(callback)){
        //         return true
        //     }
        //         console.error('Command '+commandName+' not has this callback.')
        //         return false
        // }
        // else
        //     console.error(`Command "${commandName}" not found.`);
    }
}
// const {executeCommand, registerCommand, removeCommand} = new CommandRegistry();

// create a CommandRegistry object
// const commandRegistry: CommandRegistry = new CommandRegistry();

// Registry command
// function sayHello({args:string[],entity:Entity|Player|Dimension,location?:Vector3,isEntity:boolean,commandName:string}) {
//         entity.sendMessage(`Hello, ${args}!`);
// }
//
// function sayGoodbye(name) {
//         console.log(`Goodbye, ${name}!`);
// }
//
// commandRegistry.registerCommand('hello', sayHello);
// commandRegistry.registerAlias('hi', 'hello');
// commandRegistry.registerCommand('goodbye', sayGoodbye);
//
// Execute command
// commandRegistry.executeCommand('hello', {args:string[],entity:Entity|Player|Dimension,location?:Vector3,isEntity:boolean,commandName:string}); // 输出：Hello, Alice!
// commandRegistry.executeCommand('goodbye', {args:string[],entity:Entity|Player|Dimension,location?:Vector3,isEntity:boolean,commandName:string});   // 输出：Goodbye, Bob!
//
// Removed command
// commandRegistry.removeCommand('hello', sayHello);
//
// try ti execute the command again
// commandRegistry.executeCommand('hello', {args:string[],entity:Entity|Player|Dimension,location?:Vector3,isEntity:boolean,commandName:string});     // 不会有任何输出，因为已经移除了 sayHello 回调
