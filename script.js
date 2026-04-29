function start() {
  switchScreen("intro", "touchScreen");
}

function switchScreen(from, to) {
  document.getElementById(from).classList.remove("active");
  document.getElementById(to).classList.add("active");
}

let interactionCount = 0;

document.addEventListener("click", createWave);
document.addEventListener("touchstart", createWave);

function createWave(e) {
  const touchScreen = document.getElementById("touchScreen");

  if (!touchScreen.classList.contains("active")) return;

  const x = e.clientX || e.touches[0].clientX;
  const y = e.clientY || e.touches[0].clientY;

  const wave = document.createElement("div");
  wave.classList.add("wave");

  wave.style.left = x - 150 + "px";
  wave.style.top = y - 150 + "px";

  document.body.appendChild(wave);

  setTimeout(() => {
    wave.remove();
  }, 1500);

  interactionCount++;

  const text = document.getElementById("touchText");

  if (interactionCount === 3) {
    text.innerText = "this is how it feels";
  }

  if (interactionCount === 6) {
    text.innerText = "the closer you are...\nthe stronger it becomes";
  }

  if (interactionCount >= 9) {
    switchScreen("touchScreen", "final");
  }
}