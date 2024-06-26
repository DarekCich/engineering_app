import { app } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";

const isProd = process.env.NODE_ENV === "production";
app.disableHardwareAcceleration();
if (isProd) {
    serve({ directory: "app" });
} else {
    app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
    await app.whenReady();

    const mainWindow = createWindow("main", {
        width: 1500,
        height: 900,
    });

    if (isProd) {
        await mainWindow.loadURL("app://./home.html");
    } else {
        const port = process.argv[2];
        await mainWindow.loadURL(`http://localhost:${port}/home`);
        mainWindow.webContents.openDevTools();
    }
})();

app.on("window-all-closed", () => {
    app.quit();
});
