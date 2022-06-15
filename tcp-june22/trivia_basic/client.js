const net = require('net');
const readline = require('readline');

const conn = net.createConnection({
    host: '0.tcp.ngrok.io',
    port: 13430
});

let name;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

conn.setEncoding('utf-8');

conn.on('connect', () => {
    rl.question('What is your name?', input => {
        name = input;
        conn.write(`name: ${name}`);
        rl.pause();
    })
});

conn.on('data', data => {
    console.log(data)
})

