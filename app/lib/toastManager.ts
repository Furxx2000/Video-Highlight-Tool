import { TOAST_DURATION } from './constants';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'error' | 'success' | 'info'; // 確保這裡有 type
  duration?: number;
}

// 我們的廣播站
class ToastManager {
  private toasts: ToastMessage[] = [];
  private listeners: Set<(toasts: ToastMessage[]) => void> = new Set();

  // 訂閱廣播
  subscribe(listener: (toasts: ToastMessage[]) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener); // 回傳一個取消訂閱的函式
  }

  // 發送廣播給所有訂閱者
  private notify() {
    this.listeners.forEach((listener) => listener(this.toasts));
  }

  // 新增 Toast 的方法
  addToast(
    message: string,
    type: ToastMessage['type'] = 'info',
    duration: number = TOAST_DURATION
  ) {
    const id = Date.now().toString();
    this.toasts = [...this.toasts, { id, message, type, duration }];
    this.notify();
  }

  // 移除 Toast 的方法
  removeToast(id: string) {
    this.toasts = this.toasts.filter((toast) => toast.id !== id);
    this.notify();
  }

  // --- 這是我們將要暴露給外部使用的 API ---
  error(message: string, duration?: number) {
    this.addToast(message, 'error', duration);
  }

  success(message: string, duration?: number) {
    this.addToast(message, 'success', duration);
  }
}

// 建立一個全局單例 (Singleton)
export const toastManager = new ToastManager();

// 導出簡潔的 API
export const Toast = {
  error: toastManager.error.bind(toastManager),
  success: toastManager.success.bind(toastManager),
};
