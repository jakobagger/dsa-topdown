"use strict"

window.addEventListener("load", start);

function start(){
    console.log("Ready to go");
    requestAnimationFrame(tick);
}

// MODEL
const player = {
    x: 0,
    y: 0
}

function tick(){
    requestAnimationFrame(tick);
   
    displayPlayerAtPosition();
}

// VIEW
function displayPlayerAtPosition(){
    const visualPlayer = document.getElementById("player");
    visualPlayer.style.translate = `${player.x}px ${player.y}px`;
}