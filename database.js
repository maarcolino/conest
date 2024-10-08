/**
 * Módulo de conexão com o banco de dados
 * Uso do framework mongoose (npm i mongoose)
 */

// importar a biblioteca
const mongoose = require('mongoose')

// definir o banco de dados (copiar a string do compass)
let url = "mongodb://admin:123%40senac@10.26.45.213:27017/"

// Variável para armazenar o status da conexão
let isConnected = false

// status da conexão
const dbStatus = async () => {
    if (isConnected === false) {
        await conectar()
    }
}

// conectar
const conectar = async () => {
    // se não estiver conectado
    if (isConnected === false) {
        try {
            await mongoose.connect(url)
            isConnected = true
            console.log("MongoDB conectado")
            return (isConnected)
        } catch (error) {
            console.log(`Problema detectado: ${error}`)
        }
    }
}

// desconectar
const desconectar = async () => {
    if (isConnected === true) {
        try {
            await mongoose.disconnect(url)
            isConnected = false            
            console.log("MongoDB desconectado")
        } catch (error) {
            console.log(`Problema detectado: ${error}`)
        }
    }
}

// exportar para o main os métodos dbStatus e desconectar
module.exports = { dbStatus, desconectar }