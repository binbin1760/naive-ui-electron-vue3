import { BrowserWindow } from 'electron'
// import { CustomScheme } from './CustomScheme';
export const menuTemplate: any = [
    {
        label: '文件',
        submenu: [
            {
                label: '页面调试',
                accelerator: 'F12',
                role: 'toggledevtools'
            },
            {
                label: '新建图片',
                click() {
                    let newWindow = new BrowserWindow({
                        width: 1200,
                        height: 800,
                        webPreferences: {
                            nodeIntegration: true,
                            webSecurity: false,
                            allowRunningInsecureContent: true,
                            contextIsolation: false,
                            webviewTag: true,
                            spellcheck: false,
                            disableHtmlFullscreenWindowResize: true,
                        },
                    })
                    if (process.argv[2]) {
                        newWindow.loadURL(process.argv[2])
                    } else {
                        newWindow.loadURL(`app://index.html`)
                    }
                }
            },
            {
                label: '导出'
            }
        ]
    },
    {
        label: '设置',
        submenu: [
            {
                label: '主题设置'
            },
            {
                label: '自动保存'
            },
            {
                label: '开启辅助线'
            },
            {
                label: '恢复默认设置'
            }
        ]
    },
    {
        label: '帮助',
        submenu: [
            {
                label: '使用说明'
            },
            {
                label: '项目说明'
            },
            {
                label: '版本说明'
            }
        ]
    }
]