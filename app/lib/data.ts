export interface Sentence {
  id: string;
  text: string;
  startTime: number;
  endTime: number;
}

export interface Section {
  title: string;
  sentences: Sentence[];
}

export interface TranscriptData {
  sections: Section[];
}

export const fetchMockData = (): Promise<TranscriptData> => {
  return new Promise((resolve) => {
    // 模擬 1.5 秒的網路延遲或 AI 處理時間
    setTimeout(async () => {
      try {
        // 使用 fetch API 來獲取 public 資料夾下的 JSON 檔案
        const response = await fetch('/mock/transcript.json');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // 解析 JSON 並將其斷言為我們的 TypeScript 型別
        const data: TranscriptData = await response.json();
        resolve(data);
      } catch (error) {
        console.error('Failed to fetch mock data:', error);
        // 在真實應用中，這裡應該回傳一個錯誤或一個空的 fallback 資料
        // 但為了 Demo，我們假設它總能成功
      }
    }, 1500);
  });
};
