# 紡織工具 · Textile Tools

現場用的布廠 / QC 小工具站，手機桌面（springboard）風格首頁。
零相依、可離線、加到主畫面即 App。設定（亮/暗、主題色）存本機 localStorage，全站同步。

> Live：https://zonal0223tw-max.github.io/textile-tools/

## 工具
| 圖示 | 名稱 | 說明 |
|---|---|---|
| 👕📐 | [裁片量測](card-measure/) | 平鋪衣服 + 一張信用卡 → 描裁片輪廓 → 真實尺寸（邊長／周長／面積）。homography 定標，斜拍也能量。 |

## 加一支工具
1. 工具放一個子資料夾（含 `index.html`）。
2. 首頁 `index.html` 的 `TOOLS` 陣列加一筆（`title` / `folder` / `bg` / `icon` motif）。
3. `sw.js` 的 `SHELL` 把新工具的檔加進去（離線快取）。
4. 桌面就多一個 App 圖示。

## 設計
站殼沿用 [stock-tools](https://github.com/zonal0223tw-max/stock-tools)（看股工具站）；
漲跌色那組 stock 專屬設定已拿掉。主題 key = `tex_theme`，工具頁讀同一把鑰匙。
HTML network-first service worker（迭代期不卡舊版）。

generative-lab 出品。
