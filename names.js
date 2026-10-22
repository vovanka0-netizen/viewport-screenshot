// Builds the download path from the folder and filename template.
// Shared by background.js and options.html (for the preview).

const DEFAULTS = {
  folder: "Screenshots",
  template: "screenshot - %host - %Y-%m-%d %H_%M_%S",
};

const pad = n => String(n).padStart(2, "0");

// Characters Windows, macOS and Linux don't allow in file names.
const clean = s => s.replace(/[\\/:*?"<>|\u0000-\u001f]/g, "_").replace(/\s+/g, " ").trim();

function fileName(template, { url, title }, now = new Date()) {
  let host = "";
  try { host = new URL(url).hostname; } catch {}
  const values = {
    "%host": host,
    "%title": title || "",
    "%Y": now.getFullYear(),
    "%m": pad(now.getMonth() + 1),
    "%d": pad(now.getDate()),
    "%H": pad(now.getHours()),
    "%M": pad(now.getMinutes()),
    "%S": pad(now.getSeconds()),
  };
  const name = template.replace(/%host|%title|%[YmdHMS]/g, k => values[k]);
  return (clean(name) || "screenshot").slice(0, 200) + ".png";
}

// A folder may be nested ("Screenshots/Work"). Empty means Downloads itself.
function downloadPath(folder, template, tab, now) {
  const parts = folder.split("/").map(clean).filter(p => p && p !== "." && p !== "..");
  return [...parts, fileName(template, tab, now)].join("/");
}
