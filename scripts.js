const adicionarNoInput =  (idInput, resInput) => document.getElementById(idInput).value = resInput


document.getElementById('cep').addEventListener('blur', (e) => {
    const inputValue = e.target.value
    fetch(`https://viacep.com.br/ws/${inputValue}/json/`)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            adicionarNoInput('cidade', result.localidade)
            adicionarNoInput('estado', result.estado)
        })
        .catch(error => {

        })
})