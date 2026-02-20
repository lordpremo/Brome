import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const dir = path.join(process.cwd(), "sites");
  if (!fs.existsSync(dir)) return res.json({ sites: [] });

  const sites = fs.readdirSync(dir).filter(f =>
    fs.statSync(path.join(dir, f)).isDirectory()
  );

  res.json({ sites });
}
