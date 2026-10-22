const folder = document.getElementById("folder");
const template = document.getElementById("template");
const preview = document.getElementById("preview");

const sample = { url: "https://example.com/page", title: "Example Domain" };
const showPreview = () => {
  preview.textContent = "Downloads/" + downloadPath(folder.value, template.value || DEFAULTS.template, sample);
};

chrome.storage.sync.get(DEFAULTS).then(v => {
  folder.value = v.folder;
  template.value = v.template;
  showPreview();
});

folder.addEventListener("input", showPreview);
template.addEventListener("input", showPreview);

document.getElementById("save").addEventListener("click", async () => {
  await chrome.storage.sync.set({ folder: folder.value.trim(), template: template.value.trim() || DEFAULTS.template });
  document.getElementById("saved").textContent = "Saved";
  setTimeout(() => document.getElementById("saved").textContent = "", 1500);
});

chrome.commands.getAll().then(cmds => {
  const c = cmds.find(c => c.name === "save-screenshot");
  document.getElementById("shortcut").textContent = c?.shortcut || "not set";
});
