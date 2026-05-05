# 1 - O que é o DOM

## Teoria

DOM significa **Document Object Model**.

Quando o navegador lê seu HTML, ele transforma tudo em objetos manipuláveis pelo JavaScript.

Ou seja: o JavaScript não mexe no HTML diretamente. Ele mexe em objetos que representam o HTML dentro da memória do navegador.

Por meio do DOM, conseguimos alterar dinamicamente o conteúdo da página, criar elementos, remover elementos, alterar estilos, escutar eventos e modificar a estrutura da página enquanto ela está sendo usada.


## Código

Exemplo de HTML:

```html
<h1>Olá</h1>
<button>Clique</button>
```

Por meio do DOM, isso vira algo que o JavaScript consegue acessar:

- Um objeto que representa o `h1`.
- Um objeto que representa o `button`.

Exemplo simples:

```html
<h1 id="titulo">Olá</h1>
<button id="botao">Trocar título</button>
```

```js
const btn = document.getElementById("botao");
const titulo = document.getElementById("titulo");

btn.addEventListener("click", function() {
    titulo.textContent = "Título alterado!";
});
```


## Prática

Nesse exemplo:

- O JavaScript acessa o botão e o título por meio do DOM.
- O JavaScript adiciona um evento de clique ao botão.
- Quando o botão é clicado, o texto do título é alterado.

Na prática, o DOM é usado quando queremos que a página reaja ao usuário sem precisar recarregar tudo.

Exemplos reais:

- Alterar um título depois de um clique.
- Mostrar ou esconder menus.
- Criar elementos dinamicamente.
- Remover cards, mensagens ou itens de uma lista.
- Atualizar texto, classes e estilos com JavaScript.


## Por trás dos panos

O navegador transforma o HTML em uma estrutura de objetos.

Esses objetos ficam organizados em uma árvore, chamada **árvore DOM**.

Quando usamos JavaScript para acessar algo como `document.getElementById("titulo")`, o JavaScript conversa com essa estrutura criada pelo navegador.

Então, quando alteramos `textContent`, não estamos editando o arquivo HTML original. Estamos alterando o objeto que representa aquele elemento na página atual.

Depois disso, o navegador atualiza a tela para refletir essa mudança.


## Resumo rápido

O DOM é a representação do HTML em forma de objetos.

O JavaScript usa o DOM para acessar e alterar a página.

Alterar o DOM muda a página visível no navegador, mas não altera o arquivo HTML original.



# 2 - Objeto principal: document

## Teoria

O objeto `document` representa a página inteira.

Ele é o ponto de entrada principal para acessar, buscar, criar e manipular elementos do DOM.

Quando usamos `document`, estamos dizendo ao JavaScript que queremos interagir com o documento HTML carregado no navegador.


## Código

```js
document.getElementById("id");
```

Acessa um elemento pelo `id`.

```js
document.querySelector("seletor");
```

Acessa o primeiro elemento que corresponde ao seletor CSS.

```js
document.createElement("tag");
```

Cria um novo elemento HTML.


## Prática

Esses métodos são parte do DOM e permitem manipular a estrutura da página.

Uso comum:

- `getElementById` quando você sabe exatamente o `id` do elemento.
- `querySelector` quando quer usar seletores CSS, como classes, tags, atributos ou seletores mais complexos.
- `createElement` quando precisa criar uma tag nova com JavaScript.


## Por trás dos panos

O `document` é uma interface fornecida pelo navegador.

Ele conecta o JavaScript à estrutura DOM que foi criada a partir do HTML.

Quando chamamos métodos como `getElementById`, `querySelector` ou `createElement`, estamos pedindo ao navegador para procurar ou criar objetos dentro da árvore DOM.


## Resumo rápido

`document` representa a página inteira.

É por ele que normalmente começamos a manipulação do DOM.

Com `document`, podemos buscar elementos, criar elementos e alterar a estrutura da página.



# 3 - Buscar elementos no DOM

## Teoria

Buscar elementos é uma das tarefas mais comuns ao trabalhar com DOM.

Antes de alterar um texto, aplicar uma classe, escutar um evento ou remover uma tag, primeiro precisamos acessar o elemento correto.

