# 部署到 GitHub Pages

我已經為你設定好所有必要的檔案了。請依照以下步驟將此日曆部署到 GitHub。

## 1. 同步代碼
確保此專案的所有檔案（包含新生成的 `package.json` 和 `vite.config.ts`）都已經同步到你的 GitHub 儲存庫：
`https://github.com/ShyGerHanHan/Calendar`

## 2. 啟動部署 (在你的電腦上)

請將儲存庫 Clone 到你的電腦，然後在終端機 (Terminal) 執行以下指令：

1.  **安裝套件**：
    ```bash
    npm install
    ```

2.  **執行部署**：
    ```bash
    npm run deploy
    ```

這個指令會自動執行打包 (`npm run build`) 並將結果推送到 `gh-pages` 分支。

## 3. GitHub 設定 (最後一步)

1.  前往你的 GitHub 儲存庫頁面。
2.  點擊 **Settings** (設定) -> **Pages** (左側選單)。
3.  在 **Build and deployment** > **Source** 選擇 `Deploy from a branch`。
4.  **Branch** 選擇 `gh-pages`，資料夾保持 `/(root)`。
5.  點擊 **Save**。

## 4. 完成！
稍等約 1-2 分鐘，你的日曆將會在這個網址上線：
**https://ShyGerHanHan.github.io/Calendar**
