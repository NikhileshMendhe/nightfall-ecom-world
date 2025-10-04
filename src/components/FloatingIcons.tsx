import { ShoppingCart, Tag, Star, Gift, Zap, Heart } from 'lucide-react';

const FloatingIcons = () => {
  const icons = [
    { Icon: ShoppingCart, delay: '0s', duration: '20s', top: '10%', left: '5%' },
    { Icon: Tag, delay: '2s', duration: '25s', top: '70%', left: '10%' },
    { Icon: Star, delay: '4s', duration: '18s', top: '30%', left: '85%' },
    { Icon: Gift, delay: '1s', duration: '22s', top: '60%', left: '90%' },
    { Icon: Zap, delay: '3s', duration: '19s', top: '85%', left: '15%' },
    { Icon: Heart, delay: '5s', duration: '24s', top: '15%', left: '80%' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {icons.map(({ Icon, delay, duration, top, left }, index) => (
        <div
          key={index}
          className="absolute opacity-10"
          style={{
            top,
            left,
            animation: `float ${duration} ease-in-out infinite`,
            animationDelay: delay,
          }}
        >
          <Icon className="w-8 h-8 md:w-12 md:h-12 text-primary" />
        </div>
      ))}
    </div>
  );
};

export default FloatingIcons;
