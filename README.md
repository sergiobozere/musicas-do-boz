Músicas do Boz é uma aplicação web front-end, totalmente responsiva e interativa, projetada para ser uma vitrine pessoal de playlists e lançamentos musicais, com um foco especial no gênero Pop. O projeto funciona como um diário musical, onde o usuário pode explorar os artistas e as músicas mais ouvidas em cada mês, além de descobrir os principais lançamentos do cenário pop.

A interface é moderna e dinâmica, com um design inspirado em plataformas de streaming de música, utilizando um tema escuro com detalhes em neon que criam uma experiência de usuário imersiva e visualmente atraente.

Funcionalidades Principais
Visualização em Cards: O conteúdo é apresentado em um grid de cards dinâmicos, onde cada card representa um mês específico, seja uma playlist pessoal ("Meu Mês") ou uma compilação de lançamentos ("Lançamentos Pop").
Páginas de Detalhes: Ao clicar em um card, o usuário é levado a uma página de detalhes que exibe as listas de músicas e artistas daquele mês, com players do Spotify incorporados para uma experiência auditiva imediata.
Busca Dinâmica: Uma barra de pesquisa permite filtrar os cards em tempo real, buscando por mês, nome do card, descrição, músicas ou artistas, destacando os termos pesquisados diretamente na interface.
Design Responsivo: A aplicação se adapta perfeitamente a diferentes tamanhos de tela, de desktops a dispositivos móveis, garantindo uma navegação fluida e consistente.
Detalhes Técnicos e Desenvolvimento
O projeto foi construído utilizando tecnologias web fundamentais, com um forte foco em JavaScript moderno para criar dinamismo e interatividade.

Estrutura e Conteúdo (HTML e JSON):

O HTML é semântico e minimalista, servindo como um esqueleto para o conteúdo que é gerado dinamicamente.
Todos os dados dos cards (títulos, descrições, listas de músicas, artistas e imagens) são armazenados em um arquivo data.json. Essa abordagem centraliza o conteúdo, facilitando a atualização e a manutenção sem a necessidade de alterar o código HTML.
Estilização e Animações (CSS):

O CSS é o coração da identidade visual do projeto. Utilizamos Flexbox e Grid Layout para criar uma estrutura responsiva e alinhada.
Variáveis CSS (:root) foram usadas para manter um esquema de cores consistente e de fácil modificação.
Foram implementadas diversas animações e microinterações para enriquecer a experiência do usuário:
Efeito 3D nos Cards: Ao passar o mouse sobre um card, um efeito de inclinação 3D é aplicado via JavaScript, que manipula as propriedades transform do CSS.
Animações de Fundo: Os cabeçalhos dos cards possuem fundos animados e distintos: um efeito de "raios neon" para lançamentos e uma "aurora digital" para as playlists pessoais, criados com background-image e @keyframes.
Animações de Entrada: Os cards aparecem suavemente na tela conforme o usuário rola a página, utilizando a IntersectionObserver API para detectar sua visibilidade.
Interatividade e Lógica (JavaScript):

JavaScript Assíncrono (async/await): A função fetch() é usada para carregar os dados do data.json de forma assíncrona, garantindo que a página não trave enquanto espera os dados.
Manipulação do DOM: O conteúdo dos cards e das páginas de detalhes é totalmente renderizado pelo JavaScript, que cria e insere os elementos HTML no DOM com base nos dados carregados.
Busca e Filtragem: A funcionalidade de busca é implementada com JavaScript, utilizando os métodos filter() e includes() para comparar o termo pesquisado com os dados de cada card.
Parametrização de URL: A navegação para a página de detalhes é feita passando o nome e o mês do card como parâmetros na URL (URLSearchParams), permitindo que a página de destino saiba exatamente qual conteúdo exibir.
Este projeto demonstra a capacidade de integrar design, interatividade e manipulação de dados no front-end para criar uma aplicação web completa, funcional e esteticamente agradável, utilizando apenas tecnologias nativas do navegador.
