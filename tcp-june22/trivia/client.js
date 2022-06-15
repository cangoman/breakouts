const net = require('net');
const readline = require('readline');

conn = net.createConnection({
  // host: '2.tcp.ngrok.io', // or IP address
  // port: 18398
  host: 'localhost',
  port: 3000
});

let name;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})



conn.setEncoding('utf8');

conn.on('data', (data) => {
    if (data.startsWith('error')){
        console.log(data.split('error: ')[1])
        console.log('exiting...')
        conn.end();
        process.exit(1)
    } else if(data.startsWith('answer')) {
        rl.question('What is your answer?', input => {
            conn.write(`answer: ${name}, ${input}`);
            rl.pause();
        });
    } else {
        console.log(data);
    }
  });

conn.on('connect', () => {
    rl.question('What is your name?\n', input => {
        name = input;
        conn.write(`name: ${input}`);
        rl.pause();
    }); 
})
