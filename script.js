document.addEventListener("DOMContentLoaded", () => {

  const bgSound = document.getElementById("bgSound");
  const touchScreen = document.getElementById("touchScreen");
  const touchText = document.getElementById("touchText");

  let interactionCount = 0;

  // 🔊 звук (без connectAudio — чтобы не ломалось)
  function playBgSound() {
    if (!bgSound) return;

    bgSound.volume = 0;

    const playPromise = bgSound.play();

    if (playPromise !== undefined) {
      playPromise.catch(err => {
        console.log("Audio blocked until user interaction");
      });
    }

    fadeInAudio(bgSound, 0.4, 2000);
  }

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

  // 👉 старт по кнопке (ВАЖНО)
  window.start = function () {
    switchScreen("intro", "touchScreen");
    playBgSound();
  };

  // 🌊 касания / клики
  touchScreen.addEventListener("pointerdown", createWave);

  function createWave(e) {
    if (!touchScreen.classList.contains("active")) return;

    const x = e.clientX;
    const y = e.clientY;

    createSingleWave(x, y, 0);
    createSingleWave(x, y, 120);
    createSingleWave(x, y, 240);

    // 💡 вспышка
    document.body.style.background =
      `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.08), black 60%)`;

    setTimeout(() => {
      document.body.style.background = "black";
    }, 300);

    playTouchSound();

    interactionCount++;

    if (interactionCount === 3) {
      touchText.innerText = "this is how it feels";
    }

    if (interactionCount === 6) {
      touchText.innerText = "the closer you are...\nthe stronger it becomes";
    }

    if (interactionCount >= 9) {
      switchScreen("touchScreen", "final");
    }
  }

  function createSingleWave(x, y, delay) {
    setTimeout(() => {
      const wave = document.createElement("div");
      wave.classList.add("wave");

      wave.style.left = (x - 175) + "px";
      wave.style.top = (y - 175) + "px";

      document.body.appendChild(wave);

      setTimeout(() => wave.remove(), 1800);
    }, delay);
  }

  function playTouchSound() {
    const touchSound = new Audio("ambient.mp3");
    touchSound.volume = 0.05;

    touchSound.play().catch(() => {
      console.log("touch sound blocked");
    });
  }

});