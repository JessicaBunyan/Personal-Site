console.log(document.getElementById("wave"));
const needsPolyfill =
  getComputedStyle(document.getElementById("wave")).animationTimeline ===
  undefined;

if (needsPolyfill) {
  var script = document.createElement("script");
  script.src =
    "https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js";
  document.head.appendChild(script);
}

function rand(min, max) {
  // min and max included
  return Math.random() * (max - min + 1) + min;
}

let isGooseHidden = false;
let canUnhideGoose = false;

const throttle = (fn, delay) => {
  let time = Date.now();

  return () => {
    if (time + delay - Date.now() <= 0) {
      fn();
      time = Date.now();
    }
  };
};

let triggerPoint = null;
function setTriggerPoint() {
  triggerPoint = rand(600, document.scrollingElement.scrollHeight - 300);
}
setTriggerPoint();

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

// window.addEventListener("scroll", throttle(tick, 5));
window.addEventListener("keydown", (e) => {
  if (e.key == "g") {
    console.log("adding goose");
    addGoose();
    console.log(document.getElementById("wave").style.animationTimeline);
    console.log(document.getElementById("wave").style);
  }
});

document.addEventListener("readystatechange", (event) => {
  if (document.readyState === "complete") {
    window.setTimeout(() => {
      const entries = performance.getEntriesByType("navigation");
      // const entries = performance.getEntries();
      console.log("HTML+CSS load: " + +"ms");
      const time = entries[0].domContentLoadedEventEnd;
      Math.round();
      const timeStr =
        time > 1000 ? (time / 1000).toFixed(1) + "s" : Math.round(time) + "ms";
      document.getElementById("content-load-time").innerText = timeStr;
      console.log("full load (incl fonts etc): " + entries[0].loadEventEnd);

      console.log(JSON.parse(JSON.stringify(entries[0])));
      console.log(entries[0]);
    }, 10);
  }
});
