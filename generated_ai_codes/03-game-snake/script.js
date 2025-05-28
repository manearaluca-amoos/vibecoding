// Game configuration
const nGridSize = 20;
const nCellSize = 20;
const oSpeedLevels = {
    1: 250,  // Slow
    2: 200,  // Medium
    3: 150,  // Fast
    4: 100   // Very Fast
};
const nScorePerLevel = 50; // Points needed to advance to next level

// Game state variables
let nScore = 0;
let nCurrentLevel = 1;
let nHighestLevel = 1;
let bGameOver = false;
let bGameStarted = false;
let nIntervalId = null;

// Canvas setup
const $oCanvas = $('#gameCanvas');
const oCtx = $oCanvas[0].getContext('2d');
$oCanvas[0].width = nGridSize * nCellSize;
$oCanvas[0].height = nGridSize * nCellSize;

// Snake initial state
let arrSnake = [
    { x: Math.floor(nGridSize / 2), y: Math.floor(nGridSize / 2) }
];
let oDirection = { x: 0, y: 0 };
let oFood = generateFood();

// Audio elements
const $oEatSound = $('#eatSound');
const $oCrashSound = $('#crashSound');

// DOM elements
const $oScoreElement = $('#scoreValue');
const $oCurrentLevelElement = $('#currentLevel');
const $oFinalScoreElement = $('#finalScore');
const $oFinalLevelElement = $('#finalLevel');
const $oGameOverElement = $('#gameOver');
const $oStartButton = $('#startButton');
const $oRestartButton = $('#restartButton');
const $oStartLevel = $('#startLevel');

// Event listeners
$(document).on('keydown', handleKeyPress);
$oStartButton.on('click', startGame);
$oRestartButton.on('click', resetGame);

function handleKeyPress(oEvent) {
    if (!bGameStarted) return;

    switch (oEvent.key) {
        case 'ArrowUp':
            if (oDirection.y !== 1) {
                oDirection = { x: 0, y: -1 };
            }
            break;
        case 'ArrowDown':
            if (oDirection.y !== -1) {
                oDirection = { x: 0, y: 1 };
            }
            break;
        case 'ArrowLeft':
            if (oDirection.x !== 1) {
                oDirection = { x: -1, y: 0 };
            }
            break;
        case 'ArrowRight':
            if (oDirection.x !== -1) {
                oDirection = { x: 1, y: 0 };
            }
            break;
    }
}

function startGame() {
    if (!bGameStarted) {
        bGameStarted = true;
        nCurrentLevel = parseInt($oStartLevel.val());
        nHighestLevel = nCurrentLevel;
        updateLevelDisplay();
        oDirection = { x: 1, y: 0 }; // Start moving right
        $oStartButton.hide();
        gameLoop();
    }
}

function resetGame() {
    // Reset game state
    arrSnake = [{ x: Math.floor(nGridSize / 2), y: Math.floor(nGridSize / 2) }];
    oDirection = { x: 0, y: 0 };
    oFood = generateFood();
    nScore = 0;
    nCurrentLevel = 1;
    nHighestLevel = 1;
    bGameOver = false;
    bGameStarted = false;
    
    // Reset UI
    $oScoreElement.text('0');
    updateLevelDisplay();
    $oGameOverElement.hide();
    $oStartButton.show();
    
    // Clear any existing game loop
    if (nIntervalId) {
        clearInterval(nIntervalId);
        nIntervalId = null;
    }
    
    // Clear canvas
    drawGame();
}

function generateFood() {
    let oNewFood;
    do {
        oNewFood = {
            x: Math.floor(Math.random() * nGridSize),
            y: Math.floor(Math.random() * nGridSize)
        };
    } while (arrSnake.some(oSegment => oSegment.x === oNewFood.x && oSegment.y === oNewFood.y));
    return oNewFood;
}

function gameLoop() {
    if (nIntervalId) {
        clearInterval(nIntervalId);
    }
    
    nIntervalId = setInterval(() => {
        if (!bGameOver && bGameStarted) {
            moveSnake();
            checkCollision();
            if (!bGameOver) {
                drawGame();
            }
        }
    }, oSpeedLevels[nCurrentLevel]);
}

function moveSnake() {
    const oHead = { ...arrSnake[0] };
    oHead.x += oDirection.x;
    oHead.y += oDirection.y;
    arrSnake.unshift(oHead);
    
    if (oHead.x === oFood.x && oHead.y === oFood.y) {
        // Snake ate food
        nScore += 10;
        $oScoreElement.text(nScore);
        checkLevelUp();
        oFood = generateFood();
        $oEatSound[0].currentTime = 0;
        $oEatSound[0].play();
    } else {
        arrSnake.pop();
    }
}

function checkLevelUp() {
    const nNewLevel = Math.min(4, Math.floor(nScore / nScorePerLevel) + 1);
    if (nNewLevel > nCurrentLevel) {
        nCurrentLevel = nNewLevel;
        nHighestLevel = Math.max(nHighestLevel, nCurrentLevel);
        updateLevelDisplay();
        // Restart game loop with new speed
        gameLoop();
    }
}

function updateLevelDisplay() {
    $oCurrentLevelElement.text(nCurrentLevel);
}

