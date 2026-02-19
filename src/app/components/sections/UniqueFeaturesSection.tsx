import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/locales/translations';
import IconBox from '@/app/components/IconBox';
import { 
  Sparkles, 
  Search, 
  Smartphone, 
  Eye, 
  Heart, 
  CircleDollarSign, 
  AppWindow, 
  ChefHat,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import fireIcon from 'figma:asset/175bf7179bacb5a758ec98d1cb083eac03719212.png';
import growthIcon from 'figma:asset/64c4e07a3691678d999f938c1479fa2c5b605192.png';

const iconComponents = [
  ChefHat,           // 1. Personal AI Companion
  Search,            // 2. Intuitive Search
  Smartphone,        // 3. Flexibility of use
  Eye,               // 4. Clarity and details
  Heart,             // 5. Unique customer review system
  CircleDollarSign,  // 6. Earn by being active
  AppWindow,         // 7. All-in-one app
  Sparkles,          // 8. AI companion
  null               // 9. Restaurant Support and Growth (uses image)
];

export default function UniqueFeaturesSection() {
  const { language } = useLanguage();
  const t = translations[language];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const [lastClicked, setLastClicked] = useState<'prev' | 'next' | null>(null);
  const [isLaptop, setIsLaptop] = useState(true);
  const [rotatingIcons, setRotatingIcons] = useState<{ [key: number]: boolean }>({});
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Calculate visible cards based on screen size
  useEffect(() => {
    const updateVisibleCards = () => {
      const width = window.innerWidth;
      setIsLaptop(width >= 1024);
      
      if (width < 640) {
        setVisibleCards(1);
      } else if (width < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  const features = [
    { title: t.feature1Title, subtitle: t.feature1Subtitle || '', desc: t.feature1Desc, icon: iconComponents[0] },
    { title: t.feature2Title, subtitle: t.feature2Subtitle || '', desc: t.feature2Desc, icon: iconComponents[1] },
    { title: t.feature3Title, subtitle: t.feature3Subtitle || '', desc: t.feature3Desc, icon: iconComponents[2] },
    { title: t.feature4Title, subtitle: t.feature4Subtitle || '', desc: t.feature4Desc, icon: iconComponents[3] },
    { title: t.feature5Title, subtitle: t.feature5Subtitle || '', desc: t.feature5Desc, icon: iconComponents[4] },
    { title: t.feature6Title, subtitle: t.feature6Subtitle || '', desc: t.feature6Desc, icon: iconComponents[5] },
    { title: t.feature7Title, subtitle: t.feature7Subtitle || '', desc: t.feature7Desc, icon: iconComponents[6] },
    { title: t.feature8Title, subtitle: t.feature8Subtitle || '', desc: t.feature8Desc, icon: iconComponents[7] },
    { title: t.feature9Title, subtitle: t.feature9Subtitle || '', desc: t.feature9Desc, icon: iconComponents[8] },
  ];

  const maxIndex = features.length - visibleCards;

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
    setLastClicked('prev');
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
    setLastClicked('next');
  };

  // Calculate the width percentage for one card
  const getCardWidthPercentage = () => {
    return 100 / visibleCards;
  };

  // Calculate gap size based on screen width
  const getGapSize = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      return 1; // gap-4 = 1rem on mobile
    }
    return 2; // gap-8 = 2rem on desktop
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStart(e.touches[0].clientX);
    setTouchEnd(null);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || touchStart === null) return;
    const currentTouch = e.touches[0].clientX;
    setTouchEnd(currentTouch);
    const diff = currentTouch - touchStart;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setIsDragging(false);
      setDragOffset(0);
      return;
    }
    
    setIsDragging(false);
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe && currentIndex < maxIndex) {
      handleNext();
    }
    if (isRightSwipe && currentIndex > 0) {
      handlePrev();
    }
    
    // Reset
    setDragOffset(0);
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <section id="unique-features" className="py-12 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <IconBox delay={0.2}>
            <img src={fireIcon} alt="Fire icon" className="w-16 h-16 relative z-10 drop-shadow-lg" />
          </IconBox>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 mt-6 sm:mt-8">
            {language === 'tr' ? (
              <>
                <span className="text-[#FF6B35]">ChefNet</span>
                <span className="text-[#292524]"> benzersiz Özellikleri</span>
              </>
            ) : (language === 'en') ? (
              <>
                <span className="text-[#FF6B35]">{t.uniqueFeaturesChefNet}</span>
                <span className="text-[#292524]"> {t.uniqueFeaturesTitle}</span>
              </>
            ) : (language === 'de') ? (
              <>
                <span className="text-[#292524]">{t.uniqueFeaturesTitle}</span>
                <span className="text-[#FF6B35]"> {t.uniqueFeaturesChefNet}</span>
              </>
            ) : (
              <>
                <span className="text-[#292524]">{t.uniqueFeaturesTitle}</span>
                <span className="text-[#FF6B35]"> {t.uniqueFeaturesChefNet}</span>
              </>
            )}
          </h2>
          <p className="text-xl text-[var(--color-text-secondary)] max-w-3xl mx-auto">
            {t.uniqueFeaturesSubtitle}
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`absolute -left-1 sm:left-0 top-1/2 -translate-y-1/2 sm:-translate-x-4 z-20 w-9 h-9 sm:w-12 sm:h-12 rounded-full backdrop-blur-sm shadow-lg flex items-center justify-center transition-all ${
              currentIndex === 0
                ? 'opacity-30 cursor-not-allowed bg-white/90'
                : lastClicked === 'prev'
                ? 'opacity-100 bg-[#FF8C42] text-white'
                : 'opacity-100 bg-white/90 text-black hover:bg-[#FF8C42] hover:text-white'
            }`}
            aria-label="Previous"
          >
            <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className={`absolute -right-1 sm:right-0 top-1/2 -translate-y-1/2 sm:translate-x-4 z-20 w-9 h-9 sm:w-12 sm:h-12 rounded-full backdrop-blur-sm shadow-lg flex items-center justify-center transition-all ${
              currentIndex >= maxIndex
                ? 'opacity-30 cursor-not-allowed bg-white/90'
                : lastClicked === 'next'
                ? 'opacity-100 bg-[#FF8C42] text-white'
                : 'opacity-100 bg-white/90 text-black hover:bg-[#FF8C42] hover:text-white'
            }`}
            aria-label="Next"
          >
            <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>

          {/* Cards Container */}
          <div className="overflow-hidden px-12 sm:px-4 py-2">
            <motion.div
              drag={visibleCards === 1 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragEnd={(_, info) => {
                if (visibleCards === 1) {
                  const threshold = 50;
                  if (info.offset.x > threshold && currentIndex > 0) {
                    handlePrev();
                  } else if (info.offset.x < -threshold && currentIndex < maxIndex) {
                    handleNext();
                  }
                }
              }}
              className="flex gap-4 sm:gap-8"
              animate={{
                x: `calc(-${currentIndex * getCardWidthPercentage()}% - ${currentIndex * getGapSize()}rem)`,
              }}
              style={{
                cursor: visibleCards === 1 ? 'grab' : 'default',
              }}
              whileTap={visibleCards === 1 ? { cursor: 'grabbing' } : {}}
              transition={{ type: 'tween', duration: 0.4, ease: 'easeOut' }}
            >
              {features.map((feature, index) => {
                const Icon = feature.icon;
                const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
                return (
                  <motion.div
                    key={index}
                    initial={isMobile ? {} : { opacity: 0, y: 30 }}
                    whileInView={isMobile ? {} : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={isMobile ? {} : { duration: 0.5, delay: index * 0.1 }}
                    className={`flex-shrink-0 ${
                      visibleCards === 1
                        ? 'w-full'
                        : visibleCards === 2
                        ? 'w-[calc(50%-1rem)]'
                        : visibleCards === 3
                        ? 'w-[calc(33.333%-1.33rem)]'
                        : 'w-[calc(25%-1.5rem)]'
                    }`}
                    onTouchStart={() => {
                      setActiveCard(activeCard === index ? null : index);
                    }}
                  >
                    <div className={`bg-white border-2 rounded-2xl p-4 sm:p-6 min-h-[360px] sm:h-[400px] transition-all duration-300 group flex flex-col items-center text-center ${
                      activeCard === index ? 'border-[#FF7A59]' : 'border-transparent hover:border-[#FF7A59]'
                    }`}
                    style={{
                      boxShadow: activeCard === index 
                        ? '0 25px 80px -20px rgba(255, 140, 66, 0.18), 0 15px 50px -15px rgba(255, 107, 53, 0.12), 0 8px 30px -10px rgba(255, 107, 53, 0.08)' 
                        : '0 12px 50px -12px rgba(0, 0, 0, 0.06), 0 6px 30px -8px rgba(0, 0, 0, 0.04), 0 3px 15px -4px rgba(0, 0, 0, 0.03)'
                    }}
                    onMouseEnter={(e) => {
                      if (activeCard !== index) {
                        e.currentTarget.style.boxShadow = '0 20px 70px -18px rgba(255, 140, 66, 0.14), 0 10px 40px -12px rgba(255, 107, 53, 0.09), 0 5px 20px -6px rgba(255, 107, 53, 0.06)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeCard !== index) {
                        e.currentTarget.style.boxShadow = '0 12px 50px -12px rgba(0, 0, 0, 0.06), 0 6px 30px -8px rgba(0, 0, 0, 0.04), 0 3px 15px -4px rgba(0, 0, 0, 0.03)';
                      }
                    }}
                    >
                      {/* Icon */}
                      <motion.div
                        animate={rotatingIcons[index] ? { rotate: 360 } : { rotate: 0 }}
                        transition={{ 
                          duration: 0.5,
                          ease: "easeInOut"
                        }}
                        onMouseEnter={isLaptop ? () => {
                          setRotatingIcons(prev => ({ ...prev, [index]: true }));
                          setTimeout(() => {
                            setRotatingIcons(prev => ({ ...prev, [index]: false }));
                          }, 500);
                        } : undefined}
                        onClick={!isLaptop ? (e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          setRotatingIcons(prev => ({ ...prev, [index]: true }));
                          setTimeout(() => {
                            setRotatingIcons(prev => ({ ...prev, [index]: false }));
                          }, 500);
                        } : undefined}
                        className="flex-shrink-0 bg-gradient-to-br from-[#FF7A59] to-[#EB5632] w-12 h-12 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center group-hover:shadow-lg group-hover:shadow-[#FF6B35]/40 transition-shadow mb-3 sm:mb-4 cursor-pointer select-none"
                        style={{ willChange: 'transform', touchAction: 'manipulation' }}
                      >
                        {index === 8 ? (
                          <img 
                            src={growthIcon} 
                            alt="Growth" 
                            className="w-6 h-6 sm:w-8 sm:h-8 brightness-0 invert"
                            style={{ 
                              filter: 'brightness(0) invert(1) drop-shadow(0 0 0.5px white) drop-shadow(0 0 0.5px white)' 
                            }}
                          />
                        ) : (
                          <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" strokeWidth={2} />
                        )}
                      </motion.div>

                      {/* Content */}
                      <div className="flex-1">
                        {/* Title */}
                        <h3 className="text-sm sm:text-lg font-bold text-[#3E3E3E] mb-2 sm:mb-3 leading-tight">
                          <span className="text-[#FF6B35]">{feature.title}</span>
                          {feature.subtitle && (
                            <span className="text-[rgb(255,107,53)]"> — {feature.subtitle}</span>
                          )}
                        </h3>

                        {/* Description */}
                        {feature.desc.includes('AI-компаньон') ? (
                          <div className="text-xs sm:text-sm text-[#5A5A5A] leading-relaxed text-left">
                            {(() => {
                              const sentences = feature.desc.split('. ').filter(s => s.trim());
                              return sentences.map((sentence, sentenceIndex) => {
                                let content = sentence.trim();
                                const elements: React.ReactNode[] = [];
                                
                                if (content.includes('Основан на Супер-интеллекте:')) {
                                  const parts = content.split('Основано на Супер-интеллекте:');
                                  elements.push(parts[0].trim() ? parts[0].trim() + ' ' : '');
                                  elements.push(<span key="bold" className="font-bold">Основано на Супер-интеллекте:</span>);
                                  elements.push(' ' + parts[1].trim());
                                } else if (content.includes('Powered by Super-intelligence:')) {
                                  const parts = content.split('Powered by Super-intelligence:');
                                  elements.push(parts[0].trim() ? parts[0].trim() + ' ' : '');
                                  elements.push(<span key="bold-powered" className="font-bold">Powered by Super-intelligence:</span>);
                                  elements.push(' ' + parts[1].trim());
                                } else if (content.includes('Angetrieben von Super-Intelligenz:')) {
                                  const parts = content.split('Angetrieben von Super-Intelligenz:');
                                  elements.push(parts[0].trim() ? parts[0].trim() + ' ' : '');
                                  elements.push(<span key="bold-german" className="font-bold">Angetrieben von Super-Intelligenz:</span>);
                                  elements.push(' ' + parts[1].trim());
                                } else if (content.includes('Süper-Intellekt teknolojisiyle çalışır:')) {
                                  const parts = content.split('Süper-Intellekt teknolojisiyle çalışır:');
                                  elements.push(parts[0].trim() ? parts[0].trim() + ' ' : '');
                                  elements.push(<span key="bold-turkish" className="font-bold">Süper-Intellekt teknolojisiyle çalışır:</span>);
                                  elements.push(' ' + parts[1].trim());
                                } else if (content.includes('Impulsado por una Superinteligencia:')) {
                                  const parts = content.split('Impulsado por una Superinteligencia:');
                                  elements.push(parts[0].trim() ? parts[0].trim() + ' ' : '');
                                  elements.push(<span key="bold-spanish" className="font-bold">Impulsado por una Superinteligencia:</span>);
                                  elements.push(' ' + parts[1].trim());
                                } else if (content.includes('Suchen Sie Restaurants, Gerichte und kulinarische Stilrichtungen')) {
                                  const parts = content.split('Suchen Sie Restaurants, Gerichte und kulinarische Stilrichtungen');
                                  elements.push(parts[0]);
                                  elements.push(<span key="bold-search-de" className="font-bold">Suchen Sie Restaurants, Gerichte und kulinarische Stilrichtungen</span>);
                                  elements.push(parts[1]);
                                } else if (content.includes('Search restaurants, dishes, and cuisines — ')) {
                                  const parts = content.split('Search restaurants, dishes, and cuisines — ');
                                  elements.push(parts[0]);
                                  elements.push(<span key="bold-search-en" className="font-bold">Search restaurants, dishes, and cuisines — </span>);
                                  elements.push(parts[1]);
                                } else if (content.includes('Поиск по ресторанам, блюдам и стилям')) {
                                  const parts = content.split('Поиск по ресторанам, блюдам и стилям');
                                  elements.push(parts[0]);
                                  elements.push(<span key="bold-search" className="font-bold">Поиск по ресторанам, блюдам и стилям</span>);
                                  elements.push(parts[1]);
                                } else if (content.includes('Restoran, yemek ve mutfak türlerinde arama')) {
                                  const parts = content.split('Restoran, yemek ve mutfak türlerinde arama');
                                  elements.push(parts[0]);
                                  elements.push(<span key="bold-search-tr" className="font-bold">Restoran, yemek ve mutfak türlerinde arama</span>);
                                  elements.push(parts[1]);
                                } else if (content.includes('Búsqueda por restaurantes,')) {
                                  const parts = content.split('Búsqueda por restaurantes,');
                                  elements.push(parts[0]);
                                  elements.push(<span key="bold-search-es" className="font-bold">Búsqueda por restaurantes,</span>);
                                  elements.push(parts[1]);
                                } else if (content.includes('The system works in two modes:')) {
                                  const parts = content.split('The system works in two modes:');
                                  elements.push(parts[0]);
                                  elements.push(<span key="bold-system-en" className="font-bold">The system works in two modes:</span>);
                                  elements.push(parts[1]);
                                } else if (content.includes('Das System funktioniert in zwei Modi:')) {
                                  const parts = content.split('Das System funktioniert in zwei Modi:');
                                  elements.push(parts[0]);
                                  elements.push(<span key="bold-system-de" className="font-bold">Das System funktioniert in zwei Modi:</span>);
                                  elements.push(parts[1]);
                                } else if (content.includes('Система работает в двух режимах:')) {
                                  const parts = content.split('Система работает в двух режимах:');
                                  elements.push(parts[0]);
                                  elements.push(<span key="bold-system" className="font-bold">Система работает в двух режимах:</span>);
                                  elements.push(parts[1]);
                                } else if (content.includes('Sistem iki modda çalışıyor:')) {
                                  const parts = content.split('Sistem iki modda çalışıyor:');
                                  elements.push(parts[0]);
                                  elements.push(<span key="bold-system-tr" className="font-bold">Sistem iki modda çalışıyor:</span>);
                                  elements.push(parts[1]);
                                } else if (content.includes('El sistema funciona en dos modos:')) {
                                  const parts = content.split('El sistema funciona en dos modos:');
                                  elements.push(parts[0]);
                                  elements.push(<span key="bold-system-es" className="font-bold">El sistema funciona en dos modos:</span>);
                                  elements.push(parts[1]);
                                } else if (content.includes('Interactive menu')) {
                                  const parts = content.split('Interactive menu');
                                  elements.push(parts[0]);
                                  elements.push(<span key="bold-menu-en" className="font-bold">Interactive menu</span>);
                                  elements.push(parts[1]);
                                } else if (content.includes('Interaktives Menü')) {
                                  const parts = content.split('Interaktives Menü');
                                  elements.push(parts[0]);
                                  elements.push(<span key="bold-menu-de" className="font-bold">Interaktives Menü</span>);
                                  elements.push(parts[1]);
                                } else if (content.includes('Интерактивное меню')) {
                                  const parts = content.split('Интерактивное меню');
                                  elements.push(parts[0]);
                                  elements.push(<span key="bold-menu" className="font-bold">Интерактивное меню</span>);
                                  elements.push(parts[1]);
                                } else if (content.includes('Malzeme ve kalori bilgileriyle fotoğraf ve video formatında etkileşimli menü')) {
                                  const parts = content.split('Malzeme ve kalori bilgileriyle fotoğraf ve video formatında etkileşimli menü');
                                  elements.push(parts[0]);
                                  elements.push(<span key="bold-menu-tr" className="font-bold">Malzeme ve kalori bilgileriyle fotoğraf ve video formatında etkileşimli menü</span>);
                                  elements.push(parts[1]);
                                } else if (content.includes('Menú interactivo')) {
                                  const parts = content.split('Menú interactivo');
                                  elements.push(parts[0]);
                                  elements.push(<span key="bold-menu-es" className="font-bold">Menú interactivo</span>);
                                  elements.push(parts[1]);
                                } else if (content.includes('ChefNet')) {
                                  const parts = content.split('ChefNet');
                                  elements.push(parts[0]);
                                  elements.push(<span key="bold-chefnet" className="font-bold">ChefNet</span>);
                                  elements.push(parts[1]);
                                } else if (content.includes('Sadece puan değil')) {
                                  const parts = content.split('Sadece');
                                  elements.push(parts[0]);
                                  elements.push(<span key="bold-sadece" className="font-bold">Sadece</span>);
                                  elements.push(parts[1]);
                                } else {
                                  elements.push(content);
                                }
                                
                                return (
                                  <span key={sentenceIndex}>
                                    {elements}
                                    {sentenceIndex < sentences.length - 1 && '. '}
                                    {sentenceIndex < sentences.length - 1 && <br />}
                                  </span>
                                );
                              });
                            })()}
                          </div>
                        ) : (
                          <div className="text-xs sm:text-sm text-[#5A5A5A] leading-relaxed text-left">
                            {(() => {
                              const sentences = feature.desc.split('. ').filter(s => s.trim());
                              return sentences.map((sentence, sentenceIndex) => {
                                let content = sentence.trim();
                                const elements: React.ReactNode[] = [];
                                
                                if (content.includes('Основано на Супер-интеллекте:')) {
                                  const parts = content.split('Основано на Супер-интеллекте:');
                                  elements.push(parts[0].trim() ? parts[0].trim() + ' ' : '');
                                  elements.push(<span key="bold" className="font-bold">Основано на Супер-интеллекте:</span>);
                                  elements.push(' ' + parts[1].trim());
                                } else if (content.includes('Powered by Super-intelligence:')) {
                                  const parts = content.split('Powered by Super-intelligence:');
                                  elements.push(parts[0].trim() ? parts[0].trim() + ' ' : '');
                                  elements.push(<span key="bold-powered" className="font-bold">Powered by Super-intelligence:</span>);
                                  elements.push(' ' + parts[1].trim());
                                } else if (content.includes('Angetrieben von Super-Intelligenz:')) {
                                  const parts = content.split('Angetrieben von Super-Intelligenz:');
                                  elements.push(parts[0].trim() ? parts[0].trim() + ' ' : '');
                                  elements.push(<span key="bold-german" className="font-bold">Angetrieben von Super-Intelligenz:</span>);
                                  elements.push(' ' + parts[1].trim());
                                } else if (content.includes('Süper-Intellekt teknolojisiyle çalışır:')) {
                                  const parts = content.split('Süper-Intellekt teknolojisiyle çalışır:');
                                  elements.push(parts[0].trim() ? parts[0].trim() + ' ' : '');
                                  elements.push(<span key="bold-turkish" className="font-bold">Süper-Intellekt teknolojisiyle çalışır:</span>);
                                  elements.push(' ' + parts[1].trim());
                                } else if (content.includes('Impulsado por una Superinteligencia:')) {
                                  const parts = content.split('Impulsado por una Superinteligencia:');
                                  elements.push(parts[0].trim() ? parts[0].trim() + ' ' : '');
                                  elements.push(<span key="bold-spanish" className="font-bold">Impulsado por una Superinteligencia:</span>);
                                  elements.push(' ' + parts[1].trim());
                                } else if (content.includes('Suchen Sie Restaurants, Gerichte und kulinarische Stilrichtungen')) {
                                  const parts = content.split('Suchen Sie Restaurants, Gerichte und kulinarische Stilrichtungen');
                                  elements.push(parts[0]);
                                  elements.push(<span key="bold-search-de" className="font-bold">Suchen Sie Restaurants, Gerichte und kulinarische Stilrichtungen</span>);
                                  elements.push(parts[1]);
                                } else if (content.includes('Search restaurants, dishes, and cuisines — ')) {
                                  const parts = content.split('Search restaurants, dishes, and cuisines — ');
                                  elements.push(parts[0]);
                                  elements.push(<span key="bold-search-en" className="font-bold">Search restaurants, dishes, and cuisines — </span>);
                                  elements.push(parts[1]);
                                } else if (content.includes('Поиск по ресторанам, блюдам и стилям')) {
                                  const parts = content.split('Поиск по ресторанам, блюдам и стилям');
                                  elements.push(parts[0]);
                                  elements.push(<span key="bold-search" className="font-bold">Поиск по ресторанам, блюдам и стилям</span>);
                                  elements.push(parts[1]);
                                } else if (content.includes('Restoran, yemek ve mutfak türlerinde arama')) {
                                  const parts = content.split('Restoran, yemek ve mutfak türlerinde arama');
                                  elements.push(parts[0]);
                                  elements.push(<span key="bold-search-tr" className="font-bold">Restoran, yemek ve mutfak türlerinde arama</span>);
                                  elements.push(parts[1]);
                                } else if (content.includes('Búsqueda por restaurantes,')) {
                                  const parts = content.split('Búsqueda por restaurantes,');
                                  elements.push(parts[0]);
                                  elements.push(<span key="bold-search-es" className="font-bold">Búsqueda por restaurantes,</span>);
                                  elements.push(parts[1]);
                                } else if (content.includes('The system works in two modes:')) {
                                  const parts = content.split('The system works in two modes:');
                                  elements.push(parts[0]);
                                  elements.push(<span key="bold-system-en" className="font-bold">The system works in two modes:</span>);
                                  elements.push(parts[1]);
                                } else if (content.includes('Das System funktioniert in zwei Modi:')) {
                                  const parts = content.split('Das System funktioniert in zwei Modi:');
                                  elements.push(parts[0]);
                                  elements.push(<span key="bold-system-de" className="font-bold">Das System funktioniert in zwei Modi:</span>);
                                  elements.push(parts[1]);
                                } else if (content.includes('Система работает в двух режимах:')) {
                                  const parts = content.split('Система работает в двух режимах:');
                                  elements.push(parts[0]);
                                  elements.push(<span key="bold-system" className="font-bold">Система работает в двух режимах:</span>);
                                  elements.push(parts[1]);
                                } else if (content.includes('Sistem iki modda çalışıyor:')) {
                                  const parts = content.split('Sistem iki modda çalışıyor:');
                                  elements.push(parts[0]);
                                  elements.push(<span key="bold-system-tr" className="font-bold">Sistem iki modda çalışıyor:</span>);
                                  elements.push(parts[1]);
                                } else if (content.includes('El sistema funciona en dos modos:')) {
                                  const parts = content.split('El sistema funciona en dos modos:');
                                  elements.push(parts[0]);
                                  elements.push(<span key="bold-system-es" className="font-bold">El sistema funciona en dos modos:</span>);
                                  elements.push(parts[1]);
                                } else if (content.includes('Interactive menu')) {
                                  const parts = content.split('Interactive menu');
                                  elements.push(parts[0]);
                                  elements.push(<span key="bold-menu-en" className="font-bold">Interactive menu</span>);
                                  elements.push(parts[1]);
                                } else if (content.includes('Interaktives Menü')) {
                                  const parts = content.split('Interaktives Menü');
                                  elements.push(parts[0]);
                                  elements.push(<span key="bold-menu-de" className="font-bold">Interaktives Menü</span>);
                                  elements.push(parts[1]);
                                } else if (content.includes('Интерактивное меню')) {
                                  const parts = content.split('Интерактивное меню');
                                  elements.push(parts[0]);
                                  elements.push(<span key="bold-menu" className="font-bold">Интерактивное меню</span>);
                                  elements.push(parts[1]);
                                } else if (content.includes('Malzeme ve kalori bilgileriyle fotoğraf ve video formatında etkileşimli menü')) {
                                  const parts = content.split('Malzeme ve kalori bilgileriyle fotoğraf ve video formatında etkileşimli menü');
                                  elements.push(parts[0]);
                                  elements.push(<span key="bold-menu-tr" className="font-bold">Malzeme ve kalori bilgileriyle fotoğraf ve video formatında etkileşimli menü</span>);
                                  elements.push(parts[1]);
                                } else if (content.includes('Menú interactivo')) {
                                  const parts = content.split('Menú interactivo');
                                  elements.push(parts[0]);
                                  elements.push(<span key="bold-menu-es" className="font-bold">Menú interactivo</span>);
                                  elements.push(parts[1]);
                                } else if (content.includes('ChefNet')) {
                                  const parts = content.split('ChefNet');
                                  elements.push(parts[0]);
                                  elements.push(<span key="bold-chefnet" className="font-bold">ChefNet</span>);
                                  elements.push(parts[1]);
                                } else if (content.includes('Sadece puan değil')) {
                                  const parts = content.split('Sadece');
                                  elements.push(parts[0]);
                                  elements.push(<span key="bold-sadece" className="font-bold">Sadece</span>);
                                  elements.push(parts[1]);
                                } else if (content.includes('Зарабатывайте') || content.includes('Earn') || content.includes('Verdienen') || content.includes('Gana')) {
                                  // Handle "Зарабатывайте" / "Earn" / "Verdienen" / "Gana" - make it bold
                                  const keyword = content.includes('Зарабатывайте') ? 'Зарабатывайте' 
                                    : content.includes('Earn') ? 'Earn'
                                    : content.includes('Verdienen') ? 'Verdienen'
                                    : 'Gana';
                                  const parts = content.split(keyword);
                                  elements.push(parts[0]);
                                  elements.push(<span key="bold-earn" className="font-bold">{keyword}</span>);
                                  elements.push(parts[1]);
                                } else {
                                  elements.push(content);
                                }
                                
                                return (
                                  <span key={sentenceIndex}>
                                    {elements}
                                    {sentenceIndex < sentences.length - 1 && '. '}
                                    {sentenceIndex < sentences.length - 1 && <br />}
                                  </span>
                                );
                              });
                            })()}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-[#FF8C42] w-8'
                    : 'bg-[#D2B48C]/40 hover:bg-[#D2B48C]'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}