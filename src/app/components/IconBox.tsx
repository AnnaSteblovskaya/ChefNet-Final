import { motion } from 'motion/react';
import { ReactNode, useState, useEffect } from 'react';

interface IconBoxProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function IconBox({ children, className = '', delay = 0.2 }: IconBoxProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ 
        once: true, 
        margin: "-50px",
        amount: 0.3 
      }}
      onViewportEnter={() => setIsInView(true)}
      transition={{ 
        duration: 0.5,
        delay,
        ease: [0.34, 1.56, 0.64, 1]
      }}
      className="flex justify-center"
    >
      <motion.div 
        key={isInView ? 'in-view' : 'out-view'}
        initial={{ scale: 0, rotate: 0 }}
        animate={{ scale: 1, rotate: 0 }}
        whileInView={{ scale: 1 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        transition={{ 
          type: "spring",
          stiffness: 400,
          damping: 17
        }}
        className={`w-24 h-24 bg-gradient-to-br from-[#FF7A59] to-[#EB5632] rounded-3xl flex items-center justify-center shadow-xl shadow-[#FF6B35]/30 relative overflow-hidden group cursor-pointer select-none ${className}`}
        style={{ willChange: 'transform', touchAction: 'manipulation' }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        {/* White circle behind icon for better visibility */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 bg-white/90 rounded-full" />
        </div>
        {children}
      </motion.div>
    </motion.div>
  );
}