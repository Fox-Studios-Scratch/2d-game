# Fox's 2D Shooter Game Overview

## Introduction
This is a simple 2D shooter game implemented in JavaScript, utilizing the HTML5 canvas element. The game allows players to control a player character, shoot bullets, and eliminate enemies to score points. The code is designed to run directly in a web browser.

## Features
- **Player Character:** The game features a player character that can be controlled using the left and right arrow keys.
- **Shooting Mechanism:** Bullets are fired when the Spacebar key is pressed, allowing the player to eliminate enemies.
- **Enemy Spawning:** Enemies spawn at random intervals from the top of the screen and move downward, posing a threat to the player.
- **Collision Detection:** The game includes collision detection between bullets and enemies. When a bullet hits an enemy, both are removed, and the player's score increases.
- **Health System:** The player has a health indicator, and the game ends when the player's health reaches zero.

## Additional Features
- **Highest Score:** The game keeps track of the highest score achieved. The highest score is displayed on the screen and updated at the end of each game if a new high score is reached.
- **Game Over Screen:** When the player's health reaches zero, a "Game Over" message is displayed on the screen, and the game resets for a new session.

## Code Structure
- **HTML File:** The HTML file includes a canvas element with the ID "gameCanvas" where the game is rendered.
- **JavaScript (game.js):** The JavaScript file contains the game logic, including player movement, shooting, enemy spawning, collision detection, and score tracking.

## How to Play
1. Open the HTML file in a web browser.
2. Use the left and right arrow keys to move the player character.
3. Press the Spacebar to shoot bullets and eliminate enemies.
4. Avoid collisions with enemies to prevent health depletion.
5. Aim to achieve the highest score possible.

## Notes
- Ensure that the Spacebar and arrow keys are functioning correctly.
- The game may be affected by browser-specific behaviors. Test in different browsers if issues arise.

## Versions
v1.0.0 | Initial Release
