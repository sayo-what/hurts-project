document.addEventListener("DOMContentLoaded", () => {
  const bgSound = document.getElementById("bgSound");
  const touchScreen = document.getElementById("touchScreen");
  const touchText = document.getElementById("touchText");
  const instaBtn = document.getElementById("instaBtn");

  let interactionCount = 0;
  const messages = [
    "Your voice is a hypnotic abyss, alluring with its honesty and depth",
    "A magnetic sound that makes time stand still for a moment.",
    "A deep, velvety timbre that envelops the space like a nocturnal mist",
    "Some voices are heard with the ears",
    "Yours — is felt with the heart..",
    "A luminous echo that guides through the darkest of nights."
  ];

  /* Запуск приложения */
  window.start = function() {
    switchScreen("intro", "touchScreen");
    bgSound.volume = 0;
    bgSound.play().catch(() => console.log("Audio play blocked"));
    fadeInAudio(bgSound, 0.4, 3000);
  };

  function switchScreen(from, to) {
    document.getElementById(from).classList.remove("active");
    document.getElementById(to).classList.add("active");
  }

  /* Обработка кликов по экрану */
  touchScreen.addEventListener("pointerdown", (e) => {
    if (!touchScreen.classList.contains("active")) return;

    createRipple(e.clientX, e.clientY);

    // Если фразы закончились — переходим к финалу
    if (interactionCount >= messages.length) {
      triggerFinal();
      return;
    }

    // Показываем текущую фразу
    touchText.innerText = messages[interactionCount];

    // Сброс и запуск анимации появления
    touchText.classList.remove("ethereal-fade");
    void touchText.offsetWidth;
    touchText.classList.add("ethereal-fade");

    interactionCount++;
  });

  function triggerFinal() {
    switchScreen("touchScreen", "final");

    const finalText = document.querySelector("#final .text");
    finalText.classList.add("ethereal-fade");

    // Кнопка Инстаграма проявляется плавно через паузу
    setTimeout(() => {
      instaBtn.classList.add("show");
    }, 1500);
  }

  function createRipple(x, y) {
    const wave = document.createElement("div");
    wave.classList.add("wave");
    wave.style.left = x + "px";
    wave.style.top = y + "px";
    document.body.appendChild(wave);
    setTimeout(() => wave.remove(), 1800);
  }

  function fadeInAudio(audio, target, duration) {
    let step = 0.01;
    let interval = duration / (target / step);
    let fade = setInterval(() => {
      if (audio.volume < target) {
        audio.volume = Math.min(audio.volume + step, target);
      } else {
        clearInterval(fade);
      }
    }, interval);
  }
});