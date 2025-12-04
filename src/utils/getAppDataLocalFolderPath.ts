import path from "path";
import os from "os";

export function getAppDataLocalFolderPath() {
    const home = os.homedir();
    return path.join(home, "AppData", "Local");
}