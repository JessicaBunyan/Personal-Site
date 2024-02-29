import "https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js";

function rand(min, max) {
  // min and max included
  return Math.random() * (max - min + 1) + min;
}
let isGooseHidden = false;
let canUnhideGoose = false;
let totalScrollDistance = 0;
let prevScrollPosition = 0;
const speedFactor = 0.5;
const gooseAngle = 0.3;

const wave = document.getElementById("wave");

const start = "M 0 420 ";

// const wavesPerScreen = Math.floor(window.innerWidth / 300);
const wavesPerScreen = 6;
const overflowFactor = 5;
const numWaves = wavesPerScreen * overflowFactor;
const totalWidth = Math.max(1500, window.innerWidth) * overflowFactor;
const waveWidth = totalWidth / numWaves;
const waveWidthVariance = 0.1 * waveWidth;
let path = "";
let penX = 0;
let prevY = 420;
const maxWavePeak = 50;
const minWavePeak = 370;
const minWaveHeight = 100;

const points = [[0, 420]];

const getY = () => {};

for (let i = 0; i < numWaves; i++) {
  const isUp = i % 2 === 0;
  const thisWaveWidth = rand(
    waveWidth - waveWidthVariance,
    waveWidth + waveWidthVariance
  );
  const x = penX + thisWaveWidth;

  let y = prevY;
  // do {
  y = rand(
    isUp ? prevY + minWaveHeight : prevY - minWaveHeight,
    isUp ? minWavePeak : maxWavePeak
  );
  // console.log(Math.abs(y - prevY));
  //   // y = rand(0, 420);
  // } while (Math.abs(y - prevY) < 100);

  points.push([x, y]);

  penX = x;
  prevY = y;
}

// points.sort((a, b) => a[0] - b[0]);
// points.forEach((point, index) => (point[1] = point[1] - index * 15));
points.push([totalWidth, 420]);

path = "M" + points[0][0] + "," + points[0][1];

for (let i = 0; i < points.length - 1; i++) {
  const xMid = (points[i][0] + points[i + 1][0]) / 2;
  const yMid = (points[i][1] + points[i + 1][1]) / 2;
  const cpX1 = (xMid + points[i][0]) / 2;
  const cpX2 = (xMid + points[i + 1][0]) / 2;
  path +=
    "Q " +
    cpX1 +
    ", " +
    points[i][1] +
    ", " +
    xMid +
    ", " +
    yMid +
    (" Q " +
      cpX2 +
      ", " +
      points[i + 1][1] +
      ", " +
      points[i + 1][0] +
      ", " +
      points[i + 1][1]);
}

// const path = "C 20 20, 40 40, 90 90 C 400 400, 250 260, 300 300";
const end = `L ${totalWidth} 420 Z`;
// wave.style.clipPath = `path("${start}${path} ${end}")`;
wave.style.clipPath = `path("${path} ${end}")`;

function positionWave() {
  const wave = document.getElementById("wave");
  // const diff = Math.abs(
  //   document.scrollingElement.scrollTop - prevScrollPosition
  // );
  // totalScrollDistance = totalScrollDistance + diff;
  const waveMovement = document.scrollingElement.scrollTop * speedFactor;
  // const waveMovement = totalScrollDistance * speedFactor;
  // prevScrollPosition = document.scrollingElement.scrollTop;
  const waveLeft = -300 - waveMovement + "px";
  wave.style.left = waveLeft;
}

function positionGoose() {
  if (isGooseHidden) {
    return false;
  }

  const goose = document.getElementById("goose1");
  const scrollBottom = document.scrollingElement.scrollTop + window.innerHeight;
  const gooseMovement =
    (document.body.scrollHeight - scrollBottom) * speedFactor;

  const gooseEndLeft = 100;
  const gooseTravelDistance = gooseMovement - gooseEndLeft;
  const gooseLeft = `calc(100% - ${gooseTravelDistance}px)`;
  const gooseBottom = 550 - gooseMovement * gooseAngle + "px";
  // console.log(gooseBottom);

  goose.style.left = gooseLeft;
  goose.style.bottom = gooseBottom;
  return gooseTravelDistance < 0;
}

const throttle = (fn, delay) => {
  // Capture the current time
  let time = Date.now();

  // Here's our logic
  return () => {
    if (time + delay - Date.now() <= 0) {
      // Run the function we've passed to our throttler,
      // and reset the `time` variable (so we can check again).
      fn();
      time = Date.now();
    }
  };
};

console.log(document.scrollingElement.scrollHeight);

let triggerPoint = null;
function setTriggerPoint() {
  triggerPoint = rand(600, document.scrollingElement.scrollHeight - 300);
}
setTriggerPoint();
console.log(triggerPoint);

const addGoose = () => {
  const waveContainer = document.getElementById("wave-container");

  const baseAnimationSpeed = 3000; // pixels per second
  const goose = document.createElement("img");
  goose.src = "../assets/goose.png";
  goose.classList.add("goose1");
  waveContainer.appendChild(goose); //#endregion
  // goose.style.top = triggerPoint + "px";

  //TODO lets organise the animation trigger separately to its creation ?

  goose.style.top =
    document.scrollingElement.scrollTop + window.innerHeight * 1.1 + "px";
  // goose.style.animationDuration =
  //   window.innerWidth / baseAnimationSpeed + "s";
  goose.style.animationDuration = window.innerWidth / baseAnimationSpeed + "s";
  console.log(goose.style.animationDuration);
};

addGoose();
addGoose();
const tick = () => {
  if (
    triggerPoint &&
    document.scrollingElement.scrollTop +
      document.scrollingElement.scrollHeight >
      triggerPoint
  ) {
    addGoose();
    triggerPoint = null;
    window.setTimeout(() => {
      setTriggerPoint();
      //   document.getElementsByClassName("goose1")[0].remove();
    }, 5000);
  }
  //   positionWave();
  const isGooseJourneyComplete = false; // positionGoose();
  const goose = document.getElementById("goose1");

  if (document.scrollingElement.scrollTop < 5 && canUnhideGoose) {
    goose.style.display = "block";
    isGooseHidden = false;
    canUnhideGoose = false;
    console.log("unhiding");
  }

  if (isGooseJourneyComplete && !isGooseHidden) {
    isGooseHidden = true;
    window.setTimeout(() => (canUnhideGoose = true), 150);
    goose.style.display = "none";
    console.log("hiding");
  }
};

window.addEventListener("scroll", throttle(tick, 5));
window.addEventListener("keydown", (e) => {
  if (e.key == "g") {
    console.log("adding goose");
    addGoose();
  }
});
