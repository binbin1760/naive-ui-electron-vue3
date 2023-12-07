import { app, BrowserWindow } from "electron";
import { join } from "path";

const createdWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webviewTag: true, //如果你使用webview加载网页方式需要添加此标签
    },
  });
  //不添加有可能导致运行白屏
  if (process.env.NODE_ENV != "development") {
    win.loadFile(join(__dirname, "../index.html"));
  } else {
    win.loadURL("http://localhost:8484/");
  }
};

process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

app.whenReady().then(createdWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createdWindow();
  }
});
