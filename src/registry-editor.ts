import { Toast, closeMainWindow, showToast } from "@raycast/api";
import { execFile } from "child_process";
import fs from "fs";
import path from "path";
import { getPowerToysPath } from "./utils/getPowerToysPath";

export default async function Command() {
    try {
        await showToast({
            style: Toast.Style.Animated,
            title: "Launching PowerToys Registry Preview...",
        });

        const ptBase = getPowerToysPath();

        const candidates = [
            path.join(ptBase, "WinUI3Apps", "PowerToys.RegistryPreview.exe"),
            path.join(ptBase, "PowerToys.RegistryPreview.exe"),
            "C:\\Program Files\\PowerToys\\PowerToys.RegistryPreview.exe",
        ];

        const exe = candidates.find((p) => fs.existsSync(p));

        if (!exe) {
            throw new Error(
                "Registry Preview executable not found.\nCheck that PowerToys Registry Preview is installed/enabled."
            );
        }

        execFile(exe, (err) => {
            if (err) {
                showToast({
                    style: Toast.Style.Failure,
                    title: "Failed to launch Registry Preview",
                    message: String(err),
                });
            }
        });

        await closeMainWindow();
    } catch (e: any) {
        await showToast({
            style: Toast.Style.Failure,
            title: "Error launching Registry Preview",
            message: String(e?.message || e),
        });
    }
}
