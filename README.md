# Viewport Screenshot

A browser extension for Vivaldi, Chrome, Edge and Brave. Press a shortcut and the visible part of the current tab is saved as a PNG to `Downloads/Screenshots`. No region to select, no popup, no "save as" dialog.

Made for [this question on Software Recommendations](https://softwarerecs.stackexchange.com/q/95706).

## What it does

- **Alt+Shift+S** (or a click on the toolbar icon) saves the visible area of the tab. Nothing else happens, apart from a green ✓ on the icon for a second.
- Saves to a subfolder of your Downloads folder, `Screenshots` by default. Nested folders work: `Screenshots/Project`.
- File names come from a template, by default `screenshot - %host - %Y-%m-%d %H_%M_%S`:
  - `%host`: site, e.g. `news.ycombinator.com`;
  - `%title`: page title;
  - `%Y` `%m` `%d`: date, `%H` `%M` `%S`: time.
- PNG only, at your screen's resolution.
- If a file with the same name exists, a number is added instead of overwriting.

## Privacy and permissions

- `activeTab`: access to a tab only at the moment you press the shortcut or click the icon. No access to any site otherwise.
- `downloads`: to save the file.
- `storage`: to remember your folder and file name template.

No network requests, no analytics, no account. All code is in this repo: about 100 lines.

## Install

Not in the extension stores yet, so for now you load it by hand:

1. Download `viewport-screenshot-1.0.0.zip` from [Releases](https://github.com/vovanka0-netizen/viewport-screenshot/releases/latest) and unzip it.
2. Open `vivaldi://extensions` (or `chrome://extensions`), turn on **Developer mode**, click **Load unpacked** and choose the unzipped folder.
3. Press Alt+Shift+S on any page. The screenshot lands in `Downloads/Screenshots`.

To set the folder and file name: right-click the extension icon → **Options**.
To change the shortcut: `vivaldi://extensions/shortcuts` or `chrome://extensions/shortcuts`.

If your browser is set to ask where to save each file, the extension still saves without asking.

## Limits

- Browser pages (`vivaldi://`, `chrome://`, the extension stores) can't be captured. The icon shows a red `!` there.
- Only the visible area, not the whole page.

## Bugs and ideas

[Open an issue](https://github.com/vovanka0-netizen/viewport-screenshot/issues).

MIT License.
