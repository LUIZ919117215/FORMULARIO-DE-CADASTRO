const adicionarNoInput =  (idInput, resInput) => document.getElementById(idInput).value = resInput
const removerTravessão = (cep) => cep.split("").filter(num => num !== '-').join("")
const validarNumeroCEP


document.getElementById('cep').addEventListener('blur', (e) => {
    console.log(e.target.value)
    const inputValue = removerTravessão(e.target.value)
    console.log(inputValue);
    

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