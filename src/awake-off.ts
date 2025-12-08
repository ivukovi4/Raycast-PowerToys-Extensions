import { Toast, closeMainWindow, showToast } from "@raycast/api";
import { updateAwakeSettings } from "./awake-common";

export default async function Command() {
  try {
    updateAwakeSettings("Passive", 0, "", false);

    await closeMainWindow();

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
