/**
 * Processo de renderização
 * fornecedor
 */

// mudar propriedades do documento ao iniciar
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("inputSearch").focus() //foco ao iniciar
    btnCreate.disabled = true
    btnUpdate.disabled = true
    btnDelete.disabled = true
})

//CRUD Create >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//captura dos inputs do formulário (passo 1 - slide)

let formFornecedor = document.getElementById('frmFornecedor')
let idFornecedor = document.getElementById('inputFornecedorId')
let rzsFornecedor = document.getElementById('inputRzsFornecedor')
let cpnjFornecedor = document.getElementById('inputCpnjFornecedor')
let foneFornecedor = document.getElementById('inputFoneFornecedor')
let emailFornecedor = document.getElementById('inputEmailFornecedor')
let logradouroFornecedor = document.getElementById('inputLogradouroFornecedor')
let numFornecedor = document.getElementById('inputNumFornecedor')
let complementoFornecedor = document.getElementById('inputComplementoFornecedor')
let bairroFornecedor = document.getElementById('inputBairroFornecedor')
let localidadeFornecedor = document.getElementById('inputLocalidadeFornecedor')
let ufFornecedor = document.getElementById('uf')
let cepFornecedor = document.getElementById('cep')

//evento relacionado ao botão adicionar (ainda passo 1 - slide)
formFornecedor.addEventListener('submit', async (event) => {
    event.preventDefault()
    console.log(rzsFornecedor.value, cpnjFornecedor.value, foneFornecedor.value, emailFornecedor.value, logradouroFornecedor.value, numFornecedor.value, complementoFornecedor.value, bairroFornecedor.value, localidadeFornecedor.value, ufFornecedor.value, cepFornecedor.value)
    //Empacotar os dados em um objeto e enviar ao main.js (passo2 - slide)
    const fornecedor = {
        rzsFor: rzsFornecedor.value,
        cpnjFor: cpnjFornecedor.value,
        foneFor: foneFornecedor.value,
        emailFor: emailFornecedor.value,
        logradouroFor: logradouroFornecedor.value,
        numFor: numFornecedor.value,
        complementoFor: complementoFornecedor.value,
        bairroFor: bairroFornecedor.value,
        localidadeFor: localidadeFornecedor.value,
        ufFor: ufFornecedor.value,
        cepFor: cepFornecedor.value
    }
    api.newFornecedor(fornecedor)
    //limpar os dados from após envio
    formFornecedor.reset()
})
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRud Read >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// vetor usado na renderização dos dados
let arrayFornecedor = []
// buscar o cliente pelo nome
function buscarFornecedor() {
    let rzsFornecedor = document.getElementById('inputSearch').value
    // validação de campo obrigatório
    if (rzsFornecedor === "") {
        api.infoSearchFornecedor() //aviso e UX
    } else {
        api.searchFornecedor(rzsFornecedor) //busca pelo nome
    }
}
// Foco no campo de busca - UX
api.focusFornecedor(() => {
    document.getElementById('inputSearch').focus()
})
// Setar Nome do cliente - UX
api.nameFornecedor(() => {
    // Restaurar o comportamento padrão da tecla Enter
    //restaurarTeclaEnter()
    let setarNomeFornecedor = document.getElementById('inputSearch').value
    document.getElementById('inputRzsFornecedor').value = setarNomeFornecedor
    document.getElementById('inputSearch').value = ""
    document.getElementById('inputSearch').disabled = true
    document.getElementById('inputSearch').blur() //remover o foco
    btnRead.disabled = true
    btnCreate.disabled = false
})
// Limpar busca - UX
api.clearSearch(() => {
    document.getElementById('inputSearch').value = ""
    document.getElementById('inputSearch').focus()
})
// Receber do main.js os dados do cliente
api.dataFornecedor((event, dadosFornecedor) => {
    arrayFornecedor = JSON.parse(dadosFornecedor)
    console.log(arrayFornecedor)
    //percorrer o array e setar os campos do form
    arrayFornecedor.forEach((c) => {
        document.getElementById('inputFornecedorId').value = c._id
        document.getElementById('inputRzsFornecedor').value = c.rzsFornecedor
        document.getElementById('inputCpnjFornecedor').value = c.cpnjFornecedor
        document.getElementById('inputFoneFornecedor').value = c.foneFornecedor
        document.getElementById('inputEmailFornecedor').value = c.emailFornecedor
        document.getElementById('inputLogradouroFornecedor').value = c.logradouroFornecedor
        document.getElementById('inputNumFornecedor').value = c.numFornecedor
        document.getElementById('inputComplementoFornecedor').value = c.complementoFornecedor
        document.getElementById('inputBairroFornecedor').value = c.bairroFornecedor
        document.getElementById('inputLocalidadeFornecedor').value = c.localidadeFornecedor
        document.getElementById('uf').value = c.ufFornecedor
        document.getElementById('cep').value = c.cepFornecedor
        //limpar caixa de busca
        document.getElementById("inputSearch").value = ""
        //remover o foco e desativar a caixa de busca
        document.getElementById('inputSearch').disabled = true
        document.getElementById("inputSearch").blur()
        //desativar os botão adicionar e buscar
        document.getElementById("btnCreate").disabled = true
        document.getElementById("btnRead").disabled = true
        // ativar os botões update e delete
        document.getElementById("btnUpdate").disabled = false
        document.getElementById("btnDelete").disabled = false
    })
})
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRud Update >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function editarFornecedor() {
    //Passo 1 do slide
    const fornecedor = {
        idFor: idFornecedor.value,
        rzsFor: rzsFornecedor.value,
        cpnjFor: cpnjFornecedor.value,
        foneFor: foneFornecedor.value,
        emailFor: emailFornecedor.value,
        logradouroFor: logradouroFornecedor.value,
        numFor: numFornecedor.value,
        complementoFor: complementoFornecedor.value,
        bairroFor: bairroFornecedor.value,
        localidadeFor: localidadeFornecedor.value,
        ufFor: ufFornecedor.value,
        cepFor: cepFornecedor.value
    }
    console.log(fornecedor) // teste do passo 1
    //Passo 2: Enviar o objeto cliente ao main.js
    api.updateFornecedor(fornecedor)
}
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<



// CRud Delete >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function excluirFornecedor() {
    let idFor = idFornecedor.value // Passo 1 (obter o id do cliente)
    console.log(idFor) // teste do passo 1
    api.deleteFornecedor(idFor) // Passo 2 - enviar o id do cliente ao main
}
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


// Reset Form >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

api.resetForm((args) => {
    resetForm()   
})

function resetForm() {
    document.getElementById('inputSearch').disabled = false    
    document.getElementById('inputSearch').focus()    
    btnCreate.disabled = true
    btnRead.disabled = false
    btnUpdate.disabled = true
    btnDelete.disabled = true
    
}
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<