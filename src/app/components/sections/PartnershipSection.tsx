import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import IconBox from '@/app/components/IconBox';
import { 
  Handshake, 
  Network, 
  TrendingUp, 
  ChevronLeft, 
  ChevronRight,
  Settings,
  Brain,
  DollarSign,
  FileText
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/locales/translations';
import partnerIcon from 'figma:asset/85a04790adadc69f1d0380e9066216a493e83d6b.png';

export default function PartnershipSection() {
  const { language } = useLanguage();
  const t = translations[language];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const [lastClicked, setLastClicked] = useState<'prev' | 'next' | null>(null);
  const [isLaptop, setIsLaptop] = useState(true);
  const [rotatingIcons, setRotatingIcons] = useState<{ [key: number]: boolean }>({});
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Calculate visible cards based on screen size
  useEffect(() => {
    const updateVisibleCards = () => {
      const width = window.innerWidth;
      setIsLaptop(width >= 1024);
      
      if (width < 640) {
        setVisibleCards(1);
      } else if (width < 1024) {
        setVisibleCards(2);
      } else if (width < 1280) {
        setVisibleCards(3);
      } else {
        setVisibleCards(4);
      }
    };

    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  const cards = [
    {
      icon: Handshake,
      title: t.partner1Title,
      description: t.partner1Desc,
    },
    {
      icon: Network,
      title: t.partner2Title,
      description: t.partner2Desc,
    },
    {
      icon: TrendingUp,
      title: t.partner3Title,
      description: t.partner3Desc,
    },
    {
      icon: Settings,
      title: t.partner4Title,
      description: t.partner4Desc,
    },
    {
      icon: Brain,
      title: t.partner5Title,
      description: t.partner5Desc,
    },
    {
      icon: Network,
      title: t.partner6Title,
      description: t.partner6Desc,
    },
    {
      icon: DollarSign,
      title: t.partner7Title,
      description: t.partner7Desc,
    },
    {
      icon: FileText,
      title: t.partner8Title,
      description: t.partner8Desc,
    },
  ];

  const maxIndex = cards.length - visibleCards;

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
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe && currentIndex < maxIndex) {
      handleNext();
    }
    if (isRightSwipe && currentIndex > 0) {
      handlePrev();
    }
  };

  return (
    <section id="partnership" className="py-12 bg-background relative overflow-hidden">
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
            <img src={partnerIcon} alt="Partner Icon" className="w-16 h-16 relative z-10 drop-shadow-lg -mt-2" />
          </IconBox>
          <h2 className="text-4xl md:text-5xl font-bold text-[#3E3E3E]">
            {t.partnersTitle}
          </h2>
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
          <div className="overflow-hidden px-12 sm:px-4 py-2" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
            <motion.div
              className="flex gap-4 sm:gap-8"
              animate={{
                x: `calc(-${currentIndex * getCardWidthPercentage()}% - ${currentIndex * getGapSize()}rem)`,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {cards.map((card, index) => {
                const Icon = card.icon;
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
                  >
                    <div className="bg-white border-2 border-transparent rounded-2xl p-6 h-full hover:shadow-xl transition-all duration-300 hover:border-[#FF8C42] group flex flex-col items-center text-center">
                      {/* Icon */}
                      <motion.div
                        animate={rotatingIcons[index] ? { rotate: 360 } : { rotate: 0 }}
                        transition={{ duration: 0.6 }}
                        onMouseEnter={isLaptop ? () => {
                          setRotatingIcons(prev => ({ ...prev, [index]: true }));
                          setTimeout(() => {
                            setRotatingIcons(prev => ({ ...prev, [index]: false }));
                          }, 600);
                        } : undefined}
                        onTouchStart={!isLaptop ? () => {
                          setRotatingIcons(prev => ({ ...prev, [index]: true }));
                          setTimeout(() => {
                            setRotatingIcons(prev => ({ ...prev, [index]: false }));
                          }, 600);
                        } : undefined}
                        className="flex-shrink-0 bg-gradient-to-br from-[#FF8C42] to-[#D2691E] w-16 h-16 rounded-xl flex items-center justify-center group-hover:shadow-lg group-hover:shadow-[#FF6B35]/40 transition-shadow mb-4 cursor-pointer"
                      >
                        <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                      </motion.div>

                      {/* Content */}
                      <div className="flex-1">
                        {/* Title */}
                        <h3 className="text-lg font-bold text-[#FF6B35] mb-3">
                          {card.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-[#5A5A5A] leading-relaxed">
                          {card.description}
                        </p>
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