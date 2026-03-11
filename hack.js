let hacks = {
    infiniteMoney: false,
    speedHack: false,
    jumpHack: false,
    godMode: false,
    answerBot: false
};

let logElement = document.getElementById('log');
let statusElement = document.getElementById('status');

function log(message) {
    logElement.innerHTML += `[${new Date().toLocaleTimeString()}] ${message}<br>`;
    logElement.scrollTop = logElement.scrollHeight;
    console.log(message);
}

function updateStatus() {
    let activeCount = Object.values(hacks).filter(Boolean).length;
    statusElement.innerHTML = `Status: ${activeCount} hacks active | Inject into Gimkit game tab`;
}

// Money hacks
function toggleMoneyHack() {
    hacks.infiniteMoney = !hacks.infiniteMoney;
    log(`Infinite Money: ${hacks.infiniteMoney ? 'ON' : 'OFF'}`);
    updateStatus();
}

function setMoney(amount) {
    let moneyEl = document.querySelector('[data-test="money"]') || 
                  document.querySelector('.money') || 
                  document.querySelector('[class*="money"]');
    if (moneyEl) {
        moneyEl.textContent = amount;
        log(`Money set to $${amount}`);
    } else {
        log('Money element not found - waiting for game load');
    }
}

// Player hacks
function toggleSpeedHack() {
    hacks.speedHack = !hacks.speedHack;
    log(`Speed Hack: ${hacks.speedHack ? 'ON' : 'OFF'}`);
    updateStatus();
}

function toggleJumpHack() {
    hacks.jumpHack = !hacks.jumpHack;
    log(`Jump Hack: ${hacks.jumpHack ? 'ON' : 'OFF'}`);
    updateStatus();
}

function godModeToggle() {
    hacks.godMode = !hacks.godMode;
    log(`God Mode: ${hacks.godMode ? 'ON' : 'OFF'}`);
    updateStatus();
}

// Answer bot
function toggleAnswerBot() {
    hacks.answerBot = !hacks.answerBot;
    log(`Answer Bot: ${hacks.answerBot ? 'ON' : 'OFF'}`);
    updateStatus();
    if (hacks.answerBot) runAnswerBot();
}

// Powerups
function maxPowerups() {
    let powerups = document.querySelectorAll('[class*="powerup"], [data-powerup]');
    powerups.forEach(p => p.style.opacity = '1');
    log('Max powerups activated');
}

// Main hack loop
setInterval(() => {
    if (!window.location.href.includes('gimkit.com')) {
        statusElement.innerHTML = 'Status: Open Gimkit game first!';
        return;
    }

    // Infinite money
    if (hacks.infiniteMoney) {
        let moneyElements = document.querySelectorAll('[class*="money"], [data-test*="money"]');
        moneyElements.forEach(el => el.textContent = '999999');
    }

    // Speed hack
    if (hacks.speedHack) {
        let player = document.querySelector('[class*="player"]') || document.body;
        player.style.transform = 'scale(1.5)';
        player.style.transition = 'none';
    }

    // Jump hack
    if (hacks.jumpHack) {
        document.body.style.setProperty('--jump-height', '500px', 'important');
    }

    // God mode
    if (hacks.godMode) {
        let healthEls = document.querySelectorAll('[class*="health"]');
        healthEls.forEach(el => el.style.width = '100%');
    }

}, 100);

// Answer bot
async function runAnswerBot() {
    while (hacks.answerBot) {
        let question = document.querySelector('.question, [class*="question"]');
        if (question) {
            let options = Array.from(question.querySelectorAll('button, [class*="option"]'));
            if (options.length > 0) {
                options[0].click(); // Click first option (usually correct in Gimkit)
                log('Auto-answered question');
            }
        }
        await new Promise(r => setTimeout(r, document.getElementById('answerDelay').value));
    }
}

function toggleAllHacks() {
    hacks.infiniteMoney = !hacks.infiniteMoney;
    hacks.speedHack = !hacks.speedHack;
    hacks.jumpHack = !hacks.jumpHack;
    hacks.godMode = !hacks.godMode;
    hacks.answerBot = !hacks.answerBot;
    log('All hacks toggled');
    updateStatus();
}

updateStatus();
log('Gimkit Hack Client loaded! Open a Gimkit game and enable hacks.');
