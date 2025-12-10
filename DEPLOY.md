# 如何將此日曆部署到 GitHub Pages

由於你使用的是 AI Studio 同步到 GitHub，以下是將此 React 專案發布為即時網頁 (GitHub Pages) 的最佳流程。

## 1. 確保專案設定 (First Time Setup)

這個專案是一個標準的 React + Vite 架構（假設你的開發環境是基於 Vite）。為了讓 GitHub Pages 正確運作，我們需要依賴 `gh-pages` 工具。

### 修改 `package.json` (手動操作)

在你的 GitHub 儲存庫中（或本地環境），打開 `package.json` 並添加以下內容：

1.  **添加 `homepage` 欄位**：
    將網址替換成你的 GitHub 帳號與儲存庫名稱。
    ```json
    "homepage": "https://<你的GitHub帳號>.github.io/<儲存庫名稱>",
    ```

2.  **添加 `scripts`**：
    在 `scripts` 區塊中加入 `predeploy` 和 `deploy` 指令。
    ```json
    "scripts": {
      "dev": "vite",
      "build": "tsc && vite build",
      "preview": "vite preview",
      "predeploy": "npm run build",
      "deploy": "gh-pages -d dist"
    }
    ```

3.  **安裝 `gh-pages`**：
    你需要安裝這個套件來幫助部署。
    ```bash
    npm install gh-pages --save-dev
    ```

### 修改 `vite.config.ts` (如果有)

確保 `base` 路徑設置正確，這樣 CSS 和 JS 才能在子路徑下讀取到：

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/<儲存庫名稱>/', // 重要：這裡要填入你的 Repo 名稱，前後都要有斜線
})
```

---

## 2. 部署流程 (Deployment)

當你完成上述設定並將程式碼同步到 GitHub 後：

1.  **打開終端機 (Terminal)**。
2.  執行部署指令：
    ```bash
    npm run deploy
    ```

這個指令會自動執行 `npm run build` 打包你的專案到 `dist` 資料夾，然後將該資料夾的內容推送到 GitHub 的 `gh-pages` 分支。

## 3. 設定 GitHub Pages

1.  進入你的 GitHub 儲存庫頁面。
2.  點擊 **Settings** (設定) -> **Pages** (左側選單)。
3.  在 **Build and deployment** 下的 **Source** 選擇 `Deploy from a branch`。
4.  在 **Branch** 選擇 `gh-pages` 分支，資料夾選擇 `/(root)`。
5.  點擊 **Save**。

稍等幾分鐘，GitHub 就會給你一個網址，你的日曆就可以使用了！

---

## 關於此日曆功能

- **資料儲存**：所有的日程都儲存在瀏覽器的 `localStorage` 中。這意味著你的資料只存在於你當前的瀏覽器中，不會同步到伺服器，非常適合作為個人隱私日曆使用。
- **純前端**：沒有後端 API 依賴，這保證了它可以永久在 GitHub Pages 上免費運行。
