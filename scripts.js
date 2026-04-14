

document.getElementById('cep').addEventListener('blur', (e) => {
    const inputValue = e.target.value
    fetch(`https://viacep.com.br/ws/${inputValue}/json/`)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            document.getElementById('estado').value = result.estado
        })
        .catch(error => {

        })
})