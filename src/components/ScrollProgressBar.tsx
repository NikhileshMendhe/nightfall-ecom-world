import { useEffect, useState } from 'react';

const ScrollProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-secondary/30 z-50">
      <div
        className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary transition-all duration-150 shadow-glow"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};

export default ScrollProgressBar;
