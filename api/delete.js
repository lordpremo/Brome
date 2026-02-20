import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const name = req.query.name;
  const dir = path.join(process.cwd(), "sites", name);

  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true });

  res.json({ deleted: name });
}
