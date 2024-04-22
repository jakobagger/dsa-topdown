"use strict"

window.addEventListener("load", start);

let lastTimeStamp = 0;

const tiles = [
  [1,4,4,4,4,0,3,0,0,2,2,2,0,3,3,3,3],
  [1,1,1,1,1,1,1,1,2,2,2,2,0,0,0,0,0],
  [3,3,3,0,0,1,1,1,2,2,2,2,0,0,0,0,0],
  [3,3,3,0,0,1,1,1,2,2,2,2,0,0,0,0,0],
  [3,3,3,0,0,1,1,1,2,2,2,2,0,0,0,0,0],
  [3,3,3,0,0,1,1,1,2,2,2,2,0,0,0,0,0],
  [3,3,3,0,0,1,1,1,2,2,2,2,0,0,0,0,0],
  [3,3,3,0,0,1,1,1,2,2,2,2,0,0,0,0,0],
  [3,3,3,0,0,1,1,1,2,2,2,2,0,0,0,0,0],
  [3,3,3,0,0,1,1,1,2,2,2,2,0,0,0,0,0],
  [3,3,3,0,0,1,1,1,2,2,2,2,0,0,0,0,0],
  [3,3,3,0,0,1,1,1,2,2,2,2,0,0,0,0,0],
]

const GRID_HEIGHT = tiles.length;
const GRID_WIDTH = tiles[0].length;
const TILE_SIZE = 32;

function createTiles(){
  const background = document.getElementById("background");

  for(let i=0; i < GRID_HEIGHT; i++){
     for(let j=0; j < GRID_WIDTH; j++){
      const tile = document.createElement("tile");
      tile.classList.add("tile");
      background.append(tile);
     } 
  }
  background.style.setProperty("--GRID_WIDTH", GRID_WIDTH);
  background.style.setProperty("--GRID_HEIGHT", GRID_HEIGHT);
  background.style.setProperty("--TILE_SIZE", TILE_SIZE+"px");
}

function displayTiles(){ 
  const visualTiles = document.querySelectorAll("#background .tile");

  for(let i = 0; i < GRID_HEIGHT; i++){
      for(let j = 0; j < GRID_WIDTH; j++){
          const modelTile = getTileAtCoord( {row: i, col: j} )
          const visualTile = visualTiles[i * GRID_WIDTH + j];

          visualTile.classList.add( getClassForTileType( modelTile ));
      }
  }
}

function getClassForTileType(tiletype){
  switch(tiletype){
      case 0: return "grass";
      case 1: return "path";
      case 2: return "water";
      case 3: return "tree";
      case 4: return "flower";
      case 5: return "planks";
      case 6: return "housewall";
      case 7: return "pot";
      case 8: return "floor";
      case 9: return "door";
      case 10: return "fencehor";
      case 11: return "fencever";
      case 12: return "gold";
      case 13: return "chest";
      case 14: return "abyss";
      case 15: return "cliff";
      case 16: return "floor_carpet";
      case 17: return "mine";
      case 18: return "wall";
      case 19: return "gate";
      //default: return "unknown";
  }
}



function start(){
    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);
    requestAnimationFrame(tick);
    createTiles();
    displayTiles();
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

function getTileAtCoord( {row, col} ){
  return tiles[row][col];
}

function coordFromPos({x, y}){
  const row = Math.floor(y/TILE_SIZE);
  const col = Math.floor(x/TILE_SIZE);
  const coord = {row, col}
  return coord;
}

function posFromCoord( {row, col} ){
  const x = col * TILE_SIZE;
  const y = row * TILE_SIZE;
  const pos = { x, y };
  return pos;
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