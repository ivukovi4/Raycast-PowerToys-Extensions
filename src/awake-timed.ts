import { Toast, showToast } from "@raycast/api";
import { updateAwakeSettings } from "./awake-common";

export function createAwakeTimedCommand(minutes: number) {
    return async function Command() {


        try {
            await showToast({
                style: Toast.Style.Animated,
                title: `Setting Awake: ${minutes} minutes`,
            });

            updateAwakeSettings("Timed", minutes, "", true);

            await showToast({
                style: Toast.Style.Success,
                title: "Awake set",
                message: `${minutes} minutes, display ON`,
            });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
            console.error(e);

            await showToast({
                style: Toast.Style.Failure,
                title: "Failed to set Awake",
                message: String(e?.message || e),
            });
        }
    }

}