const screen1 = document.getElementById('screen1');
const screen2 = document.getElementById('screen2');
const startScreen = document.getElementById('start-screen'); // Added for completeness
const rhythmGameScreen = document.getElementById('rhythm-game'); // Added for reference if needed

// comment out music if not using audio; otherwise, uncomment HTML <audio> and add src="your_music.mp3"
const music = document.getElementById('music');

const game = document.getElementById('game');
const scoreEl = document.getElementById('score');
const messageEl = document.getElementById('message');

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