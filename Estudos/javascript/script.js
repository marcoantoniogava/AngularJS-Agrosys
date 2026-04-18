/* const p1 = new Promise((resolve) => {
    setTimeout(() => resolve("final"), 1000);
});

const p2 = new Promise((resolve) => {
    resolve(p1);
});

p2.then(console.log); */

/* 
const p1 = new Promise(res => res(console.log))

p1.then((callback) => {callback(123)}) 
*/

const asyncFunction = async () => {
    console.log("teste")
    console.log(await new Promise(res => {
        setTimeout(() => {
            res("123")
        }, 1000);
    }));
    console.log("teste2")
}

asyncFunction();
