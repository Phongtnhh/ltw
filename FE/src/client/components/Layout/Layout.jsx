import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import PsyduckGif from '../PsyduckGif';
import PsyduckToggle from '../PsyduckToggle';

const Layout = ({ children }) => {
  const [showPsyduck, setShowPsyduck] = useState(true);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />

      {/* Psyduck GIF - hiển thị theo toggle */}
      {showPsyduck && <PsyduckGif />}

      {/* Toggle Button */}
      <PsyduckToggle onToggle={setShowPsyduck} />
    </div>
  );
};

export default Layout;
