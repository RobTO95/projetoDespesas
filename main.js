import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
	const win = new BrowserWindow({
		width: 1200,
		height: 650,
		frame: true,
		webPreferences: {
			preload: path.join(__dirname, "src", "preload.js"),
			contextIsolation: true,
			nodeIntegration: false,
		},
	});

	win.loadFile(path.join(__dirname, "src", "index.html"));
}

ipcMain.on("janela:minimizar", () => {
	BrowserWindow.getFocusedWindow()?.minimize();
});

ipcMain.on("janela:maximizarOuRestaurar", () => {
	const win = BrowserWindow.getFocusedWindow();
	if (win) {
		win.isMaximized() ? win.unmaximize() : win.maximize();
	}
});

ipcMain.on("janela:fechar", () => {
	BrowserWindow.getFocusedWindow()?.close();
});

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
	// Em sistemas que NÃO sejam macOS, sai do app completamente
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	// No macOS, recria a janela se o app for reativado (ícone no dock clicado)
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
