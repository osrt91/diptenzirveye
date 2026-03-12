/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyC6Ji4YxlyUoc1Z_taIFwOU6X_nbUnRP78",
  authDomain: "diptenzirveye.firebaseapp.com",
  projectId: "diptenzirveye",
  storageBucket: "diptenzirveye.firebasestorage.app",
  messagingSenderId: "818871566770",
  appId: "1:818871566770:web:a9feee24eb9412f38824ab",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || "DiptenZirveye";
  const options = {
    body: payload.notification?.body || "",
    icon: "/icons/icon-192.svg",
    badge: "/icons/icon-192.svg",
    data: { url: payload.data?.url || "/" },
  };
  self.registration.showNotification(title, options);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url || "/";
  event.waitUntil(clients.openWindow(url));
});
