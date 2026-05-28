import sheet from "./song.js";
const { song, player } = sheet;

// 1. CANVAS SETUP
const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");

// Fix resolution distortion once at the start
const rect = c.getBoundingClientRect();
c.width = rect.width;
c.height = rect.height;

// 2. CALCULATE LINE TRACK COORDINATES
const exactThird = c.height / 3;
const topTrackY = Math.floor(exactThird) + 0.5;
const bottomTrackY = Math.floor(2 * exactThird) + 0.5;

// 3. DEFINE PLAYER STATE
const radius = 15;
const circleX = radius + 5;

// This variable keeps track of which line the dot should currently sit on
let playerY = topTrackY;

let incomingNoteY = topTrackY; // default to top line, will update based on song data
let incomingNoteX = c.width; // start off-screen to the right

// 4. LISTEN FOR KEYPRESS (SPACEBAR)
window.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    // Prevent the spacebar from scrolling down the webpage
    event.preventDefault();

    // Toggle the position: if it's on top, move to bottom. Otherwise, move to top.
    if (playerY === topTrackY) {
      playerY = bottomTrackY;
    } else {
      playerY = topTrackY;
    }
  }
});

function getCurrentTime() {
  return player ? player.timer.position : 0;
}

function calculateNoteX(currentTime, phrase) {
  const timeUntilPhrase = phrase.startTime - currentTime;
  const leadTime = 6000;
  const travelDistance = c.width + radius * 2;
  const progress = 1 - timeUntilPhrase / leadTime;
  return c.width + radius - Math.max(0, Math.min(1, progress)) * travelDistance;
}

function drawIncomingNote(currentTime) {
  const nextPhraseIndex = song.phrases.findIndex(
    (phrase) => phrase.startTime > currentTime,
  );
  if (nextPhraseIndex === -1) {
    return;
  }

  const nextPhrase = song.phrases[nextPhraseIndex];
  incomingNoteY = nextPhraseIndex % 2 === 0 ? topTrackY : bottomTrackY;
  incomingNoteX = calculateNoteX(currentTime, nextPhrase);
  if (incomingNoteX < -radius || incomingNoteX > c.width + radius) {
    return;
  }

  ctx.fillStyle = "blue";
  ctx.beginPath();
  ctx.arc(incomingNoteX, incomingNoteY, radius, 0, 2 * Math.PI);
  ctx.fill();
}

function drawStaff() {
  ctx.strokeStyle = "black";
  ctx.lineWidth = 1;

  ctx.beginPath();
  ctx.moveTo(0, topTrackY);
  ctx.lineTo(c.width, topTrackY);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, bottomTrackY);
  ctx.lineTo(c.width, bottomTrackY);
  ctx.stroke();
}

function drawPlayer() {
  ctx.beginPath();
  ctx.arc(circleX, playerY, radius, 0, 2 * Math.PI);
  ctx.fillStyle = "red";
  ctx.fill();
}

// 5. THE GAME LOOP (Draws and Updates the Screen continuously)
function gameLoop() {
  ctx.clearRect(0, 0, c.width, c.height);

  drawStaff();
  drawPlayer();
  drawIncomingNote(getCurrentTime());

  requestAnimationFrame(gameLoop);
}

song.ready.then(() => {
  console.log(song);
  console.log(player);
  c.classList.add("ready");
  gameLoop();
});
