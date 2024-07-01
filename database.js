/**
 * Módulo de conexão com o banco da dados
 * Uso do framework mongoose
 */

// importar a bilioteca
const mongoose = require('mongoose')

// definir o banco de dados (copiar a string do compass)
let url = "mongodb://admin:123%40senac@10.26.45.213:27017/"

// conectar
const conectar = async () => {
    try {
        await mongoose.connect(url)
        console.log("MongoDB conectado!")
    } catch (error) {
        console.log(`Problema detectado: ${error.message}`)
    }
}
 
// desconectar
const desconectar = async () => {
    try {
        await mongoose.disconnect(url)
        console.log("MongoDB desconectado!")
    } catch (error) {
        console.log(`Problema detectado: ${error.message}`)
    }
}
 
// exportar para o main os métodos conectar e desconectar
module.exports = {conectar,desconectar}