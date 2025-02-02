const fs = require('fs');
const archiver = require('archiver');


const pack_name = '指定生成坐标-构建于1.21.30-支持1.21.2x-1.21.5x'
const pack_version = [1,21,30];
const fix_pack_version = 17
const min_engine_version = [1,21,20]

const printFilePathOnly = process.argv.includes('--print-filepath-only')

// https://www.npmjs.com/package/@minecraft/server?activeTab=versions
// https://www.npmjs.com/package/@minecraft/server-gametest?activeTab=versions
// https://www.npmjs.com/package/@minecraft/server-ui?activeTab=versions


pack_version.toString =  ()=>pack_version.join('.')
const full_pack_version = [...pack_version]
      full_pack_version[2] = full_pack_version[2]*10 + fix_pack_version


const manifest_json = {
    "format_version": 2,
    "header": {
        "name": `§t${pack_version} v${fix_pack_version} §e§lFlash§fFakePlayerPack`,
        "description": `【${pack_name}】${pack_version} \u000a开启实验性游戏内容（测试版 API）-游戏内输入“假人帮助”或“假人创建” 对着假人右键（蹲或不蹲是两个不同的菜单） 无关QQ群：122957051:`,
        "uuid": "aa101e99-abb4-448d-b58f-71e9da43064e",
        "version": full_pack_version,
        "min_engine_version": min_engine_version
    },
    "modules": [
        {
            "version": full_pack_version,
            "type": "script",
            "uuid": "10101e99-abc1-5488-ba76-71e9da441300",
            "description": "§e§lFlash§fFakePlayerPack",
            "entry": "scripts/main/preload.js"
        }
    ],
    "dependencies": [
        {
            "module_name": "@minecraft/server",
            "version": "2.0.0-alpha"
        },
        {
            "module_name": "@minecraft/server-gametest",
            "version": "2.0.0-alpha"
        },
        {
            "module_name": "@minecraft/server-ui",
            "version": "2.0.0-alpha"
        }
    ]
}

fs.writeFile('./manifest.json',JSON.stringify(manifest_json,null,4),()=>{})


// 创建一个Archiver实例，将输出流传递给它
const archive = archiver('zip', {
  zlib: { level: 9 } // 设置压缩级别，可选
});

// 如果你想要在ZIP文件中添加多个文件，可以多次调用append方法
archive.append(fs.createReadStream('manifest.json'), { name: 'manifest.json' });
archive.append(fs.createReadStream('pack_icon.png'), { name: 'pack_icon.png' });
// 使用directory方法添加整个目录到ZIP文件中
['structures','entities','scripts/main'].forEach(_=>archive.directory(_, true)); // 第二个参数设置为false表示不包含目录本身

// 当所有文件都添加完毕后，调用finalize方法来完成ZIP文件的创建
archive.finalize().then(() => 0);


// make dir ./build
!fs.existsSync('./build') && fs.mkdirSync('build');
const name = './build/'
    + manifest_json.header.name
        .trim()
        .replace(/§./g, '')
        .replace(/(\.+|\s+)/g, '-')
    + '.mcpack';

if (printFilePathOnly) console.log(name)

// 监听archive的'error'事件，以处理任何错误
archive.on('error', (err) => {
  throw err;
});

// 创建一个输出流，将ZIP文件写入到指定的文件中
const name1 = name ?? 'example1.zip'
const output1 = fs.createWriteStream(name1);

// 监听archive的'drain'事件，以确保数据被写入输出流
if(!printFilePathOnly) output1.on('close', () => console.log(`${name1} 文件已成功创建，共包含 ${archive.pointer()} 字节`));

// 将ZIP文件写入到输出流
archive.pipe(output1);
// archive.pipe(output2);

// 如果存在e:/temp路径就往那里放一份
// ↑迷惑行为

// const tempPath = 'e:/temp'
// if(fs.existsSync(tempPath)){
//     !fs.existsSync(tempPath+'/build') && fs.mkdirSync(tempPath+'/build');
//
//     const tempName = tempPath+'/'+name
//     const output3 = fs.createWriteStream(tempName);
//     output3.on('close', () => console.log(`${tempName} 文件已成功创建，共包含 ${archive.pointer()} 字节`));
//     archive.pipe(output3);
// }
