import fs from "fs";
import path from "path";
import { formatWithOffset } from "./utils/formatWithOffset";
import { readJsonFileSafe } from "./utils/readJsonFileSafe";
import { getLocalFolderPath } from "./utils/getLocalFolderPath";

export type ModeName = "Passive" | "Indefinite" | "Timed" | "Expire";

interface AwakeProperties {
    keepDisplayOn: boolean;
    mode: number;
    intervalHours: number;
    intervalMinutes: number;
    expirationDateTime: string;
    customTrayTimes?: Record<string, unknown>;
}

export interface AwakeConfig {
    properties: AwakeProperties;
    name?: string;
    version?: string;
}

export function updateAwakeSettings(
    mode: ModeName,
    minutes: number,
    expireTime: string,
    displayOn: boolean
) {
    const localAppData = getLocalFolderPath();

    // Просто проверяем, что PowerToys вообще установлен
    const possiblePaths = [
        path.join(localAppData, "PowerToys"),
        path.join(localAppData, "Microsoft", "PowerToysApp"),
        "C:\\Program Files\\PowerToys",
        "C:\\Program Files (x86)\\PowerToys"
    ];
    const ptPath = possiblePaths.find((p) => fs.existsSync(p));
    if (!ptPath) {
        throw new Error(
            "Could not find PowerToys installation.\nChecked paths:\n" +
            possiblePaths.join("\n")
        );
    }

    const settingsPath = path.join(
        localAppData,
        "Microsoft",
        "PowerToys",
        "Awake",
        "settings.json"
    );

    if (!fs.existsSync(settingsPath)) {
        throw new Error(
            `Awake settings.json not found at:\n${settingsPath}\n` +
            "Open PowerToys → Awake at least once so this file is created."
        );
    }

    let config: AwakeConfig;
    try {
        config = readJsonFileSafe(settingsPath);
    } catch (e) {
        throw new Error("Failed to parse Awake settings.json: " + String(e));
    }

    if (!config.properties) {
        throw new Error("Awake settings.json has no 'properties' object.");
    }

    const props = config.properties;

    // 0 = Passive, 1 = Indefinite, 2 = Timed, 3 = Expire
    let modeValue: number;
    switch (mode) {
        case "Passive":
            modeValue = 0;
            break;
        case "Indefinite":
            modeValue = 1;
            break;
        case "Timed":
            modeValue = 2;
            break;
        case "Expire":
            modeValue = 3;
            break;
        default:
            modeValue = 1;
    }

    props.mode = modeValue;
    props.keepDisplayOn = displayOn;

    if (mode === "Timed") {
        const safeMinutes = Number.isFinite(minutes) && minutes > 0 ? minutes : 30;
        const hours = Math.floor(safeMinutes / 60);
        const mins = safeMinutes % 60;
        props.intervalHours = hours;
        props.intervalMinutes = mins;
    } else if (mode === "Expire") {
        const timeStr = expireTime || "23:00";
        try {
            const now = new Date();
            const [hStr, mStr, sStr] = timeStr.split(":");
            const h = parseInt(hStr, 10);
            const m = parseInt(mStr ?? "0", 10);
            const s = parseInt(sStr ?? "0", 10);

            const expire = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                h,
                m,
                s,
                0
            );

            props.expirationDateTime = formatWithOffset(expire);
        } catch (e) {
            // оставляем старое значение
            console.warn("Could not parse expireTime, leaving expirationDateTime as is:", e);
        }
    }

    const updated = JSON.stringify(config, null, 2);
    fs.writeFileSync(settingsPath, updated, "utf8");
}
