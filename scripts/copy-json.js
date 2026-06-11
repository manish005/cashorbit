import fs from "fs";
import path from "path";

const sourceDir = path.resolve("data");
const destDir = path.resolve("dist/assets");

// Create dist/assets if it doesn't exist
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

// Copy every JSON file
const files = fs.readdirSync(sourceDir);

files.forEach(file => {
    if (file.endsWith(".json")) {
        fs.copyFileSync(
            path.join(sourceDir, file),
            path.join(destDir, file)
        );

        console.log(`Copied: ${file}`);
    }
});

console.log("✅ All JSON files copied successfully.");