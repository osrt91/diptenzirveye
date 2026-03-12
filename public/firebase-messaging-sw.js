/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

// Firebase config is injected at runtime via the main app
// The service worker receives the config through the message event
let initialized = false;

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "FIREBASE_CONFIG" && !initialized) {
    firebase.initializeApp(event.data.config);
    initialized = true;

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
  }
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url || "/";
  event.waitUntil(clients.openWindow(url));
});
