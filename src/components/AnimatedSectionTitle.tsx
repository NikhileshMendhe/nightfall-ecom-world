import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface AnimatedSectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedSectionTitle = ({ children, className = '' }: AnimatedSectionTitleProps) => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <h2 
      ref={ref}
      className={`text-2xl font-semibold mb-6 relative inline-block ${className}`}
    >
      <span className={`${isVisible ? 'typewriter-text' : 'opacity-0'}`}>
        {children}
      </span>
      <span 
        className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary via-primary/80 to-transparent transition-all duration-700 ${
          isVisible ? 'w-full' : 'w-0'
        }`}
        style={{ animationDelay: '0.3s' }}
      />
    </h2>
  );
};

export default AnimatedSectionTitle;
