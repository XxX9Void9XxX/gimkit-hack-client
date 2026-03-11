// Core hack state
window.gimkitHacks = {
    money: false, speed: false, jump: false, god: false, answers: false
};

// Logging bridge
function hackLog(msg) {
    window.parent.postMessage({type: 'hackLog', message: msg}, '*');
}

// Main hack loop (runs in game context)
setInterval(() => {
    // Infinite Money
    if (window.gimkitHacks.money) {
        const moneyEls = document.querySelectorAll('[data-test="money"], [class*="money"], [class*="cash"]');
        moneyEls.forEach(el => {
            el.textContent = '999999';
            el.dispatchEvent(new Event('input', {bubbles: true}));
        });
    }

    // Speed hack
    if (window.gimkitHacks.speed) {
        const player = document.querySelector('[data-player], [class*="player"]') || document.body;
        player.style.setProperty('--speed-multiplier', '10', 'important');
        player.style.transition = 'none';
    }

    // Jump hack
    if (window.gimkitHacks.jump) {
        document.documentElement.style.setProperty('--jump-height', '1000px', 'important');
    }

    // God mode
    if (window.gimkitHacks.god) {
        const healthEls = document.querySelectorAll('[data-test="health"], [class*="health"], [class*="hp"]');
        healthEls.forEach(el => {
            el.style.width = '100%';
            el.textContent = '100/100';
        });
    }

}, 50);

// Auto-answer bot
setInterval(() => {
    if (window.gimkitHacks.answers) {
        const question = document.querySelector('[data-test="question"], [class*="question"]');
        if (question) {
            const options = Array.from(question.querySelectorAll('button, [data-test="option"], [class*="option"]'));
            if (options.length > 0) {
                options[0].click(); // Gimkit usually puts correct answer first
                hackLog('🤖 Auto-answered question');
            }
        }
    }
}, 200);

// Powerup unlocker
function unlockAllPowerups() {
    const powerups = document.querySelectorAll('[data-powerup], [class*="powerup"]');
    powerups.forEach(p => {
        p.style.display = 'block';
        p.style.opacity = '1';
        p.disabled = false;
    });
}

// Store unlocker
function unlockStore() {
    const storeItems = document.querySelectorAll('[data-test="shop-item"], [class*="shop"], [class*="store"]');
    storeItems.forEach(item => {
        item.style.filter = 'none';
        item.disabled = false;
        const priceEl = item.querySelector('[class*="price"]');
        if (priceEl) priceEl.textContent = '0';
    });
}

// Expose controls to parent window
window.toggleHack = function(type) {
    if (type === 'all') {
        Object.keys(window.gimkitHacks).forEach(k => {
            window.gimkitHacks[k] = !window.gimkitHacks[k];
        });
    } else {
        window.gimkitHacks[type] = !window.gimkitHacks[type];
    }
    hackLog(`${type.toUpperCase()}: ${window.gimkitHacks[type] ? 'ON' : 'OFF'}`);
};

window.maxPowerups = unlockAllPowerups;
window.unlockStore = unlockStore;

hackLog('🔥 Hacks injected successfully!');
