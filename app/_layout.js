import { Slot } from "expo-router";
import { NativeWindStyleSheet } from "nativewind";
import AuthProvider from "./contexts/auth";
import * as Notifications from "expo-notifications";

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function HomeLayout() {
  // Notifications.requestPermissionsAsync();

  // Notifications.scheduleNotificationAsync({
  //   content: {
  //     title: "Hi, I need to ask a question.",
  //   },
  //   trigger: {
  //     seconds: 3600,
  //     repeats: true,
  //   },
  // });
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
