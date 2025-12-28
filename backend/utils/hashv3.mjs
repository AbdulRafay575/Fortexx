import crypto from "crypto";

export function createHashV3(params, storeKey) {
    // 1. Sort keys alphabetically (case-insensitive)
    const keys = Object.keys(params).sort((a, b) =>
        a.toLowerCase().localeCompare(b.toLowerCase())
    );

    let hashString = "";

    for (const key of keys) {
        const lower = key.toLowerCase();

        if (lower === "hash" || lower === "encoding") continue;

        let value = params[key] ?? "";

        // Escape characters EXACTLY like PHP
        value = value.replace(/\\/g, "\\\\").replace(/\|/g, "\\|");

        hashString += value + "|";
    }

    // Escape store key too
    const escapedStoreKey = storeKey
        .replace(/\\/g, "\\\\")
        .replace(/\|/g, "\\|");

    hashString += escapedStoreKey;

    const sha512Hex = crypto
        .createHash("sha512")
        .update(hashString)
        .digest("hex");

    const finalHash = Buffer.from(sha512Hex, "hex").toString("base64");

    return finalHash;
}
