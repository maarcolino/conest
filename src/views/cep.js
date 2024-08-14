const cepInput = document.getElementById('cep');
    const buscarButton = document.getElementById('buscar');
    const resultadoDiv = document.getElementById('resultado');
    const logradouroInput = document.getElementById('inputLogradouroFornecedor');
    const bairroInput = document.getElementById('inputBairroFornecedor');
    const localidadeInput = document.getElementById('inputLocalidadeFornecedor');
    const ufInput = document.getElementById('uf');

    buscarButton.addEventListener('click', async () => {
      const cep = cepInput.value.trim();
      if (cep.length!== 8) {
        alert('CEP inválido!');
        return;
      }
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        logradouroInput.value = data.logradouro;
        bairroInput.value = data.bairro;
        localidadeInput.value = data.localidade;
        ufInput.value = data.uf;
        resultadoDiv.style.display = 'block';
      } catch (error) {
        alert('Erro ao buscar CEP!');
      }
    });