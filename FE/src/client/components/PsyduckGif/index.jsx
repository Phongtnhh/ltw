import React, { useState, useEffect, useRef } from 'react';
import styles from './PsyduckGif.module.css';

const PsyduckGif = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isAngry, setIsAngry] = useState(false);
  const [showWhiteFlash, setShowWhiteFlash] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef(null);
  const messageTimerRef = useRef(null);

  // Tin nhắn bình thường
  const normalMessages = [
    "Psy psy? Hôm nay của bạn thế nào? 😊",
    "Psyduck! Bạn có vui không? 🦆",
    "Psy psy duck! Cần mình giúp gì không? 💙",
    "Quack quack! Bạn ăn cơm chưa? 🍚",
    "Psyduck duck! Thời tiết hôm nay đẹp nhỉ? ☀️",
    "Psy psy! Bạn có khỏe không? 💪",
    "Quack! Mình đang hơi đau đầu... 😵",
    "Psyduck! Bạn thích bơi lội không? 🏊‍♂️",
    "Psy psy duck! Có gì vui không? 😄",
    "Quack quack! Bạn có buồn gì không? 🤗"
  ];

  // Tin nhắn tức giận
  const angryMessages = [
    "PSY PSY DUCK! Đừng bấm nữa! 😡",
    "QUACK QUACK! Mình tức rồi đấy! 💢",
    "PSY DUCK DUCK! Đau đầu quá! 🤯",
    "PSYDUCK! Thôi đi mà! 😤",
    "QUACK! Để mình yên! 😠",
    "PSY PSY! Bực quá rồi! 💥",
    "DUCK DUCK! Mệt lắm rồi! 😩",
    "PSYDUCK! Không chơi nữa! 🙄"
  ];

  // Hiển thị tin nhắn
  const showRandomMessage = (isAngryState = false) => {
    // Clear timer cũ nếu có
    if (messageTimerRef.current) {
      clearTimeout(messageTimerRef.current);
    }

    const messages = isAngryState ? angryMessages : normalMessages;
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    setCurrentMessage(randomMessage);
    setShowMessage(true);
    
    // Tự động ẩn tin nhắn sau 3 giây
    messageTimerRef.current = setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  // Xử lý click
  const handleClick = () => {
    // Hiệu ứng click
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);

    // Haptic feedback trên mobile
    if (navigator.vibrate) {
      navigator.vibrate(30);
    }

    // Tăng click count
    clickCountRef.current += 1;

    // Clear timer reset cũ
    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
    }

    // Kiểm tra số lần click liên tục
    if (clickCountRef.current >= 5) {
      // Tức giận khi click >= 5 lần liên tục
      setIsAngry(true);
      setIsShaking(true);
      setShowWhiteFlash(true);
      
      // Hiển thị tin nhắn tức giận
      showRandomMessage(true);
      
      // Tắt flash sau 1 giây
      setTimeout(() => {
        setShowWhiteFlash(false);
      }, 1000);
      
      // Reset trạng thái sau 4 giây
      setTimeout(() => {
        setIsAngry(false);
        setIsShaking(false);
        clickCountRef.current = 0;
        
        // Tin nhắn xin lỗi
        setCurrentMessage("Psy psy... Xin lỗi nha! 😅💧");
        setShowMessage(true);
        
        messageTimerRef.current = setTimeout(() => {
          setShowMessage(false);
        }, 2500);
      }, 4000);
      
    } else {
      // Click bình thường (1-4 lần)
      showRandomMessage(false);
      
      // Reset click count sau 2 giây không click
      clickTimerRef.current = setTimeout(() => {
        clickCountRef.current = 0;
      }, 2000);
    }
  };

  // Tự động hiển thị tin nhắn ngẫu nhiên
  useEffect(() => {
    const interval = setInterval(() => {
      if (!showMessage && !isAngry && Math.random() < 0.2) {
        showRandomMessage(false);
      }
    }, 10000); // Mỗi 10 giây có 20% cơ hội hiển thị

    return () => clearInterval(interval);
  }, [showMessage, isAngry]);

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
      if (messageTimerRef.current) clearTimeout(messageTimerRef.current);
    };
  }, []);

  return (
    <>
      {/* White Flash Overlay */}
      <div className={`${styles.whiteFlash} ${showWhiteFlash ? styles.active : ''}`}></div>
      
      <div className={styles.psyduckContainer}>
        <div 
          className={`${styles.psyduckWrapper} ${isClicked ? styles.clicked : ''} ${isShaking ? styles.shaking : ''}`}
          onClick={handleClick}
          title="Click để tương tác với Psyduck!"
        >
          {/* Speech Bubble */}
          {showMessage && (
            <div className={`${styles.speechBubble} ${styles.show} ${isAngry ? styles.angry : ''}`}>
              {currentMessage}
            </div>
          )}
          
          {/* Psyduck GIF */}
          <img
            src="/psyduck.gif"
            alt="Psyduck"
            className={`${styles.psyduckGif} ${isAngry ? styles.angry : ''}`}
            draggable={false}
          />
        </div>
      </div>
    </>
  );
};

export default PsyduckGif;
