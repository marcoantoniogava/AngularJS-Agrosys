class PromiseSimulada {
    constructor(executor) {
        let callbacks = [];
        let estado = "pending";
        let valorPromise;

        function resolveSimulado(valor) {
            if (estado == "fullfiled") return;

            estado = "fullfiled";
            valorPromise = valor;

            setTimeout(() => {
                callbacks.forEach(cb => {
                    cb(valorPromise);
                });
            }, 0);
        }

        this.then = function (callback) {
            return new PromiseSimulada((res) => {
                function handleResolve () {
                    let resultado = callback(valorPromise)
                    
                    res(resultado)
                }

                if (estado == "pending")
                    callbacks.push(() => { handleResolve(); });

                else setTimeout(() => {
                    handleResolve();
                }, 0);
                    
            });
        };

        executor(resolveSimulado);
    }

    static resolve(valor) {
        return new PromiseSimulada(res => res(valor));
    }
}

/* EXEMPLOS */

const p = new PromiseSimulada((res) => {
    setTimeout(() => {
        res(2)
    }, 1000);
});

p.then(x => x + 2)
 .then(x => x * 2)
 .then(console.log);

PromiseSimulada.resolve(2).then(console.log);

console.log("sync");