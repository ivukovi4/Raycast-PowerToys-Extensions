import { Toast, showToast } from "@raycast/api";
import { updateAwakeSettings } from "./awake-common";

export default async function Command() {
  try {
    await showToast({
      style: Toast.Style.Animated,
      title: "Setting Awake: Indefinite",
    });

    updateAwakeSettings("Indefinite", 0, "", true);

    await showToast({
      style: Toast.Style.Success,
      title: "Awake set to Indefinite",
      message: "Display will stay ON",
    });
  } catch (e: any) {
    console.error(e);

    await showToast({
      style: Toast.Style.Failure,
      title: "Failed to set Awake",
      message: String(e?.message || e),
    });
  }
}
