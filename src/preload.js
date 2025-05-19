const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
	janela: {
		minimizar: () => ipcRenderer.send("janela:minimizar"),
		maximizarOuRestaurar: () => ipcRenderer.send("janela:maximizarOuRestaurar"),
		fechar: () => ipcRenderer.send("janela:fechar"),
	},
});
