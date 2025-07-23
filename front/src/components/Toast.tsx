import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import '../style/toast.scss';

export interface ToastHandles {
  showToast: (message: string, type?: 'success' | 'error') => void;
}

const Toast = forwardRef<ToastHandles>((props, ref) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<'success' | 'error'>('success');

  useImperativeHandle(ref, () => ({
    showToast(message, type = 'success') {
      setMessage(message);
      setType(type);
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, 3000);
    }
  }));

  if (!visible) return null;

  return (
    <div className="toast-wrapper">
      <div className={`toast ${type}`}>
        {type === 'success' ? <CheckCircle /> : <XCircle />}
        <span>{message}</span>
      </div>
    </div>
  );
});

export default Toast;