    ```js
Promisses e programação assíncrona em JavaScript

Introdução
JavaScript é uma linguagem assíncrona e orientada a eventos

Isso significa que algumas operações não retornam resultado imediatamente, como:
- requisições HTTP
- acesso ao banco de dados
- leitura de arquivos
- timers (setTimeout)

# . 1 - O que é programação assíncrona 
## 1 - Conceito básico
    Programação assíncrona é quando o código continua executando sem esperar o resultado de uma operação.

    console.log("início");

    setTimeout(function() {
        console.log("meio");
    }, 1000);

    console.log("fim");

    saída:

    início
    fim
    (meio depois de 1 segundo)

## 2 - Por que é necessário
    - setTimeout demora
    - o JavaScript não espera
    - continua executando

## 3 - Diferença: síncrono vs assíncrono
    ❌ errado pensamento síncrono
    var dados = buscarDados();
    console.log(dados);

    ✔️ correto assíncrono
    buscarDados(function(dados) {
        console.log(dados);
    });

# _______________________________________________________________________________________________________________________

# . 2 - Callbacks 
## 1 - O que é uma callback
    é uma função passada como argumento que será executada depois

## 2 - Como usar callbacks
    example
    function buscarDados(callback) {
        setTimeout(function() {
            callback("dados carregados");
        }, 1000);
    }

    buscarDados(function(resultado) {
        console.log(resultado);
    });

## 3 - Callback hell (problema dos callbacks)
    buscarA(function(a) {
        buscarB(a, function(b) {
            buscarC(b, function(c) {
                console.log(c);
            });
        });
    });

    - difícil de ler
    - difícil de manter

# _______________________________________________________________________________________________________________________

# . 3 - Promises 
## 1 - O que é uma Promise
    é um objeto que representa um valor que estará disponível no futuro
    
## 2 - Estados de uma Promise
    pending   → em andamento
    fulfilled → sucesso
    rejected  → erro

## 3 - Criando uma Promise
    -------exemplo---------
    var promessa = new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve("deu certo");
        }, 1000);
    });
    --------fim-exemplo-----

## 4 - Consumindo uma Promise
    -------exemplo---------
    promessa.then(function(resultado) {
        console.log(resultado);
    });
    --------fim-exemplo-----

# _______________________________________________________________________________________________________________________

# . 4 - then () 
## 1 - Como funciona
    then() é executado quando a promise resolve com sucesso.

## 2 - Sintaxe básica
    -------exemplo---------
    buscarDados().then(function(dados) {
        console.log(dados);
    });
    --------fim-exemplo-----

# _______________________________________________________________________________________________________________________

# . 5 - catch () 
## 1 - Como funciona
    catch() é executado quando ocorre erro.

## 2 - Sintaxe básica
    -------exemplo---------
    buscarDados()
        .then(function(dados) {
            console.log(dados);
        })
        .catch(function(erro) {
            console.log("erro:", erro);
        });
    --------fim-exemplo-----

# _______________________________________________________________________________________________________________________

# . 6 - exemplo real com sucesso/erro 
## 1 - Tratamento completo
    function buscarDados() {
        return new Promise(function(resolve, reject) {
            var sucesso = true;

            if (sucesso) {
                resolve("dados carregados");
            } else {
                reject("erro ao carregar");
            }
        });
    }

# _______________________________________________________________________________________________________________________

# . 7 - encadeamento de promises 
## 1 - Chaining múltiplas operações
    você pode encadear várias operações:
    -------exemplo---------
    buscarDados()
        .then(function(dados) {
            return processarDados(dados);
        })
        .then(function(resultado) {
            console.log(resultado);
        })
        .catch(function(erro) {
            console.log(erro);
        });
    --------fim-exemplo-----

# _______________________________________________________________________________________________________________________

# . 8 - async / await 
## 1 - Forma moderna de trabalhar com promises
    é uma forma mais moderna de trabalhar com promises.

## 2 - Sintaxe básica
    -------exemplo---------
    async function carregar() {
        var dados = await buscarDados();
        console.log(dados);
    }

    explicação
    async → define função assíncrona
    await → espera a promise resolver
    --------fim-exemplo-----

## 3 - Equivalência com then()
    -------exemplo---------
    buscarDados().then(function(dados) {
        console.log(dados);
    });

    const p1 = new Promise(res => res(123))

    isso aqui:
    async function teste() {
        const valor = await p1;
        console.log(valor);
    }

    é transformado em algo tipo:
    function teste() {
        p1.then(function(valor) {
            console.log(valor);
        });
    }
    --------fim-exemplo-----

# _______________________________________________________________________________________________________________________

# . 9 - tratamento de erro com async/await 
## 1 - Usando try/catch
    async function carregar() {
        try {
            var dados = await buscarDados();
            console.log(dados);
        } catch (erro) {
            console.log("erro:", erro);
        }
    }

# _______________________________________________________________________________________________________________________

# . 10 - comparação 
## 1 - Comparação entre abordagens
    abordagem	    legibilidade
    callback	    ruim
    promise	        boa
    async/await	    melhor

# _______________________________________________________________________________________________________________________

# . 11 - no contexto do AngularJS 
## 1 - AngularJS antigo usa callbacks
    -------exemplo---------
    sql.select(classe, where, function(resultado, vcod) {
        if (vcod === 1) {
            console.log(resultado);
        }
    });
    --------fim-exemplo-----

## 2 - Adaptando para Promise
    é possível adaptar para promise:

    function selectPromise(classe, where) {
        return new Promise(function(resolve, reject) {
            sql.select(classe, where, function(resultado, vcod) {
                if (vcod === 1) {
                    resolve(resultado);
                } else {
                    reject("erro");
                }
            });
        });
    }

## 3 - Usando com async/await
    async function carregar() {
        try {
            var dados = await selectPromise('clientes', '');
            console.log(dados);
        } catch (erro) {
            console.log(erro);
        }
    }

# _______________________________________________________________________________________________________________________

# . 12 - erros comuns 
## 1 - Esquecer que é assíncrono
    var dados = buscar();

## 2 - Não tratar erro
    .then(...)
    sem .catch()

## 3 - Misturar padrões sem entender
    callback + promise + async tudo junto

## 4 - Usar await fora de async
    var dados = await buscar(); // erro

# _______________________________________________________________________________________________________________________

# . 13 - métodos da Promise
## 1 - Promise.resolve()
    retorna uma promise já resolvida

    Promise.resolve(10).then(console.log);

    saída:

    10

## 2 - Promise.reject()
    retorna uma promise já rejeitada

    Promise.reject("erro").catch(console.log);

    saída:

    erro

## 3 - Promise.all()
    executa várias promises em paralelo
    retorna quando TODAS resolvem

    Promise.all([
        Promise.resolve(1),
        Promise.resolve(2),
        Promise.resolve(3)
    ]).then(console.log);

    saída:

    [1, 2, 3]

    ❗ se UMA falhar → tudo falha

    Promise.all([
        Promise.resolve(1),
        Promise.reject("erro"),
        Promise.resolve(3)
    ]).catch(console.log);

    saída:

    erro

## 4 - Promise.allSettled()
    espera TODAS terminarem (sucesso ou erro)

    Promise.allSettled([
        Promise.resolve(1),
        Promise.reject("erro")
    ]).then(console.log);

    saída:

    [
        { status: "fulfilled", value: 1 },
        { status: "rejected", reason: "erro" }
    ]

## 5 - Promise.race()
    retorna a PRIMEIRA que terminar (sucesso ou erro)

    Promise.race([
        new Promise(res => setTimeout(() => res("A"), 1000)),
        new Promise(res => setTimeout(() => res("B"), 500))
    ]).then(console.log);

    saída:

    B

## 6 - Promise.any()
    retorna a PRIMEIRA que resolver com sucesso
    ignora erros até conseguir uma válida

    Promise.any([
        Promise.reject("erro1"),
        Promise.resolve("sucesso"),
        Promise.reject("erro2")
    ]).then(console.log);

    saída:

    sucesso

    ❗ se TODAS falharem:

    Promise.any([
        Promise.reject("erro1"),
        Promise.reject("erro2")
    ]).catch(console.log);

    👉 retorna um erro especial (AggregateError)

## 7 - Promise.finally()
    executa sempre, independente de sucesso ou erro

    Promise.resolve("ok")
        .finally(() => console.log("sempre executa"));

    ou

    Promise.reject("erro")
        .finally(() => console.log("sempre executa"));

    👉 usado para limpeza (loading, etc)

## 8 - Comparação e exemplos práticos
    comparação prática
        método	    quando usar
        resolve	    criar promise resolvida
        reject	    criar promise com erro
        all         quando precisa de TODOS
        allSettled  quando quer TODOS, mesmo com erro
        race	    pegar o mais rápido
        any	        pegar o primeiro que der certo
        finally	    executar sempre

    exemplos reais 
        carregar várias coisas ao mesmo tempo
            const [usuarios, produtos] = await Promise.all([
                buscarUsuarios(),
                buscarProdutos()
            ]);
            
        não parar se der erro
            const resultados = await Promise.allSettled([
                buscarUsuarios(),
                buscarProdutos()
            ]);

        pegar resposta mais rápida (timeout)
            const resposta = await Promise.race([
                fetch("/api"),
                new Promise((_, reject) => 
                    setTimeout(() => reject("timeout"), 3000)
                )
            ]);
        
        tentar várias fontes
            const dados = await Promise.any([
                fetch("/api1"),
                fetch("/api2"),
                fetch("/api3")
            ]);

    dica final
        Promise.all → padrão mais usado
        Promise.race → usado pra timeout
        Promise.any → fallback entre APIs
        Promise.allSettled → relatórios/logs

# _______________________________________________________________________________________________________________________

# . 14 - Fetch API e Promises
## 1 - O que é Fetch API
    é uma API moderna para fazer requisições HTTP
    baseada em Promises.

    Ele serve para buscar dados de APIs, enviar informações para servidores, autenticar usuários, carregar listas, etc.

    retorna uma Promise que resolve com a resposta da requisição.

## 2 - Sintaxe básica
    fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro na requisição");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error("Erro:", error);
        });

## 3 - Exemplo com async await
    async function carregarDados() {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Erro na requisição");
            }

            const data = await response.json();

            console.log(data);
        } catch (error) {
            console.error("Erro:", error);
        }
    }

## 4 - Entendendo a resposta
    Quando o fetch termina, ele retorna um objeto Response.

    Exemplo:
    const resposta = await fetch(url);

    Esse objeto tem:
    - status: código HTTP (200, 404, etc)
    - ok: true se status for 200-299
    - json(): método para ler o corpo como JSON
    - text(): método para ler o corpo como texto
    - headers: informações sobre a resposta (tipo, etc)
    Para acessar os dados, geralmente usamos response.json() que também retorna uma Promise.

## 5 - Converter resposta
    JSON
    const dados = await response.json();

    Texto
    const texto = await response.text();

    Blob (imagens, arquivos)
    const imagem = await response.blob();

    FormData (formulários)
    const formData = await response.formData();

    arrayBuffer (dados binários)
    const buffer = await response.arrayBuffer();

## 6 - Get 
    async function listarProdutos () {
        const resposta = await fetch("/api/produtos");
        const produtos = await resposta.json();

        console.log(produtos);
    }

## 7 - Post
    async function criarUsuario() {
        const resposta = await fetch("/api/usuarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: "Nícolas",
                idade: 20
            })
        });

        const retorno = await resposta.json();
        console.log(retorno);
    }

## 8 - PUT
    async function atualizaUsuario() {
        const resposta = await fetch("/api/usuarios/123", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: "Nícolas",
                idade: 21
            })
        })
    }
    
## 9 - DELETE 
    async function deletarUsuario() {
        const resposta = await fetch("/api/usuarios/123", {
            method: "DELETE"
        });

        if (resposta.ok) {
            console.log("Usuário deletado");
        } else {
            console.log("Erro ao deletar");
        }
    }

## 10 - Tratando erros
    importante:
    fetch não cai no catch só porque veio 404 ou 500.
    
    ele só cai no catch em erro real:
    - sem internet
    - DNS falhou
    - cors bloqueado
    - conexão caiu

    Exemplo correto:
    async function buscar() {
        try {
            const resposta = await fetch("/api/usuarios");

            if (!resposta.ok)  {
                throw new Error("Erro na requisição: " + resposta.status);
            }

            const dados = await resposta.json();

            console.log(dados);
        } catch (error) {
            console.log("Erro:", error);
        }
    }

## 11 - Headers
    Enviar token:

    fetch("/perfil", {
        headers: {
            Authorization: "Bearer " + token
        }
    });

    Ler tipo de conteúdo:
    const tipo = resposta.headers.get("Content-Type");

    O headers é um objeto que contém informações sobre a requisição ou resposta, como tipo de conteúdo, autenticação, etc.

## 12 - Query params
    const resposta = await fetch("/api/usuarios?idade=20&cidade=SP");

    ou usando URLSearchParams:

    const params = new URLSearchParams({ idade: 20, cidade: "SP" });
    const resposta = await fetch("/api/usuarios?" + params.toString());

    URLSearchParams é uma forma fácil de criar query strings a partir de objetos.
    ele é uma classe nativa do JS que converte um objeto em uma string de consulta (query string) para URLs.

