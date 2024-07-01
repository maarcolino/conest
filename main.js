const { ipcMain } = require('electron')
const { app, BrowserWindow, Menu, shell } = require('electron/main')
const path = require('node:path')

//importar o modulo de conexão
const { conectar, desconectar } = require('./database.js')

// janela principal (definir o objeto win como variável pública)
let win
const createWindow = () => {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        resizable: false,
        icon: './src/public/img/icon.png',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    // Iniciar a janela com o menu personalizado
    Menu.setApplicationMenu(Menu.buildFromTemplate(template))

    win.loadFile('./src/views/index.html')
}

//janela sobre
let about //Resolver bug de abertura de várias janela
const aboutWindow = () => {
    const father = BrowserWindow.getFocusedWindow()
    // Se a janela about n estiver aberta (bug 1) abrir
    if (!about) {
        about = new BrowserWindow({
            width: 600, //largura
            height: 450, //altura
            resizable: false, //evitar o redimensionamento
            //titleBarStyle: 'hidden', //esconder barra de título e menu
            autoHideMenuBar: true, //esconder o menu
            modal: true,
            parent: father,
            icon: './src/public/img/ajuda.png'
        })
    }
    // nativeTheme.themeSource = 'dark'
    about.loadFile('./src/views/sobre.html')

    // bug 2 (reabrir a janela ao se estiver fechada)
    about.on('closed', () => {
        about = null
    })
}

let client //Resolver bug de abertura de várias janelas

const clientWindow = () => {
    const father = BrowserWindow.getFocusedWindow()
    // Se a janela about n estiver aberta (bug 1) abrir
    if (!client) {
        client = new BrowserWindow({
            width: 800, //largura
            height: 800, //altura
            resizable: false, //evitar o redimensionamento
            //titleBarStyle: 'hidden', //esconder barra de título e menu
            autoHideMenuBar: true, //esconder o menu
            modal: true,
            parent: father,
            icon: './src/public/img/ajuda.png'
        })
    }
    // nativeTheme.themeSource = 'dark'
    client.loadFile('./src/views/clientes.html')

    // bug 2 (reabrir a janela ao se estiver fechada)
    client.on('closed', () => {
        client = null
    })
}

let supp //Resolver bug de abertura de várias janelas
// fornecedor
const suppWindow = () => {
    const father = BrowserWindow.getFocusedWindow()
    // Se a janela about n estiver aberta (bug 1) abrir
    if (!supp) {
        supp = new BrowserWindow({
            width: 1280, //largura
            height: 720, //altura
            resizable: false, //evitar o redimensionamento
            //titleBarStyle: 'hidden', //esconder barra de título e menu
            autoHideMenuBar: true, //esconder o menu
            modal: true,
            parent: father,
            icon: './src/public/img/ajuda.png'
        })
    }
    // nativeTheme.themeSource = 'dark'
    supp.loadFile('./src/views/fornecedores.html')

    // bug 2 (reabrir a janela ao se estiver fechada)
    supp.on('closed', () => {
        supp = null
    })
}

let relatorios

const relatoriosWindow = () => {
    const father = BrowserWindow.getFocusedWindow()
    // Se a janela about n estiver aberta (bug 1) abrir
    if (!relatorios) {
        relatorios = new BrowserWindow({
            width: 800, //largura
            height: 600, //altura
            resizable: false, //evitar o redimensionamento
            //titleBarStyle: 'hidden', //esconder barra de título e menu
            autoHideMenuBar: true, //esconder o menu
            modal: true,
            parent: father,
            icon: './src/public/img/ajuda.png'
        })
    }
    // nativeTheme.themeSource = 'dark'
    relatorios.loadFile('./src/views/relatorios.html')

    // bug 2 (reabrir a janela ao se estiver fechada)
    relatorios.on('closed', () => {
        relatorios = null
    })
}

let product //Resolver bug de abertura de várias janelas

const productWindow = () => {
    const father = BrowserWindow.getFocusedWindow()
    // Se a janela about n estiver aberta (bug 1) abrir
    if (!product) {
        product = new BrowserWindow({
            width: 1280, //largura
            height: 720, //altura
            resizable: false, //evitar o redimensionamento
            //titleBarStyle: 'hidden', //esconder barra de título e menu
            autoHideMenuBar: true, //esconder o menu
            modal: true,
            parent: father,
            icon: './src/public/img/ajuda.png'
        })
    }
    // nativeTheme.themeSource = 'dark'
    product.loadFile('./src/views/produtos.html')

    // bug 2 (reabrir a janela ao se estiver fechada)
    product.on('closed', () => {
        product = null
    })
}
// iniciar a aplicação
app.whenReady().then(() => {

    //status de conexão com o banco de dados
    ipcMain.on('send-message', (event, message) => {
        console.log(`<<< ${message}`)
        statusConexao()
    })

    //desconectar do banco ao encerrar a janela
    app.on('before-quit', async () => {
        await desconectar()
    })

    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})



// Template do menu personalizado

const template = [
    {
        label: 'Arquivo',
        submenu: [
            {
                label: 'Sair',
                click: () => app.quit(),
                accelerator: 'Alt+F4'
            },
            {
                label: 'Clientes',
                click: () => clientWindow(),
            },
            {
                label: 'Fornecedores',
                click: () => suppWindow(),
            },
            {
                label: 'Produtos',
                click: () => productWindow(),
            }
        ]
    },
    {
        label: 'Exibir',
        submenu: [
            {
                label: 'Recarregar',
                role: 'reload'
            },
            {
                label: 'Ferramentas do desenvolvedor',
                role: 'toggleDevTools'
            },
            {
                label: 'Aplicar zoom',
                role: 'zoomIn'
            },
            {
                label: 'Reduzir',
                role: 'zoomOut'
            },
            {
                label: 'Restaurar o zoom padrão',
                role: 'resetZoom'
            }
        ]
    },
    {
        label: 'Relatorios',
        click: () => relatoriosWindow(),
    },
    {
        label: 'Ajuda',
        submenu: [
            {
                type: 'separator'
            },
            {
                label: 'Sobre',
                click: () => aboutWindow(),
            }
        ]
    },
]


//==================================================================================//
//função que verifica o status da conexão
const statusConexao = async () => {
    try {
        await conectar()
        win.webContents.send('db-status', 'Banco de dados conectado.')
    } catch (error) {
        win.webContents.send('db-status', `Erro de conexão ${error.message}`)
    }
}
ipcMain.on('open-client', () => {
    clientWindow()
})
ipcMain.on('open-supp', () => {
    suppWindow()
})
ipcMain.on('open-product', () => {
    productWindow()
})
ipcMain.on('open-relatorios', () => {
    relatoriosWindow()
})