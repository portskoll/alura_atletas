// Seleciona os elementos HTML onde os resultados da pesquisa serão exibidos e o campo de pesquisa.
const resultadosPesquisa = document.getElementById('resultados-pesquisa');
const campoPesquisa = document.getElementById('pesquisa');
const respostaPesquisa = document.getElementById('resposta-pesquisa');

// Função para exibir os atletas na página
function exibirAtletas(atletas) {
    // Limpa a área de resultados antes de exibir novos dados
    resultadosPesquisa.innerHTML = '';

    // Itera sobre cada atleta e cria um elemento div para exibir as informações
    atletas.forEach(atleta => {
        const div = document.createElement('div');
        div.className = 'item-resultado';
        // Cria o HTML para cada atleta, incluindo um link para mais detalhes
        div.innerHTML = `
            <h2><a href="${atleta.link}" target="_blank">${atleta.nome}</a></h2>
            <p class="descricao-meta">${atleta.descricao}</p>
            <a href="${atleta.link}" target="_blank">Saiba mais sobre ${atleta.nome}</a>
        `;
        // Adiciona o elemento div à lista de resultados
        resultadosPesquisa.appendChild(div);
    });
}

// Função para realizar a pesquisa
function pesquisar() {

    respostaPesquisa.innerHTML = '';
    // Obtém o termo de pesquisa e o converte para minúsculas para facilitar a comparação
    const termoPesquisa = campoPesquisa.value.toLowerCase();

    // Filtra os atletas com base no termo de pesquisa, considerando nome e descrição
    const resultadosFiltrados = atletas.filter(atleta => 
        
        atleta.nome.toLowerCase().includes(termoPesquisa) || 
        atleta.descricao.toLowerCase().includes(termoPesquisa)  || 
        atleta.tags.join(', ').toLowerCase().includes(termoPesquisa)
    );
    console.log(resultadosFiltrados);

    if (termoPesquisa == '' || termoPesquisa == ' ' ) {
        // Exibe uma mensagem informando que nenhum resultado foi encontrado
        resultadosPesquisa.innerHTML = '<p>Digite um termo válido!</p>';
    } else if(resultadosFiltrados.length == 0) {
        respostaPesquisa.innerHTML = `Nenhum atleta encontrado para a pesquisa "${termoPesquisa}". Veja nossa lista completa abaixo`;
        exibirAtletas(atletas);

    }
    
    else {
        // Exibe os resultados filtrados
        exibirAtletas(resultadosFiltrados);
    }


    // Limpa o campo de pesquisa para a próxima pesquisa
    campoPesquisa.value = '';
}

// Adiciona um ouvinte de eventos para detectar quando a tecla Enter é pressionada no campo de pesquisa
campoPesquisa.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        pesquisar();
    }
});

// Exibe todos os atletas ao carregar a página
exibirAtletas(atletas);
