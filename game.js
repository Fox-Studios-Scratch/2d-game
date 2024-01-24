const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Player
const player = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    width: 30,
    height: 30,
    speed: 5
};

// Bullets
const bullets = [];

// Enemies
const enemies = [];

// Score, Highest Score, and Health
let score = 0;
let highestScore = 0; // Initialize highest score
let health = 3;

// Define keys object
const keys = {};

// Handle keyboard input
document.addEventListener("keydown", (event) => {
    keys[event.code] = true;

    // Check if the Spacebar key is pressed
    if (event.code === "Space") {
        shoot();  // shoot when Spacebar is pressed
    }
});

document.addEventListener("keyup", (event) => {
    keys[event.code] = false;
});

// Move the player
function movePlayer() {
    if (keys["ArrowLeft"] && player.x > 0) {
        player.x -= player.speed;
    }
    if (keys["ArrowRight"] && player.x < canvas.width - player.width) {
        player.x += player.speed;
    }
}

// Move bullets
function moveBullets() {
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].y -= 5;
        if (bullets[i].y < 0) {
            bullets.splice(i, 1);
            i--;
        }
    }
}

// Move enemies
function moveEnemies() {
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].y += enemies[i].speed;

        // Remove enemies that reach the bottom
        if (enemies[i].y > canvas.height) {
            enemies.splice(i, 1);
            health--;  // Deduct health when an enemy reaches the bottom
            i--;
        }
    }

    // Spawn a new enemy at random intervals
    if (Math.random() < 0.02) {
        spawnEnemy();
    }
}

// Shoot bullets
function shoot() {
    const bullet = { x: player.x + player.width / 2, y: player.y, width: 5, height: 10 };
    bullets.push(bullet);
}

// Check collisions between bullets and enemies
function checkCollisions() {
    for (let i = bullets.length - 1; i >= 0; i--) {
        for (let j = enemies.length - 1; j >= 0; j--) {
            if (
                bullets[i].x < enemies[j].x + enemies[j].width &&
                bullets[i].x + bullets[i].width > enemies[j].x &&
                bullets[i].y < enemies[j].y + enemies[j].height &&
                bullets[i].y + bullets[i].height > enemies[j].y
            ) {
                // Bullet and enemy collide
                bullets.splice(i, 1);
                enemies.splice(j, 1);
                score++;  // Increase score when a bullet hits an enemy
                break; // Break out of the inner loop after a collision
            }
        }
    }
}


// Spawn enemies
function spawnEnemy() {
    const enemy = {
        x: Math.random() * (canvas.width - 20),
        y: 0,
        width: 20,
        height: 20,
        speed: 2
    };
    enemies.push(enemy);
}

// Display score, highest score, and health
function displayStats() {
    ctx.fillStyle = "#000";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 30);
    ctx.fillText("Highest Score: " + highestScore, 10, 60); // Display highest score
    ctx.fillText("Health: " + health, 10, 90);

    // End the game if health reaches zero
    if (health <= 0) {
        ctx.fillText("Game Over", canvas.width / 2 - 60, canvas.height / 2);
        ctx.fillText("Press Spacebar to Restart", canvas.width / 2 - 120, canvas.height / 2 + 30);

        // Update highest score if the current score is higher
        if (score > highestScore) {
            highestScore = score;
        }

        // Listen for Spacebar to restart the game
        document.addEventListener("keydown", restartOnSpacebar);
    }
}
// Function to restart the game when Spacebar is pressed
function restartOnSpacebar(event) {
    if (event.code === "Space") {
        // Reset game state
        health = 3;
        score = 0;
        bullets.length = 0;
        enemies.length = 0;

        // Remove event listener to prevent multiple restarts
        document.removeEventListener("keydown", restartOnSpacebar);

        // Stop the existing game loop if it's running
        cancelAnimationFrame(animationId);

        // Start a new game loop
        gameLoop();
    }
}

// Draw everything on the canvas
function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player
    ctx.fillStyle = "#00F";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Draw bullets
    ctx.fillStyle = "#F00";
    for (const bullet of bullets) {
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    }

    // Draw enemies
    ctx.fillStyle = "#0F0";
    for (const enemy of enemies) {
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    }
}

// Update game state
function update() {
    movePlayer();
    moveBullets();
    moveEnemies();
    checkCollisions();
    draw();
    displayStats();
}

// Main game loop
function gameLoop() {
    update();
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
