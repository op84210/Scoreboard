# 手機前端應用 (React + TypeScript + Vite + Tailwind CSS)

一個使用 React、TypeScript、Vite 和 Tailwind CSS 構建的現代化手機前端應用模板。

## 技術棧

- **React 19** - UI 框架
- **TypeScript** - 類型安全的 JavaScript
- **Vite** - 快速的現代構建工具
- **Tailwind CSS** - 功能優先的 CSS 框架
- **ESLint** - 代碼品質檢查
- **Hot Module Replacement (HMR)** - 快速開發反饋

## 快速開始

### 安裝依賴

```bash
npm install
```

### 啟動開發伺服器

```bash
npm run dev
```

開發伺服器將在 `http://localhost:5173/` 啟動

### 建立用於生產的版本

```bash
npm run build
```

### 預覽生產版本

```bash
npm run preview
```

## 項目結構

```
src/
├── App.tsx          # 主應用組件
├── App.css          # 應用樣式
├── index.css        # 全局樣式（包含 Tailwind）
├── main.tsx         # 應用入口
├── vite-env.d.ts    # Vite 環境變量定義
└── components/      # 可重用組件（待添加）

public/              # 靜態資源
index.html           # HTML 模板
```

## 開發指南

### 添加新組件

在 `src/components/` 目錄中創建新的 `.tsx` 文件：

```tsx
export function MyComponent() {
  return (
    <div className="p-4 bg-blue-500 rounded">
      Hello from Tailwind!
    </div>
  )
}
```

### 使用 Tailwind CSS

使用 Tailwind 的實用程序類進行樣式設置：

```tsx
<div className="flex items-center justify-center min-h-screen bg-gray-100">
  <h1 className="text-4xl font-bold text-blue-600">歡迎！</h1>
</div>
```

## 可用腳本

| 腳本 | 說明 |
|------|------|
| `npm run dev` | 啟動開發伺服器 |
| `npm run build` | 生成生產版本 |
| `npm run preview` | 本地預覽生產版本 |
| `npm run lint` | 運行 ESLint 檢查代碼質量 |

## 浏覽器支持

此項目支持所有現代浏覽器，包括移動浏覽器。

## 許可證

MIT
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
