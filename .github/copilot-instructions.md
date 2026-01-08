# React 手機前端應用開發指南

本項目是一個使用 React + TypeScript + Vite + Tailwind CSS 構建的手機前端應用。

## 開發工作流

### 啟動開發伺服器

在 VS Code 中打開終端，運行：

```bash
npm run dev
```

伺服器將在 `http://localhost:5173/` 啟動，支持 HMR（熱模塊替換）。

### 構建項目

```bash
npm run build
```

輸出文件將位於 `dist/` 目錄。

### 代碼檢查

```bash
npm run lint
```

使用 ESLint 檢查代碼質量。

## 項目結構

```
src/
├── App.tsx              # 主應用組件
├── App.css              # 應用樣式
├── index.css            # 全局樣式（包含 Tailwind）
├── main.tsx             # 入口點
├── vite-env.d.ts        # Vite 環境類型定義
└── components/          # React 組件目錄

public/                  # 靜態資源
.vscode/                 # VS Code 配置
├── tasks.json          # 開發任務配置
└── extensions.json     # 推薦擴展

tailwind.config.js      # Tailwind CSS 配置
postcss.config.js       # PostCSS 配置
vite.config.ts          # Vite 配置
tsconfig.json           # TypeScript 配置
```

## 開發建議

### 1. 組件開發

- 在 `src/components/` 中創建可重用的 React 組件
- 為每個組件创建單獨的文件
- 使用 TypeScript 确保類型安全

### 2. 樣式設置

- 優先使用 Tailwind CSS 實用程序類
- 避免編寫大量自定義 CSS
- 在 `tailwind.config.js` 中自定義主題

### 3. 移動優先設計

- 使用 Tailwind 的響應式前綴（`sm:`, `md:`, `lg:` 等）
- 確保在手機屏幕上有良好的體驗
- 測試不同屏幕尺寸

### 4. 性能優化

- 使用 React.lazy() 進行代碼分割
- 利用 Vite 的按需加載特性
- 監控 bundle 大小

## 必要的 VS Code 擴展

推薦安裝以下擴展：
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin
- Prettier - Code formatter
- ESLint

## 常見任務

### 添加新頁面

1. 在 `src/` 中創建新組件文件
2. 導入並在 `App.tsx` 中使用

### 修改 Tailwind 主題

編輯 `tailwind.config.js` 的 `theme.extend` 部分。

### 安裝新依賴

```bash
npm install package-name
```

## 故障排除

- **端口被佔用**：修改 `vite.config.ts` 中的 server.port 設置
- **模塊找不到**：確保 TypeScript 配置正確
- **Tailwind 不工作**：檢查 `src/index.css` 中是否有 @tailwind 指令
