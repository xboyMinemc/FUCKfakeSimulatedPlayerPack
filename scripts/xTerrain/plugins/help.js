﻿import { CommandRegistry } from '../../lib/yumeCommand/CommandRegistry';
import { world } from "@minecraft/server";
const commandRegistry = new CommandRegistry();
const helpNoArgs = ({ args, entity, isEntity }) => {
    if (args.length !== 1 || !isEntity)
        return;
    [
        "输入  假人帮助+空格+功能名   获取更详细的帮助", "例如   -假人帮助 重生-",
        "###部分功能需要光标对准假人", "创建", "销毁", "列表", "扭头", "停止", "移动", "§e§l自动追击§r",
        "使用 # 开始使用 # 停止使用 => 使用鱼竿，鱼钩销毁后会自动抛竿（自动钓鱼）", "攻击", "自动攻击", "交换背包",
        "一般操作示例 '假人创建' '假人销毁' '假人交换背包'  ’假人github‘  ’假人help‘", "销毁 + 空格 +列表标号",
        "销毁示例", "销毁", "销毁 0", "销毁 1",
        "#赠品：输入'tps开' 或 'tps关'",
        "§r这里是一些技术解释",
        "假人销毁，或游戏重启后，信息完全丢失",
        "假人可以捡起掉落物品",
        "输入‘假人github’了解更多"
    ].forEach((text) => entity.sendMessage(`§e§l-${text}`));
};
const helpWithArgs = ({ args, entity, isEntity }) => {
    if (args.length === 1 || !isEntity)
        return;
    const helpMessage = ({
        "销毁": ["销毁示例", "假人销毁 + 空格 + 序号", "假人销毁 1", "假人销毁 2"],
        "重生": ["重生示例", "假人重生 + 空格 + 序号", "假人重生 1", "假人重生 2"],
    })[args[1]];
    helpMessage
        ?
            entity.sendMessage(helpMessage.join("\u000a"))
        :
            entity.sendMessage("对不起，没有这种事情，做不到" + (Math.random() < 0.233 ? "给钱也做不到" : "真做不到"));
};
const qrcodeTextGithub = `111111111111111111111111111
100000001011001011100000001
101111101000100010101111101
101000101110000000101000101
101000101110110001101000101
101000101000010011101000101
101111101011011010101111101
100000001010101010100000001
111111111010001010111111111
100011001000111110000011001
101011010100110110100101001
111001001011010101111100101
101001010101111011010001011
100101100001001111000101011
111100011001101100100110101
100000001000101001111100101
111100010100001000001101001
100101000011110010000011101
111111111010110110111001101
100000001101011110101010101
101111101001110100111001011
101000101110000100000001101
101000101110101110011011011
101000101010100000111001001
101111101010001011101011111
100000001011110010001101101
111111111111111111111111111`.replaceAll('0', '  ').replaceAll('1', '⬛');
const qrcodeTextRoll = `11111111111111111111111111111111111
10000000111010000110000101100000001
10111110101011000000110010101111101
10100010111110010110100110101000101
10100010100010100100111101101000101
10100010110111110001000000101000101
10111110100100111110101011101111101
10000000101010101010101010100000001
11111111110001101011110010111111111
10000010000101111000001101010101011
10101111101010000111011000101101101
10010010001011000000110111001011111
11100111111110010111110110000100011
11011100110010100100101110010011011
10110111101111110011010001101110101
10011000000000111101111111000011011
11000001100001101011000110011000001
11101100011001111100111001110011111
10111001010010000101000100100100001
11111010011111000110110010001010011
10101011000010010010000111000100111
11110000001010100001101110110001011
10111011000111111110011001101110101
10101100100000110111100110001101011
10101101011101100110110000000000101
10110010100101110000001010000001011
11111111101010001001010100111000001
10000000101111000010101100101010011
10111110111110010011010010111000001
10100010100010101100111110000011011
10100010101111111011000000110010001
10100010101100110100111011001100111
10111110100101101011100001110100111
10000000100101111100101110011101011
11111111111111111111111111111111111`.replaceAll('0', '  ').replaceAll('1', '⬛');
const githubMsg = ({ entity }) => entity.sendMessage('§rhttps://github.com/xBoyMinemc 能不能扫上随缘\u000a' + (Math.random() > 0.5 ? qrcodeTextGithub : qrcodeTextRoll));
commandRegistry.registerCommand('假人帮助');
commandRegistry.registerAlias('假人help', '假人帮助');
commandRegistry.registerCommand('假人帮助', helpNoArgs);
commandRegistry.registerCommand('假人帮助', helpWithArgs);
commandRegistry.registerCommand('假人github', githubMsg);
world.afterEvents.chatSend.subscribe(({ message, sender }) => {
    const args = CommandRegistry.parse(message);
    if (commandRegistry.commandsList.has(args[0]))
        commandRegistry.executeCommand(args[0], { entity: sender, isEntity: true, args });
    if (message === 'showshowway') {
        sender.sendMessage(commandRegistry.showList().toString());
    }
});
