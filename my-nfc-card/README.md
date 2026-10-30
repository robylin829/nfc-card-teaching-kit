# 我的 NFC 數位名片

只有 index.html、style.css、README.md 三個檔案。免 Node.js、npm、後端及建置指令。

## 1 修改個人資料

1. 用純文字編輯器開啟 index.html，找到頂部「學生編輯區」的 profile。
2. 改冒號後的內容；字串保留英文雙引號，欄位保留逗號。姓與名分開填，會自動組合姓名。
3. 電話選填，請輸入 +886912345678 這類格式，不要有空格或破折號。空白會隱藏連結。
4. Email 範例 student@example.com 需改成願意公開的信箱，或留空。不要放住址、學號、密碼或 API 金鑰。
5. github 使用完整 https:// 網址；website 部署前留空，部署後填正式網址。
6. skills 的每個技能以雙引號包住，中間用逗號分隔。暱稱不需要可填空字串。
7. 存成 UTF-8；Windows 注意不要存成 index.html.txt。
8. 雙擊 index.html 預覽。修改後存檔並重新整理。網頁和 vCard 讀取同一份 profile。

## 2 本機測試

- 姓名、簡介、技能有更新；空電話不出現電話按鈕。
- 點「下載聯絡人 .vcf」，用文字編輯器查看中文姓名、N、FN、ORG、TITLE、EMAIL 是否正確。
- 本機 file:// 路徑不會寫入 vCard；上線後會使用 website 或目前 HTTPS 頁面網址。
- 可選：修改 style.css 的 --accent、--accent-end、--background。
- .vcf 下載不代表自動完成匯入；手機仍需依提示開啟檔案並確認加入通訊錄。

## 3 GitHub 網頁上傳 免終端機

1. 登入 GitHub，建立自己的新 repository，例如 my-nfc-card。
2. 在空白 repository 的快速設定頁選 uploading an existing file；已有檔案時選 Add file → Upload files。
3. 上傳本資料夾內的三個檔案，讓 index.html 直接在 repository 最上層。
4. 填提交訊息 Create digital card，完成 Commit changes。
5. 更新時可在 GitHub 開啟檔案並按編輯圖示，或上傳同名的新檔，再 Commit changes。

## 4 Vercel 發布

1. 登入 https://vercel.com/，從 Add New → Project 匯入剛才的 repository，授權所需存取權。
2. Framework Preset 選 Other；Root Directory 選含 index.html 的資料夾。若只上傳三檔至根目錄，不用改。
3. Build Command 啟用 Override 並留空，跳過建置；不填 npm 指令。
4. 本專案沒有 public 資料夾，Output Directory 保留預設（根目錄）；若要明確指定，可設為 . 。
5. 不增加 package.json，也不設定環境變數。點 Deploy，等狀態變成 Ready；不保證固定秒數。
6. 在專案 Domains 找正式 Production 網址，例如 https://my-nfc-card.vercel.app，實際名稱以帳號畫面為準。
7. 用手機的無痕瀏覽器測試，確認不需登入 Vercel；若要求登入，檢查選到的網址及 Deployment Protection 設定。
8. 把正式網址填入 profile.website，再提交到正式分支（本課預設 main），等待新部署 Ready。

## 5 寫入 NFC

1. 準備手機可讀寫的 NDEF 標籤，例如可重寫 NTAG213/215/216，以及支援 NFC 寫入的手機。
2. 安裝 wakdev 的 NFC Tools。開啟 Write → Add a record → URL / URI。
3. 輸入完整正式 HTTPS 網址。如果介面另外選擇 https:// 前綴，不要重複輸入協定。
4. 確認待寫清單只有本次網址記錄；點 Write，將標籤貼近手機 NFC 天線位置，等待成功提示。
5. 用 Read 檢查寫入的完整網址。退出寫入介面，再用另一支相容手機靠近測試並開啟通知。
6. 測試開頁、Email 和 .vcf 匯入；記錄手機系統、瀏覽器及結果。不支援 NFC 時可用網址完成測試。
7. 課堂不執行永久鎖定。日後網頁內容改變但正式網址相同，不必重寫 NFC。

## 常見問題

| 現象 | 排查 |
| --- | --- |
| 完全沒資料 | profile 是否漏逗號、引號；用 F12 Console 找 SyntaxError；最後一次修改先改回 |
| 沒有樣式 | style.css 大小寫、檔名與 index.html 相對位置是否一致 |
| 404 | Root Directory 是否含 index.html；Other 的 Output Directory 是否錯設 dist/public |
| 下載了但沒匯入 | 用 Safari/Chrome 開頁，從下載項目開 .vcf；內建瀏覽器可改外部開啟 |
| 顯示舊內容 | 新提交是否在正式分支、新部署是否 Ready；重新整理正式網址 |
| 電話或連結消失 | 是否空白或格式不符；看卡片底部的欄位提示 |
| NFC 寫入失敗 | 手機支援及 NFC 開關、標籤是否可寫、記錄是否過長、天線位置及金屬干擾 |

## 選修 Git 指令

需先安裝 Git；Git 是選修工具，不需要安裝 Node.js。先在 GitHub 建立「空白」repository（不要預建 README），替換以下網址後在本資料夾執行。

```bash
git init
git add index.html style.css README.md
git commit -m "Create digital card"
git branch -M main
git remote add origin https://github.com/YOUR-ACCOUNT/YOUR-REPO.git
git push -u origin main
```

首次 commit 若提示身分未設定，依 Git 提示設定 user.name 與 user.email；登入 GitHub 使用瀏覽器或憑證管理器流程，不把密碼或 token 寫進教材或原始碼。若 repository 已有提交，改用 git clone 後複製三檔並提交。

## 參考

- Vercel 官方靜態建置設定：https://vercel.com/docs/builds/configure-a-build
- wakdev 官方 NFC URL 寫入：https://www.wakdev.com/en/knowledge-base/how-to-guides/how-to-write-a-link-url-on-an-nfc-chip.html
- vCard 3.0 格式 RFC 2426：https://www.rfc-editor.org/rfc/rfc2426

教學範本查核日期：2026-10-30。平台介面可能調整，依實際畫面與官方文件操作。
