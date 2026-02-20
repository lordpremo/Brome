import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const body = Buffer.concat(chunks).toString();

  const form = Object.fromEntries(new URLSearchParams(body));
  let name = form.name.toLowerCase().replace(/[^a-z0-9\-]/g, "-");
  const html = form.html;

  const siteDir = path.join(process.cwd(), "sites", name);
  fs.mkdirSync(siteDir, { recursive: true });
  fs.writeFileSync(path.join(siteDir, "index.html"), html);

  res.json({ url: `https://${req.headers.host}/sites/${name}/` });
    }
