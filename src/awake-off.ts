import { Toast, showToast } from "@raycast/api";
import { updateAwakeSettings } from "./awake-common";

export default async function Command() {
  try {
    await showToast({
      style: Toast.Style.Animated,
      title: "Turning Awake off...",
    });

    updateAwakeSettings("Passive", 0, "", false);

    await showToast({
      style: Toast.Style.Success,
      title: "Awake set to Passive",
      message: "Awake is effectively off",
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