Existem várias formas de buscar elementos:

- Por `id`.
- Por seletor CSS.
- Por seletores que retornam vários elementos.


## Código

Buscar por `id`:

```js
const titulo = document.getElementById("titulo");
```

Buscar usando seletor CSS:

```js
const titulo = document.querySelector("#titulo");
```

Buscar vários elementos:

```js
const itens = document.querySelectorAll(".item");
```


## Prática

Use `getElementById` quando o elemento tiver um `id` único:

```html
<h1 id="titulo">Olá</h1>
```

```js
const titulo = document.getElementById("titulo");
```

Use `querySelector` quando quiser mais flexibilidade:

```js
const titulo = document.querySelector("#titulo");
const primeiroItem = document.querySelector(".item");
const botao = document.querySelector("button");
```

Use `querySelectorAll` quando quiser pegar todos os elementos que combinam com o seletor:

```js
const itens = document.querySelectorAll(".item");
```

Isso retorna uma `NodeList` com todos os elementos encontrados.


## Por trás dos panos

### getElementById

Por trás dos panos, `getElementById` procura na página até encontrar o elemento com o `id` correspondente.

Como `id` deve ser único, essa busca costuma ser bem direta e eficiente.


### querySelector

`querySelector` é mais flexível porque aceita seletores CSS.

Ele pode buscar por:

- `id`.
- Classe.
- Tag.
- Atributo.
- Relações entre elementos.
- Seletores compostos.

Exemplo:

```js
const item = document.querySelector(".container .item");
```

Nesse caso, o navegador precisa verificar os elementos para encontrar quem tem a classe `item` e também está dentro de um elemento com a classe `container`.

Por isso, `querySelector` pode ser mais custoso do que `getElementById`, especialmente quando o seletor é complexo ou a página é muito grande.


### querySelectorAll e NodeList

`querySelectorAll` faz o mesmo processo de análise do seletor, mas retorna todos os elementos que correspondem a ele.

```js
const itens = document.querySelectorAll(".item");
```

O retorno é uma `NodeList`.

Uma `NodeList` é uma coleção de nós.

Um nó é um tipo de objeto que representa algo dentro do DOM, como:

- Um elemento.
- Um texto.
- Um comentário.
- Outras partes da estrutura da página.

A `NodeList` parece um array, mas não é um array de verdade.

Ela pode ser percorrida, mas não possui todos os métodos de array disponíveis em um array comum.

Em páginas grandes, `querySelectorAll` pode ser custoso, porque o navegador precisa analisar o seletor para vários elementos da página.


## Resumo rápido

Use `getElementById` para buscar por `id`.

Use `querySelector` para buscar com seletores CSS.

Use `querySelectorAll` para buscar vários elementos.

`querySelectorAll` retorna uma `NodeList`, que parece array, mas não é um array completo.



# 4 - Alterar texto e HTML

## Teoria

Depois de buscar um elemento, podemos alterar seu conteúdo.

As formas mais comuns são:

- `textContent`.
- `innerText`.
- `innerHTML`.

Cada uma tem um comportamento diferente.


## Código

Alterando texto com `textContent`:

```js
titulo.textContent = "Novo título";
```

Alterando texto com `innerText`:

```js
titulo.innerText = "Novo título";
```

Alterando HTML interno com `innerHTML`:

```js
titulo.innerHTML = "<span>Novo título</span>";
```


## Prática

Use `textContent` quando quiser alterar apenas texto:

```js
titulo.textContent = "Título alterado!";
```

Isso altera o conteúdo de texto do elemento sem interpretar tags HTML.

Use `innerHTML` quando quiser inserir HTML:

```js
titulo.innerHTML = "<span>Novo título</span>";
```

Isso permite adicionar tags e formatação dentro do elemento.

Use `innerHTML` com cuidado, principalmente quando o conteúdo vier de usuários ou de fontes externas.


## Por trás dos panos

### textContent

`textContent` pega ou altera o conteúdo de texto do elemento.

Ele considera o texto como texto puro, incluindo espaços e quebras de linha.

