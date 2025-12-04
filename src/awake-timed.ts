import { Toast, showToast } from "@raycast/api";
import { updateAwakeSettings } from "./awake-common";

export function createAwakeTimedCommand(minutes: number) {
  return async function Command() {
    try {
      updateAwakeSettings("Timed", minutes, "", true);

      await showToast({
        style: Toast.Style.Success,
        title: "Awake set",
        message: `${minutes} minutes, display ON`,
      });
    } catch (e: any) {
      console.error(e);

      await showToast({
        style: Toast.Style.Failure,
        title: "Failed to set Awake",
        message: String(e?.message || e),
      });
    }
  };
}
