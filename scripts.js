const adicionarNoInput = (idInput, resInput) => document.getElementById(idInput).value = resInput

const adicionaMultInput = (id1, id2, id3, id4, id5, cep, bairro, cidade, estado, regiao) => {
    const ids = [id1, id2, id3, id4, id5] 
    const infors = [ cep, bairro, estado, cidade, regiao ]
    for ( let i = 0; i < 5; i++ ) {
        adicionarNoInput(ids[i], infors[i])
    };
}

const removerTravessão = (cep) => cep.split("").filter(num => num !== '-').join("")
const verifLetraCep = (cep) => String(Number(cep)) === 'NaN'

document.addEventListener('DOMContentLoaded', () => {
    let inforUsuario = JSON.parse(localStorage.getItem('cep'))
    if (!inforUsuario!==null) {
        adicionaMultInput('cep', 'bairro', 'cidade', 'estado', 'regiao', inforUsuario.cep, inforUsuario.bairro, inforUsuario.localidade, inforUsuario.estado, inforUsuario.regiao)
    }
})

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

            document.getElementById('btnSub').addEventListener('click', () => {
                localStorage.setItem('cep', JSON.stringify(result))
            })
        })
        .catch(error => {
            return document.getElementById('avisos').innerText = `Erro: ${error}`
        })
})