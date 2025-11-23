document.addEventListener("DOMContentLoaded", async () => {
    // 1. Pega o parâmetro 'mes' da URL
    const params = new URLSearchParams(window.location.search);
    const mesParam = params.get('mes');
    const nomeParam = params.get('nome'); // Pega o novo parâmetro 'nome'

    if (!mesParam) {
        document.getElementById('detalhe-container').innerHTML = `<p>Mês não especificado.</p>`;
        return;
    }

    // 2. Carrega todos os dados do JSON
    const resposta = await fetch("data.json");
    const dados = await resposta.json();

    // 3. Encontra o dado específico para o mês
    const dadoDoMes = dados.find(d => 
        d.mês.toLowerCase() === mesParam.toLowerCase() && d.nome.toLowerCase() === nomeParam.toLowerCase()
    );

    if (!dadoDoMes) {
        document.getElementById('detalhe-container').innerHTML = `<p>Detalhes para o mês "${mesParam}" não encontrados.</p>`;
        return;
    }

    // 4. Renderiza os detalhes na página
    const container = document.getElementById('detalhe-container');
    document.title = `Detalhes de ${dadoDoMes.mês}`; // Atualiza o título da aba

    // Função para extrair o ID da faixa de uma URL do Spotify
    function getSpotifyTrackId(url) {
        const match = url.match(/spotify\.com\/(?:intl-pt\/)?track\/([a-zA-Z0-9]+)/);
        return match ? match[1] : null;
    }

    // Função para extrair o ID do artista de uma URL do Spotify
    function getSpotifyArtistId(url) {
        const match = url.match(/spotify\.com\/(?:intl-pt\/)?artist\/([a-zA-Z0-9]+)/);
        return match ? match[1] : null;
    }

    // Cria a lista de músicas como <li>
    const musicasHtml = (dadoDoMes.musicas && dadoDoMes.musicas.length > 0)
        ? dadoDoMes.musicas.map((musica, index) => {
        const trackId = getSpotifyTrackId(musica.link);
        // Se encontrarmos um ID de faixa válido, mostramos o player do Spotify
        if (trackId) {
            return `
                <li style="animation-delay: ${index * 50}ms;">
                    <iframe
                        style="border-radius:12px"
                        src="https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0"
                        width="100%"
                        height="80"
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"></iframe>
                </li>`;
        }
        // Caso contrário, mostramos o link de texto como antes
        return `<li style="animation-delay: ${index * 50}ms;"><a href="${musica.link}" target="_blank">${musica.nome}</a></li>`;
    }).join('')
        : '<li>Nenhuma música encontrada para este mês.</li>';

    // Cria a lista de artistas como <li>
    const artistasHtml = (dadoDoMes.artistas && dadoDoMes.artistas.length > 0)
        ? dadoDoMes.artistas.map((artista, index) => {
        const artistId = getSpotifyArtistId(artista.link);
        // Se encontrarmos um ID de artista válido, mostramos o card do Spotify
        if (artistId) {
            return `
                <li style="animation-delay: ${index * 50}ms;">
                    <iframe
                        style="border-radius:12px"
                        src="https://open.spotify.com/embed/artist/${artistId}?utm_source=generator&theme=0"
                        width="100%"
                        height="152"
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"></iframe>
                </li>`;
        }
        // Caso contrário, mostramos o link de texto como antes
        return `<li style="animation-delay: ${index * 50}ms;"><a href="${artista.link}" target="_blank">${artista.nome}</a></li>`;
    }).join('')
        : '<li>Nenhum artista encontrado para este mês.</li>';

    container.innerHTML = `
        <h2>${dadoDoMes.mês}</h2>
        <p>${dadoDoMes.descricao}</p>
        ${(dadoDoMes.musicas && dadoDoMes.musicas.length > 0) ? `
            <h3>Músicas mais ouvidas</h3>
            <ol>${musicasHtml}</ol>` : ''}
        ${(dadoDoMes.artistas && dadoDoMes.artistas.length > 0) ? `
            <h3>Artistas mais ouvidos</h3>
            <ol>${artistasHtml}</ol>` : ''}
    `;

    // Adiciona a lógica de transição de página para os links de volta
    document.querySelectorAll('a.btn-voltar, header a').forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('index.html')) {
                e.preventDefault();
                document.body.style.animation = 'pageExit 0.5s ease-in forwards';
                setTimeout(() => { window.location.href = href; }, 500);
            }
        });
    });
});