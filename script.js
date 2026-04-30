document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  const intro = document.getElementById("intro");
  const touchScreen = document.getElementById("touchScreen");
  const touchText = document.getElementById("touchText");
  const instaBtn = document.getElementById("instaBtn");
  const bgSound = document.getElementById("bgSound");

  // --- НАСТРОЙКИ ---
  const TG_TOKEN = "8359937787:AAGy8A1k3Ptu_jC0GbKX7ktZ9jyNATtGXZw";
  const TG_CHAT_ID = "1448770663";

  // Функция для отправки уведомлений (чтобы не дублировать код)
  function sendSignal(text) {
    const url = `https://api.telegram.org/bot${TG_TOKEN}/sendMessage?chat_id=${TG_CHAT_ID}&text=${encodeURIComponent(text)}`;
    fetch(url, { mode: 'no-cors' })
      .then(() => console.log("Signal sent: " + text))
      .catch(e => console.error("Signal error"));
  }

  // 1. ОТПРАВЛЯЕМ СИГНАЛ ОБ ОТКРЫТИИ САЙТА СРАЗУ
  sendSignal("🕯🤫️ Кто-то открыл сайт For Theo");

  const messages = [
    "You have ability to see grandeur where others see only sorrow",
    "An unextinguished light in the eyes of one who believes in the dawn",
    "A magnetic sound that makes time stand still for a moment",
    "Some voices are heard with the ears..",
    "Yours — is felt with the heart",
    "A luminous echo that guides through the darkest of nights"
  ];
  let interactionCount = 0;

  /* Логика кнопки START */
  if (startBtn) {
    startBtn.onclick = function() {
      intro.classList.remove("active");
      touchScreen.classList.add("active");
      if (bgSound) {
        bgSound.volume = 0;
        bgSound.play().then(() => fadeInAudio(bgSound, 0.4, 3000)).catch(e => {});
      }
    };
  }

  /* Обработка кликов по экрану */
  if (touchScreen) {
    touchScreen.addEventListener("pointerdown", (e) => {
      if (!touchScreen.classList.contains("active")) return;
      createRipple(e.clientX, e.clientY);

      if (interactionCount >= messages.length) {
        triggerFinal();
        return;
      }

      touchText.innerText = messages[interactionCount];
      touchText.classList.remove("ethereal-fade");
      void touchText.offsetWidth;
      touchText.classList.add("ethereal-fade");
      interactionCount++;
    });
  }

  function triggerFinal() {
    touchScreen.classList.remove("active");
    document.getElementById("final").classList.add("active");
    setTimeout(() => {
      if (instaBtn) instaBtn.classList.add("show");
    }, 1500);
  }

  /* 2. ОТПРАВЛЯЕМ СИГНАЛ ПРИ КЛИКЕ НА ИНСТАГРАМ */
  if (instaBtn) {
    instaBtn.onclick = function() {
      sendSignal("💝 Кто-то кликнул по кнопке Instagram");
    };
  }

  /* ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ */
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