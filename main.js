console.log("WebConf MVP: приложение запущено");

function getMeetingIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("meeting");
}

function generateMeetingId() {
  // Простой вариант: случайная строка из 6 символов A-Z0-9
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let id = "";
  for (let i = 0; i < 6; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

function buildMeetingUrl(meetingId) {
  const url = new URL(window.location.href);
  url.search = ""; // убираем старые параметры
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

  const meetingIdFromUrl = getMeetingIdFromUrl();

  if (meetingIdFromUrl) {
    // Режим: мы уже "внутри встречи"
    console.log("Открыта встреча:", meetingIdFromUrl);
    startView.style.display = "none";
    meetingView.style.display = "block";

    meetingIdDisplay.textContent = meetingIdFromUrl;
    const link = buildMeetingUrl(meetingIdFromUrl);
    meetingLinkInput.value = link;
  } else {
    // Режим: стартовая страница
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

    // Перенаправляем браузер на URL встречи
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
}

init();
