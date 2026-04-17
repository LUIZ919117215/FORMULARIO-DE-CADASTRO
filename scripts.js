const adicionarNoInput = (idInput, resInput) => document.getElementById(idInput).value = resInput
const removerTravessão = (cep) => cep.split("").filter(num => num !== '-').join("")
const verifLetraCep = (cep) => String(Number(cep)) === 'NaN'

document.getElementById('cep').addEventListener('blur', (e) => {
    const inputValue = removerTravessão(e.target.value)

    if (inputValue.length !== 8) return document.getElementById('avisos').innerText = "Um CEP deve ter apenas 8 números"
    if (verifLetraCep(inputValue)) return document.getElementById('avisos').innerText = "Um CEP deve ter somentes números"
    
    fetch(`https://viacep.com.br/ws/${inputValue}/json/`)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            adicionarNoInput('cidade', result.localidade)
            adicionarNoInput('estado', result.estado)
        })
        .catch(error => {
            return document.getElementById('avisos').innerText = `Erro: ${error}`
        })
})