const p1 = new Promise((resolve) => {
    setTimeout(() => resolve("final"), 1000);
});

const p2 = new Promise((resolve) => {
    resolve(p1);
});

p2.then(console.log);