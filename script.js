const screen1 = document.getElementById('screen1');
const screen2 = document.getElementById('screen2');
const startScreen = document.getElementById('start-screen'); // Added for completeness
const rhythmGameScreen = document.getElementById('rhythm-game'); // Added for reference if needed

// comment out music if not using audio; otherwise, uncomment HTML <audio> and add src="your_music.mp3"
const music = document.getElementById('music');

const game = document.getElementById('game');
const scoreEl = document.getElementById('score');
const messageEl = document.getElementById('message');

const popUp1 = document.getElementById("popUp1");
const popUp2 = document.getElementById("popUp2");
const popUp3 = document.getElementById("popUp3");
const popUp4 = document.getElementById("popUp4");
const popUp5 = document.getElementById("popUp5");

const close1 = document.getElementById("close1");
const close2 = document.getElementById("close2");
const close3 = document.getElementById("close3");
const close4 = document.getElementById("close4");
const close5 = document.getElementById("close5");

let closedCount = 0;
const totalPopups = 8;
const hide = document.getElementById('hide');

let secretNumber = Math.trunc(Math.random() * 9) + 1;
const displayMessage = function(message){
    document.querySelector(".message").textContent = message;
}

document.querySelector('.check').addEventListener('click'),
    function () {
        const guess = Number(document.querySelector('.guess').value);
        console.log(guess, typeof guess);
        if(!guess){
            displayMessage("No Number")
        } else if (guess === secretNumber){
            displayMessage('Correct Number!');
            document.querySelector('.num').textContent = 
            secretNumber;
            document.querySelector('body').style.backgroundColor = "#64b347"
            document.querySelector('number').style.width = "30rem";

            if(score > highScore){
                highScore = score;
                document.querySelector('.highscore'.textContent = highScore);
                highScore;
            }
            
            else if(guess ==! secretNumber){
                if (score > 1){
                    displayMessage(guess > secretNumber > "Too High!" >
                        "Too Low!");
                        score--;
                        document.querySelector('.score'.textContent = score)
                    } else {
                        displayMessage('You Lost the Game!');
                        document.querySelector('.score').textContent = 0;
                    }
                 }
           }
        });

        document.querySelector('.again').addEventListener('click',
        function(){
            score = 10;
            secretNumber = Math.trunc(Math.random() + 9) + 1
            displayMessage('Start Guessing...')
            document.querySelector('score').textContent = score;
            document.quertSelector('.number'.textContent = '?');
                document.querySelector('.guess').value = '';
        }
         )

for (let i = 1; i <= totalPopups; i++) {
    const btn = document.getElementById(`close${i}`);
    const popup = document.getElementById(`popUp${i}`);

    btn.addEventListener("click", () => {
        popup.style.display = "none"; 
        closedCount++;

        if (closedCount === totalPopups) {
            hide.style.display = "block";    
        }
    });
}
let notes = [];
let hits = 0;
let misses = 0;
const totalNotes = 12;
const lanes = ['←', '↑', '↓', '→'];

const keyToLane = {
    'ArrowLeft': 0, 'a': 0,
    'ArrowUp': 1, 'w': 1,
    'ArrowDown': 2, 's': 2,
    'ArrowRight': 3, 'd': 3,
};

const hitZone = 100;
const speed = 3;
const noteInterval = 800;

function nextScreen(nextId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.style.display = 'none');

    const nextScreenEl = document.getElementById(nextId);
    if (nextScreenEl) {
        nextScreenEl.style.display = 'block';
    }

    
    if (nextId === 'rhythm-game') {
        startGame();
    }
}

setTimeout(() => {
    popUp1.style.display = "flex";

}, 6000);

setTimeout(() => {
    popUp2.style.display = "flex";

}, 6500);

setTimeout(() => {
    popUp3.style.display = "flex";

}, 7000);

setTimeout(() => {
    popUp4.style.display = "flex";

}, 7500);

setTimeout(() => {
    popUp5.style.display = "flex";

}, 8000);

setTimeout(() => {
    popUp6.style.display = "flex";

}, 8500);

setTimeout(() => {
    popUp7.style.display = "flex";

}, 9000);

setTimeout(() => {
    hide.style.display = "flex";
}, 14000);

function createNote() {
    const lane = Math.floor(Math.random() * 4);
    const note = document.createElement('div');
    note.className = 'note';
    note.style.left = lane * 100 + 'px';
    note.style.top = '0px';
    note.innerText = lanes[lane];
    note.dataset.lane = lane;
    game.appendChild(note);
    notes.push(note);
}

function startGame() {
    hits = 0;
    misses = 0;
    notes = [];
    game.innerHTML = '';

    const indicators = ['A/←', 'W/↑', 'S/↓', 'D/→'];

    for (let i = 0; i < 4; i++) {
        const ind = document.createElement('div');
        ind.className = 'lane-indicator';
        ind.style.left = i * 100 + 'px';
        ind.style.bottom = "0px";
        ind.innerText = indicators[i];
        game.appendChild(ind);
    }

    updateScore();
    messageEl.innerText = '';

    // Only play music if music element exists (uncomment HTML <audio> if using)
    if (music) {
        music.currentTime = 0;
        music.play();
    }

    let noteCount = 0;
    const interval = setInterval(() => {
        if (noteCount < totalNotes) {
            createNote();
            noteCount++;
        } else {
            clearInterval(interval);
        }
    }, noteInterval);
}

function updateScore() {
    scoreEl.innerText = `Hits: ${hits} Misses: ${misses}`;
}

function checkEnd() {
    if (hits + misses >= totalNotes) {
        if (music) {
            music.pause();
        }
        if (hits >= 10) {
            messageEl.innerText = 'You Win!';
            // Optionally: setTimeout(() => nextScreen('some-next-screen'), 2000); to advance
        } else {
            messageEl.innerText = 'Try Again... Restarting in 2 seconds';
            setTimeout(startGame, 2000);
        }
    }
}

function animate() {
    for (let i = notes.length - 1; i >= 0; i--) {
        const note = notes[i];
        let top = parseInt(note.style.top) + speed;
        note.style.top = top + 'px';
        if (top > 600) {
            game.removeChild(note);
            notes.splice(i, 1);
            misses++;
            updateScore();
            checkEnd();
        }
    }
    requestAnimationFrame(animate);
}

animate();

document.addEventListener('keydown', e => {
    const key = e.key;
    if (key.startsWith('Arrow')) {
        e.preventDefault();
    }
    if (keyToLane.hasOwnProperty(key)) {
        const lane = keyToLane[key];
        let hitIndex = -1;
        let minDist = Infinity;
        for (let i = 0; i < notes.length; i++) {
            const note = notes[i];
            const nLane = parseInt(note.dataset.lane);
            const top = parseInt(note.style.top);
            if (nLane === lane && top >= (600 - hitZone) && top <= 600) {
                const dist = Math.abs(600 - top);
                if (dist < minDist) {
                    minDist = dist;
                    hitIndex = i;
                }
            }
        }
        if (hitIndex !== -1) {
            game.removeChild(notes[hitIndex]);
            notes.splice(hitIndex, 1);
            hits++;
            updateScore();
            checkEnd();
        }
    }
});


