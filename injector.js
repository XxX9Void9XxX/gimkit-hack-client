let gameWindow = null;
let hackStatus = 'disconnected';

async function joinGame() {
    const code = document.getElementById('gameCode').value.toUpperCase().trim();
    if (!code || code.length !== 6) {
        log('❌ Enter valid 6-character game code');
        return;
    }

    log(`🚀 Joining game ${code}...`);
    
    // Create invisible iframe for legitimate game
    const iframe = document.createElement('iframe');
    iframe.id = 'gimkitGame';
    iframe.src = `https://gimkit.com/encode/${code}`;
    iframe.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; 
        z-index: 999999; border: none; background: transparent;
    `;
    document.body.appendChild(iframe);

    // Wait for game to load
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    gameWindow = iframe.contentWindow || iframe.contentDocument;
    
    if (gameWindow) {
        log('✅ Game joined successfully! Injecting hacks...');
        injectHacks(gameWindow);
        document.getElementById('status').textContent = 'Status: CONNECTED - Hacks Active';
        document.getElementById('status').className = 'status connected';
        document.getElementById('hackGrid').style.display = 'grid';
    } else {
        log('❌ Failed to access game window');
    }
}

function injectHacks(win) {
    // Inject hack.js into game context
    const script = win.document.createElement('script');
    script.textContent = getHackScript();
    win.document.head.appendChild(script);
}

function getHackScript() {
    return `
        ${hackScript}  // This will be replaced by hack.js content below
        window.hacksReady = true;
    `;
}
