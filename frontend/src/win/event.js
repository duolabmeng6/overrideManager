import * as systemFc from "../../wailsjs/runtime";
import * as goFc from "../../wailsjs/go/main/App";
import {__load_data} from './__load_data'
import {ElMessage} from "element-plus";

let odata = {
    "bind": "0.0.0.0:8181",
    "proxy_url": "",
    "timeout": 600,
    "codex_api_base": "https://api.deepseek.com/beta/v1",
    "codex_api_key": "sk-这里填写你的key",
    "codex_api_organization": "",
    "codex_api_project": "",
    "codex_max_tokens": 500,
    "code_instruct_model": "deepseek-coder",
    "chat_api_base": "https://api.deepseek.com/v1",
    "chat_api_key": "sk-这里填写你的key",
    "chat_api_organization": "",
    "chat_api_project": "",
    "chat_max_tokens": 4096,
    "chat_model_default": "deepseek-chat",
    "chat_model_map": {},
    "chat_locale": "zh_CN",
    "auth_token": ""
}
let letvscode = {
    "github.copilot.advanced": {
        "debug.overrideCAPIUrl": "http://127.0.0.1:8181/v1",
        "debug.overrideProxyUrl": "http://127.0.0.1:8181",
        "debug.chatOverrideProxyUrl": "http://127.0.0.1:8181/v1/chat/completions",
        "authProvider": "github-enterprise"
    },
    "github-enterprise.uri": "https://cocopilot.org",
}

export function BindWindowEvent() {
    const c = __load_data()
    let comps = c.comps
    c.WinCreated = async function () {
        console.log("Win创建完毕")
        comps.编辑框3.text = ""
        systemFc.EventsOn("logs", function (data) {
            let jsondata = JSON.parse(data);
            console.log("jsondata",jsondata)
            comps.编辑框3.text = comps.编辑框3.text + jsondata.logs;
        });

        comps.Win.text = "overrideManager " + await goFc.GetVersion();
        comps.选择夹3.value = "0"

        //这个odata的数据需要json格式化
        comps.编辑框1.text = JSON.stringify(odata, null, 4)
        comps.编辑框2.text = JSON.stringify(letvscode, null, 4)

        comps.标签2.text = `安装 VSCode Copilot
Copilot 1.219.0
Copilotchat 0.17.1
按 ctrl+shift+p 输入 settings 打开首选项 加入这些配置 重启vscode`


        let 配置文件目录 = await goFc.E取运行目录()

        let data = await goFc.E读入文本(配置文件目录 + "/my-config.conf")
        if (data !== "") {
            ElMessage.success('已读取配置和启动服务 配置文件路径:' + 配置文件目录 + "/my-config.conf");

            comps.编辑框1.text = data
            c.按钮_启动服务被单击()
        }


    }

    c.按钮_启动服务被单击 = async function () {
        if (comps.按钮_启动服务.text === "启动服务") {
            let 启动状态 = await goFc.E启动服务器(comps.编辑框1.text)
            console.log("启动状态", 启动状态)
            if (启动状态 == '启动成功') {
                comps.按钮_启动服务.text = "停止服务"
                ElMessage.success('已启动');
            } else {
                ElMessage.error(启动状态);
            }
            comps.标签1.text = 启动状态
        } else {
            comps.按钮_启动服务.text = "启动服务"
            await goFc.E停止服务器()
            comps.标签1.text = "已停止"
            ElMessage.success('已停止');

        }


    }

    c.按钮_重置配置被单击 = async function () {
        console.log("按钮_重置配置被单击")
        comps.编辑框1.text = JSON.stringify(odata, null, 4)
        ElMessage.success('已重置');
    }

    c.按钮_保存配置被单击 = async function () {
        console.log("按钮_保存配置被单击")
        let 配置文件目录 = await goFc.E取运行目录()
        await goFc.E写到文件(配置文件目录 + "/my-config.conf", comps.编辑框1.text)

        ElMessage.success('保存到' + 配置文件目录 + "/my-config.conf");
    }

    c.标签3被单击 = async function () {
        console.log("标签3被单击")
        systemFc.BrowserOpenURL("https://my.rongyiapi.com/post/rang-Copilot-yong-shang-DeepSeek-zong-yu-gao-ming-bai-le-vscode-he-JetBrainsIDE-du-neng-yong.html")

    }

    c.按钮1被单击 = async function () {
        systemFc.ClipboardSetText(comps.编辑框2.text)
        ElMessage.success('已复制');

    }

    c.按钮_检查更新被单击 = async function () {
        ElMessage.success('检查更新中');
        await goFc.E检查更新();
    }
//Don't delete the event function flag
}