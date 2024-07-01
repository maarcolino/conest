const  { contextBridge,ipcRenderer } = require('electron')
 
 
contextBridge.exposeInMainWorld('api', {
    openClient: () => ipcRenderer.send('open-client'),
    openSupp: () => ipcRenderer.send('open-supp'),
    openRelatorios: () => ipcRenderer.send('open-relatorios'),
    openProduct: () => ipcRenderer.send('open-product')
 
})
// Status de conexão (verificar se o banco de dados está conectado)
 
ipcRenderer.send('send-message', "Status do banco de dados:")
 
ipcRenderer.on('db-status', (event, status) => {
    console.log(status)
 
    function obterData() {
        const data = new Date();
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }
        return data.toLocaleDateString('pt-BR', options);
    }
    // interagir diretamente no DOM do documento html (index.html)
    window.addEventListener('DOMContentLoaded', () =>{
        const dataAtual = document.getElementById('dataAtual').innerHTML = obterData()
    })
})