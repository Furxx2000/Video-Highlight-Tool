'use client';

import { useState, useEffect } from 'react';
import { toastManager, ToastMessage } from '@/app/lib/toastManager';
import Toast from './Toast';

export const ToastContainer = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    // 訂閱 toastManager 的更新
    const unsubscribe = toastManager.subscribe(setToasts);

    // 在元件卸載時取消訂閱，防止記憶體洩漏
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div
      className='fixed bottom-5 left-1/2 -translate-x-1/2 z-50 
                 w-[90%] sm:w-full sm:max-w-xs'
    >
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onDismiss={(id: any) => toastManager.removeToast(id)}
        />
      ))}
    </div>
  );
};
