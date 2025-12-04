import { Toast, closeMainWindow, showToast } from "@raycast/api";
import { execFile } from "child_process";
import fs from "fs";
import path from "path";
import { getPowerToysPath } from "./utils/getPowerToysPath";

export default async function Command() {
  try {
    const ptBase = getPowerToysPath();

    const candidates = [
      path.join(ptBase, "PowerToys.MeasureToolUI.exe"),
      path.join(ptBase, "WinUI3Apps", "PowerToys.MeasureToolUI.exe"),
      "C:\\Program Files\\PowerToys\\PowerToys.MeasureToolUI.exe",
    ];

    const exe = candidates.find((p) => fs.existsSync(p));

    if (!exe) {
      throw new Error("Screen Ruler executable not found.\nCheck that PowerToys Screen Ruler is installed/enabled.");
    }

    execFile(exe, (err) => {
      if (err) {
        showToast({
          style: Toast.Style.Failure,
          title: "Failed to launch Screen Ruler",
          message: String(err),
        });
      }
    });

    await closeMainWindow();
  } catch (e: any) {
    await showToast({
      style: Toast.Style.Failure,
      title: "Error launching Screen Ruler",
      message: String(e?.message || e),
    });
  }
}
