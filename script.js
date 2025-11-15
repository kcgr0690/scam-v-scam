const screen1 = document.getElementById('screen1');
const screen2 = document.getElementById('screen2');

function updateScore() {
    ScoreEl.innerText = `Hits: ${hits}, Misses: ${misses}`;
}

function nextScreen(nextId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.style.display = 'none');

    const nextScreen = document.getElementById(nextId);
    if (nextScreen) {
        nextScreen.style.display ='block';
    }
}

const game = document.getElementById('game');
//def music var here in the future!!!!!!!!!
const ScoreEl = document.getElementById('score');
const messageEl = document.getElementById('message');

let notes = [];
let hits = 0;
let misses = 0;
const totalNotes = 12;
const lanes = ['←', '↑', '↓', '→'];

const keyToLane = {
    'ArrowLeft': 0, 'a': 0,
    'ArrowUp': 1, 'a': 1,
    'ArrowDown': 2, 'a': 2,
    'ArrowRight': 3, 'a': 3,
};

const hitZone = 100;
const speed = 3;
const noteInterval = 800;

function createNote() {
    const lane = Math.floor(Math.random()*4);
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
        const ind = document.createElement('div')
        ind.className = 'lane-indicator';
        ind.style.left = i * 100 + 'px';
        ind.innerText = indicators[i];
        game.appendChild(ind);
    }

    updateScore();
    messageEl.innerText = '';
    music.currentTime = 0;
    music.play();
    

}