Ele não interpreta tags HTML.


### innerText

`innerText` pega ou altera o texto visível do elemento.

Ele leva em conta o que está sendo renderizado visualmente na página.

Por isso, pode ignorar textos escondidos e tratar espaços ou quebras de linha de forma diferente.


### innerHTML

`innerHTML` altera o conteúdo HTML interno de um elemento.

Isso permite inserir tags:

```js
titulo.innerHTML = "<span>Novo título</span>";
```

Mas existe um risco importante: **XSS**.

XSS significa **Cross-Site Scripting**.

É um tipo de vulnerabilidade em que um atacante injeta código malicioso em uma página.

Se o site não tiver proteção contra isso, o código malicioso pode ser executado no navegador dos usuários.

Isso pode causar problemas como:

- Roubo de dados.
- Redirecionamento para sites maliciosos.
- Execução de scripts indesejados.
- Alteração indevida do comportamento da página.


## Resumo rápido

`textContent` altera texto puro.

`innerText` trabalha com texto visível.

`innerHTML` permite inserir HTML, mas exige cuidado com segurança.

Evite usar `innerHTML` com conteúdo vindo diretamente do usuário.



# 5 - Alterar CSS pelo DOM

## Teoria

O DOM permite alterar estilos de elementos com JavaScript.

Podemos fazer isso diretamente pelo atributo `style` ou manipulando classes com `classList`.

Embora seja possível alterar CSS diretamente pelo JavaScript, geralmente é mais organizado usar classes.


## Código

Alterando estilo direto:

```js
titulo.style.color = "red";
```

Propriedades CSS com hífen viram `camelCase` no JavaScript:

```js
titulo.style.backgroundColor = "blue";
titulo.style.fontSize = "24px";
```

Manipulando classes:

```js
titulo.classList.add("classe1");
titulo.classList.remove("classe2");
titulo.classList.toggle("classe3");
```


## Prática

Use `style` para alterações pequenas, diretas e pontuais:

```js
titulo.style.color = "red";
```

Use `classList` quando quiser manter o CSS separado do JavaScript:

```css
.ativo {
    color: red;
    font-weight: bold;
}
```

```js
titulo.classList.add("ativo");
```

Isso deixa o código mais organizado e reutilizável.


## Por trás dos panos

Quando usamos `style`, estamos alterando o estilo inline do elemento.

Exemplo:

```js
titulo.style.color = "red";
```

Isso é semelhante a colocar diretamente no HTML:

```html
<h1 style="color: red;">Título</h1>
```

Quando usamos `classList`, o JavaScript apenas adiciona ou remove classes.

O visual final continua sendo controlado pelo CSS.

Isso é melhor para manutenção porque separa responsabilidades:

- HTML fica com a estrutura.
- CSS fica com o visual.
- JavaScript fica com o comportamento.


## Resumo rápido

`style` altera CSS diretamente no elemento.

No JavaScript, propriedades CSS usam `camelCase`.

`classList` é mais recomendado para manter o CSS separado do JS.

Classes tornam os estilos mais reutilizáveis e organizados.



# 6 - Criar elementos novos

## Teoria

O DOM permite criar elementos HTML usando JavaScript.

Isso é útil quando a página precisa gerar conteúdo dinamicamente.

Por exemplo:

- Criar um novo parágrafo.
- Adicionar uma mensagem.
- Inserir um item em uma lista.
- Renderizar cards vindos de uma API.


## Código

```js
const paragraph = document.createElement("p");
paragraph.textContent = "Novo parágrafo";

document.body.appendChild(paragraph);
```


## Prática

Nesse exemplo:

- `document.createElement("p")` cria uma nova tag `p`.
- `paragraph.textContent` define o texto do parágrafo.
- `document.body.appendChild(paragraph)` adiciona o parágrafo no final do `body`.

Na prática, uma tag foi criada pelo JavaScript e colocada dentro da página.


## Por trás dos panos

Quando usamos `createElement`, o navegador cria um novo objeto DOM em memória.

Esse elemento ainda não aparece na tela imediatamente.

Ele só passa a fazer parte da página quando é inserido em algum lugar da árvore DOM.

