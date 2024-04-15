"use strict"

window.addEventListener("load", start);
// CONTROLLER

let lastTimeStamp = 0;

function start(){
    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);
    requestAnimationFrame(tick);
    console.log("Ready to go");
}

function tick(timestamp){
    requestAnimationFrame(tick);

    const deltaTime = (timestamp - lastTimeStamp) / 1000;
    lastTimeStamp = timestamp;

    movePlayer(deltaTime);
    displayPlayerAtPosition();
    displayPlayerAnimation();
}

// MODEL
const player = {
    x: 0,
    y: 0,
    speed: 100,
    moving: false,
    direction: undefined
};

const controls = {
    left: false,
    right: false,
    up: false,
    down: false
}


function keyDown(event){
    if (event.key === "ArrowRight" || event.key === "d"){
      controls.right = true;
    } else if (event.key === "ArrowLeft" || event.key === "a"){
      controls.left = true;
    }else if (event.key === "ArrowUp" || event.key === "w"){
      controls.up = true;
    } else if (event.key === "ArrowDown" || event.key === "s"){
      controls.down = true;
    }
  }

  function keyUp(event){
    if (event.key === "ArrowRight" || event.key === "d"){
      controls.right = false;
    } else if (event.key === "ArrowLeft" || event.key === "a"){
      controls.left = false;
    } else if (event.key === "ArrowUp" || event.key === "w"){
      controls.up = false;
    } else if (event.key === "ArrowDown" || event.key === "s"){
      controls.down = false;
    }
  }

  function movePlayer(deltaTime){

    player.moving = false;

    const newPos = {
      x: player.x,
      y: player.y
    }

    if (controls.left){
        player.moving = true;
        player.direction = "left";
        newPos.x -= player.speed * deltaTime;
    } else if (controls.right){
        player.moving = true;
        player.direction = "right";
        newPos.x += player.speed * deltaTime;
    }

    if (controls.up) {
        player.moving = true;
        player.direction = "up";
        newPos.y -= player.speed * deltaTime;
    } else if (controls.down) {
        player.moving = true;
        player.direction = "down";
        newPos.y += player.speed * deltaTime;
    }

    if (canMove(newPos)){
      player.x = newPos.x;
      player.y = newPos.y;
    }
  }

  function canMove(pos){
    if (pos.x < 0 || pos.x > 484 ||
        pos.y < 0 || pos.y > 341){
      player.moving = false;
      return false;
    } else {
      return true;
    }
  }

// VIEW
function displayPlayerAtPosition(){
    const visualPlayer = document.getElementById("player");
    visualPlayer.style.translate = `${player.x}px ${player.y}px`;
}

function displayPlayerAnimation(){
  const visualPlayer = document.getElementById("player");

  if (player.moving){
    visualPlayer.classList.add("animate");
    visualPlayer.classList.remove("up", "down", "left", "right");
    visualPlayer.classList.add(player.direction);
  } else {
    visualPlayer.classList.remove("animate");
  }
}