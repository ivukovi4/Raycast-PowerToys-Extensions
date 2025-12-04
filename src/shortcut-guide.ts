import { Toast, showToast, closeMainWindow } from "@raycast/api";
import { execFile } from "child_process";
import fs from "fs";
import path from "path";
import { getPowerToysPath } from "./utils/getPowerToysPath";

export default async function Command() {
  try {
    const ptBase = getPowerToysPath();

    const candidates = [
      path.join(ptBase, "PowerToys.ShortcutGuide.exe"),
      path.join(ptBase, "WinUI3Apps", "PowerToys.ShortcutGuide.exe"),
      "C:\\Program Files\\PowerToys\\PowerToys.ShortcutGuide.exe",
    ];

    const exe = candidates.find((p) => fs.existsSync(p));

    if (!exe) {
      throw new Error(
        "Shortcut Guide executable not found.\nCheck that PowerToys Shortcut Guide is installed/enabled.",
      );
    }

    execFile(exe, (err) => {
      if (err) {
        showToast({
          style: Toast.Style.Failure,
          title: "Failed to launch Shortcut Guide",
          message: String(err),
        });
      }
    });

    await closeMainWindow();
  } catch (e: any) {
    await showToast({
      style: Toast.Style.Failure,
      title: "Error launching Shortcut Guide",
      message: String(e?.message || e),
    });
  }
}
