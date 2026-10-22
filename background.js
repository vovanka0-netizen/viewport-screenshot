importScripts("names.js");

async function save(tab) {
  try {
    const { folder, template } = await chrome.storage.sync.get(DEFAULTS);
    const url = await chrome.tabs.captureVisibleTab(tab.windowId, { format: "png" });
    await chrome.downloads.download({
      url,
      filename: downloadPath(folder, template, tab),
      conflictAction: "uniquify",
      saveAs: false,
    });
    flash(tab.id, "✓", "#2e7d32");
  } catch (e) {
    // Browser pages (chrome://, vivaldi://, the Web Store) can't be captured.
    console.warn("Viewport Screenshot:", e.message);
    flash(tab.id, "!", "#c62828");
  }
}

function flash(tabId, text, color) {
  chrome.action.setBadgeBackgroundColor({ tabId, color });
  chrome.action.setBadgeText({ tabId, text });
  setTimeout(() => chrome.action.setBadgeText({ tabId, text: "" }).catch(() => {}), 1500);
}

chrome.commands.onCommand.addListener((command, tab) => {
  if (command === "save-screenshot" && tab) save(tab);
});

chrome.action.onClicked.addListener(save);