No exemplo:

```js
document.body.appendChild(paragraph);
```

O novo parágrafo é anexado ao `body`.

Depois disso, o navegador pode precisar atualizar a renderização para mostrar o novo elemento na tela.


## Resumo rápido

`createElement` cria uma nova tag em memória.

`textContent` define o texto do elemento.

`appendChild` insere o elemento na árvore DOM.

Depois de inserido, o elemento aparece na página.



# 7 - Estrutura de árvore do DOM

## Teoria

O DOM é organizado como uma árvore.

Quando o navegador abre um site, ele segue um processo:

1. O navegador lê o HTML.
2. O navegador monta a árvore DOM.
3. O JavaScript acessa essa árvore.
4. O JavaScript altera nós da árvore.
5. A tela é atualizada.

Cada parte do documento vira um nó dentro dessa árvore.


## Código

HTML:

```html
<body>
    <div>
        <h1>Olá</h1>
    </div>
</body>
```

Estrutura em árvore:

```txt
body
└── div
    └── h1
```

Propriedades úteis para navegar pela árvore:

```js
element.parentElement;
element.children;
element.nextElementSibling;
```


## Prática

Como o DOM é uma árvore, podemos navegar entre elementos relacionados.

Exemplos:

- Subir para o elemento pai com `parentElement`.
- Acessar os filhos com `children`.
- Ir para o próximo elemento irmão com `nextElementSibling`.

Isso é útil quando você já tem um elemento e quer acessar elementos próximos sem fazer uma nova busca global no documento.


## Por trás dos panos

O navegador não enxerga o HTML apenas como texto depois que ele é processado.

Ele cria uma árvore de objetos conectados.

Cada elemento conhece sua relação com outros elementos:

- Quem é seu pai.
- Quem são seus filhos.
- Quem são seus irmãos.

Por isso existem propriedades como:

```js
element.parentElement;
element.children;
element.nextElementSibling;
```

Essas propriedades permitem navegar pela estrutura já montada pelo navegador.


## Resumo rápido

O DOM é uma árvore de nós.

Elementos podem ter pai, filhos e irmãos.

O JavaScript consegue navegar por essa estrutura.

Alterações nos nós podem refletir diretamente na tela.



# 8 - Como o DOM funciona

## Teoria

Quando escrevemos algo simples como:

```html
<h1>Olá</h1>
```

E depois usamos:

```js
document.getElementById("titulo").textContent = "Novo título";
```

Parece que o JavaScript simplesmente encontrou o elemento e alterou o texto.

Mas, por trás, existe um sistema grande dentro do navegador.


## Código

Exemplo de alteração:

```html
<h1 id="titulo">Olá</h1>
```

```js
document.getElementById("titulo").textContent = "Novo título";
```


## Prática

Na prática, esse código:

- Busca o elemento com `id="titulo"`.
- Acessa o objeto DOM correspondente.
- Altera o texto interno desse objeto.
- Faz o navegador refletir a mudança visualmente.

Esse processo é usado constantemente em páginas interativas.


## Por trás dos panos

Existe uma sequência de etapas dentro do navegador:

1. **Parser de HTML**

O navegador lê o HTML e cria a árvore DOM.

Essa parte é feita pelo navegador, pelas engines de renderização, não pelo JavaScript.

2. **Construção da árvore DOM**

O parser transforma o HTML em objetos.

Esses objetos formam a árvore DOM.

3. **Engine JavaScript**

A engine JavaScript executa o código JS.

Exemplos de motores JavaScript:

- V8.
- SpiderMonkey.
- JavaScriptCore.

4. **Ponte entre JS e DOM**

Quando o JavaScript acessa o DOM, ele precisa se comunicar com a parte do navegador que controla o DOM.

Essa comunicação é feita por uma ponte que conecta o motor JavaScript com a engine de renderização.

Essa parte é feita pelo navegador, mas o JavaScript interage com ela.

5. **Renderização visual**

Quando o DOM é alterado, o navegador precisa atualizar a tela para refletir as mudanças.

Essa etapa é feita pela engine de renderização do navegador.

6. **Recálculo de layout**

