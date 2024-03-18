import { app, BrowserWindow, ipcMain, Menu, dialog } from 'electron'
import { CustomScheme } from './CustomScheme';
import { menuTemplate } from "./CustomMenu"
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";
let mainWindow: BrowserWindow;

const isMac = process.platform === 'darwin'

app.on('ready', () => {
    if (isMac) {
        menuTemplate.unshift({
            label: app.getName(),
            submenu: [
                {
                    label: '退出',
                    accelerator: 'CmdOrCtrl+Q',
                    click() {
                        app.quit
                    }
                }
            ]
        })
    } else {
        const appMenu = Menu.buildFromTemplate(menuTemplate);
        Menu.setApplicationMenu(appMenu);
    }
})

app.whenReady().then(() => {
    let config: Electron.BrowserWindowConstructorOptions = {
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
    }
    mainWindow = new BrowserWindow(config);

    // 导入图片资源
    ipcMain.on('open-images', (event, msg) => {
        const wbContent = event.sender
        dialog.showOpenDialog({
            title: '导入资源',
            buttonLabel: '确认选择',
            filters: [
                { name: 'Images', extensions: ['*'] }
            ],
            properties: ['openFile', 'dontAddToRecent', 'multiSelections']
        }).then(res => {
            wbContent.send('send-imgurl', res.filePaths)
        })
    })

    if (process.argv[2]) {
        mainWindow.loadURL(process.argv[2])
    } else {
        CustomScheme.registerScheme();
        mainWindow.loadURL(`app://index.html`)
    }
});