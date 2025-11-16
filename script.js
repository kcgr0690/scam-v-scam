const screen1 = document.getElementById('screen1');
const screen2 = document.getElementById('screen2');
const startScreen = document.getElementById('start-screen');
const rhythmGameScreen = document.getElementById('rhythm-game');

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
const popUp6 = document.getElementById("popUp6");
const popUp7 = document.getElementById("popUp7");

const close1 = document.getElementById("close1");
const close2 = document.getElementById("close2");
const close3 = document.getElementById("close3");

const close4 = document.getElementById("close4");
const close5 = document.getElementById("close5");
const close6 = document.getElementById("close6");
const close7 = document.getElementById("close7");

const hide = document.getElementById("hide");


close1.addEventListener('click', () => { popUp1.style.display = "none"; });

close2.addEventListener('click', () => { popUp2.style.display = "none"; });
close3.addEventListener('click', () => { popUp3.style.display = "none"; });
close4.addEventListener('click', () => { popUp4.style.display = "none"; });

close5.addEventListener('click', () => { popUp5.style.display = "none"; });
close6.addEventListener('click', () => { popUp6.style.display = "none"; });
close7.addEventListener('click', () => { popUp7.style.display = "none"; });

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

let closedCount = 0;
let secretDigits = [];

function generateSecretDigits() {
  let secretDigits = [];  
  for (let i = 0; i < phoneLength; i++){
    let digit = Math.floor(Math.random() * 10);
    phoneDigits.push(digit);
    }
let currentIndex = 0;
}
generateSecretDigits();

let secretNumber = Math.trunc(Math.random() * 9) + 1;

let phoneNumber = phoneDigits.join('');
console.log("Generated phone:", phoneNumber);

const displayMessage = function(message) {
    document.querySelector(".message").textContent = message;
}

const checkBtn = document.querySelector('.check');
if (checkBtn) {
    checkBtn.addEventListener('click', function() {
        const guess = Number(document.querySelector('.guess').value);
        console.log(guess, typeof guess);
        
        if (guess < 0 || guess > 9 || isNaN(guess)) {
            displayMessage("Enter 0-9!");
            return;
        } 
        
        const CorrectDigit = secretDigits[currentIndex];

        
        if (guess === correctDigit) {
            displayMessage('Correct Number!');
            currentIndex++;
            
            document.querySelector('.num').textContent = secretDigits.slice(0, currentIndex).join('');
        }
    });
}
const againBtn = document.querySelector('.again');
if (againBtn) {
    againBtn.addEventListener('click', function() {
        score = 10;
        secretNumber = Math.trunc(Math.random() * 9) + 1;
        displayMessage('Start Guessing...');
        document.querySelector('.score').textContent = score;
        document.querySelector('.num').textContent = '?';
        document.querySelector('.guess').value = '';
        document.querySelector('body').style.backgroundColor = '#111';
        document.querySelector('.num').style.width = "15rem";
    });
}

const gameArea = document.getElementById("game-area");
t.style.top = Math.random() * 200 + 20 + "px";
t.style.left = Math.random() * 700 + 20 + "px";
t.dataset.index = i;
t.textContent = password[i];
gameArea.appendChild(t);
targets.push(t);



function moveBow() {
bowX += direction * 2;
if (bowX <= 0 || bowX >= 740) direction *= -1;
bow.style.left = bowX + "px";
requestAnimationFrame(moveBow);
}
moveBow();


gameArea.addEventListener("click", () => {
if (arrowsLeft <= 0) return;


arrowsLeft--;
arrowsLeftDisplay.textContent = arrowsLeft;


let arrow = document.createElement("div");
arrow.className = "arrow";
arrow.style.left = bowX + 28 + "px";
arrow.style.bottom = "70px";
gameArea.appendChild(arrow);


let arrowY = 70;


const interval = setInterval(() => {
arrowY += 5;
arrow.style.bottom = arrowY + "px";


targets.forEach(t => {
const rect = t.getBoundingClientRect();
const aRect = arrow.getBoundingClientRect();
const overlap = !(
aRect.right < rect.left ||
aRect.left > rect.right ||
aRect.bottom < rect.top ||
aRect.top > rect.bottom
);


if (overlap) {
clearInterval(interval);
arrow.remove();
t.style.color = "white";


const index = t.dataset.index;
document.getElementById("box-" + index).value = t.textContent;
}
});


if (arrowY > 400) {
clearInterval(interval);
arrow.remove();
}
}, 16);
});

const PASSWORD_LENGTH = 7;
const MAX_ARROWS = 10;
const CHARS = '0123456789!@#$%&*';

let password = '';
let arrowsLeft = MAX_ARROWS;
let targetsHit = 0;
let bowPosition = 50;
let bowDirection = 1;
let passwordGameActive = false;
let revealedChars = new Array(PASSWORD_LENGTH).fill('');
let targets = [];

function generatePassword() {
    let pwd = '';
    for (let i = 0; i < PASSWORD_LENGTH; i++) {
        pwd += CHARS[Math.floor(Math.random() * CHARS.length)];
    }
    return pwd;
}