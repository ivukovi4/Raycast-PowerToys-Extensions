import fs from "fs";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function readJsonFileSafe<T = any>(filePath: string): T {
    const buf = fs.readFileSync(filePath);

    let text: string;

    // UTF-16 LE BOM: FF FE
    if (buf.length >= 2 && buf[0] === 0xff && buf[1] === 0xfe) {
        text = buf.toString("utf16le");
    } else {
        // UTF-8 (с/без BOM)
        text = buf.toString("utf8");
    }

    // Удалим BOM, если он есть
    if (text.charCodeAt(0) === 0xfeff) {
        text = text.slice(1);
    }

    // На всякий случай
    text = text.trim();

    return JSON.parse(text);
}
