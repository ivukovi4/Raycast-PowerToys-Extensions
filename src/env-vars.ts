import { Toast, closeMainWindow, showToast } from "@raycast/api";
import { execFile } from "child_process";
import fs from "fs";
import path from "path";
import { getPowerToysPath } from "./utils/getPowerToysPath";

export default async function Command() {
  try {
    await showToast({
      style: Toast.Style.Animated,
      title: "Launching PowerToys Environment Variables...",
    });

    const ptBase = getPowerToysPath();

    const candidates = [
      path.join(ptBase, "WinUI3Apps", "PowerToys.EnvironmentVariables.exe"),
      path.join(ptBase, "PowerToys.EnvironmentVariables.exe"),
      "C:\\Program Files\\PowerToys\\PowerToys.EnvironmentVariables.exe",
    ];

    const exe = candidates.find((p) => fs.existsSync(p));

    if (!exe) {
      throw new Error(
        "Environment Variables executable not found.\nCheck that PowerToys Environment Variables is installed/enabled.",
      );
    }

    execFile(exe, (err) => {
      if (err) {
        showToast({
          style: Toast.Style.Failure,
          title: "Failed to launch Environment Variables",
          message: String(err),
        });
      }
    });

    await closeMainWindow();
  } catch (e: any) {
    await showToast({
      style: Toast.Style.Failure,
      title: "Error launching Environment Variables",
      message: String(e?.message || e),
    });
  }
}