function checkCollision() {
    const oHead = arrSnake[0];
    
    // Check wall collision
    if (oHead.x < 0 || oHead.x >= nGridSize || oHead.y < 0 || oHead.y >= nGridSize) {
        endGame();
        return;
    }
    
    // Check self collision
    for (let i = 1; i < arrSnake.length; i++) {
        if (oHead.x === arrSnake[i].x && oHead.y === arrSnake[i].y) {
            endGame();
            return;
        }
    }
}

function drawGame() {
    // Clear canvas
    oCtx.fillStyle = getComputedStyle(document.documentElement)
        .getPropertyValue('--nokia-bg').trim();
    oCtx.fillRect(0, 0, $oCanvas[0].width, $oCanvas[0].height);
    
    // Draw snake with effects
    const nGlowSize = 15;
    const nShadowBlur = 10;
    oCtx.shadowColor = 'rgba(76, 175, 80, 0.3)';
    oCtx.shadowBlur = nShadowBlur;
    oCtx.fillStyle = getComputedStyle(document.documentElement)
        .getPropertyValue('--nokia-pixel').trim();

    // Draw snake body with gradient
    arrSnake.forEach((oSegment, nIndex) => {
        // Create gradient for each segment
        const oGradient = oCtx.createRadialGradient(
            oSegment.x * nCellSize + nCellSize/2,
            oSegment.y * nCellSize + nCellSize/2,
            0,
            oSegment.x * nCellSize + nCellSize/2,
            oSegment.y * nCellSize + nCellSize/2,
            nCellSize
        );

        // Head has different color than body
        if (nIndex === 0) {
            oGradient.addColorStop(0, '#66BB6A');
            oGradient.addColorStop(1, '#43A047');
            oCtx.shadowBlur = nShadowBlur + 5; // Stronger glow for head
        } else {
            oGradient.addColorStop(0, '#4CAF50');
            oGradient.addColorStop(1, '#388E3C');
            oCtx.shadowBlur = nShadowBlur;
        }

        oCtx.fillStyle = oGradient;
        
        // Draw rounded rectangle for each segment
        const nRadius = 4;
        const nX = oSegment.x * nCellSize;
        const nY = oSegment.y * nCellSize;
        const nWidth = nCellSize - 1;
        const nHeight = nCellSize - 1;

        oCtx.beginPath();
        oCtx.moveTo(nX + nRadius, nY);
        oCtx.lineTo(nX + nWidth - nRadius, nY);
        oCtx.quadraticCurveTo(nX + nWidth, nY, nX + nWidth, nY + nRadius);
        oCtx.lineTo(nX + nWidth, nY + nHeight - nRadius);
        oCtx.quadraticCurveTo(nX + nWidth, nY + nHeight, nX + nWidth - nRadius, nY + nHeight);
        oCtx.lineTo(nX + nRadius, nY + nHeight);
        oCtx.quadraticCurveTo(nX, nY + nHeight, nX, nY + nHeight - nRadius);
        oCtx.lineTo(nX, nY + nRadius);
        oCtx.quadraticCurveTo(nX, nY, nX + nRadius, nY);
        oCtx.closePath();
        oCtx.fill();

        // Add highlight effect
        oCtx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        oCtx.beginPath();
        oCtx.arc(
            nX + nCellSize/2,
            nY + nCellSize/2,
            nCellSize/4,
            0,
            Math.PI * 2
        );
        oCtx.fill();
    });
    
    // Reset shadow for food
    oCtx.shadowBlur = 0;
    
    // Draw food with pulsing effect
    const nTime = Date.now() / 1000;
    const nPulse = Math.sin(nTime * 4) * 0.1 + 0.9; // Pulsing between 0.8 and 1
    const nFoodSize = nCellSize * nPulse;
    const nFoodOffset = (nCellSize - nFoodSize) / 2;

    // Create gradient for food
    const oFoodGradient = oCtx.createRadialGradient(
        oFood.x * nCellSize + nCellSize/2,
        oFood.y * nCellSize + nCellSize/2,
        0,
        oFood.x * nCellSize + nCellSize/2,
        oFood.y * nCellSize + nCellSize/2,
        nCellSize/2
    );
    oFoodGradient.addColorStop(0, '#FF5252');
    oFoodGradient.addColorStop(1, '#D32F2F');

    oCtx.fillStyle = oFoodGradient;
    oCtx.shadowColor = 'rgba(255, 82, 82, 0.5)';
    oCtx.shadowBlur = 15;
    
    // Draw food as a circle
    oCtx.beginPath();
    oCtx.arc(
        oFood.x * nCellSize + nCellSize/2,
        oFood.y * nCellSize + nCellSize/2,
        nFoodSize/2 - 1,
        0,
        Math.PI * 2
    );
    oCtx.fill();

    // Reset shadow
    oCtx.shadowBlur = 0;
}

function endGame() {
    bGameOver = true;
    $oCrashSound[0].currentTime = 0;
    $oCrashSound[0].play();
    $oFinalScoreElement.text(nScore);
    $oFinalLevelElement.text(nHighestLevel);
    $oGameOverElement.show();
    clearInterval(nIntervalId);
} 