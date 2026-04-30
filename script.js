document.addEventListener("DOMContentLoaded", () => {
  // 1. Сначала объявляем все переменные
  const startBtn = document.getElementById("startBtn");
  const intro = document.getElementById("intro");
  const touchScreen = document.getElementById("touchScreen");
  const touchText = document.getElementById("touchText");
  const instaBtn = document.getElementById("instaBtn");
  const bgSound = document.getElementById("bgSound");

  // Твои данные (Убедись, что они в кавычках!)
  const TG_TOKEN = "8359937787:AAGy8A1k3Ptu_jC0GbKX7ktZ9jyNATtGXZw";
  const TG_CHAT_ID = "1448770663";

  const messages = [
    "You have ability to see grandeur where others see only sorrow",
    "An unextinguished light in the eyes of one who believes in the dawn",
    "A magnetic sound that makes time stand still for a moment",
    "Some voices are heard with the ears..",
    "Yours — is felt with the heart",
    "A luminous echo that guides through the darkest of nights"
  ];
  let interactionCount = 0;

  // 2. СРАЗУ вешаем логику на кнопку Start (чтобы она работала первой)
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      console.log("Кнопка Start нажата");
      intro.classList.remove("active");
      touchScreen.classList.add("active");

      if (bgSound) {
        bgSound.volume = 0;
        bgSound.play().catch(e => console.log("Звук заблокирован: ", e));
        fadeInAudio(bgSound, 0.4, 3000);
      }
    });
  }

  // 3. Обработка кликов по экрану (фразы)
  touchScreen.addEventListener("pointerdown", (e) => {
    if (!touchScreen.classList.contains("active")) return;
    createRipple(e.clientX, e.clientY);

    if (interactionCount >= messages.length) {
      triggerFinal();
      return;
    }

    touchText.innerText = messages[interactionCount];
    touchText.classList.remove("ethereal-fade");
    void touchText.offsetWidth; // Сброс анимации
    touchText.classList.add("ethereal-fade");
    interactionCount++;
  });

  function triggerFinal() {
    touchScreen.classList.remove("active");
    document.getElementById("final").classList.add("active");

    setTimeout(() => {
      instaBtn.classList.add("show");
    }, 1500);
  }

  // 4. Вебхук для Инстаграма (с защитой от ошибок)
  if (instaBtn) {
    instaBtn.addEventListener("click", () => {
      const text = "🌟 Алиса! Кто-то нажал на кнопку! 🌹";
      const url = `https://api.telegram.org/bot${TG_TOKEN}/sendMessage?chat_id=${TG_CHAT_ID}&text=${encodeURIComponent(text)}`;

      // Используем no-cors, чтобы обойти ошибку blocked:origin
      fetch(url, { mode: 'no-cors' })
        .then(() => console.log("Уведомление ушло (no-cors mode)"))
        .catch(err => console.error("Ошибка вебхука:", err));
    });
  }

  // ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
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