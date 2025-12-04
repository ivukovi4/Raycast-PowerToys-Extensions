import { Toast, showToast } from "@raycast/api";
import { execFile } from "child_process";
import fs from "fs";
import path from "path";
import { getPowerToysPath } from "./utils/getPowerToysPath";

export default async function Command() {
    try {
        await showToast({
            style: Toast.Style.Animated,
            title: "Launching PowerToys Color Picker...",
        });

        const ptBase = getPowerToysPath();

        const candidates = [
            path.join(ptBase, "PowerToys.ColorPickerUI.exe"),
            path.join(ptBase, "WinUI3Apps", "PowerToys.ColorPickerUI.exe"),
            "C:\\Program Files\\PowerToys\\PowerToys.ColorPickerUI.exe",
        ];

        const exe = candidates.find((p) => fs.existsSync(p));

        if (!exe) {
            throw new Error(
                "Color Picker executable not found.\nCheck that PowerToys Color Picker is installed/enabled."
            );
        }

        execFile(exe, (err) => {
            if (err) {
                showToast({
                    style: Toast.Style.Failure,
                    title: "Failed to launch Color Picker",
                    message: String(err),
                });
            }
        });

        await showToast({
            style: Toast.Style.Success,
            title: "Color Picker launched",
        });
    } catch (e: any) {
        await showToast({
            style: Toast.Style.Failure,
            title: "Error launching Color Picker",
            message: String(e?.message || e),
        });
    }
}
