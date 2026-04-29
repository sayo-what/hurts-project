document.addEventListener("DOMContentLoaded", () => {

  const bgSound = document.getElementById("bgSound");
  const touchScreen = document.getElementById("touchScreen");
  const touchText = document.getElementById("touchText");

  let interactionCount = 0;

  /* ===== START ===== */

  window.start = function () {
    switchScreen("intro", "touchScreen");

    bgSound.volume = 0;
    bgSound.play();

    fadeInAudio(bgSound, 0.4, 2000);
  };

  function fadeInAudio(audio, targetVolume, duration) {
    let step = 0.01;
    let interval = duration / (targetVolume / step);

    let fade = setInterval(() => {
      if (audio.volume < targetVolume) {
        audio.volume = Math.min(audio.volume + step, targetVolume);
      } else {
        clearInterval(fade);
      }
    }, interval);
  }

  function switchScreen(from, to) {
    document.getElementById(from).classList.remove("active");
    document.getElementById(to).classList.add("active");
  }

  /* ===== TOUCH ===== */

  touchScreen.addEventListener("pointerdown", createWave);

  function createWave(e) {
    if (!touchScreen.classList.contains("active")) return;

    const x = e.clientX;
    const y = e.clientY;

    // 🌊 одна мягкая волна (без "шума")
    createRipple(x, y);

    interactionCount++;

    // 🧠 КАЖДЫЙ ТАП = новый текст
    const messages = [
      "this is how it feels",
      "calm... but deep",
      "something is forming",
      "you are inside it",
      "the closer you are... the stronger it becomes",
      "still here"
    ];

    if (interactionCount <= messages.length) {
      touchText.innerText = messages[interactionCount - 1];
    }

    if (interactionCount >= 6) {
     switchScreen("touchScreen", "final");

      setTimeout(() => {
        const finalScreen = document.getElementById("final");
        const finalText = finalScreen.querySelector(".text");

        finalText.classList.add("fade-out");

        setTimeout(() => {
          resetExperience();
        }, 2000);

      }, 2500);
    }
}
  /* ===== RIPPLE ===== */

  function createRipple(x, y) {
    const wave = document.createElement("div");
    wave.classList.add("wave");

    wave.style.left = (x - 90) + "px";
    wave.style.top = (y - 90) + "px";

    document.body.appendChild(wave);

    setTimeout(() => wave.remove(), 1600);
  }
function resetExperience() {
  interactionCount = 0;

  const finalScreen = document.getElementById("final");
  const finalText = finalScreen.querySelector(".text");

  finalText.classList.remove("fade-out");

  switchScreen("final", "intro");

  const touchText = document.getElementById("touchText");
  touchText.innerText = "Touch the screen";
}
});