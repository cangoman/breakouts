const net = require('net');
const request = require('request');
const readline = require('readline')

URL = URL = "https://the-trivia-api.com/api/questions?limit=2&difficulty=easy";

const server = net.createServer();

const rl = readline.createInterface({
    input: process.stdin
})

let players = {};
let currentQuestion;
let currentAnswers;
let correctIndex;
let questions;
let gameInProgress = false;
let acceptAnswer = false;

server.listen(3000, () => {
    console.log('Server ready! Listening on port 3000');
    
    rl.on('line', input => {
        if (input === 'begin' && !gameInProgress) {
            setupGame();
        } else if (input === 'next' && gameInProgress) {
            if (questions.length > 0) {
                currentQuestion = questions.pop();
                currentAnswers = [currentQuestion.correctAnswer, ...currentQuestion.incorrectAnswers];
                const randomOrder = shuffle();
                // const randomOrder = [0, 1, 2, 3].sort(() => Math.random() > 0.5 ? 1 : -1)
                
                // console.log(randomOrder)
                
                writeToAll(currentQuestion.question, players)

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
                
                
            } else {
                gameInProgress = false;
                let result = 'Here are the final rankings:\n';
                let rankings = getRanking(players);
                for (const ranking of rankings) {
                    result += `${ranking.name}: ${ranking.points} point(s)\n`
                }

                writeToAll(result, players);
                
            }
            
        }
    })
})

server.on('connection', (socket) => {
    if (gameInProgress) {
        socket.write('error: Sorry, the game has already started!');
        socket.destroy();
        
    } 
    else {
        socket.setEncoding('utf-8');
    
        socket.on('data', data => {
            data = data.split(': ')
            
            if (data[0] === 'name') {
                const name = data[1]
                console.log(`Player ${name} ready to play.`)
                socket.write(`Welcome to Trivia, ${name}! We will begin our game shortly.`)
                players[name] = {
                    name,
                    socket,
                    points: 0
                }
            } else if (data[0] === 'answer' && acceptAnswer) {
                const [name, answer] = data[1].split(', ');
                if (Number(answer) === correctIndex) {
                    players[name].points++;
                }
            }
        })
    
        socket.on('close', () => {
            socket.write('Goodbye! Thanks for Playing :)')
        })

    }

})

function setupGame() {
    request(URL, (err, res, body) => {
        if (err) {
            console.log('there was an error');
            process.exit(1);
        }

        questions = JSON.parse(body);
        console.log('ready to play!')
        gameInProgress = true;
        // console.log(questions)

   })
}

function shuffle() {
    return [0, 1, 2, 3].sort( () => Math.random() > 0.5 ? 1 : -1)
}

function writeToAll(message, players) {
    for (const player in players) {
        players[player].socket.write(message)
    }
}

function getRanking(players) {
    const ranking = [];

    for (const player in players) {
        const {name, points} = players[player];
        ranking.push({name, points});
    }
    return ranking.sort((a, b) => b.points - a.points)
}