Quando o DOM é alterado, o navegador pode precisar recalcular o layout da página para posicionar os elementos corretamente.

Essa etapa também é feita pela engine de renderização.

7. **Pintura**

Depois de recalcular o layout, o navegador precisa pintar os pixels na tela para mostrar as mudanças.

Essa etapa é feita pela engine de renderização.

8. **Otimizações**

Navegadores modernos fazem várias otimizações para melhorar a performance.

Exemplos:

- Reutilizar partes do layout que não mudaram.
- Adiar a pintura até que seja necessário.
- Evitar recalcular partes da página que não foram afetadas.


## Resumo rápido

O DOM não é manipulado isoladamente pelo JavaScript.

O JavaScript conversa com estruturas internas do navegador.

Alterar o DOM pode acionar renderização, recálculo de layout e pintura.

Navegadores modernos otimizam esse processo para melhorar a performance.



# 9 - HTML não vira tela direto

## Teoria

O navegador não desenha HTML cru.

Ele primeiro lê texto puro.

Um arquivo HTML, antes de ser interpretado, é apenas uma string.

O navegador possui um **HTML Parser**, que interpreta esse texto caractere por caractere.


## Código

HTML escrito no arquivo:

```html
<h1>Olá</h1>
<p>Bem-vindo</p>
```


## Prática

O navegador lê esse conteúdo e interpreta sua estrutura.

Ele identifica:

- A abertura da tag `h1`.
- O texto `Olá`.
- O fechamento da tag `h1`.
- A abertura da tag `p`.
- O texto `Bem-vindo`.
- O fechamento da tag `p`.

Com isso, ele cria objetos internos.


## Por trás dos panos

O HTML Parser analisa o documento como texto.

Ele entende onde uma tag começa, onde uma tag termina e qual conteúdo existe dentro dela.

Depois disso, o navegador transforma essa sequência em nós internos.

Esses nós formam a árvore DOM.

Então, o caminho não é:

```txt
HTML -> Tela
```

O caminho real é mais próximo de:

```txt
HTML em texto -> Parser HTML -> Objetos DOM -> Árvore DOM -> Renderização -> Tela
```


## Resumo rápido

HTML não vira tela diretamente.

Primeiro, o navegador interpreta o HTML como texto.

O parser cria objetos internos.

Esses objetos formam a árvore DOM usada para renderizar a página.



# RESUMÃO DE REVISÃO

## Buscar elementos

Use `document.getElementById("id")` para buscar um elemento pelo `id`.

Use `document.querySelector("seletor")` para buscar o primeiro elemento que combina com um seletor CSS.

Use `document.querySelectorAll("seletor")` para buscar vários elementos.

`querySelectorAll` retorna uma `NodeList`, que parece array, mas não é um array completo.


## Alterar texto

Use `textContent` para alterar texto puro.

Use `innerText` para trabalhar com texto visível.

Use `innerHTML` para inserir HTML dentro de um elemento.

Tenha cuidado com `innerHTML`, porque ele pode abrir brecha para XSS quando usado com conteúdo inseguro.


## CSS

Use `element.style` para alterações diretas e pontuais.

No JavaScript, propriedades CSS usam `camelCase`.

Exemplo: `background-color` vira `backgroundColor`.

Prefira `classList` para manter CSS separado do JavaScript.


## Criar elementos

Use `document.createElement("tag")` para criar um elemento novo.

Use `textContent` para definir seu texto.

Use `appendChild` para inserir o elemento na árvore DOM.

O elemento só aparece na tela depois de ser anexado ao DOM.


## Navegar DOM

O DOM é uma árvore.

Elementos podem ter pai, filhos e irmãos.

Use `parentElement`, `children` e `nextElementSibling` para navegar por essa estrutura.

Isso evita buscas desnecessárias quando você já está perto do elemento desejado.


## Conceito central

O DOM é a representação do HTML em forma de objetos.

O navegador lê o HTML, usa o parser para criar objetos internos e monta a árvore DOM.

O JavaScript acessa essa árvore para alterar a página.

Alterações no DOM podem acionar renderização, recálculo de layout e pintura.
