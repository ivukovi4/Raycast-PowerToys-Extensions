import path from "path";
import { getLocalFolderPath } from "./getLocalFolderPath";

export function getPowerToysPath() {
    const local = getLocalFolderPath();
    return path.join(local, "PowerToys");
}