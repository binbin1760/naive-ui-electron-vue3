"use strict";
const electron = require("electron");
const path = require("path");
const createdWindow = () => {
  const win = new electron.BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webviewTag: true
      //如果你使用webview加载网页方式需要添加此标签
    }
  });
  if (process.env.NODE_ENV != "development") {
    win.loadFile(path.join(__dirname, "../index.html"));
  } else {
    win.loadURL("http://localhost:8484/");
  }
};
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
electron.app.whenReady().then(createdWindow);
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
electron.app.on("activate", () => {
  if (electron.BrowserWindow.getAllWindows().length === 0) {
    createdWindow();
  }
});
