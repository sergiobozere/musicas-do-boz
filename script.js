let cardContainer = document.querySelector(".card-container");
let campoBusca = document.querySelector("#campo-busca");
let dados = [];

async function carregarDados() {
    let resposta = await fetch("data.json");
    dados = await resposta.json();
    renderizarCards(dados);
}

function iniciarBusca() {
    let termoBusca = campoBusca.value.toLowerCase();

    let dadosFiltrados = dados.filter(dado => {
        // Verifica se o termo de busca está no nome, mês ou descrição do card.
        const nome = dado.nome.toLowerCase();
        const mes = dado.mês.toLowerCase();
        const descricao = dado.descricao.toLowerCase();
        
        // Verifica também nas listas de músicas e artistas, se elas existirem.
        const temMusica = dado.musicas && dado.musicas.some(musica => musica.nome.toLowerCase().includes(termoBusca));
        const temArtista = dado.artistas && dado.artistas.some(artista => artista.nome.toLowerCase().includes(termoBusca));
        
        return nome.includes(termoBusca) || mes.includes(termoBusca) || descricao.includes(termoBusca) || temMusica || temArtista;
    });

    renderizarCards(dadosFiltrados);
}

function destacarTermo(texto, termo) {
    if (!termo || termo.trim() === '') {
        return texto;
    }
    // Cria uma expressão regular para encontrar o termo (case-insensitive e global)
    const regex = new RegExp(`(${termo})`, 'gi');
    // Substitui o termo encontrado por ele mesmo dentro de uma tag <mark>
    return texto.replace(regex, `<mark>$1</mark>`);
}

function renderizarCards(dados) {
    cardContainer.innerHTML = ""; // Limpa o container antes de adicionar novos cards

    if (dados.length === 0) {
        cardContainer.innerHTML = `<p class="sem-resultados">Nenhum resultado encontrado para sua busca.</p>`;
        return;
    }

    dados.forEach((dado, index) => {
        let article = document.createElement("article");
        article.classList.add("card");

        // Adiciona um atraso na animação para cada card, criando o efeito "stagger"
        const delay = index * 100; // 100ms de atraso entre cada card
        article.style.animationDelay = `${delay}ms`;

        // O link para a página de detalhes passará o mês como um parâmetro na URL
        const linkDetalhe = `detalhe.html?mes=${encodeURIComponent(dado.mês)}&nome=${encodeURIComponent(dado.nome)}`;

        // Pega o termo de busca atual para destacar
        const termoBusca = campoBusca.value;

        // Divide o nome em duas linhas se houver um "|"
        const [linha1, linha2] = dado.nome.includes('|')
            ? dado.nome.split('|').map(s => s.trim())
            : [dado.nome, '']; // Se não houver "|", a segunda linha fica vazia

        let headerStyle = '';
        let headerClass = '';

        if (dado.nome.includes('Meu Mês')) {
            headerClass = 'card-visual-header-meu-mes'; // Novo estilo para "Meu Mês"
        } else if (dado.imagem) {
            headerStyle = `style="background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${dado.imagem}'); background-size: cover; background-position: center;"`;
        } else {
            headerClass = 'card-visual-header-default'; // Estilo padrão (raios neon)
        }

        article.innerHTML = `
            <div class="card-visual-header ${headerClass}" ${headerStyle}>
                <a href="${linkDetalhe}" class="card-visual-header-link">
                    <span class="play-icon-overlay"></span>
                    <div class="card-header-text">
                        <p class="card-header-line1">${destacarTermo(linha1, termoBusca)}</p>
                        ${linha2 ? `<p class="card-header-line2">${destacarTermo(linha2, termoBusca)}</p>` : ''}
                        <h2>${destacarTermo(dado.mês, termoBusca)}</h2>
                    </div>
                </a>
            </div>
            <div class="card-content">
                <p class="card-description">${destacarTermo(dado.descricao, termoBusca)}</p>
            </div>
        `;
        cardContainer.appendChild(article);
    });

    // Salva a posição da rolagem ao clicar em um link de card
    document.querySelectorAll('.card-visual-header-link').forEach(link => {
        link.addEventListener('click', () => sessionStorage.setItem('scrollPosition', window.scrollY));
    });

    // Configura o Intersection Observer para animar os cards ao rolar
    setupCardObserver();
}

function setupCardObserver() {
    const cards = document.querySelectorAll('.card');

    const observerOptions = {
        root: null, // Observa em relação ao viewport
        rootMargin: '0px',
        threshold: 0.1 // Aciona quando 10% do card está visível
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    cards.forEach(card => observer.observe(card));

    // Adiciona o efeito de inclinação 3D
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // Posição X do mouse dentro do card
            const y = e.clientY - rect.top;  // Posição Y do mouse dentro do card

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -8; // Rotação máxima de 8 graus no eixo X
            const rotateY = ((x - centerX) / centerX) * 8;  // Rotação máxima de 8 graus no eixo Y

            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateX(0) rotateY(0)'; // Reseta a rotação ao sair
        });
    });
}

// Restaura a posição da rolagem ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition, 10));
        sessionStorage.removeItem('scrollPosition'); // Limpa para não afetar recarregamentos normais
    }
});

// Carrega os dados assim que a página é aberta
carregarDados();

// Efeito Parallax para o cabeçalho
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    // Move o fundo do cabeçalho na metade da velocidade da rolagem
    header.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
});

// --- CORREÇÃO ADICIONADA ---
// Adiciona os gatilhos para a funcionalidade de busca

// 1. Aciona a busca a cada letra digitada no campo de busca
campoBusca.addEventListener('input', iniciarBusca);

// 2. Aciona a busca ao clicar no botão (e previne o recarregamento da página)
document.querySelector('#botao-busca').addEventListener('click', (e) => e.preventDefault()); // A busca já acontece com o 'input'