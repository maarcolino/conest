/**
 * Modelo de dados (model) Fornecedores
 */

const { model, Schema } = require('mongoose')

const fornecedorSchema = new Schema({
    rzsFornecedor: {
        type: String
    },
    cpnjFornecedor: {
        type: String
    },
    foneFornecedor: {
        type: String
    },
    emailFornecedor: {
        type: String
    },
    logradouroFornecedor: {
        type: String
    },
    numFornecedor: {
        type: String
    },
    complementoFornecedor: {
        type: String
    },
    bairroFornecedor: {
        type: String
    },
    localidadeFornecedor: {
        type: String
    },
    ufFornecedor: {
        type: String
    },
    cepFornecedor: {
        type: String
    }
})

module.exports = model('fornecedor', fornecedorSchema)