    ```js
# . 1 - O que é o DOM

DOM significa Document Object Model.

Quando o navegador lê seu HTML, ele transforma tudo em objetos manipuláveis pelo JavaScript. 

Exemplo:
<h1>Olá</h1>
<button>Clique</button>

Por meio do DOM, Isso vira algo que o JS consegue acessar
- Um objeto h1
- Um objeto button
Ou seja, o JavaScript não mexe no HTML diretamente, ele mexe nesses objetos que representam o HTML.
Com ele, conseguimos alterar dinamicamente todo o conteúdo da página, criar elementos, remover, etc.

Exemplo simples:
HTML:
<h1 id="titulo">Olá</h1>
<button id="botao">Trocar título</button>

JS:
const btn = document.getElementById("botao");
const titulo = document.getElementById("titulo");

btn.addEventListener("click", function() {
    titulo.textContent = "Título alterado!";
});

O que aconteceu?
- O JavaScript acessou o botão e o título por meio do DOM
- Adicionou um evento de clique ao botão
- Quando o botão é clicado, o texto do título é alterado

# ________________________________________________________________________________________________

# . 2 - Objeto principal: document

Representa a página inteira.

document.getElementById("id") - acessa um elemento pelo id
document.querySelector("seletor") - acessa o primeiro elemento que corresponde ao seletor CSS
document.createElement("tag") - cria um novo elemento HTML

Esses métodos são parte do DOM e permitem manipular a estrutura da página.

# ________________________________________________________________________________________________

# . 3 - Métodos do DOM
## 1 - Pegando elementos 
    Por id:
        const titulo = document.getElementById("titulo");
        - por trás dos panos, isso faz um loop por todos os elementos da página até encontrar o id correspondente

    seletor CSS:
        const titulo = document.querySelector("#titulo");
        - isso é mais flexível, pode usar classes, tags, etc. Mas também é mais lento, porque precisa 
        analisar o seletor de cada elemento assim como o getElementById faz, 
        mas com mais regras: 

            - por exemplo, se for um seletor complexo como ".container .item", o navegador precisa verificar 
            cada elemento para ver se ele tem a classe "item" e se está dentro de um elemento com a classe "container".

    Vários elementos:
        const itens = document.querySelectorAll(".item");
        - isso retorna uma NodeList com todos os elementos que correspondem ao seletor. 

            - NodeList é uma coleção de nós, que é um tipo de objeto que representa os elementos do DOM,
            sendo representado como um array, mas não é um array de verdade, pois não tem todos os métodos de array.
            
        - o navegador precisa fazer o mesmo processo de análise do seletor para cada elemento da página, 
        o que pode ser custoso em páginas grandes.

## 2 - Alterando texto
    titulo.textContent = "Novo título"; 
    // ou titulo.innerText = "Novo título"; a diferença dos dois é que: o textContent pega o conteúdo de texto do elemento,
    // incluindo espaços e quebras de linha, enquanto o innerText pega o conteúdo de texto visível, ignorando espaços extras e quebras de linha.
    - isso altera o conteúdo de texto do elemento, sem afetar as tags HTML dentro dele.

    titulo.innerHTML = "<span>Novo título</span>";
    - isso altera o conteúdo HTML do elemento, permitindo adicionar tags e formatação, mas cuidado com segurança (XSS).
        XSS (Cross-Site Scripting) é um tipo de vulnerabilidade onde um atacante pode injetar código malicioso em uma página,
        e se o site não tiver proteção contra isso, o código malicioso pode ser executado no navegador dos usuários, 
        causando danos como roubo de dados, redirecionamento para sites maliciosos, etc.

## 3 - Alterando CSS
    titulo.style.color = "red";
    - isso altera o estilo CSS do elemento diretamente, mas é recomendado usar classes para manter o código mais organizado.
    - no JS usamos camelCase:
        background-color -> backgroundColor
        font-size -> fontSize

    Classes:
        titulo.classList.add("classe1");
        titulo.classList.remove("classe2");
        titulo.classList.toggle("classe3");
        - isso é mais recomendado, pois mantém o CSS separado do JS e permite reutilizar estilos.

## 4 - Criar elemento novo
    const paragraph = document.createElement("p");
    paragraph.textContent = "Novo parágrafo";

    document.body.appendChild(paragraph);
    - uma tag foi criada pelo JS.

# ________________________________________________________________________________________________

# . 4 - Estrutura de árvore do DOM
Quando abre o site:
1 - Navegador lê HTML
2 - monta árvore DOM
3 - JS acessa essa árvore
4 - JS altera nós da árvore
5 - tela atualiza

## 1 - Estrutura da árvore:
    <body>
        <div>
            <h1>Olá</h1>
        </div>
    </body>

    Vira:
    - body
        - div
            - h1

    por isso existe:
    - element.parentElement
    - element.children
    - element.nextElementSibling
    etc.

# ________________________________________________________________________________________________
#
# <-------------------------------------COMO O DOM FUNCIONA-------------------------------------->
# ________________________________________________________________________________________________

# . 5 - Visão geral do processo

Quando é escrito:
<h1>Olá</h1>

e depois

document.getElementById("titulo").textContent = "Novo título";

parece simples.
Mas por trás existe um sistema enorme dentro do navegador:
1 - parser de HTML -> lê o HTML e cria a árvore DOM (essa parte é feita pelo navegador, pelas engines de renderização, não pelo JS)
2 - construção de árvore DOM -> transforma o HTML em objetos (feita pelo parser)
3 - engine JavaScript -> executa o código JS (feita pelo motor JS, como V8, SpiderMonkey, etc.)
4 - ponte entre JS e DOM -> quando o JS acessa o DOM, ele precisa se comunicar com a parte do navegador 
que controla o DOM, isso é feito por uma ponte que conecta o motor JS com a engine de renderização. 
(essa parte é feita pelo navegador, mas o JS interage com ela)
5 - renderização visual -> quando o DOM é alterado, o navegador precisa atualizar a tela para refletir as mudanças 
(feita pela engine de renderização do navegador)
6 - recálculo de layout -> quando o DOM é alterado, o navegador precisa recalcular o layout da página para 
posicionar os elementos corretamente (feita pela engine de renderização)
7 - pintura -> depois de recalcular o layout, o navegador precisa pintar os pixels na tela para mostrar as mudanças (feita pela engine de renderização)
8 - otimizações -> os navegadores modernos fazem várias otimizações para melhorar a performance, como
reutilizar partes do layout que não mudaram, adiar a pintura até que seja necessário

# . 6 - HTML não vira tela direto
O navegador não desenha HTML cru.
Ele primeiro lê texto puro:

<h1>Olá</h1>
<p>Bem-vindo</p>

Esse arquivo é só string.
O navegador possui um HTML Parser, que interpreta caractere por caractere.

ele lê
- abriu tag h1
- texto olá
- fechou h1
- abriu p
- texto Teste

com isso ele cria objetos internos.
