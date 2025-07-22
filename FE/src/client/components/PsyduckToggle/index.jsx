import React, { useState, useEffect } from 'react';
import styles from './PsyduckToggle.module.css';

const PsyduckToggle = ({ onToggle }) => {
  // Lấy trạng thái từ localStorage
  const [isEnabled, setIsEnabled] = useState(() => {
    const saved = localStorage.getItem('psyduckEnabled');
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Lưu trạng thái vào localStorage khi thay đổi
  useEffect(() => {
    localStorage.setItem('psyduckEnabled', JSON.stringify(isEnabled));
    onToggle(isEnabled);
  }, [isEnabled, onToggle]);

  const handleClick = () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    
    // Haptic feedback trên mobile
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    
    // Toast notification
    const message = newState ? '🦆 Psyduck xuất hiện!' : '😴 Psyduck nghỉ ngơi!';
    showToast(message);
  };

  const showToast = (message) => {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 12px 20px;
      border-radius: 25px;
      font-size: 14px;
      font-weight: 500;
      z-index: 10000;
      animation: slideIn 0.3s ease, slideOut 0.3s ease 2.7s forwards;
      backdrop-filter: blur(10px);
    `;
    
    // Thêm keyframes nếu chưa có
    if (!document.querySelector('#toast-styles')) {
      const style = document.createElement('style');
      style.id = 'toast-styles';
      style.textContent = `
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 3000);
  };

  return (
    <div className={styles.toggleContainer}>
      <button
        className={`${styles.toggleButton} ${!isEnabled ? styles.disabled : ''}`}
        onClick={handleClick}
        aria-label={isEnabled ? 'Ẩn Psyduck' : 'Hiện Psyduck'}
      >
        {isEnabled ? '🦆' : '😴'}
      </button>
      
      <div className={styles.tooltip}>
        {isEnabled ? 'Ẩn Psyduck' : 'Hiện Psyduck'}
      </div>
    </div>
  );
};

export default PsyduckToggle;
