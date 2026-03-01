import { Capacitor } from "@capacitor/core";

export const isNative = Capacitor.isNativePlatform();
export const platform = Capacitor.getPlatform();

export async function initPushNotifications() {
  if (!isNative) return;

  const { PushNotifications } = await import("@capacitor/push-notifications");

  const permission = await PushNotifications.requestPermissions();
  if (permission.receive !== "granted") return;

  await PushNotifications.register();

  PushNotifications.addListener("registration", (_token) => {
    // Token server'a gonderilecek
  });

  PushNotifications.addListener("pushNotificationReceived", (_notification) => {
    // Bildirim alindi
  });

  PushNotifications.addListener(
    "pushNotificationActionPerformed",
    (notification) => {
      const url = notification.notification.data?.url;
      if (url && typeof window !== "undefined") {
        window.location.href = url;
      }
    }
  );
}

export async function triggerHaptic(
  style: "light" | "medium" | "heavy" = "light"
) {
  if (!isNative) return;

  const { Haptics, ImpactStyle } = await import("@capacitor/haptics");

  const map = {
    light: ImpactStyle.Light,
    medium: ImpactStyle.Medium,
    heavy: ImpactStyle.Heavy,
  } as const;

  await Haptics.impact({ style: map[style] });
}

export async function triggerNotificationHaptic() {
  if (!isNative) return;
  const { Haptics, NotificationType } = await import("@capacitor/haptics");
  await Haptics.notification({ type: NotificationType.Success });
}

export async function shareContent(title: string, text: string, url: string) {
  if (!isNative) return false;

  const { Share } = await import("@capacitor/share");
  try {
    await Share.share({ title, text, url });
    return true;
  } catch {
    return false;
  }
}

export async function setStatusBarDark() {
  if (!isNative) return;
  const { StatusBar, Style } = await import("@capacitor/status-bar");
  await StatusBar.setStyle({ style: Style.Dark });
  await StatusBar.setBackgroundColor({ color: "#0a0a0c" });
}

export async function setStatusBarLight() {
  if (!isNative) return;
  const { StatusBar, Style } = await import("@capacitor/status-bar");
  await StatusBar.setStyle({ style: Style.Light });
  await StatusBar.setBackgroundColor({ color: "#fdfaf7" });
}
