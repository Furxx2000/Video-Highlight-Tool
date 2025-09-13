# 技術選擇文件 (Technical Choices Document)

## 1. 專案概覽

本專案旨在實現一個影片精華剪輯工具的 Demo。開發過程中的核心指導原則是**可讀性 (Readability)**、**可擴展性 (Scalability)** 和**性能 (Performance)**，同時致力於提供卓越的使用者體驗 (UX)。

本文檔將詳細闡述在開發過程中做出的主要技術決策及其背後的原因。

## 2. 核心技術棧 (Core Technologies)

### 2.1 Next.js 14 (App Router)

- **選擇原因：**
  - **混合渲染模型：** App Router 提供的伺服器元件 (RSC) 和客戶端元件 (Client Components) 模型，讓我們能做出更優的架構決策。專案最初利用 RSC 進行快速的初始資料獲取和頁面骨架渲染，而後續所有複雜的互動邏輯則被清晰地封裝在 Client Components 中。
  - **性能優勢：** 利用 SSR 和 Streaming，結合 `loading.tsx` (`Suspense`)，我們為使用者提供了即時的載入反饋（骨架屏），避免了白屏等待，極大地提升了初始載入體驗。
  - **開發體驗：** 基於檔案的路由、優化的圖片處理和內建的工具鏈，顯著提高了開發效率。

### 2.2 React 18 & TypeScript

- **選擇原因：**
  - **React：** 其元件化的開發模式是構建複雜 UI 的行業標準。我們充分利用了 Hooks (`useState`, `useEffect`, `useCallback`, `useMemo`) 來管理元件狀態和生命週期。
  - **TypeScript：** 在這個具有多層資料結構（逐字稿、章節、句子）和複雜狀態邏輯的專案中，TypeScript 的靜態類型檢查是不可或缺的。它提供了更強的程式碼健壯性，減少了執行時錯誤，並極大地改善了自動完成和重構等開發體驗。

### 2.3 Tailwind CSS

- **選擇原因：**
  - **開發效率：** Utility-first 的方法讓我們可以直接在 JSX 中快速構建複雜的 UI，而無需在多個 CSS 檔案之間切換上下文。
  - **可維護性：** 所有樣式都與其對應的元件內聚，降低了全域 CSS 污染的風險。
  - **響應式設計 (RWD) 與深色模式 (Dark Mode)：** Tailwind 提供了極其優雅和直觀的語法來實現 RWD (`lg:`, `md:`) 和深色模式 (`dark:`)，讓雙主題的實現變得簡單而高效。

## 3. 架構決策 (Architectural Decisions)

### 3.1 元件驅動開發 (Component-Driven Development)

我們將應用程式拆分為許多小的、單一職責的元件。這種高度元件化的策略帶來了極佳的可讀性和可維護性。

- **容器元件 (`HighlightTool`):** 作為狀態和邏輯的中心協調者。
- **佈局元件 (`Workspace`, `Header`):** 負責 UI 的結構和佈局，與業務邏輯解耦。
- **功能元件 (`EditorPanel`, `PreviewPanel`):** 負責特定的功能區域。
- **原子元件 (`PlayPauseButton`, `TranscriptSentence`):** 最底層的、可重用的 UI 單位。

### 3.2 狀態管理演進：從 Props 到切分的 Context API

這是專案中最重要的架構決策。

1.  **初始階段 (Prop Drilling):** 最初，所有狀態都集中在 `HighlightTool` 中，並通過 props 向下傳遞。雖然直觀，但很快就導致了嚴重的「Prop Drilling」問題，降低了可維護性。
2.  **引入 Context API：** 為了消除 Prop Drilling，我們決定引入 Context API。
3.  **核心優化 (切分 Context):** 我們意識到，如果將所有狀態（包括高頻更新的 `currentTime` 和低頻更新的 `selectedIds`）都放入一個巨大的 Context 中，會導致災難性的性能問題（所有消費者都會頻繁重渲）。因此，我們採用了**切分 Context** 的最佳實踐：

    - **`TranscriptContext`:** 用於管理變化不頻繁的編輯區相關狀態。
    - **`PlayerContext`:** 用於管理變化頻繁的播放器相關狀態。

    這個策略確保了只有真正需要高頻更新的元件才會重新渲染，實現了**性能和可維護性的完美平衡**。

### 3.3 自建全局 Toast 通知系統

在處理錯誤提示時，我們面臨「自建 vs. 使用現成函式庫」的抉擇。

- **決策：** 儘管在生產環境中我會優先選擇 `react-toastify` 等成熟方案，但在本次作業中，我選擇**自建一個迷你的通知系統**，以更好地展示我對底層架構的理解。
- **實現原理：**
  1.  使用**觀察者模式**，建立了一個獨立於 React 之外的 `toastManager` 單例，作為全局的「廣播站」。
  2.  提供了一個簡潔的**命令式 API** (`Toast.error(...)`)，可以在應用的任何地方被呼叫。
  3.  創建了一個 `<ToastContainer />` 元件，它在 `useEffect` 中**訂閱** `toastManager` 的更新，並將其狀態變化橋接到 React 的**宣告式渲染**流程中。

### 3.4 使用 `forwardRef` 進行 DOM 操作

為了實現「自動滾動」和「影片播放控制」，我們需要從父元件直接操作子元件內部的 DOM 元素。我們使用了 `React.forwardRef` 來安全地將 `ref` 從 `HighlightTool` 穿透到深層的 `<video>` 和 `<div>` 標籤，這是在 React 中處理此類需求的標準且安全的做法。

## 4. 核心功能實現

### 自訂影片播放引擎

這是專案中最複雜的邏輯。其核心是圍繞 `<video>` 元素的 `timeupdate` 事件建立的。

- 我們維護一個根據使用者選擇動態生成且**已排序**的播放列表 (`sortedSegments`)。
- 使用一個 `currentClipIndex` state 來追蹤當前播放的片段。
- 在 `timeupdate` 事件（引擎的「心跳」）中，持續檢查 `video.currentTime` 是否超出了當前片段的 `endTime`。如果是，則自動跳轉到下一個片段的 `startTime`，實現無縫過渡。
- 我們特別處理了多種**邊界情況**，例如 Mock Data 時間戳與真實影片時長不匹配的問題，確保了播放引擎的健壯性。

## 5. 未來可優化方向

- **主題切換器：** 我們已經為應用實現了完整的雙主題（淺色/深色）樣式。下一步可以添加一個 UI 元件，讓使用者可以手動在「淺色」、「深色」和「跟隨系統」之間切換。`next-themes` 函式庫將是實現此功能的首選。
- **無障礙性 (Accessibility):** 增強鍵盤導航功能，例如允許使用者使用箭頭鍵在逐字稿中導航，使用空格鍵進行選取。
- **更複雜的狀態管理：** 對於規模遠大於此的應用，可以考慮引入 Zustand 或 Redux Toolkit 等狀態管理庫，以更結構化的方式管理全局狀態。
