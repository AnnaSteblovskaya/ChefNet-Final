import { motion } from 'motion/react';
import { ReactNode, useState, useEffect } from 'react';

interface IconBoxProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function IconBox({ children, className = '', delay = 0.2 }: IconBoxProps) {
  const [isMobile, setIsMobile] = useState(false);

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
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, margin: isMobile ? "-50px" : "0px" }}
      transition={{ type: "spring", duration: 0.8, delay }}
      className="flex justify-center"
    >
      <motion.div 
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={isMobile ? { scale: 1.1, rotate: 5 } : undefined}
        transition={{ type: "spring", stiffness: 300 }}
        className={`w-24 h-24 bg-gradient-to-br from-[#FF6B35] to-[#FF8C42] rounded-3xl flex items-center justify-center shadow-xl shadow-[#FF6B35]/30 relative overflow-hidden group ${className}`}
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