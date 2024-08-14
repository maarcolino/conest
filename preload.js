const { contextBridge, ipcRenderer } = require('electron')

//conexão com o banco de dados
ipcRenderer.send('db-conect')

// processos
contextBridge.exposeInMainWorld('api', {
    openClient: () => ipcRenderer.send('open-client'),
    openFornecedor: () => ipcRenderer.send('open-fornecedor'),
    dbMessage: (message) => ipcRenderer.on('db-message', message),
    newClient: (cliente) => ipcRenderer.send('new-client', cliente),
    newFornecedor: (fornecedor) => ipcRenderer.send('new-fornecedor', fornecedor),
    infoSearchClient: () => ipcRenderer.send('dialog-infoSearchClient'),
    infoSearchFornecedor: () => ipcRenderer.send('dialog-infoSearchFornecedor'),
    focusClient: (args) => ipcRenderer.on('focus-searchClient', args),
    focusFornecedor: (args) => ipcRenderer.on('focus-searchFornecedor', args),
    searchClient: (nomeCliente) => ipcRenderer.send('search-client', nomeCliente),
    searchFornecedor: (rzsFornecedor) => ipcRenderer.send('search-fornecedor', rzsFornecedor),
    nameClient: (args) => ipcRenderer.on('set-nameClient', args),
    nameFornecedor: (args) => ipcRenderer.on('set-nameFornecedor', args),
    clearSearch: (args) => ipcRenderer.on('clear-search', args),
    dataClient: (dadosCliente) => ipcRenderer.on('data-client', dadosCliente),
    dataFornecedor: (dadosFornecedor) => ipcRenderer.on('data-fornecedor', dadosFornecedor),
    resetForm: (args) => ipcRenderer.on('reset-form', args),
    updateClient: (cliente) => ipcRenderer.send('update-client', cliente),
    updateFornecedor: (fornecedor) => ipcRenderer.send('update-fornecedor', fornecedor),
    deleteClient: (idCli) => ipcRenderer.send('delete-client', idCli),
    deleteFornecedor: (idFor) => ipcRenderer.send('delete-fornecedor', idFor)
})
