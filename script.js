const screen1 = document.getElementById('screen1');
        const screen2 = document.getElementById('screen2');
        const startScreen = document.getElementById('start-screen');
        const rhythmGameScreen = document.getElementById('rhythm-game');
        const music = document.getElementById('music');
        const game = document.getElementById('game');
        const scoreEl = document.getElementById('score');
        const messageEl = document.getElementById('message');
        const startGameBtn = document.getElementById('start-game-btn');
        const nextScreenBtn = document.getElementById('next-screen-btn');

        let notes = [];
        let hits = 0;
        let misses = 0;
        let gameActive = false;
        let animationId = null;
        
        const totalNotes = 12;
        const lanes = ['←', '↑', '↓', '→'];

        const keyToLane = {
            'ArrowLeft': 0, 'a': 0, 'A': 0,
            'ArrowUp': 1, 'w': 1, 'W': 1,
            'ArrowDown': 2, 's': 2, 'S': 2,
            'ArrowRight': 3, 'd': 3, 'D': 3,
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
                resetGameUI();
            }
        }

        function resetGameUI() {
            startGameBtn.classList.add('show');
            nextScreenBtn.classList.remove('show');
            messageEl.innerText = '';
            game.innerHTML = '';
            scoreEl.innerText = 'Hits: 0, Misses: 0';
        }

        function startGameButton() {
            startGameBtn.classList.remove('show');
            startGame();
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
            gameActive = true; 
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

            if (music) {
                music.currentTime = 0;
                music.play();
            }

            animate();

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
                gameActive = false; 
                if (music) {
                    music.pause();
                }
                
                if (hits >= 10) {
                    messageEl.innerText = '🎉 You Win! 🎉';
                    nextScreenBtn.classList.add('show'); 
                } else {
                    messageEl.innerText = `You got ${hits}/12. Need 10 to win. Try Again in 2 seconds...`;
                    setTimeout(() => {
                        startGameBtn.classList.add('show');
                        startGame();
                    }, 2000);
                }
            }
        }

        function animate() {
            if (!gameActive) return;
            
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
            
            animationId = requestAnimationFrame(animate);
        }

        document.addEventListener('keydown', e => {
            const key = e.key;
            
            if (key.startsWith('Arrow')) {
                e.preventDefault();
            }
            
            if (keyToLane.hasOwnProperty(key) && gameActive) {
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