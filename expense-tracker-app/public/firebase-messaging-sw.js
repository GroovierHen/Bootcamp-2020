importScripts("https://www.gstatic.com/firebasejs/8.6.5/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.6.5/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyAKq3X-qXZaSYzvIflNykUlURChU4kmfsg",
  projectId: "tron-flow",
  messagingSenderId: "597303772641",
  appId: "1:597303772641:web:8fd1192d64ae3d4e387ea0",
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: "/logo192.png",
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

self.addEventListener("notificationclick", (event) => {
  console.log(event);
  return event;
});
