console.log("WebConf MVP: приложение запущено");

function getMeetingIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("meeting");
}

function generateMeetingId() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let id = "";
  for (let i = 0; i < 6; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

function buildMeetingUrl(meetingId) {
  const url = new URL(window.location.href);
  url.search = "";
  url.searchParams.set("meeting", meetingId);
  return url.toString();
}

function init() {
  const startView = document.getElementById("start-view");
  const meetingView = document.getElementById("meeting-view");

  const displayNameInput = document.getElementById("displayNameInput");
  const createMeetingBtn = document.getElementById("createMeetingBtn");
  const joinMeetingIdInput = document.getElementById("joinMeetingIdInput");
  const joinMeetingBtn = document.getElementById("joinMeetingBtn");

  const meetingIdDisplay = document.getElementById("meetingIdDisplay");
  const meetingLinkInput = document.getElementById("meetingLinkInput");

  // новые элементы для видео
  const startMediaBtn = document.getElementById("startMediaBtn");
  const localVideo = document.getElementById("localVideo");

  const meetingIdFromUrl = getMeetingIdFromUrl();

  if (meetingIdFromUrl) {
    console.log("Открыта встреча:", meetingIdFromUrl);
    startView.style.display = "none";
    meetingView.style.display = "block";

    meetingIdDisplay.textContent = meetingIdFromUrl;
    const link = buildMeetingUrl(meetingIdFromUrl);
    meetingLinkInput.value = link;
  } else {
    console.log("Стартовая страница без встречи");
    startView.style.display = "block";
    meetingView.style.display = "none";
  }

  // Создать встречу
  createMeetingBtn.addEventListener("click", () => {
    const name = displayNameInput.value.trim() || "Гость";
    console.log("Создаём встречу для пользователя:", name);

    const newId = generateMeetingId();
    const url = buildMeetingUrl(newId);
    window.location.href = url;
  });

  // Подключиться к встрече по коду
  joinMeetingBtn.addEventListener("click", () => {
    const name = displayNameInput.value.trim() || "Гость";
    const enteredId = joinMeetingIdInput.value.trim();

    if (!enteredId) {
      alert("Введите код встречи");
      return;
    }

    console.log("Пользователь", name, "подключается к встрече", enteredId);
    const url = buildMeetingUrl(enteredId);
    window.location.href = url;
  });

  // Включить камеру и микрофон
  if (startMediaBtn && localVideo) {
    startMediaBtn.addEventListener("click", async () => {
      try {
        console.log("Запрашиваем доступ к камере и микрофону...");
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
        console.log("Медиапоток получен:", stream);
        localVideo.srcObject = stream;
        startMediaBtn.disabled = true;
        startMediaBtn.textContent = "Камера и микрофон включены";
    } catch (err) {
  console.error("Ошибка доступа к медиаустройствам:", err.name, err.message);
  alert(
    "Не удалось получить доступ к камере или микрофону.\n\n" +
    "Тип ошибки: " + err.name + "\n" +
    "Сообщение: " + err.message + "\n\n" +
    "Чаще всего помогает: разрешить доступ в настройках сайта и Windows."
  );
}
    });
  }
}

init();
