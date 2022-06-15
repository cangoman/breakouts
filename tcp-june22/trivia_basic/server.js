const net = require('net');
const readline = require('readline');
const request = require('request');

const URL = "https://the-trivia-api.com/api/questions?limit=2&difficulty=easy";
let players = {};
let questions, currentQuestion, currentAnswers, correctIndex;
let acceptAnswer = false;
let gameInProgress = false;


const server = net.createServer();

const rl = readline.createInterface({
    input: process.stdin
})

server.listen(3000, () => {
    console.log('Server ready! Listening on port 3000');

    rl.on('line', data => {
        if (data === 'begin' && !gameInProgress) {
            setupGame();
        } else if (data === 'next' && gameInProgress) {
            console.log(data)
            currentQuestion = questions.pop();
            currentAnswers = [currentQuestion.correctAnswer, ...currentQuestion.incorrectAnswers];
            const randomOrder = [0, 1, 2, 3].sort(() => Math.random() > 0.5 ? 1 : -1);

            writeToAll(currentQuestion.question, players);

            for (let i = 0; i < randomOrder.length; i++) {
                const idx = randomOrder[i];
                if (idx === 0) {
                    correctIndex = i;
                }
                setTimeout(() => {
                    writeToAll(`${i}) ${currentAnswers[idx]}`, players)
                }, 1000 * (i + 1))
            }
            
            setTimeout(() => {
                acceptAnswer = true;
                writeToAll('answer: ', players)
            }, 5000)

            setTimeout(() => {
                acceptAnswer = false;
                writeToAll(`The correct answer is ${correctIndex}) ${currentAnswers[0]}`, players)
            }, 10000)

        }
    });

});

server.on('connection', (socket) => {
    socket.setEncoding('utf-8')
    console.log('New client connected');

    socket.on('data', data => {
        // console.log(data)
        data = data.split(': ');

        if (data[0] === 'name') {
            console.log(`Player ${data[1]} connected`);
            socket.write(`Welcome to Trivia, ${data[1]}! We will begin our game shortly.`);
            players[data[1]] = {
                name: data[1],
                socket, 
                points: 0
            }
        } 
    })

})


function setupGame() {
    request(URL,  (err, res, body) => {
        if (err) {
            console.log('there was an error');
            process.exit(1);
        } else {
            questions = JSON.parse(body);
            console.log('ready to play!');
            gameInProgress = true;
        }
    })
}

// Helper to send a message to all players
function writeToAll(message, players) {
    for (const player in players) {
        players[player].socket.write(message)
    }
}
