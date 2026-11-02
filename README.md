# NFC 數位名片教學套件

以 **純靜態 HTML、CSS 與少量原生 JavaScript**，製作可由 NFC 標籤開啟的個人數位名片。學生電腦不需要安裝 Node.js、npm、後端或建置工具。

適合大學初學者及非資工背景學生；完整課程為 **180 分鐘**，另附 120 分鐘精簡版。

## 線上教材預覽

- [教材首頁](https://robylin829.github.io/nfc-card-teaching-kit/)
- [學生講義與 HTML 互動練習](https://robylin829.github.io/nfc-card-teaching-kit/02學生實作講義.html#html-lab)
- [CSS 調整與三題即時測驗](https://robylin829.github.io/nfc-card-teaching-kit/02學生實作講義.html#css-lab)
- [名片範本預覽](https://robylin829.github.io/nfc-card-teaching-kit/my-nfc-card/)

學生講義新增基本標籤、屬性、class/id、CSS 選擇器與盒模型解說。可編輯 HTML 看預覽、調色彩／字級／內距／圓角，並完成即時回饋測驗。互動不會修改名片專案或上傳作答；重新整理會還原。

## 下載與開始

1. 點選本 repository 的 **Code → Download ZIP**，下載後解壓縮。
2. 用瀏覽器開啟 **開始閱讀.html**，依連結閱讀教材。
3. 教材可離線閱讀，按 **Ctrl＋P** 可列印或另存 PDF。
4. 用純文字編輯器修改 `my-nfc-card/index.html` 頂部的 `profile`；存檔後，雙擊同一檔案預覽。

GitHub 檔案頁會顯示 HTML 原始碼；直接閱讀請使用上方 GitHub Pages 連結。離線使用時，教材 HTML 需與「教材樣式.css」放在一起，學生講義還需要「學生互動.js」。

## 教材內容

| 檔案 | 內容 |
| --- | --- |
| [開始閱讀.html](開始閱讀.html) | 套件入口與使用方式 |
| [01教師教案.html](01教師教案.html) | 教學目標、課前準備、逐分鐘流程、提問及 100 分評量規準 |
| [02學生實作講義.html](02學生實作講義.html) | HTML／CSS 入門與互動、修改資料、GitHub 上傳、Vercel 發布、NFC 寫入 |
| [03程式導讀與學習單.html](03程式導讀與學習單.html) | HTML/CSS/JS 導讀、vCard 原理、練習題、互測表及參考答案 |
| [my-nfc-card](my-nfc-card) | 學生可直接修改的三檔案程式範本 |
| [學生互動.js](學生互動.js) | HTML 預覽、CSS 調整與測驗的原生 JavaScript |

## 學生網站只有三個檔案

```text
my-nfc-card/
├── index.html     個人資料、頁面結構及下載聯絡人的 JavaScript
├── style.css      手機優先的深色名片樣式
└── README.md      修改與部署指南
```

個人資料集中於 `profile`，網頁和 `.vcf` 聯絡人使用同一份資料。電話與其他聯絡欄位可留空；下載聯絡人後，仍須依手機提示開啟並確認匯入。

## Vercel 部署時的資料夾選擇

- **學生自己的 repo：**將 `my-nfc-card` 內的三個檔案放在 repo 根目錄，Root Directory 使用預設根目錄。
- **直接部署本教材 repo：**Root Directory 必須選 **`my-nfc-card`**，才會發布名片範本。
- Framework Preset 選 **Other**；Build Command 啟用 Override 並留空；範本沒有 `public` 資料夾，Output Directory 使用根目錄（必要時明確指定 `.`）。
- 部署 Ready 後，將正式 Production HTTPS 網址填入 `profile.website`，再提交更新。

本 repository 是教材與程式範本，尚未替每位學生建立個人網站。完整操作請讀學生講義及 [程式 README](my-nfc-card/README.md)。

## 課堂成果

學生完成手機可閱讀的名片、GitHub 原始碼、正式 HTTPS 網址、中文聯絡人下載，以及 NFC 寫入與互測紀錄。

NFC 標籤儲存的是網址；網頁內容由 Vercel 提供。正式網址不變時，更新網站不必重新寫入 NFC。課堂不執行永久鎖定。沒有相容設備時，先做網址互測，再安排 NFC 補測。

## 驗證範圍

已以桌面瀏覽器檢查 320、390、768、1440px 寬度、鍵盤啟動下載、實際 `.vcf` 檔案、中文姓名、選填電話、特殊字元跳脫、UTF-8 長行折行、HTTPS 網址檢查、教材本機連結及列印輸出。

實體 NFC 讀寫與各手機系統的通訊錄匯入，需要依學習單使用實際設備驗收。

## 官方參考

- [Vercel 靜態網站建置設定](https://vercel.com/docs/builds/configure-a-build)
- [wakdev NFC 網址寫入說明](https://www.wakdev.com/en/knowledge-base/how-to-guides/how-to-write-a-link-url-on-an-nfc-chip.html)
- [vCard 3.0 規格 RFC 2426](https://www.rfc-editor.org/rfc/rfc2426)

## GitHub Pages 維護

此教材以 **main 分支的 / (root)** 發布；根目錄的 index.html 會導向「開始閱讀.html」，.nojekyll 讓靜態檔案直接發布。更新 main 後，等待 Pages 部署成功即可看到新教材。GitHub Pages 是本教材的線上預覽；學生個人網站仍可依講義部署至 Vercel。

教材版本 1.1；互動與線上預覽更新日期為 2026 年 11 月 2 日。原教學流程與 Vercel 平台文件查核日期為 2026 年 10 月 30 日。
