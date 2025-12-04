import path from "path";
import os from "os";

export function getLocalFolderPath() {
  const home = os.homedir();
  return path.join(home, "AppData", "Local");
}
