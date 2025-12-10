import { Toast, closeMainWindow, showToast } from "@raycast/api";
import { execFile } from "child_process";
import fs from "fs";
import path from "path";
import { getLocalFolderPath } from "./utils/getLocalFolderPath";

export default async function Command() {
  try {
    const local = getLocalFolderPath();

    // New WinUI3 path (PowerToys 0.96+)
    const winui3Path = path.join(local, "PowerToys", "WinUI3Apps", "PowerToys.Hosts.exe");

    // Legacy module paths (old PowerToys)
    const legacyPaths = [
      path.join(local, "PowerToys", "modules", "Hosts", "Hosts.exe"),
      "C:\\Program Files\\PowerToys\\modules\\Hosts\\Hosts.exe",
      "C:\\Program Files (x86)\\PowerToys\\modules\\Hosts\\Hosts.exe",
    ];

    let exePath: string | undefined;

    if (fs.existsSync(winui3Path)) {
      exePath = winui3Path;
    } else {
      exePath = legacyPaths.find((p) => fs.existsSync(p));
    }

    if (!exePath) {
      throw new Error(
        "PowerToys Hosts Editor not found.\n" + "Make sure PowerToys is installed and updated to a recent version.",
      );
    }

    execFile("powershell.exe", ["-Command", `Start-Process '${exePath}' -Verb RunAs`], (err) => {
      if (err) {
        showToast({
          style: Toast.Style.Failure,
          title: "Failed to launch Hosts Editor",
          message: String(err),
        });
      }
    });

    await closeMainWindow();
  } catch (e: any) {
    await showToast({
      style: Toast.Style.Failure,
      title: "Error launching Hosts Editor",
      message: String(e?.message || e),
    });
  }
}
