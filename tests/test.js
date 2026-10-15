process.stdout.write("Tell me your name: ");

process.stdin.on('data', (data) => {
    nombre = data.toString().trim();
    process.stdout.write(`Hola ${nombre}`);
    process.exit();
})
